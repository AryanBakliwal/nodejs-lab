const { StatusCodes } = require('http-status-codes');
const {loginEmployeeValidationSchema} = require('../../schemaValidation/loginEmployeeSchema');
const { handleFailure } = require('../../utils/responseHandler');

const loginEmployeeValidation = (req, res, next) => {
    const {error} = loginEmployeeValidationSchema.validate(req.body);
    if (error) {
        handleFailure(res, StatusCodes.BAD_REQUEST, error.details[0].message);
        return;
    }
    next();
}

module.exports = {loginEmployeeValidation};