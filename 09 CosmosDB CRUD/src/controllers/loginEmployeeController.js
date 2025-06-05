const { StatusCodes } = require("http-status-codes");
const { loginEmployeeService } = require("../services/loginEmployeeService");
const { handleSuccess, handleFailure } = require("../utils/responseHandler");
const { response } = require("express");

const loginEmployee = async (req, res, next) => {
    try {
        const response = await loginEmployeeService(req.body);
        if(response.success) {
            req.hrmId = response.hrmId;
            req.designation = response.designation;
            req.role = response.role;
            next();
        } else {
            handleFailure(res, response.code, response.message);
        }
    } catch (error) {
        handleFailure(res, StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
    
}

module.exports = {loginEmployee};