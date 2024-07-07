

// Imports
const express = require('express');
const usersService = require('../services/usersService');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
	let user, outcome;
	const { name, email } = req.body;

	// Authenticate user using the usersService
	// Returns an object with auth outcome and user object
	({ outcome, user } = await usersService.authenticateUser(name, email));
	
	// If authentication is successful
	if (outcome === true) {
		const secret = process.env.SECRET_KEY;
		
		// Generate JWT token with user name and id, expiring in 1 hour
		const token = jwt.sign({ name: user.name , id: user.id}, secret, { expiresIn: "1h" });
		
		// If token generation is successful, send the token and user info in response
		if (token) {
			return res.send({ token: token, name: user.name, id: user.id });
		}
	}
	
	// If authentication fails, send a 403 response with null values
	return res.status(403).send({ token: null, name: null, id: null });
});

module.exports = router;
