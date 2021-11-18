const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const mongoose = require('mongoose');
const { CustomAPIError } = require('./error/coustom-error');
const async_errors = require('express-async-errors');

const Product = require('./models/Product');
const jsonProducts = require('./products.json');

class App {
  constructor() {
    // express
    this.app = express();
    // dotenv
    dotenv.config();
    //error
    async_errors;
    // db connections
    this.dbConnection();
    // 미들웨어
    this.setMiddleWare();
    // routing
    this.getRouting();
    // 정적파일
    this.setStatic();
    // 404
    this.status404();
    // 500
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
      .then(async () => {
        const count = await Product.find({});
        if (count.length == 0) {
          await Product.deleteMany();
          await Product.create(jsonProducts);
          console.log('create!');
        }
        console.log('success!');
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
    this.app.get('/', (req, res, _) => {
      res.send(
        '<h1>Store API</h1><a href="/api/v1/products">Products route</a>',
      );
    });
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

      res.status(500).json({ msg: `Somthing went wrong, please try again` });
    });
  }
}

module.exports = new App().app;
