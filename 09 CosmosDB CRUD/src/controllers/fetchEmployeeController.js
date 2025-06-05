const { StatusCodes } = require("http-status-codes");
const { fetchEmployeeService } = require("../services/fetchEmployeeService");
const { handleSuccess, handleFailure } = require("../utils/responseHandler");

const fetchEmployee = async (req, res) => {
    var response;
    try {
        if(req.params.hrmId) {
            response = await fetchEmployeeService(req.params.hrmId);
        } else {
            response = await fetchEmployeeService();
        }
        if(response.success) {
            handleSuccess(res, StatusCodes.OK, response.e);
            return;
        }
        handleFailure(res, StatusCodes.OK, response.message);
        // 
        // handleSuccess(res, StatusCodes.OK, req.hrmId);
    } catch (error) {
        handleFailure(res, StatusCodes.INTERNAL_SERVER_ERROR, response.message);
    }
}

module.exports = {fetchEmployee};