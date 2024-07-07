const fs = require('fs')
const js = require('jsonfile')
const path = require('path')
const JSON_ACTIONS =  path.join(__dirname, '../data/actions.json'); // path to the json file
const DATE_ACTIONS = path.join(__dirname, '../data/dateData.json')

//*  debug CWD  - c:/projects/project1/
//process.cwd() - returns current working directory path of project


/* this functions write to json files*/
/* verifying that if the file doesn't exist it will creare on  */
/* since two kinds of files are employed one is initiated as an array and one as an object */
const writeToJson = async (type, obj) => {
	let result = null, type_obj = null

	if (type === "logger")
		type_obj = { _path: JSON_ACTIONS, _empty: '[]' }
	else if (type === "date")
		type_obj = { _path: DATE_ACTIONS, _empty: '{}' }
	else
		return { outcome: false, msg: 'type not recognized', res: null }
	try {
		if (!fs.existsSync(type_obj._path)) {
			fs.writeFileSync(type_obj._path, type_obj._empty, 'utf8'); // create the file if it doesn't exist
		}
		result  = await js.writeFile(type_obj._path, obj) //always returns undefined
		return { outcome: true , msg: `Written Succesfully`, res: null };
	
	} catch (error) {
		return { outcome: false, msg: `An error occurred writing ${error}`, res: null };
	}
}

/* this functions reads from json files*/
/* verifying that if the file doesn't exist it will creare on  */
/* since two kinds of files are employed one is initiated as an array and one as an object */
const readFromJson = async (type) => {
	let result = null;
	let type_obj = null;
	if (type === 'logger')
		type_obj = { _path: JSON_ACTIONS, _empty: '[]' }
	else if (type === 'date')
		type_obj = { _path: DATE_ACTIONS, _empty: '{}' }
	else
		return { outcome: null, msg: 'type not recognized', res: null }
	try {
		if (!fs.existsSync(type_obj._path)) {
			fs.writeFileSync(type_obj._path, type_obj._empty, 'utf8'); // create the file if it doesn't exist
		}
		result = await js.readFile(type_obj._path)
		return { outcome: true, msg: 'read success', res: result };

	} catch (error) {
		
		
		return ({ outcome: false, msg: `An error occurred reading ${error}`, res: null })
	}
}



module.exports = { writeToJson, readFromJson };