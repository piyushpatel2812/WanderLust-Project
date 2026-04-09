const Listing= require("../models/listing");
const Booking = require("../models/booking");
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
module.exports.searchListing = async (req,res)=>{
    let {search} = req.query;
    if(!search){
        return res.redirect("/listings");
    }
    const allListings = await Listing.find({
        $or:[
            {title:{$regex:search,$options:"i"}},
            {location:{$regex:search,$options:"i"}},
            {country:{$regex:search,$options:"i"}}
        ]
    });

    res.render("listings/index.ejs",{allListings});
}

//  filter route 
// CATEGORY FILTER
module.exports.filterCategory = async(req,res)=>{
    let {category} = req.params;

    const allListings = await Listing.find({category:category});

    res.render("listings/index.ejs",{allListings});
}

// / booking 
module.exports.createBooking = async (req, res) => {
  try {
      if (!req.user) {
      req.flash("error", "Please login to book");
      return res.redirect("/users/login");
    }
    let { id } = req.params;
    let { checkIn, checkOut } = req.body;

    // basic validation
    if (!checkIn || !checkOut) {
      req.flash("error", "Please select valid dates");
      return res.redirect(`/listings/${id}`);
    }

    let start = new Date(checkIn);// checkout humesha checlin ke baad hioga 
    let end = new Date(checkOut);

    if (end <= start) {
      req.flash("error", "Check-out must be after check-in");
      return res.redirect(`/listings/${id}`);
    }

    // get listing price
    const listing = await Listing.findById(id);

    // calculate nights
    let nights = (end - start) / (1000 * 60 * 60 * 24);
    let totalPrice = nights * listing.price;

    // 🔥 overlap check
    let existingBookings = await Booking.find({ listing: id });

    for (let booking of existingBookings) {
      if (
        start < booking.checkOut &&
        end > booking.checkIn
      ) {
        req.flash("error", "Dates already booked!");
        return res.redirect(`/listings/${id}`);
      }
    }

    // create booking
    const newBooking = new Booking({
      user: req.user._id,
      listing: id,
      checkIn: start,
      checkOut: end,
      totalPrice
    });

    await newBooking.save();

    req.flash("success", "Booking successful!");
    res.redirect(`/listings/${id}`);

  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong");
    res.redirect(`/listings/${req.params.id}`);
  }
};