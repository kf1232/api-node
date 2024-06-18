require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const https = require('https');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-doc.json');

const { sequelize, initializeDatabase } = require('./models');
const seedDatabase = require('./seeders/seedItems');
const requestLogger = require('./middlewares/requestLogger');
const redirectHttpToHttps = require('./middlewares/redirectHttpToHttps');

const app = express()

// Env Variables ==============================================================
const { sslOptions } = require('./env')

// Route Imports ==============================================================
const itemRoutes = require('./routes/itemRoutes');

// Middleware =================================================================
app.use(cors())
app.use(express.json());
app.use(requestLogger);

// Docs Page ==================================================================
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Routes =====================================================================
app.use('/items', itemRoutes);

app.use(redirectHttpToHttps);

sequelize.sync().then(async () => {
    if (process.env.NODE_ENV === 'development') {
        await initializeDatabase();
        await seedDatabase();
    }

    // Start HTTP server
    http.createServer(app).listen(process.env.PORT, () => {
        console.log(`HTTP Server is running on http://${process.env.HOST}:${process.env.PORT}`);
    });

    // Start HTTPS server
    https.createServer(sslOptions, app).listen(process.env.HTTPS_PORT, () => {
        console.log(`HTTPS Server is running on https://${process.env.HOST}:${process.env.HTTPS_PORT}`);
    });
});

module.exports = app;
