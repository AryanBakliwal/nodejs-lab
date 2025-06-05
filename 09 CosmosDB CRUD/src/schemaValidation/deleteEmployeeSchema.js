const Joi = require('joi');

const deleteEmployeeValidationSchema = Joi.object({
    hrmId: Joi.string().pattern(/^HRM\d{1,4}$/).required()
    .messages({'string.pattern.base': 'hrmId must be in format HRM followed by 4 digits (e.g., HRM9999)'}),
});

module.exports = { deleteEmployeeValidationSchema };