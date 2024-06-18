const logger = require('../utils/logger');
const NotFoundError = require('../errors/NotFoundError');

// Middleware to handle 404 Not Found
const notFoundHandler = (req, res, next) => {
  const error = new NotFoundError(`Not Found - ${req.originalUrl}`);
  next(error);
};

// General error handler middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  logger.error(`${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(statusCode).json({
    message: statusCode === 500 ? 'Internal Server Error' : err.message,
    // Optionally include stack trace in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
