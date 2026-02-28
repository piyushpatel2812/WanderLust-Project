const Listing= require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

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
   .populate("owner")
   .populate({
    path:"reviews",
    populate:{
        path:"author",
    },
   })
   ;
   if(!listing){
    req.flash("error","Listing you requested for does not exist !");
    return res.redirect("/listings");
   }
   console.log(listing);
   res.render("listings/show.ejs",{listing});
}

// 4.Create : create route // wrapAsync handle custom error
module.exports.createListing = async(req,res,next)=>{
let response = await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1,
})
  .send();

    let url=req.file.path;
   let filename=req.file.filename;
const newListing = new Listing(req.body.listing);
newListing.owner = req.user._id;
newListing.image = {url,filename};

newListing.geometry = response.body.features[0].geometry;

let saveListing = await newListing.save();
console.log(saveListing);
req.flash("success","New Listing Created!");
res.redirect("/listings");
}

// // 5. update : edit route
module.exports.renderEditForm=async (req,res)=>{
        let {id}=req.params;
   const listing = await Listing.findById(id);
     if(!listing){
    req.flash("error","Listing you requested for does not exist !");
    return res.redirect("/listings");
   }
let originalImageUrl = listing.image.url;
originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");

   res.render("listings/edit.ejs",{listing,originalImageUrl});
};
// // 5.update: route
module.exports.updateListing=async (req,res)=>{
      let {id}=req.params;
  let listing= await  Listing.findByIdAndUpdate(id,{...req.body.listing});

  if(typeof req.file !== "undefined" ){
   let url=req.file.path;
   let filename=req.file.filename;
   listing.image = {url,filename};
   await listing.save();
  }
  

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

// 7. search route
// SEARCH LISTING
module.exports.searchListing = async (req, res) => {
    let { search } = req.query;

  if(!search){
        return res.redirect("/listings");
    }

    const allListings = await Listing.find({
        $or: [
            { title: { $regex: search, $options: "i" } },// i caseSenstive pe bhi kaam krega /$regex mtlb partial search 
            { location: { $regex: search, $options: "i" } }
        ]
    });

    res.render("listings/index.ejs", { allListings });
};
