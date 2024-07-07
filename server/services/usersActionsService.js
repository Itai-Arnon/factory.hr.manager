const userActionsRepo = require('../repo/usersActionsRepo.js')
const usersDBRepo = require('../repo/usersDBRepo.js')
const timeUtils = require('../utils/timeUtils.js');




//function receives id and current date  
// if new day all allowed actions are reset, if same day it depends on how many were used
const modifyActionCount = async (name, obj) => {
	let result;
	let update_res, act;
    
	const actions = await readFromJson("logger");//reads current logger json
	
	if (!actions.res) return { outcome: false, msg: 'data empty or invalid', res: null };
	//if a log from today exists it will be updated, otherwise a new log will be created
	act = actions.res.find(a => a.id === obj.id && a.date === obj.date);
	if (isObjectEmpty(actions.res) || !act) { //if no up to date log exist or json file empty

		if (obj.maxactions > obj.actionallowed) {//no up to date log found hence we reset userDB actionsallowed
			obj.actionallowed++
			actions.res.push(obj)
			result = await writeToJson("logger", actions.res)
			const update_res = await usersDBRepo.updateDBUser(obj.id, obj.id, name, obj.maxactions, obj.actionallowed);
			const _msg = `write status: ${result.msg}  update DB status ${update_res}`;
			return { outcome: true, msg: 'action allowed.  Status:' + _msg, res: null }
		}
		else {//case where there are no more actions allowed
			actions.res.push(obj)
			result = await writeToJson("logger", actions.res)
			return { outcome: false, msg: 'user not allowed to act, but  logger added.  Stauts:' + result.msg, res: null }
		}
	}
	else {
		if (act.maxactions > act.actionallowed) {//case there a still actions left
			act.actionallowed++;
			result = await writeToJson("logger", actions.res);
			update_res = await usersDBRepo.updateDBUser(act.id, act.id, name, act.maxactions, act.actionallowed);
			const _msg = `write status: ${result.msg}  update DB status ${update_res}`;
			return { outcome: true, msg: 'action allowed Status:' + _msg, res: null };
		} else // no actions left
			return { outcome: false, msg: 'action not allowed', res: null };
	}
}
//decides whether to reset users actions by comparing time stored in dateData.json with the current time
const checkDateData = async () => {
	let result, data
	const now = new Date().getTime()// new represent the current time in milliseconds
	data = await createDateFile()// check status of date json. if invalid/or non existent json created
	if (data.outcome === false)
		return data

	else if (isObjectEmpty(data.res)) {
		result = await userActionsRepo.writeToJson("date", { time: now })
		return result
	} else
		if (timeUtils.hasDayPassed(data.res.time)) {
			time_obj = { time: now }
			await resetActions()
		}
		else time_obj = data.res

	result = await userActionsRepo.writeToJson("date", time_obj)
	return result
}

//create date file if it doesn't exist of if its problematic
const createDateFile = async () => {
	let result
	let data
	data = await userActionsRepo.readFromJson("date")
	if (data.outcome === false || !data.res) {
		const now = new Date()
		result = await userActionsRepo.writeToJson("date", {})
		data = await userActionsRepo.readFromJson("date")
	}
	return (data.outcome === true) ?
		{ outcome: true, msg: `date Record created or already Exists. Read Status:${data.msg} `, res: data.res } :
		{ outcome: false, msg: `date Record not created.  Read Status:${data.msg}`, res: null }

}
//in charge or resetting all user actions allowed
const resetActions = async () => {
	let result;
	//get all db users and reset their actions allowed
	const  users = await usersDBRepo.getAllDBUsers();
	if (users) {
		for (let i = 0; i < users.length; i++){//reset all users 
			users[i].actionallowed = 0
			result = await usersDBRepo.updateDBUser(users[i].userid, users[i].userid, users[i].name, users[i].maxactions, users[i].actionallowed)
			console.log(result);
		};
		return { outcome: true, msg: 'Users DB actions reset', res: null }
	} else //case users extraction failed
		return { outcome: false, msg: 'failed to fetch or no users found', res: null }
}



//function that check for empty object 
const isObjectEmpty = (objectName) => {
	return Object.keys(objectName).length === 0
}


const writeToJson = async (type, obj) => {
	return await userActionsRepo.writeToJson(type, obj)
}

const readFromJson = async (type) => {
	const result = await userActionsRepo.readFromJson(type)
	return result;
}


module.exports = {
	modifyActionCount,
	checkDateData,
	createDateFile,
	resetActions,
	writeToJson,
	readFromJson

}
