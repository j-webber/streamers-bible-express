const express = require("express");
const {
  createCheckoutSession,
  webhook,
} = require("../controllers/stripeController");
const router = express.Router();
const bodyParser = require("body-parser");

router.post("/create-checkout-session", createCheckoutSession);
router.post("/webhook", bodyParser.raw({ type: "application/json" }), webhook);

module.exports = router;
