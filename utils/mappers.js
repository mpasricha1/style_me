module.exports = {
	mapCategories: (categories) => {
	return categories.map(category => 
	 			({id: category.dataValues.id, category: category.dataValues.category_name}));
	}, 
	 mapCatalogs: (catalogs) => {
	return catalogs.map(catalog => 
	 			({id: catalog.dataValues.id, catalog: catalog.dataValues.catalog_name}));
	},
	mapItems: (items) =>{
	return items.map(item => 
	 			({id: item.dataValues.id, item_name: item.dataValues.item_name, 
	 			   image: item.dataValues.image_link}));
	},
	mapStaging: (items) =>{
	return items.map(item => 
	 			({id: item.dataValues.item_id, item_name: item.dataValues.name, 
	 			   image: item.dataValues.img}));
	}
};
