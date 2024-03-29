const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const mongoose = require('mongoose');
const { CustomAPIError } = require('./error/custom-error');
const { StatusCodes } = require('http-status-codes');
const async_errors = require('express-async-errors');

class App {
  constructor() {
    this.app = express();

    dotenv.config();

    // async-error-handler
    async_errors;
    // DB_Connect
    this.dbConnection();
    // middleware
    this.setMiddleWare();
    // routing
    this.getRouting();
    // ststic
    this.setStatic();
    //404
    this.status404();
    //500
    this.errorHandler();
  }

  dbConnection() {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log(
          `Connection has been established successfully. host: ${mongoose.connection.host}`,
        );
      })
      .catch((err) => {
        console.error(`Unable to connect to the database ${err}`);
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

  setStatic() {
    this.app.use(express.static('./public'));
  }

  status404() {
    this.app.use((req, res, _) => {
      res.status(404).send('Route does not exist!');
    });
  }

  errorHandler() {
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
