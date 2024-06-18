const config = require('config');
const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = config.get('db');

const sequelize = env === 'development'
    ? new Sequelize(sequelizeConfig)
    : new Sequelize(sequelizeConfig.url, {
        dialect: sequelizeConfig.dialect,
        logging: sequelizeConfig.logging
    });

module.exports = sequelize;
