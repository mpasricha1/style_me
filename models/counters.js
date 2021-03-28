module.exports = (sequelize, DataTypes) => {
	const Counters = sequelize.define("Counters", {
		google_email: DataTypes.INTEGER
	})

	return Counters;
}