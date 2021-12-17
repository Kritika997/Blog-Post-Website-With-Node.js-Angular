const express = require("express");
const db = require("./db_connection/db_connect");
const signup = require("./controllers/signupAndLogin");
const route = require("./routers/routes");
const bodyParser = require("body-parser")
const cors = require("cors");
// const public = require("./public/index.html");

var app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
// app.use(express.static((__dirname, 'public'))) 
app.use(express.json());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// In this file our server who is helping us to run our routes

app.use('/', route);

app.listen(8080, () => {
    console.log("server is running......");
}); 
