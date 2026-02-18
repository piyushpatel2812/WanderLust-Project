const express =  require("express");
const app = express();
const posts=require("./route/post.js");
const users=require("./route/user.js");
const  cookieParser = require("cookie-parser");
app.get("/getcookies",(req,res)=>{
    res.cookie("greet","hello");
    res.send("sent your some cookies");
})


app.get("/greet",(req,res)=>{
    let {name ="anonymous"}=req.cookies;
    res.send(`hii ${name}`);
})

app.get("/",(req,res)=>{//  route 
    console.dir(req.cookies);
    res.send("Hii,I am roota!");
});

app.use("/users",users);
app.use("/posts",posts);

app.listen(3000,()=>{
    console.log("server is listening to 3000");
});