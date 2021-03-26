const express = require("express"); 
const session = require("express-session");
const exphbs = require('express-handlebars')
const path = require('path');
require("dotenv").config();

const passport = require("./config/passport");

const PORT = process.env.PORT || 5000; 
const db = require("./models");

const app = express(); 
app.use(express.urlencoded({ extended: true}));
app.use(express.json()); 
app.use(express.static("public")); 

app.engine("handlebars", exphbs({ defaultLayout: "main"})); 
app.set("view engine", "handlebars"); 

app.use(session({ secret: process.env.SECRET_KEY, resave:true, saveUninitialized: true}))
app.use(session({ secret: "keyboard cat", resave:true, saveUninitialized: true}))
app.use(passport.initialize());  
app.use(passport.session());

const publicRouter = require("./controllers/public-controller.js");
const authRouter = require("./controllers/auth-controller.js");
const privateRouter = require("./controllers/private-controller.js");
app.use(publicRouter);
app.use(authRouter);
app.use(privateRouter);


db.sequelize.sync().then( () =>{
	app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	})
});