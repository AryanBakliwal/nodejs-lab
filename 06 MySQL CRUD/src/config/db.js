const { Sequelize } = require('sequelize');
require('dotenv').config({path: '../.env'});

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_SERVER,
    dialect: 'mysql'
});

module.exports = sequelize;