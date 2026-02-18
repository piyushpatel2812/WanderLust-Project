const express =require("express");
const app =express();
const mongoose=require("mongoose");
const path =require("path");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError=require("./utilis/ExpressError.js");



const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

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


app.get("/",(req,res)=>{// api 
    res.send("hii,I am root");
})


// // express routes file access
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews)

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