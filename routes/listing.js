const express = require("express");
const router = express.Router();
const wrapAsync=require("../utilis/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");


// // CURD
// // 1.index route
router.get("/",wrapAsync(listingController.index));

 // // 3. create : new route 
router.get("/new",isLoggedIn,listingController.renderNewForm);

// // 2.Read : show route
router.get("/:id",wrapAsync(listingController.showListing));

// // 4.Create : create route // wrapAsync handle custom error
router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing)
);

// // 5. update : edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

// // 5.update: route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));

// // 6. Delete route 
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

module.exports = router;