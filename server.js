const path = require("path");
const crypto = require("node:crypto");
const dotenv = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const port = process.env.PORT || 5000;

const app = express();

//set default path to views
app.set("views", path.join(__dirname, "views"));

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//set estension to res.render
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => console.log(`Server started on port ${port}`));

//route stripe requests
app.use("/stripe", require("./routes/stripeRoutes"));
//route auth requests
app.use("/auth", require("./routes/authRoutes"));

//use to generate a JWT Secret Key
// crypto.subtle
//   .generateKey(
//     {
//       name: "HMAC",
//       hash: { name: "SHA-256" },
//     },
//     true,
//     ["sign", "verify"]
//   )
//   .then((key) => {
//     crypto.subtle.exportKey("jwk", key).then((exported) => {
//       console.log(exported.k);
//     });
//   });
