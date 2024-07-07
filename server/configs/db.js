const mongoose = require('mongoose');

const connectDB = () => {
  // Connect to MongoDB database
  mongoose
    .connect('mongodb://127.0.0.1:27017/Project1')
    .then(() => console.log('MongoDB Connected to Project1'))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
