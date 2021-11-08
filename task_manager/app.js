const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

class App {
  constructor() {
    this.app = express();

    dotenv.config();

    this.dbConnection();

    this.getRouting();
  }

  dbConnection() {}

  getRouting() {
    this.app.use('/', require('./controller'));
  }
}

module.exports = new App().app;
