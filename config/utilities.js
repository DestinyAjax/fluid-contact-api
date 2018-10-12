const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/** this is function convert auth details to JSON format */
const ToAuthJSON = (user) => {
  return {
    id: user.id,
    email: user.email,
    token: getJWT(user)
  }
}

/** this function generate login token for user */
const getJWT = (user) => {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: user.email,
    id: user.id,
    exp: parseInt(expirationDate.getTime() / 1000, 10)
  }, 'secret');
}

/** this function compares the hash password before login */
const validPassword = (password, hash, salt) => {
  let newHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  if (hash === newHash) {
    return true;
  } else {
    return false;
  }
}

module.exports.ToAuthJSON = ToAuthJSON;
module.exports.getJWT = getJWT;
module.exports.validPassword = validPassword;