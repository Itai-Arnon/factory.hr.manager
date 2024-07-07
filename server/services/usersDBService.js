// Import the usersDBRepo module
const usersDBRepo = require('../repo/usersDBRepo.js');

// Functions to interact with database users using usersDBRepo

// Function to fetch all database users
const getAllDBUsers = async () => {
    return await usersDBRepo.getAllDBUsers();
};

// Function to add a new user to the database
const addDBUser = async (obj) => {
    return await usersDBRepo.addDBUser(obj);
};

// Function to update an existing user in the database
const updateDBUser = async (_userid, _new_userid, _name, _numberofactions) => {
    return await usersDBRepo.updateDBUser(_userid, _new_userid, _name, _numberofactions);
};

// Function to delete a user from the database
const deleteDBUser = async (_userid) => {
    return await usersDBRepo.deleteDBUser(_userid);
};

// Export all functions for external use
module.exports = {
    getAllDBUsers,
    addDBUser,
    updateDBUser,
    deleteDBUser,
};
