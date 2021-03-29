module.exports = (sequelize, DataTypes) =>{
	const Catalog = sequelize.define("Catalog", {
		catalog_name: {
			type: DataTypes.STRING(50), 
			allowNull: false
		}, 
	});

	Catalog.associate = (models) => {models.Catalog.hasMany(models.Catalog_item)};
	
	return Catalog;
}	