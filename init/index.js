require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// MongoDB URL from .env
const MONGO_URL = process.env.ATLASDB_URL;

// connect database
async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("connected to DB");
    console.log("Mongo URL:", MONGO_URL);   // ⭐ ye line add karo
  })
  .catch((err) => {
    console.log(err);
  });

// initialize database
const initDB = async () => {
  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => ({
    ...obj,
  owner: new mongoose.Types.ObjectId("69a1af22429def96b12c8d22")  }));

  await Listing.insertMany(initData.data);

  console.log("data was initialized");
};

initDB();