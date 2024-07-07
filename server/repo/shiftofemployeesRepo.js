

const ShiftOfEmployee = require('../models/shiftofemployeesModel.js')

//const connectDB = require('../configs/db');

//require async await on fufillment
const getAllShiftConnectors = async () => {
    return ShiftOfEmployee.find()
}

//addShiftofemployee
// date: Date ,startTime: Number,endTime: Number
const addShiftConnector = async (obj) => {
    try {
        const shiftofemployee = new ShiftOfEmployee(obj)
        const result = await shiftofemployee.save(obj)
        return {info:result}

    } catch (error) {
        return `An error of type ${error} occured when  adding ${obj.firstname}`
    }
}
const updateShiftConnector = async (_employeeid, _new_employeeid, _shiftid) => {
    try {
        const result = await ShiftOfEmployee.findOneAndUpdate({ employeeid: _employeeid }, {
            employeeid: _new_employeeid,
            shiftid: _shiftid,
        })
        return {info:result}
    } catch (error) {
        return `An error of type ${error} occured when updating ${_name}`
    }
}

const deleteShiftConnector = async (_ID) => {
    try {
        const result =  await ShiftOfEmployee.deleteOne({ _id: _ID })
        return {info:result}
    } catch (error) {
        return `An error of type ${error} occured when updating `
    }
}







module.exports = {
    getAllShiftConnectors,
    addShiftConnector,
    updateShiftConnector,
    deleteShiftConnector
}