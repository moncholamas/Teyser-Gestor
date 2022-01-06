//const fs = require('fs');
require('dotenv').config()

module.exports = {
  "development" : {
    "username" : process.env.USER_NAME,
    "password" : process.env.PASSWORD,
    "database" : process.env.DATA_BASE,
    "host" : process.env.HOST,
    "dialect" : "postgres",
    "logging": false
  },
  "test": {
    "username": "",
    "password": null,
    "database": "",
    "host": "",
    "dialect": "postgres"
  },
  "production": {
    "username": "",
    "password": null,
    "database": "",
    "host": "",
    "dialect": "postgres"
  }
}
