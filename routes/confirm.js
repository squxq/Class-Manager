const router = require(`express`).Router()
const path = require(`path`)

router.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, `..`, `public`, `html`, `confirm.html`))
})

module.exports = router