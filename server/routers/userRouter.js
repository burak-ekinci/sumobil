const router = require("express").Router()
const passport = require("passport")
const UserController = require("../controllers/userController")

router.post("/signup", UserController.signUp)
router.post("/login", UserController.login)

module.exports = router




