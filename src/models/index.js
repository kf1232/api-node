require('dotenv').config();
const { Sequelize } = require('sequelize');
const ItemModel = require('./itemModel');

const isDevelopment = process.env.NODE_ENV === 'development';

const sequelize = new Sequelize(
  isDevelopment ? 'sqlite::memory:' : process.env.DB_URL,
  {
    dialect: isDevelopment ? 'sqlite' : 'mysql', // change this according to your database
    logging: false, // Disable logging or use a custom logger function if desired
  }
);

const Item = ItemModel(sequelize, Sequelize);

module.exports = {
  sequelize,
  Item,
};
