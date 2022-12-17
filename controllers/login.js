const User = require(`../models/User.js`)
const path = require(`path`)
const { StatusCodes } = require(`http-status-codes`)

require(`dotenv`).config()

const handleErrors = require("../errors/error_handler.js")

const loginGet = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'))
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            throw Error(`User not found.`)
        }
        const match = await user.comparePasswords(password)

        if (!match) {
            throw Error(`Incorrect password.`)
        }

        const token = user.createToken()

        res.cookie(`token`, token, { httpOnly: true })

        res
            .status(StatusCodes.OK)
            .json({ user: user._id })
    } catch (error) {
        const { email, password } = handleErrors(error)
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { email, password } })
    }
}

module.exports = { loginGet, login }