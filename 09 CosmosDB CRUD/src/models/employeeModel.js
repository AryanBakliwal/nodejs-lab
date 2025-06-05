class Employee {
    constructor(hrmId, empName, ctMailId, rmHrmId, rmName, password, designation, role='Reader') {
        this.hrmId = hrmId;
        this.empName = empName;
        this.ctMailId = ctMailId;
        this.rmHrmId = rmHrmId;
        this.rmName = rmName;
        this.password = password;
        this.designation = designation;
        this.role = role;
    }
}

module.exports = Employee;