const router = require("express").Router()
const List = require('../models/List')

const verify = require("../verifytoken")

//CREATE
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body)
        try {
            const savedList = await newList.save()
            res.status(200).json(savedList)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        res.status(403).json("You are not allowed")
    }
}
)

//UPDATE
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {

        try {
            const updatedList = await List.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true })
            res.status(200).json(updatedList)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        res.status(403).json("You are not allowed")
    }
}
)

//DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.body.isAdmin) { // check if u r correct user or admin 

        try {
            await List.findByIdAndDelete(req.params.id)
            res.status(200).json("List deleted successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        res.status(403).json("You are not allowed")
    }
}
)

//GET
router.get("/", async (req, res) => {
    const typeQuery = req.query.type
    const genreQuery = req.query.genre
    let list = []
    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await List.aggregate([ {
                    $sample:{size : 10}
                },
                {$match:{type:typeQuery , genre:genreQuery}}
                ])
            } else {
                list = await List.aggregate([ { $sample: { size: 10 } },
                 {$match:{type:typeQuery }}
                ])
            }
        } else {
            list = await List.aggregate([ { $sample: { size: 10 } }])
        }
        res.status(200).json(list)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
)

//GET RANDOM List/series to display on top


//GET ALL
//GET
router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {

        try {
            const List = await List.find()

            res.status(200).json(List.reverse())
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}
)

module.exports = router
