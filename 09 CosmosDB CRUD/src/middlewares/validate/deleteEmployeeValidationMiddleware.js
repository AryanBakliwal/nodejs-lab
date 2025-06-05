const { StatusCodes } = require('http-status-codes');
const {deleteEmployeeValidationSchema} = require('../../schemaValidation/deleteEmployeeSchema');
const { handleFailure } = require('../../utils/responseHandler');

const deleteEmployeeValidation = (req, res, next) => {
    const {error} = deleteEmployeeValidationSchema.validate(req.body);
    
    if (error) {
        handleFailure(res, StatusCodes.BAD_REQUEST, error.details[0].message);
        return;
    }
    next();
}

module.exports = {deleteEmployeeValidation};