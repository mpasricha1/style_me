module.exports = (sequelize, DataTypes) => {
	const Outfit = sequelize.define("Outfit", {
		outfit_name: {
			type: DataTypes.STRING(50), 
			allowNull: false
		}
	}); 
<<<<<<< HEAD
	Outfit.associate = (models) => {models.Outfit.hasMany(models.Outfit_item)};
	return Outfit;
=======

	Outfit.associate = (models) => {models.Outfit.hasMany(models.Outfit_item)};
	return Outfit;

	
>>>>>>> 64ea837ecb30f207d2c4526a31d0efcb93d12ee5
}