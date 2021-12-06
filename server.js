const express = require("express");
const db = require("./db_connection/db_connect");
const signup = require("./controllers/signupAndLogin");
const route = require("./routers/routes");
// const public = require("./public/index.html");

var app = express();
// app.use(express.static((__dirname, 'public')))
app.use(express.json());


// In this file our server who is helping us to run our routes

app.use('/', route);

app.listen(8080, () => {
    console.log("server is running......");
}); 
