const express = require("express");
const app = express()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User")
const Image = require("../models/Image")
const router = express.Router();
const SECRET_KEY = 'abc3210?!>$'
const { validationResult, body } = require('express-validator');
const fetchuser = require("../middleware/fetchuser")
router.post("/", fetchuser, async(req, res) => {
    //res.json({ note: "this is a note" })
    try {
        let image = await Image.create({
            title: req.body.title,
            link: req.body.link,
            user: req.user
        })
        res.json(image);
    } catch (error) {
        console.log(error, "backend errror")
    }
})
router.post("/displayimages", fetchuser, async(req, res) => {
    try {
        const userId = req.user; // Replace with the actual ObjectId
        console.log(userId)
        const user = await Image.find({ user: userId })
            // here this user has document of thecorresponding id
        console.log(user)
        res.send(user)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})
router.post("/deleteimage", fetchuser, async(req, res) => {
    try {
        const userId = req.user;
        const { id } = req.body;
        console.log(userId, id);
        // Find the user's note
        const deletedimage = await Image.findByIdAndDelete(id)
        console.log(deletedimage)
        if (deletedimage) {
            res.status(200).json({ success: true, message: "image deleted" });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    } catch (error) {
        // Handle errors and send a JSON response
        console.error(error, 'jj');
        res.status(500).json({ error: "Internal Server Error" });
    }
})
module.exports = router