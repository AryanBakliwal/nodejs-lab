const path = require('node:path');
const fs = require('node:fs');
const queriesFilePath = path.join(__dirname, "../helpers/queries.json");
const queries = JSON.parse(fs.readFileSync(queriesFilePath, 'utf8')).employees;
const {getContainer} = require('../config/dbConfig/cosmosContainer');

const fetchAllEmployees = async () => {
    const c = await getContainer('employees')
    const q = {
        query: queries.getAll,
    };
    try {
        const { resources } = await c.items.query(q).fetchAll();
        return resources;
    } catch (error) {
        return error;
    }
}

const fetchEmployeeByHrmId = async(hrmId) => {
    const c = await getContainer('employees')
    const q = {
        query: queries.getByHrmId,
        parameters: [{
            name: '@hrmId',
            value: hrmId,
        }],
    };
    try {
        const { resources } = await c.items.query(q).fetchAll();        
        return resources;
    } catch (error) {
        return error;
    }
}

const fetchEmployeeByctMailId = async(ctMailId) => {
    const c = await getContainer('employees')
    const q = {
        query: queries.getByCtMailId,
        parameters: [{
            name: '@ctMailId',
            value: ctMailId,
        }],
    };
    try {
        const { resources } = await c.items.query(q).fetchAll();
        return resources;
    } catch (error) {
        return error;
    }
}

module.exports = {fetchAllEmployees, fetchEmployeeByHrmId, fetchEmployeeByctMailId}