const { Sequelize } = require('sequelize');

const config = require('./config');

module.exports = new Sequelize(
  config.db_name,
  config.db_user,
  config.db_password,
  {
    dialect: "postgres",
    host: config.db_host,
    port: config.db_port
  }
);
