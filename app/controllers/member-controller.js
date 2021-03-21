const express = require("express"); 
const router = express.Router(); 
const db = require("../models");

router.get("/authenticated", isAuthenticated, (req,res) =>{
	res.render("authenticated")
})