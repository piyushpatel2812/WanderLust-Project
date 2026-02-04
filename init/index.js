const mongoose =require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
// // call main fucntion 
main()
.then(() =>{
    console.log("connected to DB")
})
.catch((err) =>{
    console.log(err);
});

// // create datbase
async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await Listing.deleteMany({});//agr phele se random data hai usko dlt karega
   await Listing.insertMany(initData.data);//initdata apne app pe object h 
   console.log("data was intilized")
};
initDB();
