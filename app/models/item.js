module.exports = (sequelize, DataTypes) =>{
	const Item = sequelize.define("Item", {
		user_id: {
			type: DataTypes.INTEGER, 
			allowNull: false
		}, 
		category_id: {
			type: DataTypes.INTEGER, 
			allowNull: false 
		}, 
		item_name: {
			type: DataTypes.INTEGER, 
			allowNull: false
		}, 
		product_link: DataTypes.STRING(255), 
		image_link: {
			type: DataTypes.STRING(255), 
			allowNull: false
		}
	})

	Item.associate = (models) =>{ 
		models.Item.belongsTo(models.User,{foreignKey: { allowNull: false}});
		models.Item.belongsTo(models.Catalog, {foreignKey: { allowNull: false}});
		models.Item.belongsTo(models.Categories, {foreignKey: { allowNull: false}});
		models.Item.hasMany(models.Outfit_item);
		models.Item.hasMany(models.Tag);
	};

	return Item;
}