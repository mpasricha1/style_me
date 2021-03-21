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
app.use(passport.initialize()); 
app.use(passport.session());


const loginRouter = require("./controllers/login-controller.js");
const memberRouter = require("./controllers/member-controller.js");
app.use(loginRouter);
app.use(memberRouter);
// require("./routes/api-routes.js")(app); 

db.sequelize.sync().then( () =>{
	app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	})
});