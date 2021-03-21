module.exports = (sequelize, DataTypes) =>{
	const Item = sequelize.define("Item", {
		user_id: {
			type: DataTypes.INTEGER, 
			allowNull: false, 
			references: {
				model: "users",
				key: "id"
			} 
		}, 
		catalog_id: {
			type: DataTypes.INTEGER, 
			allowNull: false, 
			references: {
				model: "catalogs",
				key: "id"
			} 
		}, 
		category_id: {
			type: DataTypes.INTEGER, 
			allowNull: false, 
			references: {
				model: "categories",
				key: "id"
			}
		}, 
		item_name: {
			type: DataTypes.INTEGER, 
			allowNull: false
		}, 
		product_link: DataTypes.STRING(255)
	})
	return Item
}