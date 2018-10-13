process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const server = require('../index');
const chaiHttp = require('chai-http');
const User = require('../models/user');
const Contact = require('../models/contact');
chai.use(chaiHttp);

/** 
 * [the test script for user route endpoint]
 * @param  {[type]}   'User' [description]
 * @param  {Function} ()     [description]
 * @return {[type]}          [description]
 */
describe('User', () => {
  describe('/POST Signup', () => { 
    it('it should allow a user to signup', (done) => {
      let user = {
        username: "FluidAngle",
        email: "user@gmail.com",
        password: "welcome"
      }

      chai.request(server)
        .post('/api/user/signup')
        .send(user).end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('user');
        done();
      });
    });
  });

  /** [unit test for signin route] */
  describe('/POST SignIn', () => { 
    it('it should allow a user to signin', (done) => {
      let user = {
        email: "user@gmail.com",
        password: "welcome"
      }

      chai.request(server)
        .post('/api/user/signin')
        .send(user).end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
        done();
      });
    });
  });
});


/** 
 * [the test script for contact route endpoint]
 * @param  {[type]}   'Contact' [description]
 * @param  {Function} ()     [description]
 * @return {[type]}          [description]
 */
describe('Contact', () => {
  describe('/POST contacts', () => {
    it('it should POST a contact ', (done) => {
      let contact = {
        fullname: "Fluid Angle",
        email: "user@gmail.com",
        address: "Asokoro, Abuja",
        telephone: 08011110000
      }

      chai.request(server)
        .post('/api/contact')
        .send(contact)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.payload.should.have.property('email');
          res.body.payload.should.have.property('address');
          res.body.payload.should.have.property('telephone');
          res.body.payload.should.have.property('fullname');
          res.body.payload.should.have.property('UserId');
        done();
      });
    });
  });

  /*
  * Test the /GET/ route for all contact
  */
  describe('/GET All Contacts', () => {
    it('it should GET all contact created by the user', (done) => {
      chai.request(server)
        .get('/contact')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('contacts');
        done();
      });
    });
  });

  /*
  * Test the /PATCH/:id route for contact
  */
  describe('/PATCH/:id contact', () => {
    it('it should UPDATE a contact given the id', (done) => {
      let contact = new Contact({
        fullname: "Fluid Angle",
        email: "user@gmail.com",
        address: "Asokoro, Abuja",
        telephone: 08011110000
      });

      contact.save((err, contact) => {
        chai.request(server)
          .patch('/contact/' + contact.id)
          .send({fullname: "God Father", email: "users@gmail.com", address: "Wincolsin, London", telephone: 09018121778})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Contact created successfully');
            res.body.should.have.property('payload');
          done();
        });
      });
    });
  });

 /*
  * Test the /DELETE/:id route contact
  */
  describe('/DELETE/:id contact', () => {
    it('it should DELETE a contact given the id', (done) => {
      let contact = new Contact({
        fullname: "Fluid Angle",
        email: "user@gmail.com",
        address: "Asokoro, Abuja",
        telephone: 08011110000
      });

      contact.save((err, contact) => {
        chai.request(server)
          .delete('/contact/' + contact.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Updated successfully');
            res.body.should.have.property('payload');
          done();
        });
      });
    });
  });
});