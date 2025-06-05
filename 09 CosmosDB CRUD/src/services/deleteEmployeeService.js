const { StatusCodes } = require("http-status-codes");
const { fetchEmployeeByHrmId } = require("../repository/fetchUserRepository");
const { deleteEmployeeInDB } = require("../repository/deleteUserRepository");

const deleteEmployeeService = async (empHrmId) => {
    try {
        const [emp] = await fetchEmployeeByHrmId(empHrmId);
        if(!emp) {
            return {success: false, message: "HRM ID doesn't exist", code: StatusCodes.NOT_FOUND};
        }
        
        const {msg} = await deleteEmployeeInDB(emp.id);
        return {success: true, message: msg};
    } catch (error) {
        return {success: false, message: error};
    }
}

module.exports = {deleteEmployeeService};