const mongoose = require('mongoose');

// 'Schema' maps to a MongoDB collection and defines the shape of the documents within that collection
// 'Schema' is the blueprint of the documents
const shiftSchema = new mongoose.Schema(
  {
    // name: { type: String, required: true },
   
    date: { type: String, required: true  } , 
    startTime: { type: Number, required: true } ,
    endTime: { type: Number, required: true }
  },
    { versionKey: false } // means that history of the document will not be saved to the database
);

// A 'model' is a class with which we construct documents in a collection
const Shift = mongoose.model('shift', shiftSchema, 'shifts');
// The first argument is the singular name of the collection that will be created for the model (Mongoose will create the database collection for the above model 'person').
// The second argument is the schema to use in creating the model.
// The third argument is the name of the collection.

module.exports = Shift;
