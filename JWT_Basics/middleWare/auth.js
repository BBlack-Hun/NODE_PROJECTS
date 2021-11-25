const jwt = require('jsonwebtoken');
const CustomApiError = require('../error/coustom-error');

const authenticationMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //   console.log(authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomApiError('No token provided', 401);
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomApiError('Not authorized to access this route', 401);
  }
};

module.exports = authenticationMiddleWare;
