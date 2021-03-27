const express = require("express"); 
const router = express.Router(); 
const db = require("../models");

const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/authenticated", isAuthenticated, (req,res) =>{
	res.render("authenticated")
}); 
router.get("/addnew", isAuthenticated, async (req,res) =>{
	try{
		let categories = await getAllCategories(); 
		categories = categories.map(category => 
	 			({id: category.dataValues.id, category: category.dataValues.category_name}));
		console.log(categories);
		res.render("addnew", {categories}); 
	}catch(err){
		if(err) throw err;
	}
}); 

router.post("/addnew", isAuthenticated, (req,res) =>{
	db.Item.create({
		UserId: req.user.id, 
		CategoryId: req.body.category_name, 
		item_name: req.body.item_name, 
		image_link: req.body.image, 
		image_thumbnail: req.body.thumbnail
	});
	res.redirect("/addnew");
}); 

router.get("/buildoutfit", isAuthenticated, (req,res) =>{
	res.render("buildOutfit");
});

const getAllCategories = () => {
	return db.Categories.findAll({
		attributes: ["id", "category_name"]
	})
}

module.exports = router;