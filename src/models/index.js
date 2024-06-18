const { Sequelize } = require('sequelize');
const ItemModel = require('./itemModel');
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'mysql', // change this according to your database
});

const Item = ItemModel(sequelize, Sequelize);

module.exports = {
  sequelize,
  Item,
};
