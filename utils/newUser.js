const { newToken } = require("../utils/newToken");
const { sendMagicLinkEmail } = require("../utils/mailer");

async function createNewUser({ email, id }) {
  const token = newToken(id);
  return await sendMagicLinkEmail({ email, token });
}

module.exports = { createNewUser };
