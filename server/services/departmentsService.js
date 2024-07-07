// Import the departmentsRepo module
const departmentsRepo = require('../repo/departmentsRepo.js');

// Functions to interact with departments using departmentsRepo

// Function to fetch all departments
const getAllDepartments = async () => {
    // Return the result of fetching all departments from the repository
    return await departmentsRepo.getAllDepartments();
};

// Function to add a new department
const addDepartment = async (obj) => {
    // Return the result of adding a department to the repository
    return await departmentsRepo.addDepartment(obj);
};

// Function to update an existing department
const updateDepartment = async (_ID, _new_name, _managerId) => {
    // Return the result of updating a department in the repository
    return await departmentsRepo.updateDepartment(_ID, _new_name, _managerId);
};

// Function to delete a department
const deleteDepartment = async (_ID) => {
    // Return the result of deleting a department from the repository
    return await departmentsRepo.deleteDepartment(_ID);
};

// Export all functions to be used externally
module.exports = {
    getAllDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment
};
