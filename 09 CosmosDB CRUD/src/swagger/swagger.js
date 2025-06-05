// const swaggerJSDoc = require('swagger-jsdoc');
const swaggerautogen = require("swagger-autogen");

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'CosmosDB CRUD',
        version: '1.0.0',
        description: 'CosmosDB CRUD REST API',
    },
    tags: [
        {name: 'GET'},
        {name: 'POST'}
    ],
    host: 'localhost:8080',
};

// const options = {
//     swaggerDefinition,
//     apis: ['./src/routes/*.js'], // Path to the API routes in our Node.js application
// };
// const swaggerSpec = swaggerJSDoc(options);
// module.exports = swaggerSpec;

const outputFile = './swagger-output.json';
const routes = [ './src/routes/employeeRoutes.js' ];
swaggerautogen(outputFile, routes, swaggerDefinition);