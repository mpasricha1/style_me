module.exports = (sequelize, DataTypes) => {
	const Outfit_item = sequelize.define("Outfit_item", {
		item_id: {
			type: DataTypes.INTEGER, 
			allowNull: false
		}, 
		outfit_id: {
			type: DataTypes.INTEGER, 
			allowNull: false
		}
	});

	Outfit_item.associate = (models) =>{ 
		models.Outfit_item.belongsTo(models.Item, {foreignKey: { allowNull: true}});
		models.Outfit_item.belongsTo(models.Outfit, {foreignKey: { allowNull: true}}); 
	}

	return Outfit_item;
}