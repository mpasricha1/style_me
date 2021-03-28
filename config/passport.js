const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const randomGen = require("../utils/randomString.js");

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
  async (accessToken, refreshToken, profile, done) => {
  	try{
  		let dbUser = await db.User.findOne({ where: { google_id: profile.id }});

  		if(!dbUser){
  			console.log(randomGen.generateString());
  			let emailValue = await db.Counters.findOne({ attributes: ["google_email"]}); 
  			console.log(emailValue)
  			let data = await db.User.create({
  				full_name: profile.displayName, 
  				google_id: profile.id,
  				email: `trashgoogle${emailValue.dataValues.google_email}@trash.com`, 
  				password: randomGen.generateString()
  			});
  			profile.google_id = profile.id; 
  			profile.id = data.id;
  		}

  		profile.google_id = profile.id; 
  		profile.id = dbUser.dataValues.id;
        userProfile=profile;
     	return done(null, userProfile);
  		
  	}catch(err){
  		if (err) throw err;
  	}
  	// db.User.findOne({
  	// 	where: {
  	// 		google_id: profile.id
  	// 	}
  	// }).then( (dbUser) => {
  	// 	if(!dbUser){
  	// 		db.User.create({
  	// 			full_name: profile.displayName, 
  	// 			google_id: profile.id,
  	// 			email: 
  	// 		}).then( (data) => {
  	// 			profile.google_id = profile.id; 
  	// 			profile.id = data.id;
  	// 		})
  	// 	}
  	// 	profile.google_id = profile.id; 
  	// 	profile.id = dbUser.dataValues.id;
   //      userProfile=profile;
   //   	return done(null, userProfile);
  	// })
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;
