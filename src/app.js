require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const itemRoutes = require('./routes/itemRoutes');
const { sequelize } = require('./models');
const logger = require('./utils/logger');

app.use(express.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use('/items', itemRoutes);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port} in ${process.env.NODE_ENV} mode`);
  });
});

module.exports = app;
