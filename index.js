const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/");

const app = express();

dotenv.config({ debug: true, path: "./.env" });

const port = process.env.PORT || 3000;

// -------------------database connection------------------
mongoose.connect("mongodb://localhost:27017/backend").then(() => {
  console.log("Database connected successfully");
});
// -------------------------------------------------

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ msg: "FYP backend API" }));
app.use("/", routes);

app.listen(port, () => {
  console.log(`API running at http://127.0.0.1:${port}`);
});
