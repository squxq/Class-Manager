const jwt = require(`jsonwebtoken`)
require(`dotenv`).config()

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token
        // check jwt exists and its verified
        if (!token) throw Error(`User is not logged in.`)
    
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) throw Error(`User is not logged in.`)

            console.log(decodedToken);
            next()
        })
    } catch (error) {
        res.redirect(`/login`)
    }
}

module.exports = auth