const express = require("express");
require("dotenv").config({path: "./src/.env"});
const sequelize = require("./config/db.js");
const userRouter = require("./routes/user-routes.js");

const app = express();

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.use(express.json());

app.use('/api/user', userRouter);


app.listen(process.env.PORT, () => {
    console.log("Server listening on port ", process.env.PORT);
})
