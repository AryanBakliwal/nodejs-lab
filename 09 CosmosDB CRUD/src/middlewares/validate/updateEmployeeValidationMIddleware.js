const { StatusCodes } = require('http-status-codes');
const {updateEmployeeValidationSchema} = require('../../schemaValidation/updateEmployeeSchema');
const { handleFailure } = require('../../utils/responseHandler');

const updateEmployeeValidation = (req, res, next) => {
    const {error} = updateEmployeeValidationSchema.validate(req.body);
    if (error) {
        handleFailure(res, StatusCodes.BAD_REQUEST, error.details[0].message);
        return;
    }
    next();
}

module.exports = {updateEmployeeValidation};