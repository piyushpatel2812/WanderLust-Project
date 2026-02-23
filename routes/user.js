const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utilis/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl}= require("../middleware.js");
const userController = require("../controllers/users.js");
// // signUp
router.get("/signup",userController.renderSignupForm)

router.post("/signup",wrapAsync (userController.signup));

// // login user

router.get("/login",userController.renderLoginForm)
router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
   userController.login
);
// // logout user
router.get("/logout",userController.logout)


module.exports = router;