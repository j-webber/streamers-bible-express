const path = require("path");
const dotenv = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const port = process.env.PORT || 5000;

const app = express();

//const bodyParser = require("body-parser");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => console.log(`Server started on port ${port}`));

//route stripe requests
app.use("/stripe", require("./routes/stripeRoutes"));
