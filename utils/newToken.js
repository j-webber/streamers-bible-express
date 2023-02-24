const jwt = require("jsonwebtoken");

//creates new jsonwebtoken
const newToken = (id) => {
  return jwt.sign({ userID: id }, process.env.JWT_SECRET);
};

module.exports = { newToken };
