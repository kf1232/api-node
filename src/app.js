const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const app = express();
const port = process.env.PORT || 3000;
const itemRoutes = require('./routes/itemRoutes');
const { sequelize, initializeDatabase } = require('./models');
const seedDatabase = require('./seeders/seedItems');
const requestLogger = require('./middlewares/requestLogger');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use(requestLogger);

app.use('/items', itemRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errorHandler);

sequelize.sync().then(async () => {
  if (process.env.NODE_ENV === 'development') {
    await initializeDatabase();
    await seedDatabase();
  }
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} in ${process.env.NODE_ENV} mode`);
  });
});

module.exports = app;
