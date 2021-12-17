const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {

    const authHeader = req.headers["Authorization"] || req.headers["authorization"];
    // console.log(authHeader);
    if (authHeader) {
        
        jwt.verify(authHeader, "loginToken", (err, user) => {
            if (err) {
                // res.send(404);
                res.send("not verified")
            }
            else {
                req.user = user;
                // console.log(user) 
                // res.send("user is right")
                next()
            };
        });
    } else {
        res.send("Token Invalid");
    };
};


/* this our middleware function in this we are verifying the token which we have created while login 
 this middleware we are using for authonticate the user is right or wrong*/
