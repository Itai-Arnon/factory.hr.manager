
const jwt = require('jsonwebtoken');
const usersRepo = require('../repo/usersRepo.js');
require("dotenv").config();

const getAllUsers = () => {
	return usersRepo.getAllUsers()
}

const getUserById = (id) => {
	return usersRepo.getUserById(id)
}




const authenticateUser = async (name, email) => {
	if (!name || !email) return 'Arguments Invalid'
	const { data: users } = await usersRepo.getAllUsers()
	const user = users.find(user => (user.name === name) && (user.email === email))
	//stage one verify user exists    
	if (user) {
		return { outcome: true, user } // if true is passed to the router a token will be returned
	}
	return { outcome: false, user: null } // if false  passed to the router

}


module.exports = {

	getAllUsers,
	getUserById,
	authenticateUser

}
