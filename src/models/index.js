require('dotenv').config();
const { Sequelize } = require('sequelize');
const ItemModel = require('./itemModel');

const isDevelopment = process.env.NODE_ENV === 'development';

const sequelize = new Sequelize(
  isDevelopment ? 'sqlite::memory:' : process.env.DB_URL,
  {
    dialect: isDevelopment ? 'sqlite' : 'mysql',
    logging: false,
  }
);

const Item = ItemModel(sequelize, Sequelize);

const seedDatabase = async () => {
  if (isDevelopment) {
    const seedItems = require('../seeders/seedItems');
    await seedItems();
  }
};

module.exports = {
  sequelize,
  Item,
  seedDatabase,
};
