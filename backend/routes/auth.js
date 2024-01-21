const router = require("express").Router()
const User = require("../models/User")
const Crypto = require('crypto-js')
// dotenv = require('dotenv') declare directly in main index.js
const jwt = require("jsonwebtoken")



//REGISTER
router.post("/register", async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: Crypto.AES.encrypt(req.body.password, process.env.REACT_APP_SECRET_KEY).toString()
    })

    try {
        console.log(newUser)
        const user = await newUser.save();
        res.status(201).json(user)
    } catch (e) {
        console.log(e)
        if (e.code == 11000) {
            res.status(400).json({ error: "Duplicate key. Username or email Already exists" })
        }
        else {

            res.status(500).json(e.message)
        }
    }
})

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(401).json("No user found!");

        const bytes = Crypto.AES.decrypt(user.password, process.env.REACT_APP_SECRET_KEY)

        //console.log(bytes)
        if (bytes) {

            const originalpassword = bytes.toString(Crypto.enc.Utf8)
            console.log(originalpassword)
            originalpassword !== req.body.password && res.status(401).json("Wrong password or email!!")
        }
        else {
            res.status(401).json("Login failed due to decryption issue")
            console.log("decryption failed")
        }
        const accesstoken = jwt.sign({ id: user._id, isAdmin: user.isAdmin },
            process.env.REACT_APP_SECRET_KEY,
            { expiresIn: "5d" }
        )
        const { password, ...info } = user._doc;// use  _doc to get data from database(mongodb) and this step to hide password 
        res.status(200).json({ info, accesstoken })

    } catch (e) {
        console.error(e)
    }
})
module.exports = router