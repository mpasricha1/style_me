module.exports = {
	mapCategories: (categories) => {
	return categories.map(category => 
	 			({id: category.id, category: category.category_name}));
	}, 
	 mapCatalogs: (catalogs) => {
	return catalogs.map(catalog => 
	 			({id: catalog.id, catalog: catalog.catalog_name}));
	},
	mapItemsCats: (items) =>{
	return items.map(item => 
	 			({id: item.id, item_name: item.item_name, 
	 			   image: item.image_link}));
	},
	mapItems: (items) =>{
	return items.map(item => 
	 			({id: item['Item.id'], name: item['Item.item_name'], 
	 			   img: item['Item.image_link']}));
	},
	mapStaging: (items) =>{
	return items.map(item => 
	 			({id: item.item_id, item_name: item.name, 
	 			   image: item.img}));
	 },
	 mapOutfit: (outfits) =>{
		let outfit = [...new Set(outfits.map(outfit => ({
			 id: outfit.OutfitId,
			 item_name: outfit["Outfit.outfit_name"], 
			 image: outfit["Outfit.Outfit_items.Item.image_link"]
			})))];

		return outfit
	}
	 
};
