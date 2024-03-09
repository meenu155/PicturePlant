const URL = "mongodb+srv://meenusinghms392:p8c1WNYWbFyuEYhj@cluster1.72q7dyz.mongodb.net/?retryWrites=true&w=majority"
const express = require('express');
const app = express()
const mongoose = require('mongoose');
const con = () => {
    mongoose.connect(URL).then(() => console.log("connected to mongo")).catch((err) => { console.log("error occur", err); });


    //Node.js application connects to the database.
    mongoose.connection.on('connected', () => { //Here, you're setting up an event listener for the 'connected' 
        //event of the Mongoose connection. When the connection to MongoDB is successfully established, 
        //the callback function is executed, which simply logs "connected to mongo" to the console
        console.log("connected to mongo");
    })
    mongoose.connection.on('error', (err) => {
        console.log("error occur", err);
    })
}
module.exports = con;