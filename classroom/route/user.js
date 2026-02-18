const express = require("express");
const router = express.Router();

// index route
router.get("/",(req,res)=>{

res.send("GET for user");
})
// show user
router.get("/:id",(req,res)=>{

res.send("GET for user");
})
// post-user
router.post("/",(req,res)=>{

res.send("POST for user");
})

//delete route
router.delete("/",(req,res)=>{

res.send("delete for users");

});

module.exports = router;