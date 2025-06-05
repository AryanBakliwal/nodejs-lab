const express = require('express');
const { cacheMiddleware } = require('../middlewares/cacheMiddleware');
const { fetchController } = require('../controllers/fetchController');
const router = express.Router();

router.get('/fetch/:username', cacheMiddleware, fetchController);

module.exports = {router};