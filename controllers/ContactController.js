const Contact = require('../models/contact');
const User = require('../models/user');

class ContactController {

/**
 *
 * @description function responsible for view contacts created by user
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @memberof ContactController
 */
  static allContacts(request, response, next) {
    try {
      /** query contacts by the logged in user id */
      User.findOne({ where: { id: request.user.id }, include: [ Contact ] }).then((contacts) => {
        response.json({
          contacts: contacts.Contacts
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
    if (!request.user.id) {
      response.status(422).json({'error': 'Invalid user: Please sigin to create a contact'});
    }
    
    try {
      /** process in the data the storeing new contact by user */
      const contact = new Contact(request.body);
      contact.UserId = request.user.id;
        
      contact.save().then(data => 
        response.json({
          message: "Contact created successfully",
          payload: data 
        }
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
            message: "Updated successfully",
            payload: data
          })).catch(err => response.json(err));
        }
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   *
   * @description function responsible for viewing a single contact
   * @static
   * @param {*} request
   * @param {*} response
   * @param {*} next
   * @memberof ContactController
   */
  static viewOneContact(request, response, next) {
    if (!request.params.id) {
      response.status(422).json({error: 'Invalid request'});
    } else {
      try {
        const contact_id = request.params.id;
        Contact.findById(contact_id).then(contact => {
          response.json(contact) 
        })
        .catch(err => response.json(err));
      } catch (err) {
        return next(err);        
      }
    }
  }

  /**
   *
   * @description function responsible for deleting a single contact
   * @static
   * @param {*} request
   * @param {*} response
   * @param {*} next
   * @memberof ContactController
   */
  static deleteContact(request, response, next) {
    if (!request.params.id) {
      response.status(422).json({error: 'Invalid request'});
    } else {
      try {
        const contact_id = request.params.id;
        Contact.destroy({ where: { id: contact_id }}).then(() => {
          response.json({ message: 'Contact deleted successfully'}) 
        })
        .catch(err => response.json(err));
      } catch (err) {
        return next(err);        
      }
    }
  }

  /**
   *
   *
   * @param {*} request
   * @param {*} response
   * @param {*} next
   * @memberof ContactController
   */
  static starOneContact(request, response, next) {
    if (!request.params.id) {
      response.status(422).json({error: 'Contact not found'});
    } else {
      try {
        const contact_id = request.params.id;
        Contact.findOne({ where: { id: contact_id }}).then(contact => {
          contact.starred = true;
          contact.save().then(data => response.json({
            message: 'Contact starred successfully'
          })).catch(err => response.json(err));
        });
      } catch (err) {
        return next(err);        
      }
    }
  }

  /**
   *
   * @description function responsible for viewing all star contacts
   * @static
   * @param {*} request
   * @param {*} response
   * @param {*} next
   * @returns
   * @memberof ContactController
   */
  static allStarContacts(request, response, next) {
    try {
      /** query star contacts by the logged in user id */
      Contact.findAll({
        where: {
          UserId: request.params.userId,
          starred: true
        }
      }).then(payload => response.json(payload))
      .catch(err => response.json(err));
    } catch (err) {
        return response.status(500).json(err);
    }
  }
}

module.exports = ContactController;

