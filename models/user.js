'use strict';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
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
  password: DataTypes.STRING,
  salt: DataTypes.STRING
}, {});

/** creating a relationship between user and contact one-many relation */
User.hasMany(Contact);

/** this function hashes new user password */
User.prototype.setPassword = function setPassword (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

User.associate = function(models) {
  // associations can be defined here
}

module.exports = User;