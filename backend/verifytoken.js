const jwt = require('jsonwebtoken')

function verify(req, res, next) {
    const authheader = req.headers.token
    if (authheader) {
        const token = authheader.split(" ")[ 1 ]

        jwt.verify(token, process.env.REACT_APP_SECRET_KEY, (err, user) => {
            if (err) res.status(403).json("Token not valid!")
            req.user = user
        })
    }
    else {
        return res.status(401).json("You are not authenticated!!")
    }
    next()
}
module.exports = verify