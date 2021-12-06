const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    // console.log(req)
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        sliceToken = token.slice(11, token.length - 1)
        jwt.verify(sliceToken, "userVerify", (err, user) => {
            if (err) {
                // res.send(404);
                res.send("not verified")
            }
            else {
                req.user = user;
                // console.log(user);
                next()

            };
        });
    } else {
        res.send("Token Invalid");
    };
};


/* this our middleware function in this we are verifying the token which we have created while login 
 this middleware we are using for authonticate the user is right or wrong*/
