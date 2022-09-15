const express = require("express");
const mongoose = require("mongoose");
const routes = require('./routes/routes');
const url = "mongodb://localhost:27017/marconi";

mongoose.connect(url);
const db = mongoose.connection;
db.once('open', _ =>{
    console.log('Database connected')
}) 
db.on('error',err =>{
    console.error('connection error:',err)
})

const app = express();

app.use(express.json());

app.use('/api',routes);

app.listen(3000, () =>{
    console.log("Server Started at ${3000}")
})
