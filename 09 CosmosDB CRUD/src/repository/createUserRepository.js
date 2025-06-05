const Employee = require("../models/employeeModel.js")
const {getContainer} = require('../config/dbConfig/cosmosContainer.js');
const {hashPassword} = require('../utils/password.js');

const insertEmployeeInDB = async (empData) => {
    const {
        hrmId, 
        empName, 
        ctMailId, 
        rmHrmId, 
        rmName, 
        password, 
        designation, 
        role} = empData;
    const emp = new Employee(hrmId, empName, ctMailId, rmHrmId, rmName, password, designation, role);
    emp.password = hashPassword(emp.password);
    
    const c = await getContainer('employees');
    
    try {
        const { resource } = await c.items.create(emp);
        return {msg: "Employee with HRM ID " + resource.hrmId + " created."};
    } catch (error) {
        return error;
    }
}

module.exports = {insertEmployeeInDB};