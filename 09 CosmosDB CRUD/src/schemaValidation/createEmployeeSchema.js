const Joi = require('joi');

const createEmployeeValidationSchema = Joi.object({
    hrmId: Joi.string().pattern(/^HRM\d{1,4}$/).required()
    .messages({'string.pattern.base': 'hrmId must be in format HRM followed by 4 digits (e.g., HRM9999)'}),

    empName: Joi.string().required(),

    ctMailId: Joi.string().pattern(/^[a-z0-9._%+-]+@example\.com$/i).required()
    .messages({'string.pattern.base': 'ctMailId must be in format <name>@example.com (e.g., john.doe@example.com)'}),

    rmHrmId: Joi.string().pattern(/^HRM\d{1,4}$/).required()
    .messages({'string.pattern.base': 'rmHrmId must be in format HRM followed by 4 digits (e.g., HRM9999)'}),

    rmName: Joi.string().required(),

    password: Joi.string().min(8).required(),

    designation: Joi.string().valid('Intern', 'Trainee', 'Associate').required(),

    role: Joi.string().valid('Reader', 'Admin')
});

module.exports = { createEmployeeValidationSchema };
