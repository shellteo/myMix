/* indent size: 1 */

module.exports = app => {
	const DataTypes = app.Sequelize;

	const Model = app.model.define('exchange', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		token1_symbol: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		token2_symbol: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		total_supply: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			defaultValue: '0.00000000'
		},
		holder_username: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		holder_address: {
			type: DataTypes.STRING(400),
			allowNull: true
		},
		create_time: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'exchange',
		timestamps: false
	});

	Model.associate = function() {

	}

	return Model;
};
