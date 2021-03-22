const express = require("express"); 
const router = express.Router(); 
const db = require("../models");

const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/authenticated", isAuthenticated, (req,res) =>{
	res.render("authenticated")
}); 

module.exports = router;