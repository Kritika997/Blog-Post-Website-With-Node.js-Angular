const express = require("express");
const db = require("./db_connection/db_connect");
const signup = require("./controllers/signupAndLogin");
const route = require("./routers/routes");
var app = express();
app.use(express.json());

app.use('/', route);

app.listen(8080, () => {
    console.log("server is running......");
});
