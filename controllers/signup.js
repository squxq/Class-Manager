const User = require(`../models/User.js`)
const path = require(`path`)
const { StatusCodes } = require(`http-status-codes`)

require(`dotenv`).config()

const handleErrors = require(`../errors/error_handler.js`)

const signupGet = async (req, res) => {
    res
        .status(StatusCodes.OK)
        .sendFile(path.join(__dirname, '..', 'public', 'html', 'signup.html'))
}

const signup = async (req, res) => {
    try {
        const user = await User.create({ ...req.body })
        const token = await user.createToken()

        res.cookie(`token`, token, {
            httpOnly: true,
        })

        res
            .status(StatusCodes.CREATED)
            .json({ user: user._id })
    } catch (error) {
        const errors = handleErrors(error)
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors })
    }
}

module.exports = {
    signupGet,
    signup,
}