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
}); 

module.exports = router;