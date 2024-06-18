require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js'];

const doc = {
  info: {
    title: 'My API',
    description: 'API documentation',
  },
  host: `localhost:${process.env.PORT || 3000}`,
  schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
