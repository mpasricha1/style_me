const express = require("express"); 
const router = express.Router(); 
const db = require("../models");

const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/authenticated", isAuthenticated, (req,res) =>{
	res.render("authenticated")
}); 
router.get("/addnew", isAuthenticated, (req,res) =>{
	db.Categories.findAll({
		attributes: ["id", "category_name"]
	}).then( (dbCategories) =>{
		let categories = dbCategories.map(category => 
				({id: category.dataValues.id, category: category.dataValues.category_name}));
		res.render("addnew", {categories}); 
	});
}); 

router.post("/addnew", isAuthenticated, (req,res) =>{
	console.log(req.body)
	console.log(req.user)
	db.Item.create({
		UserId: req.user.id, 
		CategoryId: req.body.category_name, 
		item_name: req.body.item_name, 
		image_link: req.body.image, 
		image_thumbnail: req.body.thumbnail
	})
}); 

module.exports = router;