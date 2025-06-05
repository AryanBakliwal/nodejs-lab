const express = require('express');
require('dotenv').config({path: './src/.env'})
const cookieParser = require('cookie-parser');
const connectToDB = require('./config/db.js');
const UserRouter = require('./routes/user-routes.js');
const logger = require('./middlewares/log.js');
const app = express();


app.use(express.json());
app.use(cookieParser());

connectToDB();

// routes

app.use(logger);

app.get('/', (req, res) => {
    res.send("Welcome! Signup or Login to continue...")
})

app.use('/api/user', UserRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log("Server listening on port ", process.env.PORT);
})