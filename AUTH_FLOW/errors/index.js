const badRequestError = require('./bad-request');
const { createCustomError, CustomAPIError } = require('./custom-error');
const notFoundError = require('./notfounderror');
const unAuthenticatedError = require('./unauthenticated');

module.exports = {
  createCustomError,
  CustomAPIError,
  badRequestError,
  notFoundError,
  unAuthenticatedError,
};
