const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const mongoose = require('mongoose');
const { CustomAPIError } = require('./error/coustom-error');

class App {
  constructor() {
    this.app = express();

    // 환경변수 설정
    dotenv.config();

    // db 컨넥션
    this.dbConnection();

    // 미들웨어 셋팅
    this.setMiddleWare();

    // 라우팅
    this.getRouting();

    // 정적 위치
    this.setStatic();

    // 404 에러 handler
    this.status404();

    // 500 에러 handler
    this.errorHandler();
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
      res.status(500).json({ msg: `Somthing went wrong, please try again` });
    });
  }
}

module.exports = new App().app;
