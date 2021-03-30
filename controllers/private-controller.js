const express = require("express");
const router = express.Router();
const db = require("../models");

const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/authenticated", isAuthenticated, (req, res) => {
  res.render("authenticated");
});
router.get("/addnew", isAuthenticated, async (req, res) => {
  try {
    let categories = await getAllCategories();
    categories = mapCategories(categories);

    res.render("addnew", { categories });
  } catch (err) {
    if (err) return res.status(500).end();
  }
});

router.post("/addnew", isAuthenticated, (req, res) => {
  db.Item.create({
    UserId: req.user.id,
    CategoryId: req.body.id,
    item_name: req.body.item_name,
    image_link: req.body.image,
    image_thumbnail: req.body.thumbnail,
  });

  res.redirect("/addnew");
});

router.get("/buildoutfit", isAuthenticated, async (req,res) =>{
	try{
		if(req.session.cat_id){
			var items = await getAllItemsByCategory(req.session.cat_id, req.user.id);
			items = mapItems(items);
		}
		let categories = await getAllCategories(); 
		let catalogs = await getAllCatalogs(req.user.id);
		let staging = await getAllStaging();


		catalogs = mapCatalogs(catalogs);
		categories = mapCategories(categories);
		staging = mapStaging(staging)
		res.render("buildOutfit2", {categories: categories, newOutfititems: items, catalogs: catalogs, staging: staging} );
	}catch(err){
		if(err) console.log(err)
		//if(err) return res.status(500).end();
	}
});

router.post("/buildoutfit", isAuthenticated, (req, res) =>{
	req.session.cat_id = req.body.cat_id; 
	console.log(req.body.id)
	res.redirect("/buildoutfit")
});

router.post("/staging", isAuthenticated, async (req,res) => {
	console.log(req.body)
	await insertStaging(req.body.item); 
	res.redirect("/buildoutfit")

});
router.post("/addoutfit", isAuthenticated, async (req, res) =>{
 	let items = await getAllStaging();
 	items = mapStaging(items); 
 	let catalog_id = req.body.id;
 	let outfit_name = req.body.name; 

 	let result = await insertOutfit(outfit_name);

 	await insertCatalogItem(catalog_id, result.dataValues.id);
 	
 	items.forEach(item =>{
 		insertOutfitItem(item, result.dataValues.id)
 	})

 	await deleteAllStaging();

 	res.redirect("/buildoutfit")
})

const getAllCategories = () => {
  return db.Categories.findAll({
    attributes: ["id", "category_name"],
  });
};

const getAllCatalogs = (user_id) => {
	return db.Catalog.findAll({
		attributes: ["id", "catalog_name"], 
		where: {
			UserId: user_id
		}
	})
};
const getAllStaging = () => {
	return db.Outfit_staging.findAll();
}; 
const deleteAllStaging = () => {
	db.Outfit_staging.destroy({
		truncate: true
	})
}; 
const insertStaging = (item) => {
	db.Outfit_staging.create({
		item_id: item.id, 
		img: item.img, 
		name: item.name
	})
};

const insertOutfit = (outfit_name) => {
	return db.Outfit.create({
		outfit_name: outfit_name
	})
};

const insertOutfitItem = (item, outfit_id) =>{
	db.Outfit_item.create({
		ItemId: item.id, 
		OutfitId: outfit_id
	})
};

const insertCatalogItem = (catalog_id, outfit_id) =>{
	db.Catalog_item.create({
		CatalogId: catalog_id, 
		OutfitId: outfit_id
	})
}



const mapCategories = (categories) => {
	return categories.map(category => 
	 			({id: category.dataValues.id, category: category.dataValues.category_name}));
};

const getAllItemsByCategory = (cat_id, user_id) =>{
	return db.Item.findAll({
		where: {CategoryId: cat_id, userId: user_id}
	});
};
const mapCatalogs = (catalogs) => {
	return catalogs.map(catalog => 
	 			({id: catalog.dataValues.id, catalog: catalog.dataValues.catalog_name}));
};
const mapItems = (items) =>{
	return items.map(item => 
	 			({id: item.dataValues.id, item_name: item.dataValues.item_name, 
	 			   image: item.dataValues.image_link}));
};
const mapStaging = (items) =>{
	return items.map(item => 
	 			({id: item.dataValues.item_id, item_name: item.dataValues.name, 
	 			   image: item.dataValues.img}));
};

module.exports = router;
