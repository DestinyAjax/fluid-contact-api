'use strict';
const jwt = require('express-jwt');

/** function to get token from request headers */
const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if (authorization && authorization.split(' ')[0] === 'Token' ||
        authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }

  return null;
}

/** the authentication middleware function */
const auth = {
  required: jwt({
    secret: 'secret',
    getToken: getTokenFromHeaders
  }),

  optional: jwt({
    secret: 'secret',
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
}

module.exports = auth;
