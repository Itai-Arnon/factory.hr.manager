// Import necessary repository module
const connectorsRepo = require('../repo/shiftofemployeesRepo.js');

// Functions to interact with shift connectors using repositories

// Function to fetch all shift connectors
const getAllShiftConnectors = async () => {
    // Return the result of fetching all shift connectors from the repository
    return connectorsRepo.getAllShiftConnectors();
};

// Function to add a new shift connector
const addShiftConnector = async (obj) => {
    // Return the result of adding a shift connector to the repository
    return connectorsRepo.addShiftConnector(obj);
};

// Function to update an existing shift connector
const updateShiftConnector = async (_employeeid, _new_employeeid, _shiftid) => {
    // Return the result of updating a shift connector in the repository
    return connectorsRepo.updateShiftConnector(_employeeid, _new_employeeid, _shiftid);
};

// Function to delete a shift connector
const deleteShiftConnector = async (_ID) => {
    // Return the result of deleting a shift connector from the repository
    return connectorsRepo.deleteShiftConnector(_ID);
};

// Export all functions to be used externally
module.exports = {
    getAllShiftConnectors,
    addShiftConnector,
    updateShiftConnector,
    deleteShiftConnector
};
