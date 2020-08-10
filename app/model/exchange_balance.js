/* indent size: 1 */

module.exports = app => {
	const DataTypes = app.Sequelize;

	const Model = app.model.define('exchange_balance', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		username: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		symbol: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		liquidity_balance: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			defaultValue: '0.00000000'
		}
	}, {
		tableName: 'exchange_balance',
		timestamps: false
	});

	Model.associate = function() {

	}

	return Model;
};
