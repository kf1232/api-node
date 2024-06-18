require('dotenv').config();
const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const app = express();
const port = process.env.PORT || 3000;
const httpsPort = process.env.HTTPS_PORT || 3443;
const itemRoutes = require('./routes/itemRoutes');
const { sequelize, initializeDatabase } = require('./models');
const seedDatabase = require('./seeders/seedItems');
const requestLogger = require('./middlewares/requestLogger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

// SSL Certificates
const sslOptions = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem'),
};

app.use(express.json());
app.use(requestLogger);

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.secure) {
    return next();
  }
  res.redirect(`https://${req.headers.host.split(':')[0]}:${httpsPort}${req.url}`);
});

app.use('/items', itemRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Catch-all for 404 Not Found
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
