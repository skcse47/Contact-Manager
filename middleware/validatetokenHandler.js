const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { Error } = require("mongoose");

const verifyToken = asyncHandler(async (req,res,next) =>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;    

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
            if(err){
                res.status(401)
                throw new Error("Invalid token")
            }else{
                console.log(decoded)
            }
            req.user = decoded.user;
            console.log(req.user)

            next();
        })
    }
})


module.exports = verifyToken




