const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

passport.use(new LocalStrategy(
	{
		usernameField: "email",
		passwordField: "password",
		passReqToCallback: true
	},
	(req,email, password, done) =>{
		db.User.findOne({
			where: {
				email: email
			}
		}).then( (dbUser) => {
			if(!dbUser || !dbUser.validPassword(password)){
				return done(null, false, req.flash("message" ,"Invalid username or password."));
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