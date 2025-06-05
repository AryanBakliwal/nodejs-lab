const express = require('express');
const { con } = require('./config/redisConfig/redisconfig');
const { router } = require('./routes/routes');
require('dotenv').config({path: './src/config/env/.env'});

const app = express();
const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await con.connect();
        console.log("Connected to Redis: ", con.isOpen);

        app.use('/api', router);

        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}...`);
        })
    } catch (error) {
        console.log(error);
    }
})();

