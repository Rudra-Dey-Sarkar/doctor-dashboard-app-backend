const mongoose = require("mongoose");
const paymentSchemaModel = new mongoose.Schema({
    email:String,
    amount: String,
    id: String,
    date: String,
    status: String,
   
});

module.exports = mongoose.model("payments", paymentSchemaModel);