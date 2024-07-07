// Import necessary modules
const express = require('express');
const router = express.Router();

// Import inner modules
const usersDBService = require('../services/usersDBService.js');

// Route to get all users from the database
router.get('/', async (req, res) => {
    try {
        // Fetch all users from the database using usersDBService
        const users = await usersDBService.getAllDBUsers();
        // Send the fetched users as the response
        return res.send(users);
    } catch (error) {
        // Send an error response if something goes wrong
        return res.status(500).send(error);
    }
});

// Route to add a new user to the database
router.post('/', async (req, res) => {
    // Get the new user data from the request body
    const obj = req.body;
    // Add the new user to the database using usersDBService
    const result = await usersDBService.addDBUser(obj);
    // Send the added user data as the response with a 201 status code
    return res.status(201).send(result);
});

// Route to update an existing user in the database
router.put('/:userid', async (req, res) => {
    // Get the user ID from the request parameters
    const { userid } = req.params;
    // Get the updated user data from the request body
    const obj = req.body;
    // Update the user in the database using usersDBService
    const result = await usersDBService.updateDBUser(userid, obj.userid, obj.name, obj.numberofactions);
    // Send the updated user data as the response
    return res.send(result);
});

// Route to delete a user from the database
router.delete('/:userid', async (req, res) => {
    // Get the user ID from the request parameters
    const { userid } = req.params;
    // Delete the user from the database using usersDBService
    const result = await usersDBService.deleteDBUser(userid);
    // Send the result of the deletion as the response
    return res.send(result);
});

// Export the router to be used in other parts of the application
module.exports = router;
