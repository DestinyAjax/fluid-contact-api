const passport = require('passport');
const User = require('../models/user');
const utility = require('../config/utilities');

class UserController {

  /**
 *
 * @description user signin function which returns a Promise on success or failure
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @memberof UserController
 */
  static SignIn(request, response, next) {
    if (!request.body.email) {
      return response.status(422).json({errors: {email: 'Email is reduired'}});
    }
    if (!request.body.password) {
      return response.status(422).json({errors: {password: 'Password is requried'}});
    }

    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) { return next(err); }

      if (user) {
        user.token = utility.getJWT(user);
        return response.json({ token: utility.ToAuthJSON(user) });
      } 
      
      return response.status(422).json(info);
    })(request, response, next);
  }

  /**
 *
 * @description user signup function which returns a Promise on success or failure
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @memberof UserController
 */
  static SignUp(request, response, next) {
    if (!request.body.email || !request.body.password || !request.body.username) {
      response.status(422).json({
        error: 'Invalid Request. All fields are required'
      });
    } else {
      const user = new User(request.body);
      user.setPassword(request.body.password);

      user.save().then(data => response.json({
        user: utility.ToAuthJSON(data)
      })).catch(err => next(err));
    }
  }


  /**
 *
 * @description user signout function 
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @memberof UserController
 */
  static SignOut(request, response) {
    request.logout();
    return response.status(200).json({ msg: 'Logged out Successfully' });
  }
}

module.exports = UserController;
