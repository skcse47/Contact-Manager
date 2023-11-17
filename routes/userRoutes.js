const express = require("express");
const verifyToken = require("../middleware/validatetokenHandler");

const router = express.Router();
const {
    register,
    loginUser,
    currentUser,
    Users
} = require("../Controller/userController")

router.post(('/register'), register);

router.get(('/users'), Users);

router.post(('/login'), loginUser);

router.post(('/currentUser'), verifyToken, currentUser);

// if endpoint is same like ('/') then we can use 
// router.route('/').post(loginUser).post(register)

module.exports = router;


