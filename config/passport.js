const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

const db = require("../models");
const keys = require("./keys");

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
// passport.use(new GoogleStrategy(
//     {
//       clientID: keys.google.clientID,
//       clientSecret: keys.google.clientSecret,
//       callbackURL: "/auth/google/redirect"
//     },
//     (accessToken, refreshToken, profile, done) => {
//     	console.log(profile)
//       // db.User.findOne({
//       // 	where: {
//       // 		googleID: profile.id
//       // 	}
//       // }).then( (dbUser) => {
//       // 	if(dbUser){
//       // 		done(null, dbUser)
//       // 	}else{

//       // 	}
//       // }) 
//     }
//   )
// );

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;