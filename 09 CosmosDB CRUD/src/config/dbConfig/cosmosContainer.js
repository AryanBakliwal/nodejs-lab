require("dotenv").config({ path: "./src/config/env/.env" });
const { getClient } = require("./cosmosClient");

const containers = {}

async function init() {
    containers["employees"] = (await getClient()).database(process.env.COSMOSDB_DATABASE).container("Employees");
}

async function getContainer(cId) {
    return containers[cId];
}

module.exports = { init, getContainer };
