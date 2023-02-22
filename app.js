const path = require("path");
const crypto = require("node:crypto");
const dotenv = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//const crypto = require("node:crypto");
const express = require("express");
const port = process.env.PORT || 5000;

const app = express();

//set static folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => console.log(`Server started on port ${port}`));

//route stripe requests
app.use("/stripe", require("./routes/stripeRoutes"));
//route auth requests
app.use("/auth", require("./routes/authRoutes"));

//need to update to latest version of Node - currently on 16.18.0

// crypto.subtle
//   .generateKey(
//     {
//       name: "HMAC",
//       has: { name: "SHA-256" },
//     },
//     true,
//     ["sign", "verify"]
//   )
//   .then((key) => {
//     crypto.subtle.exportKey("jwt", key).then((exported) => {
//       console.log(exported.k);
//     });
//   });
