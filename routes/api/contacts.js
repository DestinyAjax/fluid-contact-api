const router = require('express').Router();
const ContactController = require('../../controllers/ContactController');
const auth = require('../auth');

/** Connecting the signup route to the userController */
router.post('/', auth.required, (request, response, next) => {
  ContactController.createContact(request, response, next);
});

/** Connecting the signin route to the userController */
router.get('/:id', auth.required, (request, response, next) => {
  ContactController.allContacts(request, response, next);
});

/** this route is responsible for updating a single contact */
router.patch('/:id', auth.required, (request, response, next) => {
  ContactController.updateContact(request, response, next);
});

module.exports = router;
