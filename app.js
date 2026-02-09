const express =require("express");
const app =express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js")
const path =require("path");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");
const { render } = require("ejs");


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
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get("/",(req,res)=>{// api 
    res.send("hii,I am root");
})
// // CURD
// // 1.index route
app.get("/listings",async(req,res)=>{
   const allListings=await Listing.find({});
        res.render("listings/index.ejs",{allListings});
    });


    // // 3. create : new route 
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

// // 2.Read : show route
app.get("/listings/:id",async(req,res)=>{
    //extrect id 
    let {id}=req.params;
   const listing = await Listing.findById(id);
   res.render("listings/show.ejs",{listing});
});

// // 4.Create : create route
app.post("/listings",async(req,res)=>{
// let {title,description,image,price,country,location}=req.body;
// let listing=req.body.listing;
const newListing = new Listing(req.body.listing);
await newListing.save();
res.redirect("/listings");
// console.log(listing);
});

// // 5. update : edit route

app.get("/listings/:id/edit",async (req,res)=>{
        let {id}=req.params;
   const listing = await Listing.findById(id);
   res.render("listings/edit.ejs",{listing});


});

// // 5.update: route
app.put("/listings/:id",async (req,res)=>{
      let {id}=req.params;
   await  Listing.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect(`/listings/${id}`);
});

// // 6. Delete route 
app.delete("/listings/:id",async (req,res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})

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


// // start server 
app.listen(8080,()=>{
console.log("server is listening port 8080");
})