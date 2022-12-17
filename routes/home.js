const router = require(`express`).Router()

const home = require(`../controllers/home.js`)

router.get(`/`, home)

module.exports = router