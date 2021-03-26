const express = require("express"); 
const router = express.Router(); 
const db = require("../models");

router.get("/", (req, res) =>{
	res.render("landing");
});

let count = 0;
router.get("/login", (req, res) =>{
	
	count++; 
	if (req.user){
		res.redirect("/authenticated");
	}
	console.log("Count: " + count)
	let message = req.flash("message")
	console.log(message);
	res.render("login", { message }); 
	
});

router.get("/signup", (req,res) =>{
	res.render("signup");
});

module.exports = router;