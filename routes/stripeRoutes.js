const express = require("express");
const {
  createCheckoutSession,
  webhook,
} = require("../controllers/stripeController");
const router = express.Router();

router.post(
  "/create-checkout-session",
  express.urlencoded({ extended: true }),
  createCheckoutSession
);
router.post("/webhook", express.raw({ type: "application/json" }), webhook);

module.exports = router;
