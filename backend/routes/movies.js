const router = require("express").Router()
const Movie = require('../models/Movie')

const verify = require("../verifytoken")

//CREATE
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body)
        try {
            const savedMovie = await newMovie.save()
            res.status(200).json(savedMovie)
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
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true })
            res.status(200).json(updatedMovie)
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
            await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json("Movie deleted successfully")
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
router.get("/find/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)

        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
)

//GET RANDOM movie/series to display on top
router.get("/random", verify, async (req, res) => {
    const type = req.query.type
    let movie
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } }
            ])
        } else {
            movie = await Movie.aggregate([
                // { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ])
        }
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
)

//GET ALL
//GET
router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {

        try {
            const movie = await Movie.find()

            res.status(200).json(movie.reverse())
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}
)

module.exports = router
