const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");

const app = express();

// ================================== ROUTES =======================================
app.get("/", (req, res) => res.json({ msg: "FYP backend API" }));

dotenv.config({ path: "./config/.env" });
const port = process.env.PORT || 3000;

module.exports = app.listen(port, () =>
  console.log(`API running at http://127.0.0.1:${port}`)
);
