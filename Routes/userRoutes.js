const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const { authenticateToken } = require("../utilities"); 


router.post("/create-account", userController.newUser);

router.post("/login",  userController.existingUser);

router.get("/get-user", authenticateToken, userController.isUser);

module.exports = router;