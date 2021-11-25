const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const dotenv = require('dotenv');
const async_errors = require('express-async-errors');
const { CustomAPIError } = require('./error/custom-error');
const { StatusCodes } = require('http-stsuts-codes');

class App {
  constructor() {
    this.app = express();

    dotenv.config();

    // async-express-errors
    async_errors;

    // DB_CONNECT
    this.db_connection();
    // MIDDLEWARE
    this.setMiddleWare();
    // ROUTING
    this.getRouting();
    // STATIC
    this.setStatic();
    // 404
    this.setStatus404();
    // 500
    this.setErrorHandler();
  }

  db_connection() {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log(
          `Connection has been established successfully. host: ${mongoose.connect.host}`,
        );
      })
      .catch((err) => {
        console.error(`Unable to connect to the datebase ${err}`);
        process.exit(1);
      });
  }

  setMiddleWare() {
    this.app.use(express.json());
    this.app.use(logger('tiny'));
  }

  getRouting() {
    this.app.use('/api', require('./controller'));
  }

  setStatic() {}

  setStatus404() {
    this.app.use((req, res, _) => {
      res.status(404).send('Route does not exist!');
    });
  }

  setErrorHandler() {
    this.app.use((err, req, res, _) => {
      if (err instanceof CustomAPIError) {
        return res.status(err.ststusCode).json({ msg: err.message });
      }

      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: `Somthing went wrong, please try again` });
    });
  }
}

module.exports = new App().app;
