// Import necessary modules
const express = require('express');
const router = express.Router();

// Import inner modules
const departmentsService = require('../services/departmentsService.js')

// Route to get all departments
router.get('/', async (req, res) => {
    try {
        // Fetch all departments using the departments service
        const departments = await departmentsService.getAllDepartments();
        // Send the fetched departments as the response
        return res.send(departments);
    } catch (error) {
        // Send an error response if something goes wrong
        return res.status(500).send(error);
    }
});

// Route to add a new department
router.post('/', async (req, res) => {
    // Get the new department data from the request body
    const obj = req.body;
    // Add the new department using the departments service
    const result = await departmentsService.addDepartment(obj);
    // Send the added department data as the response with a 201 status code
    return res.status(201).json(result);
});

// Route to update an existing department
router.put('/:id', async (req, res) => {
    // Get the department ID from the request parameters
    const { id } = req.params;
    // Get the updated department data from the request body
    const obj = req.body;
    // Update the department using the departments service
    const result = await departmentsService.updateDepartment(id, obj.name, obj.managerId);
    // Send the updated department data as the response
    return res.json(result);
});

// Route to delete a department
router.delete('/:id', async (req, res) => {
    // Get the department ID from the request parameters
    const { id } = req.params;
    // Delete the department using the departments service
    const result = await departmentsService.deleteDepartment(id);
    // Send the result of the deletion as the response
    return res.send(result);
});

// Export the router to be used in other parts of the application
module.exports = router;
