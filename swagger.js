require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: '2024 Template API Services',
    description: 'API Template service for future projects.  Uses HTTPS, Testing, Logging, and some other things.',
  },
  host: `${process.env.HOST}:${process.env.HTTPS_PORT}`,
  schemes: ['https'],
};

const outputFile = './src/swagger-output.json'
const endpointsFiles = ['./src/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc);
