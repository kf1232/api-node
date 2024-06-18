const sequelize = require('../config/database');
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
