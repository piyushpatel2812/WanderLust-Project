const express =require("express");
const app =express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js")
const path =require("path");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");
const { render } = require("ejs");
const wrapAsync=require("./utilis/wrapAsync.js");
const ExpressError=require("./utilis/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const Review=require("./models/review.js")



const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
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

// // schema validation to middleware
const validateListing=(req,res,next)=>{
let {error}=listingSchema.validate(req.body);
if(error){
    let errMsg=error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400,errMsg);
}
else{
    next();
}
}

// review server side validation
const validateReview=(req,res,next)=>{
let {error}=reviewSchema.validate(req.body);
if(error){
    let errMsg=error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400,errMsg);
}
else{
    next();
}
}

// // CURD
// // 1.index route
app.get("/listings",wrapAsync(async(req,res)=>{
   const allListings=await Listing.find({});
        res.render("listings/index.ejs",{allListings});
    }));


    // // 3. create : new route 
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

// // 2.Read : show route
app.get("/listings/:id",wrapAsync(async(req,res)=>{
    //extrect id 
    let {id}=req.params;
   const listing = await Listing.findById(id).populate("reviews");
   res.render("listings/show.ejs",{listing});
}));

// // 4.Create : create route // wrapAsync handle custom error
app.post("/listings",validateListing,wrapAsync(async(req,res,next)=>{
// if(!req.body.listing){
//     throw new ExpressError(400,"send valid data for listing");
// }
  const newListing = new Listing(req.body.listing);
// //  use schema.js file so dont need to throw the error 
//   if(!newListing.title){
//     throw new ExpressError(400," Title is missing!");
// }
// if(!newListing.description){
//     throw new ExpressError(400," Description is missing!");
// }
// if(!newListing.location){
//     throw new ExpressError(400," Location is missing!");
// }
await newListing.save();
res.redirect("/listings");


// console.log(listing);
})
);

// // 5. update : edit route

app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
        let {id}=req.params;
   const listing = await Listing.findById(id);
   res.render("listings/edit.ejs",{listing});


}));

// // 5.update: route
app.put("/listings/:id",validateListing,wrapAsync(async (req,res)=>{
      let {id}=req.params;
   await  Listing.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect(`/listings/${id}`);
}));

// // 6. Delete route 
app.delete("/listings/:id",wrapAsync(async (req,res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

////  reviews
//  // post route
app.post("/listings/:id/reviews",validateReview,wrapAsync(async (req,res)=>{
        let listing =await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
        
        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        res.redirect(`/listings/${listing._id}`);

}));
// // review // delete route
app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
let {id,reviewId}=req.params;

await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
await Review.findByIdAndDelete(reviewId);

res.redirect(`/listings/${id}`);

}))


// // model access route
// app.get("/testListing",async(req,res) =>{
//     let sampleListing = new Listing({
//         title:"My New Villa",
//         description:"By the beach",
//         price:1200,
//         country:"India"
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successfull testing");
// });

// // middleware fro error handling
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