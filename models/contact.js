'use strict';
const DataTypes = require('sequelize');
const User = require('../models/user');
const sequelize = require('../config/db.config');

const Contact = sequelize.define('Contact', {
  fullname: DataTypes.STRING,
  address: DataTypes.STRING,
  telephone: DataTypes.STRING,
  email: DataTypes.STRING,
  user_id: {
    type: DataTypes.INTEGER,
    reference: {
      model: User,
      key: 'id'
    }
  }
}, {});

Contact.associate = function(models) {
  // associations can be defined here
};

module.exports = Contact;