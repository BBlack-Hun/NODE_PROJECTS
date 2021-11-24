const asyncWrapper = require('../../middleWare/async');
const jwt = require('jsonwebtoken');

exports.get_dashboard = asyncWrapper(async (req, res) => {
  const authHeader = req.headers.authorization;
  //   console.log(authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomApiError('No token provided', 401);
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomApiError('Not authorized to access this route', 401);
  }
});
