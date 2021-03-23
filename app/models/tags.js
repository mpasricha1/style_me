module.exports = (sequelize, DataTypes) =>{
	const Tag = sequelize.define("Tag", {
		item_id: {
			type: DataTypes.INTEGER, 
			allowNull: false
		},
		tag: {
			type: DataTypes.STRING(20), 
			allowNull: false
		}
	});

	Tag.associate = (models) => {models.Tag.belongsTo(models.Item, {foreignKey: { allowNull: true}})}; 
	return Tag;
}