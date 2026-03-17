const express = require("express");
const router = express.Router();

const { signup, login, verifyOTP } = require("../controllers/authController");

// signup route
router.post("/signup", signup);
// login route
router.post("/login", login);

router.post("/verify-otp", verifyOTP);

module.exports = router;