module.exports = (sequelize, DataTypes) => {
	const Counters = sequelize.define("Counters", {
		google_email: { type: DataTypes.INTEGER}
	})

	return Counters;
}