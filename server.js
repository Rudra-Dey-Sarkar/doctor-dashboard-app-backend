require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDB = require("./src/config/db");

const userSchemaModel = require("./src/model/user");
const patientSchemaModel = require("./src/model/patient");

const port = process.env.PORT
ConnectDB();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}


const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Default Route
app.get("/", (req, res) => {
    try {
        res.json("Working");
    } catch (error) {
        res.json("Cannot connect due to:- ", error);
    }
})

//Doctor Registration
app.post("/register", async (req, res) => {
    const { name, specialization, gender, email, password, status } = req.body;

    const data = {
        name: name,
        specialization: specialization,
        gender: gender,
        email: email,
        password: password,
        status: status,
    }

    try {
        const response = await userSchemaModel.find({ email: email });
        if (response?.length > 0) {
            res.status(404).json("User Already Exist");
        } else {
            await userSchemaModel.insertMany([data])
                .then((data) => {
                    res.status(200).json(data);
                })
                .catch((err) => {
                    res.status(404).json(err);
                })
        }
    } catch (err) {
        console.log(err);
    }
});
//Doctor Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        await userSchemaModel.find({ email: email })
            .then((data) => {
                if (data[0].password === password) {
                    res.status(200).json(data);
                } else {
                    res.status(404).json("Use Same Password");
                }
            })
            .catch((err) => {
                res.status(404).json(err);
            })
    } catch (err) {
        console.log(err);
    }
});

//View Patients
app.post("/patient", async (req, res) => {
    const {doc_name} = req.body;
    try {
        await patientSchemaModel.find({doc_name:doc_name}).then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(404).json("No Patient Found Due To:-", err);
        })
    } catch (err) {
        console.log(err);
    }
});
//Add Patients
app.post("/add-patient", async (req, res) => {
    const { doc_name, name, email, cont_number, dob, gender, age, des } = req.body;
    const data = {
        doc_name:doc_name,
        name: name,
        email: email,
        cont_number: cont_number,
        dob: dob,
        gender: gender,
        age: age,
        des: des,
    }

    try {
        const response = await patientSchemaModel.find({ email: email });
        if (response?.length > 0) {
            res.status(404).json("Patient Already Exist");
        } else {
            await patientSchemaModel.insertMany([data])
                .then((data) => {
                    res.status(200).json(data);
                })
                .catch((err) => {
                    res.status(404).json("Cannot add patient due to :- ", err);
                })
        }
    } catch (err) {
        console.log(err);
    }
});
//Edit Patients Details
app.put("/edit-patient-details", async (req, res) => {
    const { email, ...updateFields } = req.body;

    try {
        await patientSchemaModel.findOneAndUpdate(
            { email: email },
            { $set: updateFields },
            { new: true }
        ).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            res.status(404).json("Cannot edit the patient details due to:-", error);
        })
    } catch (err) {
        console.log(err);
    }
});
//Remove Patient
app.delete("/remove-patient", async (req, res) => {
    const {email} = req.body;
    try {
        await patientSchemaModel.findOneAndDelete({ email: email }).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            res.status(404).json("Cannot remove the patient due to:-", error);
        })
    } catch (error) {
        console.log(error);
    }
})

app.listen(5000, () => {
    console.log("App Listening in the port", port);
})