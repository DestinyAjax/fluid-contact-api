const Contact = require('../models/contact');

class ContactController {

/**
 *
 *@description function responsible for view contacts created by user
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @memberof ContactController
 */
  static allContacts(request, response, next) {
    if (!request.params.id) {
      request.logout();
      response.status(422).json({'error': 'Invalid user: Please sigin to create a contact'});
    }

    try {
      /** query contacts by the logged in user id */
      const user_id = request.params.id;
      Contact.findAll({ where: { user_id: user_id } }).then((contacts) => {
        response.json({
          contacts: contacts
        });
      });
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
    /** validating income request */
    if (!request.body.email) {
      response.status(422).json({'error': 'Please provide email address'});
    } 
    if (!request.body.telephone) {
      response.status(422).json({'error': 'Please provide telephone'});
    }
    if (!request.body.address) {
      response.status(422).json({'error': 'Please provide address'});
    }
    if (!request.body.fullname) {
      response.status(422).json({'error': 'Please provide contact full name'});
    }
    if (!request.body.user_id) {
      request.logout();
      response.status(422).json({'error': 'Invalid user: Please sigin to create a contact'});
    }
    
    try {
      /** process in the data the storeing new contact by user */
      const contact = new Contact(request.body);
      contact.user_id = request.body.user_id;
        
      contact.save().then(data => 
        response.json({payload: data }
      )).catch(err => next(err));
    } catch (err) {
      return next(err);
    }
  }


  /**
   *
   * @description function responsible for update a single contact by a user
   * @static
   * @param {*} request
   * @param {*} response
   * @param {*} next
   * @memberof ContactController
   */
  static updateContact(request, response, next) {
    try {
      const contact_id = request.params.id;
      Contact.findOne({ where: { id: contact_id }}).then(contact => {
        if (!contact) {
          response.json({error: 'This contact does not exist'});
        } else {
          contact.address = request.body.address;
          contact.email = request.body.email;
          contact.fullname = request.body.fullname;
          contact.telephone = request.body.telephone;
          contact.save().then(data => response.json({
            payload: data
          })).catch(err => response.json(err));
        }
      });
    } catch (err) {
      return next(err);
    }
    
  }

    // static viewOneContact(request, response, next) {

    // }

    

    // static deleteContact(request, response, next) {

    // }

    // starOneContact(request, response, next) {

    // }

    // allStarContacts(request, response, next) {

    // }
}

module.exports = ContactController;

