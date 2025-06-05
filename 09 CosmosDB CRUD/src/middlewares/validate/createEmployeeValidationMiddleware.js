const { StatusCodes } = require('http-status-codes');
const {createEmployeeValidationSchema} = require('../../schemaValidation/createEmployeeSchema');
const { handleFailure } = require('../../utils/responseHandler');

const createEmployeeValidation = (req, res, next) => {
    const {error} = createEmployeeValidationSchema.validate(req.body);
    if (error) {
        handleFailure(res, StatusCodes.BAD_REQUEST, error.details[0].message);
        return;
    }
    next();
}

module.exports = {createEmployeeValidation};