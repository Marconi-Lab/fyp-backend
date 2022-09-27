const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const routes = require('./routes/index');

const app = express();

dotenv.config({ path: "./.env" });
const port = process.env.PORT || 3000;

// -------------------database connection------------------
mongoose.connect("mongodb://localhost:27017/").then(() => {
    console.log('Database connected successfully');
});

// -------------------------------------------------

app.use(bodyParser.json());

app.get("/", (req, res) => res.json({ msg: "FYP backend API" }));
app.use('/api',routes);

app.listen(port ,() => {
    console.log(`API running at http://127.0.0.1:${port}`)
});
