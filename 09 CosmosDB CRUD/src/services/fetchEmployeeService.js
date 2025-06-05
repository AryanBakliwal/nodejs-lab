const { fetchEmployeeByHrmId, fetchAllEmployees } = require("../repository/fetchUserRepository");

const fetchEmployeeService = async (id) => {
    var emp;
    try {
        if(id) {
            emp = await fetchEmployeeByHrmId(id);
            if(emp.length == 0) {
                return {success: false, message: "HRM ID does not exist!"};
            }
            return {success: true, e: emp[0]};
        } else {
            emp = await fetchAllEmployees();
            
            if(emp.length == 0) {
                return {success: false, message: "No employees to display!"};
            }
            return {success: true, e: emp};
        }
    } catch (error) {
        return {success: false, message: error};
    }
}

module.exports = {fetchEmployeeService};