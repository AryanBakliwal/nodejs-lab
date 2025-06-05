const redis = require('redis');
require('dotenv').config({path: './src/config/env/.env'});

const con = redis.createClient({
    url: process.env.REDIS_HOST,
    password: process.env.REDIS_KEY
});

module.exports = {con};