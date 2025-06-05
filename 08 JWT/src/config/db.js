const mongoose = require('mongoose');
require('dotenv').config({path: './src/.env'});

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database!");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToDB;