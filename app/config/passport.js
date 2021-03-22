const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(new LocalStrategy(
	{
		usernameField: "email", 
		passwordField: "password"
	},
	(email, password, done) =>{
		db.User.findOne({
			where: {
				email: email
			}
		}).then( (dbUser) =>{
			console.log(dbUser);
			console.log(password);
			if(!dbUser || !dbUser.validPassword(password)){
				return done(null, false, {
					message: "Invalid username or password."
				});
			}
			return done(null, dbUser);
		});
	}	
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;