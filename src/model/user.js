const mongoose = require("mongoose");

const userSchemaModel = new mongoose.Schema({
    name:String,
    specialization:String,
    gender:String,
    email:String,
    password:String,
    status:String
});

module.exports = mongoose.model("users", userSchemaModel);