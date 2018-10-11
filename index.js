const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');

/** Setting up environment variable */
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5000;
const app = express();

/** set up middlewares */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'fluid-contact-api',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

if (!isProduction) {
  app.use(errorHandler());
}

/** set up routes {API Endpoints} */
require('./models/user');
require('./models/contact');
require('./config/passport');
app.use(require('./routes'));

/** starting up the server */
app.listen(port, () => {
  console.log('Server running on port ' + port);
});
