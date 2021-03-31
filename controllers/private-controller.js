const express = require("express");
const router = express.Router();
const db = require("../models");

const isAuthenticated = require("../config/middleware/isAuthenticated");
const mapper = require("../utils/mappers");

router.get("/authenticated", isAuthenticated, (req, res) => {
	res.render("authenticated");
});
router.get("/addnew", isAuthenticated, async (req, res) => {
<<<<<<< HEAD
	try {
		let categories = await getAllCategories();
		categories = mapCategories(categories);

		res.render("addnew", { categories });
	} catch (err) {
		if (err) return res.status(500).end();
	}
=======
  try {
    let categories = await getAllCategories();
    categories = mapper.mapCategories(categories);

    res.render("addnew", { categories });
  } catch (err) {
    if (err) return res.status(500).end();
  }
>>>>>>> 64ea837ecb30f207d2c4526a31d0efcb93d12ee5
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

<<<<<<< HEAD
router.get("/buildoutfit", async (req, res) => {
	try {
		if (req.session.cat_id) {
=======
router.get("/buildoutfit", isAuthenticated, async (req,res) =>{
	try{
		if(req.session.cat_id){
>>>>>>> 64ea837ecb30f207d2c4526a31d0efcb93d12ee5
			var items = await getAllItemsByCategory(req.session.cat_id, req.user.id);
			items = mapper.mapItems(items);
		}
		if(req.session.outfit_name){
			var staging = await getOutfit(req.session.outfit_name); 
		}else{
			var staging = await getAllStaging();

		}
		let categories = await getAllCategories();
		let catalogs = await getAllCatalogs(req.user.id);

		
		catalogs = mapper.mapCatalogs(catalogs);
		categories = mapper.mapCategories(categories);
		staging = mapper.mapStaging(staging)
		

<<<<<<< HEAD
		catalogs = mapCatalogs(catalogs);
		categories = mapCategories(categories);
		staging = mapStaging(staging)
		console.log(categories)
		console.log(items)
		console.log(catalogs)
		console.log(staging)
		res.render("buildOutfit2", { categories: categories, newOutfititems: items, catalogs: catalogs, staging: staging });
	} catch (err) {
		if (err) console.log(err)
=======
		res.render("buildOutfit2", {categories: categories, newOutfititems: items, catalogs: catalogs, staging: staging} );
	}catch(err){
		if(err) console.log(err)
>>>>>>> 64ea837ecb30f207d2c4526a31d0efcb93d12ee5
		//if(err) return res.status(500).end();
	}
});

<<<<<<< HEAD
router.post("/buildoutfit", (req, res) => {
	req.session.cat_id = req.body.cat_id;
	console.log(req.body.id)
	res.redirect("/buildoutfit")
});

router.post("/staging", async (req, res) => {
=======
router.post("/buildoutfit", isAuthenticated, (req, res) =>{
	req.session.cat_id = req.body.cat_id; 
	res.redirect("/buildoutfit");
});

router.post("/searchoutfit", isAuthenticated, (req, res) => {
	req.session.outfit_name = req.body.outfit_name; 
	res.redirect("/buildoutfit");
})

router.post("/staging", isAuthenticated, async (req,res) => {
>>>>>>> 64ea837ecb30f207d2c4526a31d0efcb93d12ee5
	console.log(req.body)
	await insertStaging(req.body.item);
	res.redirect("/buildoutfit")

});
router.post("/addoutfit", isAuthenticated, async (req, res) =>{
 	let items = await getAllStaging();
 	items = mapper.mapStaging(items); 

 	let catalog_id = req.body.id;
 	let outfit_name = req.body.outfit_name; 

 	let result = await insertOutfit(outfit_name);

 	await insertCatalogItem(catalog_id, result.dataValues.id);
 	
 	items.forEach(item =>{
 		insertOutfitItem(item, result.dataValues.id)
 	})

 	await deleteAllStaging();

 	res.redirect("/buildoutfit")
})

// const getAllCategories = () => {
//   return db.Categories.findAll({
//     attributes: ["id", "category_name"],
//   });
// };

//-------------------------------test
router.get("/catalog", isAuthenticated, async (req, res) => {
	try {
		console.log(req.session.cat_id);
		if(req.session.cat_id){
			var outfits = await getAllOutfits(req.session.cat_id, req.user.id)
			console.log(outfits);
		}
		
		let catalog = await getAllCatalogs(req.user.id);
		catalog = mapCatalogs(catalog);
		console.log(catalog);

		res.render("catalog", { catalogs: catalog });
	} catch (err) {
		if (err) console.log(err)//res.status(500).end();
	}
});

router.post("/catalog", isAuthenticated, (req, res) => {
	req.session.cat_id = req.body.id;
	console.log(req.session.cat_id);
	console.log(req.body.id);
	res.redirect("/catalog");
	
});

const getAllCategories = () => {
	return db.Categories.findAll({
		attributes: ["id", "category_name"]
	})
};

<<<<<<< HEAD
//---------------------------------------test
const getAllOutfits = (catId, userId) => {
	return db.Catalog_item.findAll({
		where: { catalogId: catId },
		include: [{
			model: db.Outfit,
			required: true,
			include: [{
				model: db.Outfit_item,
				required: true,
				include: [{
					model: db.Item,
					required: true,
					where: { userId: userId }
				}]
			}]
		}]
	})
}

const mapCategories = (categories) => {
	return categories.map((category) => ({
		id: category.dataValues.id,
		category: category.dataValues.category_name,
	}));
};
=======
>>>>>>> 64ea837ecb30f207d2c4526a31d0efcb93d12ee5
const getAllCatalogs = (user_id) => {
	return db.Catalog.findAll({
		attributes: ["id", "catalog_name"],
		where: {
			UserId: user_id
		}
	})
};
<<<<<<< HEAD
const mapCatalogs = (catalogs) => {
	return catalogs.map(catalog =>
		({ id: catalog.dataValues.id, catalog: catalog.dataValues.catalog_name }));
};
=======

const getOutfit = (outfit_name) => {
	return db.Outfit_item.findAll({ 
		include: [{
			model: db.Item, 
			required: true, 
			attributes: ["id", "item_name", "image_link"]
		},
		{
			model: db.Outfit, 
			required: true, 
			where: {outfit_name: outfit_name}, 
			attribute: ["outfit_name"]
		}]
	})
}
>>>>>>> 64ea837ecb30f207d2c4526a31d0efcb93d12ee5
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
<<<<<<< HEAD
const getAllItemsByCategory = (cat_id, user_id) => {
=======

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

const getAllItemsByCategory = (cat_id, user_id) =>{
>>>>>>> 64ea837ecb30f207d2c4526a31d0efcb93d12ee5
	return db.Item.findAll({
		where: { CategoryId: cat_id, userId: user_id }
	});
};
<<<<<<< HEAD
const mapItems = (items) => {
	return items.map(item =>
	({
		id: item.dataValues.id, item_name: item.dataValues.item_name,
		image: item.dataValues.image_link
	}));
};
const mapStaging = (items) => {
	return items.map(item =>
	({
		id: item.dataValues.item_id, item_name: item.dataValues.name,
		image: item.dataValues.img
	}));
};
=======
>>>>>>> 64ea837ecb30f207d2c4526a31d0efcb93d12ee5

module.exports = router;
