const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const mongoose = require('mongoose');

class App {
  constructor() {
    this.app = express();

    dotenv.config();

    this.dbConnection();

    this.setMiddleWare();

    this.getRouting();
  }

  dbConnection() {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log(
          'Connection has been established successfully. host : ' +
            mongoose.connection.host,
        );
      })
      // DB 연결시 바로 Admin을 만들 수 있다.
      .then()
      .catch((err) => {
        console.error('Unable to connect to the database' + err);
        process.exit(1);
      });
  }

  setMiddleWare() {
    // 미들웨어 세팅
    this.app.use(express.json());
    this.app.use(logger('tiny'));
  }

  getRouting() {
    this.app.use('/', require('./controller'));
  }
}

module.exports = new App().app;
