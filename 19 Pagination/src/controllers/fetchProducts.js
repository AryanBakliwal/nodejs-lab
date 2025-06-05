const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, '../helpers/data.json');
const products = JSON.parse(fs.readFileSync(filePath));

const fetchProducts = (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = products.slice(startIndex, endIndex);

    res.json(result);
}

module.exports = {fetchProducts};