const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const mongoose = require('mongoose');
const { CustomAPIError } = require('./error/coustom-error');
const async_errors = require('express-async-errors');

class App {
  constructor() {
    this.app = express();

    dotenv.config();

    // async-error-handler
    async_errors;
    // DB_Connect
  }
}

module.exports = new App().app;
