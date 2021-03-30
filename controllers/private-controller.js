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
		if(err) return res.status(500).end();
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
		if(req.session.cat_id){
			var items = await getAllItemsByCategory(req.session.cat_id, req.user.id);
			items = mapItems(items);
		}
		let categories = await getAllCategories(); 
		categories = mapCategories(categories);
		
		res.render("buildOutfit", {categories: categories, newOutfititems: items} );
	}catch(err){
		if(err) return res.status(500).end();
	}
});

router.post("/buildoutfit", (req, res) =>{
	req.session.cat_id = req.body.id;  
	res.redirect("/buildoutfit")
});

const getAllCategories = () => {
	return db.Categories.findAll({
		attributes: ["id", "category_name"]
	})
};

//-------------------------------test
// router.get("/catalog", async (req,res) =>{
// 	try{
// 		if(req.session.cat_id){
// 			var items = await getAllItemsByCategory(req.session.cat_id, req.user.id);
// 			items = mapItems(items);
// 		}
// 		let categories = await getAllCategories(); 
// 		categories = mapCategories(categories);
		
// 		res.render("catalog", {categories: categories, newOutfititems: items} );
// 	}catch(err){
// 		if(err) return res.status(500).end();
// 	}
// });

// router.post("/catalog", (req, res) =>{
// 	req.session.cat_id = req.body.id;  
// 	res.redirect("/catalog")
// });

// const getAllCategories = () => {
// 	return db.Categories.findAll({
// 		attributes: ["id", "category_name"]
// 	})
// };

//---------------------------------------test
const mapCategories = (categories) => {
	return categories.map(category => 
	 			({id: category.dataValues.id, category: category.dataValues.category_name}));
};
const getAllItemsByCategory = (cat_id, user_id) =>{
	return db.Item.findAll({
		where: {CategoryId: cat_id, userId: user_id}
	});
};
const mapItems = (items) =>{
	return items.map(item => 
	 			({id: item.dataValues.id, item_name: item.dataValues.item_name, 
	 			   thumbnail: item.dataValues.image_thumbnail}));
};

module.exports = router;

//SELECT outfit_name
// FROM Catalogs c
// INNER JOIN catalog_items ci ON c.id = ci.catalog_id
// INNER JOIN outfits o ON o.Id = ci.outfit_id
// WHERE c.UserID = 1
// 	  AND c.id = 1