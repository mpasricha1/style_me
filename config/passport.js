const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

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

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
  	db.User.findOne({
  		where: {
  			google_id: profile.id
  		}
  	}).then( (dbUser) => {
  		if(!dbUser){
  			console.log("In no User")
  			db.User.create({
  				full_name: profile.displayName, 
  				google_id: profile.id
  			}).then( (data) => {
  				profile.google_id = profile.id; 
  				profile.id = data.id;
  			})
  		}
  		profile.google_id = profile.id; 
  		profile.id = dbUser.dataValues.id;
        userProfile=profile;
     	return done(null, userProfile);
  	})
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;
