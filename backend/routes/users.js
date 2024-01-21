const router = require("express").Router()
const User = require('../models/User')
const Crypto = require('crypto-js')
const verify = require("../verifytoken")

//UPDATE
router.put("/:id", verify, async (req, res) => {
    if (req.body.id = req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = await Crypto.AES.encrypt(req.body.password, process.env.REACT_APP_SECRET_KEY).toString()
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { // put async await wisely 
                $set: req.body // updates anything that is changed
            },
                { new: true }// to see updated doc there itself  
            )
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        res.status(403).json("You can only update your account!!!")
    }
}
)

//DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.body.id = req.params.id || req.user.isAdmin) { // check if u r correct user or admin 
        if (req.body.password) {
            req.body.password = Crypto.AES.encrypt(req.body.password, process.env.REACT_APP_SECRET_KEY).toString()
        }

        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User deleted successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        res.status(403).json("You can only delete your account!!!")
    }
}
)

//GET
router.get("/find/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...info } = user._doc
        res.status(200).json(info)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
)

//GET ALL USERS
router.get("/", verify, async (req, res) => {
    const query = req.query.new
    if (req.user.isAdmin) { // check if u r admin 
        try {
            const users = query ? await User.find().limit(3) : await User.find()

            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    else {
        res.status(403).json("You are not allowed to see all users")
    }
}
)

//GET USER STATS
router.get("/stats", async (req, res) => {
    const today = new Date()
    const lastyear = today.setFullYear(today.setFullYear() - 1)
    const monthsarray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
    try {
        const data = await User.aggregate([
            {
                $project: {
                    month : {$month : "$createdAt"}
                }
            },
            {
                $group: {
                    _id: "$month",         // id will show in which month user joined
                    total : {$sum : 1},
                }
            }
        ])
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }

})

module.exports = router
