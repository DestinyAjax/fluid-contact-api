const router = require('express').Router();
const ContactController = require('../../controllers/ContactController');
const auth = require('../auth');

/** Connecting the signup route to the userController */
router.post('/', auth.required, (request, response, next) => {
  ContactController.createContact(request, response, next);
});

/** Connecting the signin route to the userController */
router.get('/', auth.required, (request, response) => {
  ContactController.allContact(request, response);
});

module.exports = router;
