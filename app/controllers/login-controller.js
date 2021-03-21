const express = require("express"); 
const router = express.Router(); 
const passport = require("../config/passport");
const db = require("../models");

const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/login", (req, res) =>{
	res.render("login"); 
});

router.get("/signup", (req,res) =>{
	res.render("signup");
});
router.post("/api/login", passport.authenticate("local", {
		successRedirect: "/authenticated",
		failureRedirect: "/login" }));

router.post("/api/signup", (req,res) =>{
	db.User.create({
		full_name: `${req.body.firstname} ${req.body.lastname}`, 
		first_name: req.body.firstname, 
		last_name: req.body.lastname, 
		email: req.body.email, 
		password: req.body.password,
	})
	.then( () =>{
		res.redirect(307, "/api/login");
	})
	.catch((err) =>{
		res.status(401).json(err);
	})
});

module.exports = router;