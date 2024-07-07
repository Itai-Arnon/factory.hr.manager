const Shift = require('../models/shiftsModel')

const connectDB = require('../configs/db.js')


//require async await on fufillment
const   getAllShifts = async () => {
    return Shift.find()
}

//addShift
// date: Date ,startTime: Number,endTime: Number
const addShift = async (obj) => {
    try {
        const shift = new Shift(obj)
        const result = await shift.save(obj)
        return {info:result}

    } catch (error) {
        return  `An error of type ${error} occured when  adding `
    }
}

//updateShift   
const updateShift = async (_ID, _date, _startTime, _endTime) => {
    try {

        const result = await Shift.findOneAndUpdate({ _id: _ID }, {
            date: _date,
            startTime: _startTime,
            endTime: _endTime
        })
         return {info:result}
    } catch (error) {
        return  `An error of type ${error} occured when updating `
    }
}

// to be used only internally
const deleteShift = async (id) => {
    try {
        const result =  await Shift.deleteOne({_id : id})
        return {info:result}

    } catch (error) {
        return  `An error of type ${error} occured when `
    }
}




module.exports = {
    getAllShifts,
    addShift,
    updateShift,
    deleteShift
}