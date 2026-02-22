const Listing= require("../models/listing");


// // CURD
// // 1.index route

module.exports.index=async(req,res)=>{
   const allListings=await Listing.find({});
        res.render("listings/index.ejs",{allListings});
    }

 // // 2. create : new route 
    module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
}

// // 3.Read : show route
module.exports.showListing=async(req,res)=>{
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
}

// 4.Create : create route // wrapAsync handle custom error
module.exports.createListing = async(req,res,next)=>{
const newListing = new Listing(req.body.listing);
newListing.owner = req.user._id;
await newListing.save();
req.flash("success","New Listing Created!");
res.redirect("/listings");
}

// // 5. update : edit route
module.exports.renderEditForm=async (req,res)=>{
        let {id}=req.params;
   const listing = await Listing.findById(id);
     if(!listing){
    req.flash("error","Listing you requested for does not exist !");
    res.redirect("/listing");
   }
   res.render("listings/edit.ejs",{listing});
}
// // 5.update: route
module.exports.updateListing=async (req,res)=>{
      let {id}=req.params;
   await  Listing.findByIdAndUpdate(id,{...req.body.listing});
   req.flash("success","Listing Updated!");
   res.redirect(`/listings/${id}`);
}

// // 6. Delete route 
module.exports.destroyListing=async (req,res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," Listing Deleted!");
    res.redirect("/listings");
}