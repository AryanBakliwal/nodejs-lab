const express = require('express');
require('dotenv').config({path: './src/config/env/.env'});
const cookieParser = require('cookie-parser');
const swaggerUI = require('swagger-ui-express');
// const swaggerSpec = require('./swagger/swagger.js');
const { employeeRouter } = require('./routes/employeeRoutes.js');
const { init } = require('./config/dbConfig/cosmosContainer.js');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
const outputfile = require("./swagger/swagger-output.json");
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(outputfile));

(async () => {
    try {
        await init();
        console.log("Connected to CosmosDB.");
        app.get('/', (req, res) => {
            res.send('Welcome to Cosmos CRUD API.')
        })
        app.use('/api/employee', employeeRouter);
        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
})();