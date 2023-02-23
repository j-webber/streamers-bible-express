const sendGridMailer = require("@sendgrid/mail");
sendGridMailer.setApiKey(process.env.SENDGRID_API_KEY);

function sendMagicLinkEmail({ email, token }) {
  return sendGridMailer.send({
    to: email,
    from: process.env.FROM_EMAIL,
    subject: "Finish logging in",
    html: `<a href="http://localhost:5000/auth/verify?token=${token}">Log In</a>`,
  });
}

module.exports = { sendMagicLinkEmail };
