class CustomAPIError extends Error {
  constructor(message, ststusCode) {
    super(message);
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

module.exports = { createCustomError, CustomAPIError };
