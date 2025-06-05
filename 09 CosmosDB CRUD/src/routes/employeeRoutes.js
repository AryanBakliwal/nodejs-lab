const express = require('express');
const { sendToken, verifyToken } = require('../middlewares/authenticate.js');
const { authorize } = require('../middlewares/authorize.js');
const { createEmployeeValidation } = require('../middlewares/validate/createEmployeeValidationMiddleware.js');
const { loginEmployeeValidation } = require('../middlewares/validate/loginEmployeeValidationMiddleware.js');
const { updateEmployeeValidation } = require('../middlewares/validate/updateEmployeeValidationMiddleware.js');
const { deleteEmployeeValidation } = require('../middlewares/validate/deleteEmployeeValidationMiddleware.js');
const { createEmployee } = require('../controllers/createEmployeeController.js');
const { deleteEmployee } = require('../controllers/deleteEmployeeController.js');
const { fetchEmployee } = require('../controllers/fetchEmployeeController.js');
const { loginEmployee } = require('../controllers/loginEmployeeController.js');
const { updateEmployee } = require('../controllers/updateEmployeeController.js');
const employeeRouter = express.Router();

employeeRouter.get('/fetch', verifyToken, fetchEmployee);
employeeRouter.get('/fetch/:hrmId', verifyToken, fetchEmployee);

employeeRouter.post('/login', loginEmployeeValidation, loginEmployee, sendToken);
employeeRouter.post('/create', createEmployeeValidation, createEmployee);

employeeRouter.put('/update', verifyToken, authorize, updateEmployeeValidation, updateEmployee);

employeeRouter.delete('/delete', verifyToken, authorize, deleteEmployeeValidation, deleteEmployee);

module.exports = {employeeRouter};