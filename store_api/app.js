const express = require('express');
const dotenv = require('dotenv');
const logger = require('margan');
const mongoose = require('mongoose');

class App {
  constructor() {
    // express
    this.app = express();
    // dotenv
    dotenv.config();
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
      .connect(process.env.MONGO_URL)
      .then(() => {
        `Connection has been established successfully. host: ${mongoose.connection.host}`;
      })
      .catch((err) => {
        console.error(`Unable to connect to the database ${err}`);
        process.exit(1);
      });
  }
}

module.exports = new App.app();
