const express = require("express"); 
const router = express.Router(); 
const db = require("../models");

router.get("/", (req, res) =>{
	res.render("landing");
});

router.get("/login", (req, res) =>{
	if (req.user){
		res.redirect("/authenticated");
	}
	res.render("login"); 
	
});

router.get("/signup", (req,res) =>{
	res.render("signup");
});

module.exports = router;