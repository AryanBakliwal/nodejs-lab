const { insertEmployeeInDB } = require("../repository/createUserRepository");
const { fetchEmployeeByHrmId, fetchEmployeeByctMailId, fetchAllEmployees } = require("../repository/fetchUserRepository");

const createEmployeeService = async (empData) => {
    try {
        const em1 = await fetchEmployeeByHrmId(empData.hrmId);
        
        const em2 = await fetchEmployeeByctMailId(empData.ctMailId);

        if(em1.length > 0) {
            return {success: false, message: "HRM ID already exists"};
        }

        if(em2.length > 0) {
            return {success: false, message: "CT Mail ID already exists"};
        }

        const {msg} = await insertEmployeeInDB(empData);
        if(msg) {
            return {success: true, message: msg};
        } else {
            return {success: false, message: "Falied to insert data!"};
        }
    } catch (error) {
        return {success: false, message: error};
    }
}

module.exports = {createEmployeeService};