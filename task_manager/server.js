const app = require('./app.js');

PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('running! ' + PORT);
});
