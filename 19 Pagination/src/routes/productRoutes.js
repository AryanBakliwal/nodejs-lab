const express = require('express');
const { fetchProducts } = require('../controllers/fetchProducts');
const productRouter = express.Router();

productRouter.get('/fetch', fetchProducts);

module.exports = {productRouter};