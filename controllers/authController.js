const jwt = require("jsonwebtoken");
const { sendMagicLinkEmail } = require("../mailer");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//creates new jsonwebtoken
const newToken = (id) => {
  return jwt.sign({ userID: id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const newUser = async (req, res) => {
  const { newUserInfo } = body.req;
  const newUseremail = newUserInfo.email;
  const newUserID = newUserInfo.id;

  try {
    const token = newToken(newUserID);
    await sendMagicLinkEmail({ email: newUseremail, token });
  } catch (error) {
    return res.send("Error logging in. Please try again.");
  }
  res.send("Check your email to finish logging in");
};

const logIn = async (req, res) => {
  console.log("logging in...");
};

const verifyToken = async (req, res) => {
  const token = req.query.token;
  if (token == null) return res.sendStatus(401);

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

module.exports = { newUser, logIn, verifyToken };
