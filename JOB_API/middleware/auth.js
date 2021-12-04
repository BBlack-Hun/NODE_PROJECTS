const User = require('../models/User');
const jwt = require('jsonwebtoken');
const UnauthenticatedError = require('../error/unauthenticated');

const authenticationMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //   console.log(authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid');
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // 아래 코드를 위와 같이 사용할 수 있다. -> 이유는 정리가 되지 않음 ^^
    const user = User.findById(payload.id).select('-password');
    req.user = user;

    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

module.exports = authenticationMiddleWare;
