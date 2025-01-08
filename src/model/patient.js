const mongoose = require("mongoose");

const patientSchemaModel = new mongoose.Schema({
    name: String,
    email: String,
    cont_number: Number,
    dob: String,
    gender: String,
    age: Number,
    des:String  
});

module.exports = mongoose.model("patient", patientSchemaModel);