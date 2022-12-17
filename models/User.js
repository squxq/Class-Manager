const mongoose = require(`mongoose`)
const bcrypt = require(`bcryptjs`)
const jwt = require(`jsonwebtoken`)

require(`dotenv`).config()

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, `Please provide a valid first name.`],
    },
    lastname: {
        type: String,
        required: [true, `Please enter a valid last name.`],
    },
    email: {
        type: String,
        required: [true, `Please enter a valid email.`],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please provide valid email.`],
        unique: true,
    },
    password: {
        type: String,
        required: [true, `Please enter a valid password.`],
        minlength: [8, `Minimum password length is 8 characters.`],
    },
}, { timestamps: true })

UserSchema.pre(`save`, async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
        return next(error)
    }
})


UserSchema.methods.createToken = function () {
    return jwt.sign(
        {
            id: this._id,
            firstname: this.firstname,
            lastname: this.lastname, 
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME_MINS | 0 }
    )
}


UserSchema.methods.comparePasswords = async function(password) {
    return await bcrypt.compare(password, this.password)
}


module.exports = mongoose.model(`Users`, UserSchema)