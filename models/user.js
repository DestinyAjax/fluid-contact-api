'use strict';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const DataTypes = require('sequelize');
const Contact = require('../models/contact');
const sequelize = require('../config/db.config');

const User = sequelize.define('User', {
  username: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  password: DataTypes.STRING
}, {});

/** this function compares the hash password before login */
User.prototype.validPassword = function validPassword (password) {
  return password === this.password;
},

/** this function hashes new user password */
User.prototype.setPassword = function setPassword (password) {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
},

/** this function generate login token for user */
User.prototype.generateJWT = function generateJWT () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this.id,
    exp: parseInt(expirationDate.getTime() / 1000, 10)
  }, 'secret')
},

User.getJWT = function getJWT () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this.id,
    exp: parseInt(expirationDate.getTime() / 1000, 10)
  }, 'secret')
},

/** this is function convert auth details to JSON format */
User.prototype.ToAuthJSON = function ToAuthJSON () {
  return {
    _id: this.id,
    email: this.email,
    token: User.getJWT()
  }
}

User.associate = function(models) {
  // associations can be defined here
};

module.exports = User;