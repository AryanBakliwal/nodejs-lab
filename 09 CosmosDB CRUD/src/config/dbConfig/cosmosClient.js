require("dotenv").config({ path: "./src/config/env/.env" });
const { CosmosClient } = require("@azure/cosmos");

async function getClient() {
    return new CosmosClient({
        endpoint: process.env.COSMOSDB_URI,
        key: process.env.COSMOSDB_KEY,
    });
}

module.exports = { getClient };
