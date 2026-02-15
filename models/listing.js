const mongoose =require("mongoose");
const Schema =mongoose.Schema;// store schema 
const Review = require("./review.js");
// // schema 
const listingSchema = new Schema({
    title:
    {
      type:String,
      required:true,
    },
    description:String,
   
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1769008301484-4589fa2bb0ce?q=80&w=1170&auto=format&fit=crop",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1769008301484-4589fa2bb0ce?q=80&w=1170&auto=format&fit=crop"
          : v,
    },
  },
    price:Number,
    location:String,
    country:String,
    reviews:[
      {
        type: Schema.Types.ObjectId,
        ref:"Review",
      }
    ]
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
  await Review.deleteMany({_id : {$in : listing.reviews}});
  }

});


// create model 
const Listing = mongoose.model("Listing",listingSchema);
module.exports=Listing;