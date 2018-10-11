'use strict';
module.exports = (sequelize, DataTypes) => {
  const StarredContact = sequelize.define('StarredContact', {
    user_id: DataTypes.INTEGER,
    contact_id: DataTypes.INTEGER
  }, {});
  StarredContact.associate = function(models) {
    // associations can be defined here
  };
  return StarredContact;
};