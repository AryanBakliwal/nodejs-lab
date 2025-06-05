const express = require('express');
require('dotenv').config({path: './src/config/env/.env'});
const { projectRouter } = require('./routes/projectRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/project', projectRouter);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}...`);
});