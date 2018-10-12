const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/user');
const utility = require('../config/utilities');

/** configuring password authentication */
passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},
  (email, password, done) => {
    Users.findOne({ where: {email: email}}).then((user) => {
      if (!user) {
        return done(null, false, { errors: { error: 'Incorrect username' } });
      }

      if (!utility.validPassword(password, user.password, user.salt)) {
        return done(null, false, { errors: { error: 'Incorrect password' } });
      } else {
        return done(null, user);
      }
    }).catch(done)}
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(err, user);
  });
});