const express = require("express"); 
const router = express.Router(); 
const passport = require("../config/passport");
const db = require("../models");

router.post("/login", passport.authenticate("local", {
		successRedirect: "/authenticated",
		failureRedirect: "/login", 
		failureFlash: true
	}
));

router.get("/logout", (req, res) =>{
	req.logout();
	res.redirect("/");
});

router.post("/signup", (req,res) =>{
	db.User.create({
		full_name: `${req.body.first_name} ${req.body.last_name}`, 
		first_name: req.body.first_name, 
		last_name: req.body.last_name, 
		email: req.body.email, 
		password: req.body.password,
	})
	.then( () =>{
		res.redirect(307, "/login");
	})
	.catch((err) =>{
		res.status(401).json(err);
	})
});

module.exports = router;