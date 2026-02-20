const express = require("express");
const router = express.Router();
const wrapAsync=require("../utilis/wrapAsync.js");
const ExpressError=require("../utilis/ExpressError.js");
const {listingSchema}=require("../schema.js");
const Listing=require("../models/listing.js");


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


// // CURD
// // 1.index route
router.get("/",wrapAsync(async(req,res)=>{
   const allListings=await Listing.find({});
        res.render("listings/index.ejs",{allListings});
    }));


    // // 3. create : new route 
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
});

// // 2.Read : show route
router.get("/:id",wrapAsync(async(req,res)=>{
    //extrect id 
    let {id}=req.params;
   const listing = await Listing.findById(id).populate("reviews");
   if(!listing){
    req.flash("error","Listing you requested for does not exist !");
    res.redirect("/listing");
   }
   res.render("listings/show.ejs",{listing});
}));


// // 4.Create : create route // wrapAsync handle custom error
router.post("/",validateListing,wrapAsync(async(req,res,next)=>{
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
req.flash("success","New Listing Created!");
res.redirect("/listings");


// console.log(listing);
})
);

// // 5. update : edit route

router.get("/:id/edit",wrapAsync(async (req,res)=>{
        let {id}=req.params;
   const listing = await Listing.findById(id);
     if(!listing){
    req.flash("error","Listing you requested for does not exist !");
    res.redirect("/listing");
   }
   res.render("listings/edit.ejs",{listing});


}));

// // 5.update: route
router.put("/:id",validateListing,wrapAsync(async (req,res)=>{
      let {id}=req.params;
   await  Listing.findByIdAndUpdate(id,{...req.body.listing});
   req.flash("success","Listing Updated!");
   res.redirect(`/listings/${id}`);
}));

// // 6. Delete route 
router.delete("/:id",wrapAsync(async (req,res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," Listing Deleted!");
    res.redirect("/listings");
}));

module.exports = router;