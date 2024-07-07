
const shiftsRepo = require('../repo/shiftsRepo.js')
const connectorsRepo = require('../repo/shiftofemployeesRepo')


const checkIfRegistered = async (_employeeid, _shiftid) => {
    const connectors = await connectorsRepo.getAllShiftConnectors()

    const connector = connectors.find(c => (c.employeeid === String(_employeeid)) && (c.shiftid === String(_shiftid))) 

    if (connector) return true
    
    return false
}



const getShiftsNotRegistered = async (_employeeid) => {
    
    const connectors = await connectorsRepo.getAllShiftConnectors();
    const shifts = await shiftsRepo.getAllShifts()
	//  all the connectors that are not registered to this employee
	const filtered_connectors = connectors.filter(c => c.employeeid !== String(_employeeid))
    console.log("filtered connectors len " + filtered_connectors.length)

    const filtered_shifts = shifts.filter(s => {
        const test = filtered_connectors.find(c => String(s._id) === c.shiftid)
        if (test !== undefined) {
            return true
        }
        else return false
    })
    // console.log("filterd:"+filtered_shifts)
    return filtered_shifts
}

//require async await on fufillment
const getAllShifts = async () => {
    return shiftsRepo.getAllShifts()
}

//addShift
// date: Date ,startTime: Number,endTime: Number
const addShift = async (obj) => {
    return shiftsRepo.addShift(obj)
}

//updateShift   -- shift doesn't have id or name
const updateShift = async (_ID, _date, _startTime, _endTime) => {
    return shiftsRepo.updateShift(_ID, _date, _startTime, _endTime)
}


// to be used only internally
const deleteShift = async (id) => {
    return shiftsRepo.deleteShift(id)
}





module.exports = {
    getAllShifts,
    addShift,
    updateShift,
    deleteShift,
}