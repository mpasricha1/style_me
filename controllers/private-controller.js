const express = require("express");
const router = express.Router();
const db = require("../models");

const isAuthenticated = require("../config/middleware/isAuthenticated");
const mapper = require("../utils/mappers");

router.get("/addnew", isAuthenticated, async (req, res) => {
  try {
    let categories = await getAllCategories();
    categories = mapper.mapCategories(categories);

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

router.get("/buildoutfit", isAuthenticated, async (req , res) =>{
	try{
		console.log(req.session)
		if(req.session.cat_id){
			var items = await getAllItemsByCategory(req.session.cat_id, req.user.id);
			items = mapper.mapItemsCats(items);
		}
		if(req.session.outfit_name){
			var staging = await getOutfitItems(req.session.outfit_name); 
			var catalog_id = await getCatalogId(req.session.outfit_name); 
			var ids = {outfit_name: req.session.outfit_name, catalog_id: catalog_id['Catalog.id'] }
			req.session.id_data = ids; 

			staging = mapper.mapItems(staging); 

			delete req.session.outfit_name;
			await deleteAllStaging(); 

			for(const item of staging){
				await insertStaging(item)
			}
		};
		if(req.session.item_id){
			await deleteOneStanging(req.session.item_id);
			if(req.session.id_data){
				var outfit_id = await getOutfitId(req.session.id_data.outfit_name)
				console.log("Outfit id: " + req.session.item_id)
				await deleteOutfitItem(req.session.item_id, outfit_id.id);
			} 
			delete req.session.item_id;
		}

		let catalogs = await getAllCatalogs(req.user.id);
		let categories = await getAllCategories();
		staging = await getAllStaging();

		catalogs = mapper.mapCatalogs(catalogs);
		categories = mapper.mapCategories(categories);
		staging = mapper.mapStaging(staging)
		
		

		res.render("buildOutfit2", {categories: categories, newOutfititems: items, catalogs: catalogs, stagings: staging, ids: ids } );
	}catch(err){
		if(err) console.log(err)
		//if(err) return res.status(500).end();
	}
});

router.post("/buildoutfit", isAuthenticated, (req, res) =>{
	req.session.cat_id = req.body.cat_id;
	res.redirect("/buildoutfit");
});

router.post("/searchoutfit", isAuthenticated, (req, res) => {
	req.session.outfit_name = req.body.outfit_name;
	res.redirect("/buildoutfit");
})

router.post("/staging", isAuthenticated, async (req,res) => {
	await insertStaging(req.body.item);
	res.redirect("/buildoutfit");

});
router.post("/deleteoutfititem", isAuthenticated, (req,res) => {
	req.session.item_id = req.body.item_id; 
	res.redirect("/buildoutfit");
})
router.post("/addoutfit", isAuthenticated, async (req, res) =>{
	try{
		let items = await getAllStaging();
 		items = mapper.mapStaging(items); 

 		if (req.session.id_data){
 			var catalog_id = req.session.id_data.catalog_name;
 			var outfit_name = req.session.id_data.outfit_name;
 			var outfit_id = await getOutfitId(outfit_name); 
 			outfit_id = outfit_id.id;
 		}else{
 			var catalog_id = req.body.id;
 			var outfit_name = req.body.outfit_name;
 			var result = await insertOutfit(outfit_name);
 			var outfit_id = result.dataValues.id;

 			await insertCatalogItem(catalog_id, outfit_id);
 		}
 		
 		items.forEach(item =>{
 			insertOutfitItem(item, outfit_id)
 		});

 		await deleteAllStaging();

 		res.redirect("/buildoutfit")
	}catch(err){
		if(err) console.log(err)
		//if(err) return res.status(500).end();
	};
	
});
router.get("/catalog", isAuthenticated, async (req, res) => {
	try {
		await deleteAllStaging(); 
		if(req.session.cat_id){
			var outfits = await getAllOutfits(req.session.cat_id, req.user.id)
			outfits = mapper.mapOutfit(outfits);
			
		}
		
		let catalog = await getAllCatalogs(req.user.id);
		catalog = mapper.mapCatalogs(catalog);
		console.log(catalog);
		console.log(outfits);

		res.render("catalog", { catalogs: catalog, outfits: outfits });
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

router.get("/logout", (req, res ) =>{
	req.logout();
	res.redirect("/");
});

const getAllCategories = () => {
	return db.Categories.findAll({
		raw: true,
		attributes: ["id", "category_name"]
	})
};
const getAllOutfits = (catId, userId) => {
	return db.Catalog_item.findAll({
		raw: true, //img link, item id, item name, outfit name,
		where: { catalogId: catId },
		include: [{
			model: db.Outfit,
			required: true,
			attributes: ["outfit_name","id"],
			include: [{
				model: db.Outfit_item,
				required: true,
				include: [{
					model: db.Item,
					required: true,
					where: { userId: userId },
					attributes: ["image_link"]
				}]
			}]
		}]
	})
};

const getAllCatalogs = (user_id) => {
	return db.Catalog.findAll({
		raw: true,
		attributes: ["id", "catalog_name"],
		where: {
			UserId: user_id
		}
	})
};

const getOutfitItems = (outfit_name) => {
	return db.Outfit_item.findAll({
		raw: true,
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
};

const getOutfitId = (outfit_name) => {
	return db.Outfit.findOne({
		raw: true, 
		attribute: ["id"], 
		where: {outfit_name: outfit_name}
	})
};

const getCatalogId = (outfit_name) => {
	return db.Catalog_item.findOne({
		raw: true, 
		include: [{
			model: db.Catalog, 
			required: true
		},
		{
			model: db.Outfit, 
			required: true, 
			where: {outfit_name: outfit_name}
		}]
	})
}
 
const getAllStaging = () => {
	return db.Outfit_staging.findAll({
		raw: true
	});
};
const deleteOutfitItem = (item_id, outfit_id) =>{
	db.Outfit_item.destroy({
		where: {
			ItemId: item_id,
			OutfitId: outfit_id
		}
	})
}
const deleteOneStanging = (item_id) => {
	db.Outfit_staging.destroy({
		where: {
			Item_id: item_id
		}
	})
}
const deleteAllStaging = () => {
	return db.Outfit_staging.destroy({
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
	db.Outfit_item.findOrCreate({
		defaults: {
			ItemId: item.id, 
			OutfitId: outfit_id
		}, 
		where: {
			itemID: item.id, 
			OutfitId: outfit_id
		}
		
	})
};

const insertCatalogItem = (catalog_id, outfit_id) =>{
	console.log(catalog_id);
	db.Catalog_item.create({
		CatalogId: catalog_id, 
		OutfitId: outfit_id
	})
}
const getAllItemsByCategory = (cat_id, user_id) => {
	return db.Item.findAll({
		raw: true,
		where: { CategoryId: cat_id, userId: user_id }
	});
};

module.exports = router;
