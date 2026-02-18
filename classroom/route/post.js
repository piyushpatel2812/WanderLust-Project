const express = require("express");
const router = express.Router();



// // post route

// index route
router.get("/",(req,res)=>{

res.send("GET for post");
})
// show user
router.get("/:id",(req,res)=>{

res.send("GET for post");
})
// post-user
router.post("/",(req,res)=>{

res.send("POST for user");
})

//delete route
router.delete("/",(req,res)=>{

res.send("delete for post");

});

module.exports = router;