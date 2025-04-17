// db/models/history.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('History', {
    user_id: DataTypes.INTEGER,
    amount_in_naria: DataTypes.FLOAT,
    amount_received: DataTypes.FLOAT,
    currency: DataTypes.STRING,
    rate: DataTypes.FLOAT,
  }, {
    timestamps: true,
    underscored: true,
  });
};
