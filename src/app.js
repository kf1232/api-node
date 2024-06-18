require('dotenv').config();
const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const config = require('config'); // Use the config package for configuration management

const app = express();
const port = config.get('app.port');
const httpsPort = config.get('app.httpsPort');

const itemRoutes = require('./routes/itemRoutes');
const { sequelize, initializeDatabase } = require('./models');
const seedDatabase = require('./seeders/seedItems');
const requestLogger = require('./middlewares/requestLogger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');
const redirectHttpToHttps = require('./middlewares/redirectHttpToHttps');

// SSL Certificates
const sslOptions = {
  key: fs.readFileSync(config.get('ssl.key')),
  cert: fs.readFileSync(config.get('ssl.cert')),
};

app.use(express.json());
app.use(requestLogger);
app.use(redirectHttpToHttps);

app.use('/items', itemRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(notFoundHandler);
app.use(errorHandler);

sequelize.sync().then(async () => {
  if (process.env.NODE_ENV === 'development') {
    await initializeDatabase();
    await seedDatabase();
  }

  // Start HTTP server
  http.createServer(app).listen(port, () => {
    console.log(`HTTP Server is running on http://localhost:${port}`);
  });

  // Start HTTPS server
  https.createServer(sslOptions, app).listen(httpsPort, () => {
    console.log(`HTTPS Server is running on https://localhost:${httpsPort}`);
  });
});

module.exports = app;
