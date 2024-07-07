// Import necessary modules
const express = require('express');
const router = express.Router();

// Import inner modules
const shiftsService = require('../services/shiftsService.js');

// Example of a commented-out route for filtering shifts
/*
router.get('/filter', async (req, res) => { 
    try {
        const obj = req.body;
        const result = await shiftsService.checkIfRegistered(obj.employeeid, obj.shiftid);
        console.log(result);
        return res.send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
});
*/

// Route to get all shifts
router.get('/', async (req, res) => {
    try {
        // Fetch all shifts using the shifts service
        const shifts = await shiftsService.getAllShifts();
        // Send the fetched shifts as the response
        return res.send(shifts);
    } catch (error) {
        // Send an error response if something goes wrong
        return res.status(500).send(error);
    }
});

// Route to add a new shift
router.post('/', async (req, res) => {
    // Get the new shift data from the request body
    const obj = req.body;
    // Add the new shift using the shifts service
    const result = await shiftsService.addShift(obj);
    // Send the added shift data as the response with a 201 status code
    return res.status(201).send(result);
});

// Route to update an existing shift
router.put('/:id', async (req, res) => {
    // Get the shift ID from the request parameters
    const { id } = req.params;
    // Get the updated shift data from the request body
    const obj = req.body;
    // Update the shift using the shifts service
    const result = await shiftsService.updateShift(id, obj.date, obj.startTime, obj.endTime);
    // Send the updated shift data as the response
    return res.send(result);
});

// Route to delete a shift
router.delete('/:id', async (req, res) => {
    // Get the shift ID from the request parameters
    const { id } = req.params;
    // Delete the shift using the shifts service
    const result = await shiftsService.deleteShift(id);
    // Send the result of the deletion as the response
    return res.send(result);
});

// Export the router to be used in other parts of the application
module.exports = router;
