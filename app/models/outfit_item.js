module.exports = (sequelize, DataTypes) => {
	const Outfit_item = sequelize.define("Outfit_item", {
		item_id: {
			type: DataTypes.INTEGER, 
			allowNull: false, 
			references: {
				model: "items", 
				key: "id"
			}
		}, 
		outfit_id: {
			type: DataTypes.INTEGER, 
			allowNull: false, 
			references: {
				model: "outfits", 
				key: "Id"
			}
		}
	});
	return Outfit_item;
}