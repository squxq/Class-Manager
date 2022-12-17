const mongoose = require(`mongoose`)

const connectDB = (url) => {
    return mongoose.connect(url)
}

mongoose.set(`strictQuery`, false)

module.exports = connectDB