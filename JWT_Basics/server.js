const app = require('./app.js');

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Bacnkend is running on ${PORT}`);
});
