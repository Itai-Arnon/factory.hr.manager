

const Employee = require('../models/employeesModel')


//const connectDB = require('../configs/db.js')
//connectDB()

//require async await on fufillment
const getAllEmployees = async () => { 
    return await  Employee.find()
}

//handles Object Id an not String
const getEmployeebyName = async (_firstname) => {
    try {
      const employee = await Employee.find({ firstname: _firstname })
       return   employee[0]
    } catch (error) {
        return `An error of type ${error} occured`
    }
}


//addEmployee
// firatname:String|lastname||String|||| Number|| deptId: Number
const addEmployee = async (obj) => {
    try {
        const employee = new Employee(obj)
        const result = await employee.save(obj)
        return {info:result}
        
    } catch (error) {
        return `An error of type ${error} occured when  adding `
    }  
}

//updateEmployee   
const updateEmployee = async (_ID ,_firstname, _lastname , _yearjoined , _deptId ) => { 
    try {
        
        const result = await Employee.findOneAndUpdate({ _id: _ID },
            {
                firstname: _firstname,
                lastname: _lastname ,
                yearjoined: _yearjoined ,
                deptId: _deptId
            })
        return {info:result}
    } catch (error) {
        return `An error of type ${error} occured when updating `
    }
}

const deleteEmployee = async (_ID) => {
    try {
        const result = await Employee.deleteOne({ _id: _ID })
        return {info:result}
    
    
    }
        
     catch (error) {
        return `An error of type ${error} occured when deleting `
    } 
}









module.exports = {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeebyName
    
}
