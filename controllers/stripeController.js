const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//stripe checkout session
const YOUR_DOMAIN = "http://localhost:5000";
const createCheckoutSession = async (req, res) => {
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
};

//handle completed checkout - send magiclink
//to test with stripe cli run 'stripe listen --forward-to localhost:5000/stripe/webhook' in the terminal
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const webhook = async (request, response) => {
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
    //get customer ID
    const customer = await stripe.customers.search({
      query: `email:\'${customerEmail}\'`,
    });
    const customerID = customer.data[0].id;
    //need to create a post request to createUser
  }

  response.status(200).end();
};

module.exports = { createCheckoutSession, webhook };
