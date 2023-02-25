const jwt = require("jsonwebtoken");
const { sendMagicLinkEmail } = require("../utils/mailer");
const { newToken } = require("../utils/newToken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const logIn = async (req, res) => {
  const stripeCusomterList = await stripe.customers.list();
  const customers = stripeCusomterList.data;
  const customer = customers.find(
    (c) => c.email.toLowerCase() === req.body.email.toLowerCase()
  );

  if (customer != null) {
    try {
      const token = newToken(customer.id);
      await sendMagicLinkEmail({ email: customer.email, token });
    } catch (error) {
      return res.send("Error logging in. Please try again.");
    }
  }

  res.send("Check your email to finish logging in.");
};

const verifyToken = async (req, res) => {
  const token = req.query.token;
  if (token == null) return res.sendStatus(401);

  //this verifies token, then check's customer list to verify they are a valid user
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const stripeCusomterList = await stripe.customers.list();
    const customers = stripeCusomterList.data;
    const customer = customers.find((c) => c.id === decodedToken.userID);
    res.send(`Authed as ${customer.name}`);
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = { logIn, verifyToken };
