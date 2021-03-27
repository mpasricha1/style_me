const bcrypt = require("bcrypt"); 

module.exports = (sequelize, DataTypes) =>{
	const User = sequelize.define("User", {
		full_name: {
			type: DataTypes.STRING(50),
			allowNull: false 
		}, 
		first_name:{
			type: DataTypes.STRING(25), 
			allowNull: false
		}, 
		last_name: {
			type: DataTypes.STRING(25),
			allowNull: false
		}, 
		email: {
			type: DataTypes.STRING(25), 
			allowNull: false, 
			unique: true, 
			validate: {
				isEmail: true
			}
		}, 
		password: {
			type: DataTypes.STRING(255), 
			allowNull: false
		},
		// status: {
		// 	type: DataTypes.ENUM("active", "inactive"), 
		// 	defaultValue: "active"
		// },
		// last_login: DataTypes.DATE,
		age: DataTypes.INTEGER, 
		gender: DataTypes.STRING(15)
	});

	User.prototype.validPassword = function(password){
		return bcrypt.compareSync(password, this.password); 
	};
	User.addHook("beforeCreate", (user) =>{
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
	});

	User.associate = (models) => {models.User.hasMany(models.Item, {onDelete: "cascade"})};
	
	return User;
}
