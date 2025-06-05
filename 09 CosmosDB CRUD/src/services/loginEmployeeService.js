const { StatusCodes } = require("http-status-codes");
const { fetchEmployeeByctMailId } = require("../repository/fetchUserRepository");
const { comparePassword } = require("../utils/password");


const loginEmployeeService = async (empData) => {
    try {
        const em = await fetchEmployeeByctMailId(empData.ctMailId);
        if(em.length == 0) {
            return {success: false, message: "CT Mail ID doesn't exist", code: StatusCodes.NOT_FOUND};
        }
        comparePassword(empData.password, em[0].password)
        if(!comparePassword(empData.password, em[0].password)) {
            return {success: false, message: "Wrong password", code: StatusCodes.UNAUTHORIZED};
        }
        return {success: true, hrmId: em[0].hrmId, designation: em[0].designation, role: em[0].role};
    } catch (error) {
        return {success: false, message: error};
    }
}

module.exports = {loginEmployeeService};