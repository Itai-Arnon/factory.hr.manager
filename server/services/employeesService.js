// Import necessary repository modules
const employeesRepo = require('../repo/employeesRepo.js');
const shiftsRepo = require('../repo/shiftsRepo.js');
const shiftConnectRepo = require('../repo/shiftofemployeesRepo.js');

// Functions to interact with employees using repositories

// Function to fetch all employees
const getAllEmployees = async () => {
    return employeesRepo.getAllEmployees();
};

// Function to get an employee by their first name
const getEmployeebyName = async (_firstname) => {
    return employeesRepo.getEmployeebyName(_firstname);
};

// Function to add a new employee
const addEmployee = async (obj) => {
    return employeesRepo.addEmployee(obj);
};

// Function to update an existing employee
const updateEmployee = async (_ID, _firstname, _lastname, _yearjoined, _deptId) => {
    return employeesRepo.updateEmployee(_ID, _firstname, _lastname, _yearjoined, _deptId);
};

// Function to delete an employee
const deleteEmployee = async (_ID) => {
    // Delete all connectors associated with the employee
    let result = await deleteAllEmployeeConnectors(_ID);
    console.log(result);
    // Delete the employee itself
    return employeesRepo.deleteEmployee(_ID);
};

// Function to delete all connectors associated with an employee
const deleteAllEmployeeConnectors = async (_ID) => {
    console.log("inside deleteAllEmployeeConnectors");
    // Fetch all employees
    let data = await getAllEmployees();
    // Find the employee by ID
    let wanted = data.find(emp => String(emp._id) === _ID);
    if (!wanted) {
        return `Failed `;
    }

    // Fetch all shift connectors
    data = await shiftConnectRepo.getAllShiftConnectors();
    // Filter connectors by employee ID
    const filterByEmp = data.filter(con => con.employeeid === String(wanted._id));
    try {
        // Delete each connector found
        filterByEmp.forEach(con => {
            shiftConnectRepo.deleteShiftConnector(con._id);
        });
        return `Deleted all connectors`;
    } catch (error) {
        return `Failed to delete all connectors ${error}`;
    }
};

// Function to get all shifts associated with an employee by employee ID
const getAllShiftsById = async (_id) => {
    // Fetch all employees
    const data = await getAllEmployees();
    // Find the employee by ID
    wanted = data.find(e => String(e._id) == _id);
    if (!wanted) {
        return `Failed `;
    }

    // Fetch all shift connectors
    const shift_connectors = await shiftConnectRepo.getAllShiftConnectors();
    // Fetch all shifts
    const shiftsList = await shiftsRepo.getAllShifts();

    // Filter connectors by employee ID
    const connectorsArr = shift_connectors.filter((e) => {
        if (String(e.employeeid) === String(_id)) {
            return true;
        }
        return false;
    });

    let shiftsConnect = [];
    // Map connectors to corresponding shifts
    connectorsArr.forEach(conn => {
        let shift = shiftsList.find(s => conn.shiftid === String(s._id));
        if (shift) {
            shiftsConnect.push(shift);
        }
    });

    // Return the list of shifts associated with the employee
    return shiftsConnect.length === 0 ? [] : shiftsConnect;
};

// Export all functions to be used externally
module.exports = {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeebyName,
    getAllShiftsById,
};
