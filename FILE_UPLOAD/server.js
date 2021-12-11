const app = require('./app.js');

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Backend API is running on ${PORT}`);
});
