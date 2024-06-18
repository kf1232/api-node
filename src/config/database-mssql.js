require('dotenv').config();
const { Sequelize } = require('sequelize');

const config = {
  development: {
    dialect: 'sqlite',
    storage: ':memory:',
  },
  production: {
    url: process.env.DB_URL,
    dialect: 'mssql',
  },
};

const env = process.env.NODE_ENV || 'development';
const sequelize = env === 'development'
  ? new Sequelize(config.development)
  : new Sequelize(config.production.url, {
      dialect: config.production.dialect,
      logging: false,
      dialectOptions: {
        options: {
          encrypt: true,
        },
      },
    });

module.exports = sequelize;
