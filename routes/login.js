const router = require(`express`).Router()

const {
    loginGet,
    login,
} = require(`../controllers/login.js`)

router.get(`/`, loginGet)
router.post(`/`, login)

module.exports = router