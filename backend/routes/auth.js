const express = require("express");
const app = express()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User")
const router = express.Router();
// const SECRET_KEY = 'abc3210?!>$'
const { validationResult, body } = require('express-validator');
const fetchuser = require("../middleware/fetchuser")
router.post('/createuser', [
        body('name').isLength({ min: 2 }),
        body('email').isEmail(),
        body('password').isLength({ min: 7 })
    ], async(req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        //const user = User(req.body)
        //user.save()
        //res.send(req.body);
        try {
            let check = await User.findOne({ email: req.body.email });
            console.log(check, 'check')
            if (check) {
                return res.status(400).json({ error: "Please enter an unique email" })
            }
            var salt = bcrypt.genSaltSync(10);
            var hash = await bcrypt.hash(req.body.password, salt);
            let user = await User.create({
                    name: req.body.name,
                    password: hash,
                    email: req.body.email
                })
                //const authtoken = jwt.sign({ id: user.id }, process.env.SECRET);
                //res.json({ authtoken });
        } catch (error) {
            console.log(error)
        }
    })
    //user login
    // ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async(req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign({ id: user.id }, process.env.SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


});

//user details
router.post('/getuser', fetchuser, async(req, res) => {
    try {
        console.log(req.user)
        const userId = req.user; // Replace with the actual ObjectId
        const user = await User.findById(userId).select("-password");
        //console.log(user)
        // Concatenate the message with the user object
        res.status(200).send({ user, message: "This is success for login" });
    } catch (error) {
        console.log("Error occurred while this user:");
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;