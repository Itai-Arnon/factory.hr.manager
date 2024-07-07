
const User = require('../models/usersModel.js')



const getAllDBUsers = async () => {
	const data = await User.find()
	return (data)
}

//filter of the type {"property_name": property_value}
const getUserDBByName = async (name) => {
	const filter = ({ name: name })
	return await User.find(filter)
}

//obj wil contain usedId , full name and number of actions
const addDBUser = async (obj) => {
	const user = new User(obj)
	try {
		const result = await user.save(obj)
		return  result 

	} catch (error) {
		return `An error of type ${error} occured when saving`
	}
}

const updateDBUser = async (_userid, _new_userid, _name, _maxactions,  _actionallowed) => {
	try {

		const result = await User.findOneAndUpdate({ userid: _userid }, {
			userid: _new_userid,
			name: _name,
			maxactions: _maxactions,
			actionallowed: _actionallowed
		})
		return result
	} catch (error) {
		return `update failed :${error}`
	}
}

const deleteDBUser = async (_userid) => {
	try {
		const result = await User.deleteOne({ userid: _userid })
		return result
	} catch (error) {
		return `deletion failed :${error}`
	}
}

module.exports = {
	
	getAllDBUsers,
	getUserDBByName,
	addDBUser,
	updateDBUser,
	deleteDBUser
}