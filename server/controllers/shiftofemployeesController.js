// Import necessary modules
const express = require('express');
const router = express.Router();

// Import inner modules
const connectorsService = require('../services/shiftofemployeesService.js');

// Route to get all shift connectors
router.get('/', async (req, res) => {
    try {
        // Fetch all shift connectors using the connectors service
        const connectors = await connectorsService.getAllShiftConnectors();
        // Send the fetched connectors as the response
        return res.send(connectors);
    } catch (error) {
        // Send an error response if something goes wrong
        return res.status(500).send(error);
    }
});

// Route to add a new shift connector
router.post('/', async (req, res) => {
    // Get the new shift connector data from the request body
    const obj = req.body;
    // Add the new shift connector using the connectors service
    const result = await connectorsService.addShiftConnector(obj);
    // Send the added shift connector data as the response with a 201 status code
    return res.status(201).json(result);
});

// Route to update an existing shift connector
router.put('/:employeeid', async (req, res) => {
    // Get the employee ID from the request parameters
    const { employeeid } = req.params;
    // Get the updated shift connector data from the request body
    const obj = req.body;
    // Update the shift connector using the connectors service
    const result = await connectorsService.updateShiftConnector(employeeid, obj.employeeid, obj.shiftid);
    // Send the updated shift connector data as the response
    return res.json(result);
});

// Route to delete a shift connector
router.delete('/:_ID', async (req, res) => {
    // Get the connector ID from the request parameters
    const { _ID } = req.params;
    // Delete the shift connector using the connectors service
    const result = await connectorsService.deleteShiftConnector(_ID);
    // Send the result of the deletion as the response
    return res.json(result);
});

// Export the router to be used in other parts of the application
module.exports = router;
