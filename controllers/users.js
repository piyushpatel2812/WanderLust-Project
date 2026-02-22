const User = require("../models/user.js");

// // signUp
module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
};


module.exports.signup = async(req,res,)=>{
    try{
 let {username,email,password}=req.body;
    const newUser = new User({email,username});
    const registerUser = await User.register(newUser,password);
   console.log(registerUser);
   req.login(registerUser,(err)=>{
    if(err){
        return next(err);
    }
     req.flash("success","welcome to Wanderlust !");
   res.redirect("/listings");
    });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
   
};

// login form
module.exports.renderLoginForm =(req,res)=>{
    res.render("users/login.ejs");
};