const User = require(`../models/User.js`)
const mongoose = require(`mongoose`)

require(`dotenv`).config()

const connectDB = (url) => {
    return mongoose.connect(url)
}
mongoose.set(`strictQuery`, false)

async function deleteItems () {
    await connectDB(process.env.MONGODB_URI)
    await User.deleteMany({})
}

deleteItems()