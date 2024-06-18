const winston = require('winston');
require('winston-daily-rotate-file');

const logDirectory = './logs';

// Ensure log directory exists
const fs = require('fs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: `${logDirectory}/%DATE%-actions.log`,
  datePattern: 'YYYY-MM-DD',
  level: 'info',
});

const errorRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: `${logDirectory}/%DATE%-error.log`,
  datePattern: 'YYYY-MM-DD',
  level: 'error',
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(
      (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    dailyRotateFileTransport,
    errorRotateFileTransport,
  ],
});

module.exports = logger;
