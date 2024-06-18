const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const itemRoutes = require('./routes/itemRoutes');
const { sequelize } = require('./models');

app.use(express.json());
app.use('/items', itemRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

module.exports = app;
