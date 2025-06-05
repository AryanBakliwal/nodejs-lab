const { StatusCodes } = require("http-status-codes");
const { handleFailure, handleSuccess } = require("../utils/responseHandler");
const { createEmployeeService } = require("../services/createEmployeeService");

const createEmployee = async (req, res) => {
    try {
        const response = await createEmployeeService(req.body);
        if(response.success) {
            handleSuccess(res, StatusCodes.OK, response.message);
        } else {
            handleFailure(res, StatusCodes.BAD_REQUEST, response.message);
        }
    } catch (error) {
        handleFailure(res, StatusCodes.BAD_REQUEST, error)
    }
}

module.exports = {createEmployee};