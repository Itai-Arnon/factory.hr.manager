


// Import necessary modules
const express = require('express');
const router = express.Router();

// Import inner modules
const employeesService = require('../services/employeesService.js');

// Route to get all shifts by employee ID
router.get('/shifts/:id', async (req, res) => {
    const { id } = req.params;
    const data = await employeesService.getAllShiftsById(id);
    return res.send(data);
});

// Route to get all employees
router.get('/', async (req, res) => {
    try {
        const data = await employeesService.getAllEmployees();
        return res.json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Route to add a new employee
router.post('/', async (req, res) => {
    const obj = req.body;
    const result = await employeesService.addEmployee(obj);
    return res.status(201).json(result);
});

// Route to update an existing employee
router.put('/:id', async (req, res) => {
    // Test if by id is better
    const { id } = req.params;
    const obj = req.body;
    const result = await employeesService.updateEmployee(id, obj.firstname, obj.lastname, obj.yearjoined, obj.deptId);
    return res.json(result);
});

// Route to delete an employee
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await employeesService.deleteEmployee(id);
    return res.json(result);
});

// Export the router to be used in other parts of the application
module.exports = router;
