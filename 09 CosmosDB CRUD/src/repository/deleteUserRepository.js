const {getContainer} = require('../config/dbConfig/cosmosContainer.js');

const deleteEmployeeInDB = async (employeeId) => {
    const c = await getContainer('employees')
    
    try {
        const { statusCode } = await c.item(employeeId, employeeId).delete();
        return {msg: `Employee deleted: ${statusCode}`};
    } catch (error) {
        return error;
    }
}

module.exports = {deleteEmployeeInDB};