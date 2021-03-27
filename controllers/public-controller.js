const express = require("express"); 
const { Model } = require("sequelize/types");
const router = express.Router(); 
const db = require("../models");

router.get("/", (req, res) =>{
	res.render("landing");
});

router.get("/login", (req, res) =>{
	
	if (req.user){
		res.redirect("/authenticated");
	}
	let message = req.flash("message")
	res.render("login", { message }); 
	
});

router.get("/signup", (req,res) =>{
	res.render("signup");
});

router.get("/buildOutfit",(req,res) =>{
	res.render("buildOutfit");
});

//Example with SQL query
router.get("/buildoutfit", async (req, res)=>{
	//SQL Query
	const alloutfits = await Model.outfit_item.find({id: userId})

	//transform array
	const newOutfititems = alloutfits.map(item => {
		//pull out all outfits
	})

	res.render("buildOutfit", newOutfititems)
})
module.exports = router;