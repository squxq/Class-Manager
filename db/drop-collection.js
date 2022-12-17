const User = require(`../models/User.js`)
const mongoose = require(`mongoose`)

const connectDB = (url) => {
    return mongoose.connect(url)
}
mongoose.set(`strictQuery`, false)

async function deleteItems () {
    await connectDB(`mongodb+srv://squxq:Apessoa2007@nodeexpressprojects.3tukuxo.mongodb.net/Class-Manager?retryWrites=true&w=majority`)
    await User.deleteMany({})
}

deleteItems()