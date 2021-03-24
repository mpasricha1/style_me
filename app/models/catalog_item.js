module.exports = (sequelize, DataTypes) => {
	const Catalog_item = sequelize.define("Catalog_item", {
		catalog_id: {
			type: DataTypes.INTEGER, 
			allowNull: false
		},
		item_id: {
			type: DataTypes.INTEGER, 
			allowNull: false
		}
	}); 

	Catalog_item.associate = (models) =>{ 
		models.Catalog_item.belongsTo(models.Item, {foreignKey: { allowNull: false}});
		models.Catalog_item.belongsTo(models.Catalog, {foreignKey: { allowNull: false}}); 
	}

	return Catalog_item;
}
