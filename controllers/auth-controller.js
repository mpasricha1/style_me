const express = require("express"); 
const router = express.Router(); 
const passport = require("../config/passport");
const db = require("../models");

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.render('authenticated'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.json({detail: info});
        });
    })(req, res, next);
});

router.get("/logout", (req, res ) =>{
	req.logout();
	res.redirect("/");
});

router.post("/signup", (req,res) =>{
	console.log(req.body)
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