process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const server = require('../index');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe('Users', () => {
    describe('/POST User', () => {
        it('it should not POST a user without pages field', (done) => {
            let user = {
                username: "FluidAngle",
                password: "hacking",
                email: "info@fluidangle.com"
            }
          chai.request(server)
              .post('/api/user/signup')
              .send(user)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('pages');
                    res.body.errors.pages.should.have.property('kind').eql('required');
                done();
              });
        });
    });
});