module.exports = (sequelize, DataTypes) => {
	const Categories = sequelize.define("Category",{
		category_name: {
			type: DataTypes.STRING(50),
			allowNull: false
		} 
	});
	return Categories;
}