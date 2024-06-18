const sequelize = require('../config/database-mysql');
//const sequelize_mssql = require('../config/database-mssql');
const ItemModel = require('./itemModel');

const Item = ItemModel(sequelize, require('sequelize'));

const initializeDatabase = async () => {
  await sequelize.sync({ force: true });
};

module.exports = {
  sequelize,
  Item,
  initializeDatabase,
};
