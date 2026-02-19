const express =  require("express");
const app = express();
const posts=require("./route/post.js");
const users=require("./route/user.js");
const  cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello");
//     res.send("sent your some cookies");
// })


// app.get("/greet",(req,res)=>{
//     let {name ="anonymous"}=req.cookies;
//     res.send(`hii ${name}`);
// })

// app.get("/",(req,res)=>{//  route 
//     console.dir(req.cookies);
//     res.send("Hii,I am roota!");
// });

// app.use("/users",users);
// app.use("/posts",posts);

// // express - session 
const sessionOptions={
    secret : "mysupersecretstring",
    resave:false,
    saveUninitialized: true
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/register",(req,res)=>{
    let {name="anonyomus"}=req.query;
    req.session.name=name;
    if(name === "anonymous"){
        req.flash("error","user not registerd");
    }else{
        req.flash("success","user registered successfully!");
    }
   
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
 res.render("page.ejs",{name: req.session.name});
});


// app.get("/test",(req,res)=>{
//     res.send("test successful !");
// });

// app.get ("/recount",(req,res)=>{
//     if(req.session.count){
//        req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`you send a request ${req.session.count} times`);
// });

app.listen(3000,()=>{
    console.log("server is listening to 3000");
});