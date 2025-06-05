const { StatusCodes } = require("http-status-codes");
const { handleSuccess, handleFailure } = require("../utils/responseHandler");
const { deleteEmployeeService } = require("../services/deleteEmployeeService");

const deleteEmployee = async (req, res) => {
    try {
        const response = await deleteEmployeeService(req.body.hrmId);
        
        if(response.success) {
            handleSuccess(res, StatusCodes.OK, response.message)
        } else {
            handleFailure(res, response.code, response.message);
        }
    } catch (error) {
        handleFailure(res, StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
}
module.exports = {deleteEmployee};