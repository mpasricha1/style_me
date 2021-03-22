module.exports = (sequelize, DataTypes) =>{
	const Tags = sequelize.define("Tags", {
		item_id: {
			type: DataTypes.INTEGER, 
			allowNull: false,
			references: {
				model: "items", 
				key: "id"
			}
		},
		tag: {
			type: DataTypes.STRING(20), 
			allowNull: false
		}
	});
	return Tags;
}