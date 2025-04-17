// db/models/user.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('User', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    passport: DataTypes.STRING,
    logs: DataTypes.TEXT,
    status: DataTypes.STRING,
    last_login: DataTypes.DATE,
  }, {
    timestamps: true,
    underscored: true,
  });
};
