// Import required modules
const cors = require('cors'); // For handling Cross-Origin Resource Sharing (CORS)
const express = require('express'); // For creating the Express application
const app = express(); // Initialize the Express application
const connectDB = require('./configs/db'); // Import the database connection function
const dotenv = require('dotenv'); // For loading environment variables
dotenv.config(); // Load environment variables from .env file

// Import middleware for JWT authentication
const authenToken = require('./middleware/authenticateToken.js');

// Import route controllers
const authController = require('./controllers/authController.js');
const usersController = require('./controllers/usersController.js');
const usersDBController = require('./controllers/usersDBController.js');
const employeesController = require('./controllers/employeesController.js');
const departmentsController = require('./controllers/departmentsController.js');
const shiftsController = require('./controllers/shiftsController.js');
const connectorController = require('./controllers/shiftofemployeesController.js');

// Define the port number
const PORT = 3000;

// Connect to the database
connectDB();

// Log the current working directory
console.log("***************************************");
console.log(`Working Directory: ${process.cwd()}`);
console.log("***************************************\n");

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies for all incoming requests

// Route setup
app.use('/auth', authController); // Route for authentication
app.use('/employees', authenToken, employeesController); // Route for employees with JWT authentication
app.use('/connectors', authenToken, connectorController); // Route for shift connectors with JWT authentication
app.use('/shifts', authenToken, shiftsController); // Route for shifts with JWT authentication
app.use('/departments', authenToken, departmentsController); // Route for departments with JWT authentication
app.use('/users', authenToken, usersController); // Route for users with JWT authentication
app.use('/usersdb', authenToken, usersDBController); // Route for users database with JWT authentication

// Default route
app.use('/', (req, res) => {
    res.json({ msg: 'Hello World!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at ${(new Date()).toLocaleTimeString()}`);
    console.log(`app is listening at http://localhost:${PORT} \n`);
});
