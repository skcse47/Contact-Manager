const asyncHandler = require("express-async-handler")
const user = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//@desc Register User
//@route POST api/register
//@access public
const register = asyncHandler(async(req,res) => {
    const {username,email,password} = req.body;
    const findEmail = await user.findOne({email});

    const hashPassword = await bcrypt.hash(password, 10);
    if(findEmail){
        res.status(400)
        throw new Error("Email already Exist.");
    }else{
        const registerUser = user.create({
            username,
            email,
            password: hashPassword
        });
        if(registerUser){
            res.status(201).json(registerUser);
        }else{
            res.status(400)
            throw new Error("user data is not valid")
        }
        
    }
    
});

//@desc Login User
//@route POST api/login
//@access public
const loginUser = asyncHandler(async(req,res) => {

    const {email, password} = req.body;
    
    const checkLogin = await user.findOne({email});

    if(checkLogin && (await bcrypt.compare(password, checkLogin.password))){
        const accessToken = jwt.sign({
            user:{
                email: checkLogin.email,
                username:checkLogin.username,
                id: checkLogin.id
            }
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "20m"}
    );

        res.json({accessToken})
    }else{
        res.status(401);
        throw new Error("innnnvaliddd")
    }
});

//@desc Current User
//@route POST api/currentUser
//@access public
const currentUser = asyncHandler(async(req,res) => {
    res.json(req.user);
});

//@desc All User
//@route POST api/users
//@access public
const Users = asyncHandler(async(req,res) => {
    const allUsers = await user.find();

    if(allUsers){
        res.status(200).json({allUsers});
    }else{
        res.status(400);
        throw new Error("Not found");
    }
});


module.exports = {register, loginUser, currentUser, Users};