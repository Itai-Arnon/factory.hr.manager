
const axios = require('axios')

const URL_USER = 'https://jsonplaceholder.typicode.com/users'


//this repo is used to retrieve users from jsonplaceholder


//from fake api
const getAllUsers =  async () => {
    return await axios.get(URL_USER)
}
//from fake api
const getUserById = async (id) => {
    return await axios.get(`${URL_USER}/${id}`)
}
// db





module.exports = {
    getAllUsers,
    getUserById,
   
   }