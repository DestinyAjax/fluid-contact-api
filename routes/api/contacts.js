const router = require('express').Router();
const ContactController = require('../../controllers/ContactController');
const auth = require('../auth');

/** this route is responsible for creating a new contact */
router.post('/', auth.required, (request, response, next) => {
  ContactController.createContact(request, response, next);
});

/** this route is responsible for viewing all contacts */
router.get('/', auth.required, (request, response, next) => {
  ContactController.allContacts(request, response, next);
});

/** this route is responsible for updating a single contact */
router.patch('/:id', auth.required, (request, response, next) => {
  ContactController.updateContact(request, response, next);
});

/** this route is responsible for viewing a single contact */
router.get('/:id', auth.required, (request, response, next) => {
  ContactController.viewOneContact(request, response, next);
});

/** this route is responsible for deleting a single contact */
router.delete('/:id', auth.required, (request, response, next) => {
  ContactController.deleteContact(request, response, next);
});

/** this route is responsible for starring a single contact */
router.patch('/:id/star', auth.required, (request, response, next) => {
  ContactController.starOneContact(request, response, next);
});

/** this route is responsible for viewing all star contacts */
router.get('/star/:userId', auth.required, (request, response, next) => {
  ContactController.allStarContacts(request, response, next);
});

module.exports = router;
