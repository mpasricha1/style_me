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
	let message = req.flash("message")
	res.render("login", { message }); 
	
});

router.get("/signup", (req,res) =>{
	res.render("signup");
});

router.get("/buildOutfit",(req,res) =>{
	res.render("buildOutfit");
});

module.exports = router;