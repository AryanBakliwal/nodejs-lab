const {getContainer} = require('../config/dbConfig/cosmosContainer.js');

const updateEmployeeInDB = async (employee, newData) => {
    const newEmployee = employee;
    
    if(newData?.empName) {newEmployee["empName"] = newData.empName}
    if(newData?.ctMailId) {newEmployee.ctMailId = newData.ctMailId}
    if(newData?.rmHrmId) {newEmployee.rmHrmId = newData.rmHrmId}
    if(newData?.rmName) {newEmployee.rmName = newData.rmName}
    if(newData?.designation) {newEmployee.designation = newData.designation}
    if(newData?.role) {newEmployee.role = newData.role}
    
    const c = await getContainer('employees')
    
    try {
        const { resource } = await c.item(employee.id, employee.id).replace(newEmployee);
        return {msg: "Employee with HRM ID " + resource.hrmId + " updated."};
    } catch (error) {
        return error;
    }
}

module.exports = {updateEmployeeInDB};