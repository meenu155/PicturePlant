const express = require('express');
const app = express()
const mongoose = require('mongoose');
const con = require("./db")
const cors = require('cors');
require('dotenv').config();
con(); //calling the function  to connect to the database
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }));
app.use("/api/auth", require('./routes/auth'))
app.use("/api/image", require('./routes/image'))
app.post("/", (req, res) => {
    res.send("hh")
})
app.get("/", (req, res) => {
    res.send("")
})
app.listen(8000, () => {
    console.log("server is connected owlnotes backend")
})