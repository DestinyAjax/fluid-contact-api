const passport = require('passport');
const User = require('../models/user');

class UserController {

  /** user signin function which returns a Promise on success or failure */
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
        user.token = user.generateJWT();
        return response.json({ user: user.ToAuthJSON() });
      } 
      
      return response.status(422).json(info);
    })(request, response, next);
  }


  /** user signup function which returns a Promise on success or failure */
  static SignUp(request, response, next) {
    if (!request.body.email || !request.body.password || !request.body.username) {
      response.status(422).json({
        error: 'Invalid Request. All fields are required'
      });
    }

    const user = new User(request.body);
    user.setPassword(request.body.password);

    user.save().then(data => response.json({
      payload: data.ToAuthJSON()
    })).catch(err => next(err));
  }


  /** user signout function which returns a Promise */
  static SignOut(request, response) {
    request.logout();
    return response.status(200).json({ msg: 'Logged out Successfully' });
  }
}

module.exports = UserController;
