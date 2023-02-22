const jwt = require("jsonwebtoken");

const newUser = async (req, res) => {
  console.log("hello world");
};

const logIn = async (req, res) => {
  console.log("logging in...");
};

const verifyToken = async (req, res) => {
  console.log("logging in...");
};

module.exports = { newUser, logIn, verifyToken };
