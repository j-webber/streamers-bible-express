const jwt = require("jsonwebtoken");
const { sendMagicLinkEmail } = require("../mailer");

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
  console.log("logging in...");
};

module.exports = { newUser, logIn, verifyToken };
