const jwt = require("jsonwebtoken");
const { sendMagicLinkEmail } = require("../utils/mailer");
const { newToken } = require("../utils/newToken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const logIn = async (req, res) => {
  console.log("logging in...");
};

const verifyToken = async (req, res) => {
  const token = req.query.token;
  if (token == null) return res.sendStatus(401);

  //it's returning the wrong user ID - need to play around with stripe.data.find
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const stripeCusomterList = await stripe.customers.list;
    const user = stripeCusomterList.data.find(
      (u) => u.id === decodedToken.user.id
    );
    res.send(`Authed as ${user.name}`);
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = { logIn, verifyToken };
