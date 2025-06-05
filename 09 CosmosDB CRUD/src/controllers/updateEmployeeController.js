const { StatusCodes } = require("http-status-codes");
const { handleSuccess, handleFailure } = require("../utils/responseHandler");
const { updateEmployeeService } = require("../services/updateEmployeeService");

const updateEmployee = async (req, res) => {
    try {
        if(Object.keys(req.body).length >= 2) {
            const response = await updateEmployeeService(req.body);
            if(response.success) {
                handleSuccess(res, StatusCodes.OK, response.message);
            } else {
                handleFailure(res, response.code, response.message);
            }
        } else {
            handleFailure(res, StatusCodes.BAD_REQUEST, "Atleast one property required");
        }
    } catch (error) {        
        handleFailure(res, StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
    
}

module.exports = {updateEmployee};