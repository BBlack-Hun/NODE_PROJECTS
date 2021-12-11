const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const dotenv = require('dotenv');
const async_errors = require('express-async-errors');
const { StatusCodes } = require('http-status-codes');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

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
    //swagger
    this.setSwagger();
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
          `Connection has been established successfully. host: ${mongoose.connection.host}`,
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
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(xss());
    this.app.set('trust proxy', 1);
    this.app.use(
      rateLimiter({
        windowMs: 15 * 60 * 1000, // 15minute
        max: 1000, // limit each IP to 100 requests per windowMs
      }),
    );
  }

  setStatic() {
    this.app.get('/', (req, res) => {
      res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
    });
  }

  setSwagger() {
    this.app.use(
      '/api-docs',
      swaggerUI.serve,
      swaggerUI.setup(swaggerDocument),
    );
  }

  getRouting() {
    this.app.use('/api', require('./controller'));
  }

  setStatus404() {
    this.app.use((req, res, _) => {
      res.status(404).send('Route does not exist!');
    });
  }

  setErrorHandler() {
    this.app.use((err, req, res, _) => {
      let customError = {
        // set default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'SomeTihing went wrong try again later',
      };

      // if (err instanceof CustomAPIError) {
      //   return res.status(err.statusCode).json({ msg: err.message });
      // }
      if (err.name === 'ValidationError') {
        console.log(Object.values(err.errors));
        customError.msg = Object.values(err.errors)
          .map((item) => item.message)
          .join(',');
        customError.statusCode = 400;
      }
      if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
          err.keyValue,
        )} field, please choose another value`;
        customError.statusCode = 400;
      }
      if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`;
        customError.statusCode = 404;
      }
      // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      //   err: err,
      //   msg: `Somthing went wrong, please try again`,
      // });
      res.status(customError.statusCode).json({ msg: customError.msg });
    });
  }
}

module.exports = new App().app;
