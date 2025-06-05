const Joi = require('joi');

const updateEmployeeValidationSchema = Joi.object({
    hrmId: Joi.string().pattern(/^HRM\d{1,4}$/).required()
    .messages({'string.pattern.base': 'hrmId must be in format HRM followed by 4 digits (e.g., HRM9999)'}),

    empName: Joi.string(),

    ctMailId: Joi.string().pattern(/^[a-z0-9._%+-]+@example\.com$/i)
    .messages({'string.pattern.base': 'ctMailId must be in format <name>@example.com (e.g., john.doe@example.com)'}),

    rmHrmId: Joi.string().pattern(/^HRM\d{1,4}$/)
    .messages({'string.pattern.base': 'rmHrmId must be in format HRM followed by 4 digits (e.g., HRM9999)'}),

    rmName: Joi.string(),

    designation: Joi.string().valid('Intern', 'Trainee', 'Associate'),

    role: Joi.string().valid('Reader', 'Admin')
});

module.exports = { updateEmployeeValidationSchema };