const Joi = require('joi');

const loginEmployeeValidationSchema = Joi.object({
    ctMailId: Joi.string().pattern(/^[a-z0-9._%+-]+@example\.com$/i).required()
    .messages({'string.pattern.base': 'ctMailId must be in format <name>@example.com (e.g., john.doe@example.com)'}),

    password: Joi.string().min(8).required(),
    
})

module.exports = {loginEmployeeValidationSchema};