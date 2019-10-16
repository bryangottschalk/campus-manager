//  Establish a connection to Postgres database

const chalk = require('chalk');
const Sequelize = require('sequelize');
const pkg = require('../../package.json');

// Check to see if the node environment is 'test', in which case we'll use the test database. Otherwise, the app connects with the normal database.
const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}-test` : pkg.name;
console.log(chalk.yellow(`Opening database connection to ${dbName}`));

const db = new Sequelize(`postgres://localhost:5432/${dbName}`, {
  logging: false,
});

module.exports = db;
