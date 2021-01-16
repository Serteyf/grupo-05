const express = require("express");
const router = express.Router();

const userController = require("../controllers/usersController");

router.get("/register", userController.showRegister);
router.get("/login", userController.showLogin);


module.exports = router;



