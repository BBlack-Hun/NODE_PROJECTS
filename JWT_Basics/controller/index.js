const { Router } = require('express');
const app = Router();

app.use('v1/login', require('./login'));

module.exports = app;
