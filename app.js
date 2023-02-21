const path = require("path");
const dotenv = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const port = process.env.PORT || 5000;

// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const app = express();

const bodyParser = require("body-parser");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//stripe checkout session
const YOUR_DOMAIN = "http://localhost:5000";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1McxpKJnHZGYEpzIEOT91BRB",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/`,
    automatic_tax: { enabled: false },
  });

  res.redirect(303, session.url);
});

//stripe fulfillment. after completed checkout send magiclink email
app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (request, response) => {
    const payload = request.body;
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      // Retrieve the session data.
      const checkoutSessionData = event.data.object;
      //get customer email from session data
      const customerEmail = checkoutSessionData.customer_details.email;

      console.log(customerEmail);
    }

    response.status(200).end();
  }
);

app.listen(port, () => console.log(`Server started on port ${port}`));
