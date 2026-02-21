const express =require("express");
const app =express();
const mongoose=require("mongoose");
const path =require("path");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError=require("./utilis/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");



const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

// // call main fucntion 
main()
.then(() =>{
    console.log("connected to Db")
})
.catch((err) =>{
    console.log(err);
});

// // create datbase
async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const sessionOption = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    // // cookie humare data ko 1 weak tak store krega 
    cookie : {
           expires: Date.now() + 7 * 24 * 60 *60 * 1000,
           maxAge: 7 * 24 * 60 *60 * 1000,
           httpOnly: true
            },
};

app.get("/",(req,res)=>{// api 
    res.send("hii,I am root");
})

app.use(session(sessionOption));
app.use(flash());// flash ko humko route se use krna poadega 

// // use passport for authentication it also use session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());// user se related info store  krna session pe  
passport.deserializeUser(User.deserializeUser());// user se related info unstore  krna session pe

app.use((req,res,next)=>{
    res.locals.success =req.flash("success");
     res.locals.error =req.flash("error");
    next();
});

// // demo user
// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User({
//         email:"student@gmail.com",
//         username:"delta-student",
//     });
//  let registeredUser = await User.register(fakeUser,"helloworld");
//  res.send(registeredUser);
// })

// // express routes file access
app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter)
app.use("/",userRouter);

// // middleware fro error handling /* for all route
app.use((req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
});

app.use((err,req,res,next)=>{
    // // throw express error;
    // // jab bhi error ayega usko deconstruct krege
    let {statusCode=500,message="Something went wrong"}=err;
    // // then send res 
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message});
    
// res.send("something went wrong!");
})

// start server 
app.listen(8080,()=>{
console.log("server is listening port 8080");
})