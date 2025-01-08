require("dotenv").config();
const mongoose = require("mongoose");
const DB = process.env.DB;

const ConnectDB = async ()=>{
    console.log(DB)
await mongoose.connect(DB).then(()=>{
    
    console.log("Database Connected");
}).catch((error)=>{
    console.log("Database Could not connected due to:-", error);
})
}

module.exports = ConnectDB;