const { StatusCodes } = require("http-status-codes");
const { handleSuccess, handleFailure } = require("../utils/responseHandler");

const authorize = async (req, res, next) => {
    if((req.designation == 'Associate' || req.role == 'Admin') && req.url == '/update') {
        next();
        return;
    }else if(req.role == 'Admin' && req.url == '/delete') {
        next();
        return;
    }
    handleFailure(res, StatusCodes.UNAUTHORIZED, "Not authorized");
}

module.exports = {authorize};