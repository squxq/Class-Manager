const router = require(`express`).Router()

const {
    signupGet,
    signup,
} = require(`../controllers/signup.js`)

router.get(`/`, signupGet)
router.post(`/`, signup)

module.exports = router