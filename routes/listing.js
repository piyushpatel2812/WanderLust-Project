const express = require("express");
const router = express.Router();
const wrapAsync=require("../utilis/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


// // CURD

router.route("/")
.get(wrapAsync(listingController.index))// // 1.index route
// // 4.Create : create route // wrapAsync handle custom error
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));

 // // 3. create : new route 
router.get("/new",isLoggedIn,listingController.renderNewForm);

// search route
router.get("/search", wrapAsync(listingController.searchListing));

router.route("/:id")
// // 2.Read : show route
.get(wrapAsync(listingController.showListing))

// // 5.update: route
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))

// // 6. Delete route 
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


// // 5. update : edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router;