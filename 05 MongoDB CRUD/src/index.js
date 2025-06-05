const express = require("express");
require("dotenv").config({path: "./src/.env"});
const connectDB = require("./config/db.js");
const userRouter = require("./routes/user-routes.js");

const app = express();

connectDB();

app.use(express.json());

app.use('/api/user', userRouter);

app.listen(process.env.PORT, () => {
    console.log("Server listening on port ", process.env.PORT);
})
