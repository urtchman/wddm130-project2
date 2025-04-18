// db/models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../../src/config/dbConfig').default;
console.log(dbConfig.database)
// Environment variables for DB connection
const sequelize = new Sequelize(
  dbConfig.database, // database
  dbConfig.user, // user
  dbConfig.password, // password
  {
    host: dbConfig.host,
    dialect: 'postgres',
    port: dbConfig.dbport,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false, // Set true to see SQL logs
  }
); 

// Import models
const User = require('./user')(sequelize);
const Deposit = require('./deposit')(sequelize);
const Wallet = require('./wallet')(sequelize);
const History = require('./history')(sequelize);
 

// Associations
User.hasOne(Wallet, { foreignKey: 'user_id' });
User.hasMany(Deposit, { foreignKey: 'user_id' });
User.hasMany(History, { foreignKey: 'user_id' });

Wallet.belongsTo(User, { foreignKey: 'user_id' });
Deposit.belongsTo(User, { foreignKey: 'user_id' });
History.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  Wallet,
  Deposit,
  History
};
