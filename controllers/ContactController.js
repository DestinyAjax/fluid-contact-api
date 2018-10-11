const Contact = require('../models/contact');

class ContactController {
/**
 *
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @memberof ContactController
 */
  static allContacts(request, response, next) {
      try {
        Contact.findAll({ where: { name: request.body.user_id } }).then((contacts) => {
            // projects will be an array of Project instances with the specified name
        })
      } catch (err) {
          return response.status(500).json(err);
      }
   
  }

    /**
     * function to create new contact by logged in user
     *
     * @param {*} request
     * @param {*} response
     * @param {*} next
     * @memberof ContactController
     */
  static createContact(request, response, next) {
    if (!request.body.email || !request.body.fullname || !request.body.telephone || !request.body.address) {
      response.status(422).json({
        'error': 'Invalid Request. All the fields are the required'
      });
    } else {
      const contact = new Contact(request.body);
        
      contact.save().then(data => 
        response.json({contact: data }
      )).catch(err => next(err));
    }
  }

    // static viewOneContact(request, response, next) {

    // }

    // static updateContact(request, response, next) {

    // }

    // static deleteContact(request, response, next) {

    // }

    // starOneContact(request, response, next) {

    // }

    // allStarContacts(request, response, next) {

    // }
}

module.exports = ContactController;

