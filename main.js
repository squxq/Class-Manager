require(`dotenv`).config()

const express = require(`express`)
const app = express()

const path = require(`path`)
const cookieParser = require(`cookie-parser`)

// static assets
app.use(express.static(path.join(__dirname, `public`)))

// database
const connectDB = require(`./db/connect.js`)

app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())
// cookie parser
app.use(cookieParser())

// ejs
app.set(`view engine`, `ejs`)

// home
const homeRouter = require(`./routes/home.js`)
app.use(`/`, homeRouter)

// login
const loginRouter = require(`./routes/login.js`)
app.use(`/login`, loginRouter)

// signup
const signupRouter = require(`./routes/signup.js`)
app.use(`/signup`, signupRouter)

// confirm 
const confirmRouter = require(`./routes/confirm.js`)
app.use(`/confirmation-link`, confirmRouter)

// auth middleware
const auth = require(`./middleware/auth.js`)

// dashboard
app.get(`/dashboard`, auth, (req, res) => {
    res.send(`<h1>dashboard</h1>`)
})


// route not found
app.get(`*`, (req, res) => {
    res.redirect(`/`)
})

// setting up the server
const port = process.env.PORT || 5000

const start = async () => {
    try {
        // mongoose.connect() returns a promise
        await connectDB(process.env.MONGODB_URI)
        app.listen(port, () => {
            console.log(`Server is connected to database and listening on port: ${port}...`);
        })
    } catch (error) {
        console.log(`Something went wrong.`);
    }
}

start ()