
const userActionsService = require('../services/usersActionsService')
const timeUtils = require('../utils/timeUtils.js');
const jwt = require("jsonwebtoken");
const max_act = 20
require('dotenv').config('../../.env');

const authenticateToken = async(req, res, next) => {
	let result = await userActionsService.checkDateData()

	const token = req.headers['x-access-token'];

	if (!token) {
		return res.status(401).json({ message: "No token provided" });
	}
	const secret = process.env.SECRET_KEY
	//verify token
	jwt.verify(token, secret, async (err, data) => {
		if (err) {
			console.log(err)
			return res.status(403).json({ message: "Unauthorized" });
		}
			const result = await logger(data, req.method)
			
		
		if (result.outcome === false) {
			return res.status(403).json({ message: result.msg });
		}
		next();
	});
};
const logger = async (data, _method) => {
	if (!data) return { outcome: false, msg: 'data failure', res: null }
	const { name, id } = data;
	const log_object = { id, maxactions: max_act, date: timeUtils.getCurrentDate(), actionallowed: 0 };
	
	if (_method === 'PUT' || _method === 'DELETE' || _method === 'POST') {
		return await userActionsService.modifyActionCount(name, log_object);
	}
		return { outcome: true, msg: 'action allowed', res: null }//get methods are allowed
}


module.exports = authenticateToken 
