const express = require("express");
const router = express.Router();
const wrapAsync=require("../utilis/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

// // CURD
// // 1.index route
router.get("/",wrapAsync(async(req,res)=>{
   const allListings=await Listing.find({});
        res.render("listings/index.ejs",{allListings});
    }));


    // // 3. create : new route 
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs");
});

// // 2.Read : show route
router.get("/:id",wrapAsync(async(req,res)=>{
    //extrect id 
    let {id}=req.params;
   const listing = await Listing.findById(id)
   .populate({
    path:"reviews",
    populate:{
        path:"author",
    },
   })
   .populate("owner");
   if(!listing){
    req.flash("error","Listing you requested for does not exist !");
    res.redirect("/listing");
   }
   console.log(listing);
   res.render("listings/show.ejs",{listing});
}));


// // 4.Create : create route // wrapAsync handle custom error
router.post("/",isLoggedIn,validateListing,wrapAsync(async(req,res,next)=>{
const newListing = new Listing(req.body.listing);

newListing.owner = req.user._id;
await newListing.save();
req.flash("success","New Listing Created!");
res.redirect("/listings");


// console.log(listing);
})
);

// // 5. update : edit route

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
        let {id}=req.params;
   const listing = await Listing.findById(id);
     if(!listing){
    req.flash("error","Listing you requested for does not exist !");
    res.redirect("/listing");
   }
   res.render("listings/edit.ejs",{listing});


}));

// // 5.update: route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(async (req,res)=>{
      let {id}=req.params;
   await  Listing.findByIdAndUpdate(id,{...req.body.listing});
   req.flash("success","Listing Updated!");
   res.redirect(`/listings/${id}`);
}));

// // 6. Delete route 
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async (req,res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," Listing Deleted!");
    res.redirect("/listings");
}));

module.exports = router;