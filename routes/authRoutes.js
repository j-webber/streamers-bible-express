const express = require("express");
const {
  newUser,
  logIn,
  verifyToken,
} = require("../controllers/authController");
const router = express.Router();

router.post("/newuser", express.json(), newUser);
router.post("/login", logIn);
router.post("/verify", verifyToken);
module.exports = router;
