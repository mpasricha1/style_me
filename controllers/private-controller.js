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
		categories = mapCategories(categories);

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

router.get("/buildoutfit", async (req,res) =>{
	try{
		let categories = await getAllCategories(); 
		categories = mapCategories(categories);

		let items = await getAllItemsByCategory(14);
		items = mapItems(items);
		console.log(categories)
		console.log(items)
		

		res.render("buildOutfit", {categories: categories, newOutfititems: items});
	}catch(err){
		if (err) throw err;
	}
});

router.post("/buildoutfit/:id", isAuthenticated, async(req, res) =>{
	
});

const getAllCategories = () => {
	return db.Categories.findAll({
		attributes: ["id", "category_name"]
	})
};
const mapCategories = (categories) =>{
	return categories.map(category => 
	 			({id: category.dataValues.id, category: category.dataValues.category_name}));
};
const getAllItemsByCategory = (id) =>{
	return db.Item.findAll({
		include: [
			{
				model: db.Categories, 
				where: {
					id: id
				}
			}
		]
	})
};
const mapItems = (items) =>{
	return items.map(item => 
	 			({id: item.dataValues.id, item_name: item.dataValues.item_name, 
	 			   thumbnail: item.dataValues.image_thumbnail}));
};

module.exports = router;