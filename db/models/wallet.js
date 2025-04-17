// db/models/wallet.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Wallet', {
    user_id: DataTypes.INTEGER,
    naira: DataTypes.FLOAT,
    cad: DataTypes.FLOAT,
    usd: DataTypes.FLOAT,
    gbp: DataTypes.FLOAT,
    euro: DataTypes.FLOAT,
  }, {
    timestamps: true,
    underscored: true,
  });
};
