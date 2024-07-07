
const Department = require('../models/departmentsModel')


// const connectDB = require('../configs/db.js')
// connectDB()

//require async await on fufillment
const getAllDepartments = async () => { 
    return Department.find()
}



//addDepartment

const addDepartment = async (obj) => {
    try {
        const department = new Department(obj)
		return  await department.save(obj)
       
        
    } catch (error) {
        return`An error of type ${error} occured when  adding`
    }  
}

//updateDepartment   
const updateDepartment = async (_ID ,_new_name, _managerId ) => { 
    try {
        
        return await Department.findOneAndUpdate({ _id : _ID },
            {
                name: _new_name,
               managerId: _managerId
            })
            
    } catch (error) {
       return `An error of type ${error} occured when updating `
    }
}

const deleteDepartment = async (_ID) => {
    try {
        
        return await Department.deleteOne({ _id: _ID })
           
    } catch (error) {
        return `An error of type ${error} occured when updating `
    } 
}






module.exports = {
    getAllDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment
}
