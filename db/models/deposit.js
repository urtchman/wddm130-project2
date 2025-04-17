// db/models/deposit.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Deposit', {
    user_id: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    trans_ref: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    timestamps: true,
    underscored: true,
  });
};
