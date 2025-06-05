const { StatusCodes } = require("http-status-codes");
const { fetchEmployeeByHrmId } = require("../repository/fetchUserRepository");
const { handleSuccess } = require("../utils/responseHandler");
const { updateEmployeeInDB } = require("../repository/updateUserRepository");

const updateEmployeeService = async (empData) => {
    try {
        const [emp] = await fetchEmployeeByHrmId(empData.hrmId);
        if(!emp) {
            return {success: false, message: "HRM ID doesn't exist", code: StatusCodes.NOT_FOUND};
        }
        const {msg} = await updateEmployeeInDB(emp, empData);
        return {success: true, message: msg};
    } catch (error) {
        return {success: false, message: error};
    }
}

module.exports = {updateEmployeeService};