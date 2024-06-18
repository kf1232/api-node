const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: '2024 Template API Services',
    description: 'API Template service for future projects.  Uses HTTPS, Testing, Logging, and some other things.',
  },
  host: 'localhost:3000',
  schemes: ['https','http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/*.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app');
});
