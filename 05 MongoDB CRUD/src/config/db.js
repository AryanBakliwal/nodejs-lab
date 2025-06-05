const mongoose = require('mongoose');
require("dotenv").config({path: "../.env"});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CON_STRING)
        console.log("Connected to MongoDB.");
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;