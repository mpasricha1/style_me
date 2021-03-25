const express = require("express"); 
const router = express.Router(); 
const db = require("../models");

router.get("/", (req, res) =>{
	res.send("Home Page");
});

router.get("/login", (req, res) =>{
	if (req.user){
		res.redirect("/authenticated");
	}
	let message = req.flash("message")
	console.log(message);
	res.render("login", { message }); 
	
});

router.get("/signup", (req,res) =>{
	res.render("signup");
});

module.exports = router;