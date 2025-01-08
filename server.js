const express = require("express");
const cors = require("cors");

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  }

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res)=>{
    try{
        res.json("Working");
    }catch(error){
        res.json("Cannot connect due to:- ",error );
    }
})

app.listen(5000, ()=>{
    console.log("App Listening in the port 5000")
})