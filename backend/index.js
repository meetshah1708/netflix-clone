const express = require("express")
const mongoose = require("mongoose")
const app = express()
const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users")
const moviesRoute = require("./routes/movies")
const listsRoute = require("./routes/lists")
const dotenv = require('dotenv')
const cors = require("cors")
//const bodyParser = require("body-parser")
dotenv.config()
mongoose.connect("mongodb://127.0.0.1:27017/netflix", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log(err))
app.use(cors())//fix cors
app.use(express.json())// to accept body
//app.use(bodyParser())     
app.use("/api/auth", authRoute)
app.use("/api/movies", moviesRoute)
app.use("/api/users", usersRoute)
app.use("/api/lists", listsRoute)


app.listen(8800, () => {
    console.log("Backend Server Running")
})