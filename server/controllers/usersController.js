// Import necessary modules
const express = require('express');
const router = express.Router();

// Import inner modules
const usersService = require('../services/usersService.js');

// Route to get all users
router.get('/', async (req, res) => {
    try {
        // Fetch all users using the users service
        const { data: users } = await usersService.getAllUsers();
        // Send the fetched users as the response
        return res.send(users);
    } catch (error) {
        // Send an error response if something goes wrong
        return res.status(500).send(error);
    }
});

// Route to get a specific user by ID
router.get('/:id', async (req, res) => {
    try {
        // Get the user ID from the request parameters
        const { id } = req.params;
        // Fetch the user by ID using the users service
        const { data: user } = await usersService.getUserById(id);
        // Send the fetched user as the response
        return res.send(user);
    } catch (error) {
        // Send an error response if something goes wrong
        return res.status(500).send(error);
    }
});

// Export the router to be used in other parts of the application
module.exports = router;
