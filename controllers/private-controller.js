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
		if(req.session.cat_id){
			var items = await getAllItemsByCategory(req.session.cat_id, req.user.id);
			items = mapper.mapItemsCats(items);
		}
		if(req.session.outfit_name){
			var staging = await getOutfitItems(req.session.outfit_name);
			staging = mapper.mapItems(staging)

			await deleteAllStaging(); 

			for(const item of staging){
				await insertStaging(item)
			}

		}

		let catalogs = await getAllCatalogs(req.user.id);
		let categories = await getAllCategories();
		staging = await getAllStaging();
	
		catalogs = mapper.mapCatalogs(catalogs);
		categories = mapper.mapCategories(categories);
		staging = mapper.mapStaging(staging)
		
		console.log(items)
		console.log(staging)
		

		res.render("buildOutfit2", {categories: categories, newOutfititems: items, catalogs: catalogs, stagings: staging} );
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
	res.redirect("/buildoutfit")

});
router.post("/addoutfit", isAuthenticated, async (req, res) =>{
	try{
		let items = await getAllStaging();
 		items = mapper.mapStaging(items); 

 		let catalog_id = req.body.id;
 		let outfit_name = req.body.outfit_name; 

 		let result = await insertOutfit(outfit_name);

 		await insertCatalogItem(catalog_id, result.dataValues.id);
 	
 		items.forEach(item =>{
 			insertOutfitItem(item, result.dataValues.id)
 		});

 		await deleteAllStaging();

 		res.redirect("/buildoutfit")
	}catch(err){
		if(err) console.log(err)
		//if(err) return res.status(500).end();
	};
	
});

// const getAllCategories = () => {
//   return db.Categories.findAll({
//     attributes: ["id", "category_name"],
//   });
// };

//-------------------------------test
router.get("/catalog", isAuthenticated, async (req, res) => {
	try {
		if(req.session.cat_id){
			var outfits = await getAllOutfits(req.session.cat_id, req.user.id)
			console.log(outfits);
		}
		
		let catalog = await getAllCatalogs(req.user.id);
		catalog = mapper.mapCatalogs(catalog);
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

//---------------------------------------test
const getAllOutfits = (catId, userId) => {
	return db.Catalog_item.findAll({
		raw: true,
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
};

const getAllCatalogs = (user_id) => {
	console.log(db.Catalog);
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

const getAllStaging = () => {
	return db.Outfit_staging.findAll({
		raw: true
	});
};
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
const getAllItemsByCategory = (cat_id, user_id) => {
	return db.Item.findAll({
		raw: true,
		where: { CategoryId: cat_id, userId: user_id }
	});
};

module.exports = router;
