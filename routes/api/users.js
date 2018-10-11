const router = require('express').Router();

const UserController = require('../../controllers/UserController');
const auth = require('../auth');

/** Connecting the signup route to the userController */
router.post('/signup', auth.optional, (request, response, next) => {
  UserController.SignUp(request, response, next);
});

/** Connecting the signin route to the userController */
router.post('/signin', auth.optional, (request, response, next) => {
  UserController.SignIn(request, response, next);
});

/** Connecting the signout route to the userController */
router.post('/signout', auth.required, (request, response, next) => {
  UserController.SignOut(request, response, next);
});

module.exports = router;
