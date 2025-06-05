const express = require('express');
const { productRouter } = require('./routes/productRoutes');
require('dotenv').config({path: './src/config/env/.env'});

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/products', productRouter);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}...`);
})
