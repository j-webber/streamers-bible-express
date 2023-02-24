const express = require("express");
const { logIn, verifyToken } = require("../controllers/authController");
const router = express.Router();

router.post("/login", express.urlencoded({ extended: true }), logIn);
router.get("/verify", verifyToken);
module.exports = router;
