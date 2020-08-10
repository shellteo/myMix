/* indent size: 1 */

module.exports = app => {
	const DataTypes = app.Sequelize;

	const Model = app.model.define('exchange_liquidity_log', {
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
		token1_symbol: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		token2_symbol: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		token1_amount: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			defaultValue: '0.00000000'
		},
		token2_amount: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			defaultValue: '0.00000000'
		},
		liquidity: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			defaultValue: '0.00000000'
		},
		create_time: {
			type: DataTypes.TIME,
			allowNull: false
		},
		txhash: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'exchange_liquidity_log',
		timestamps: false
	});

	Model.associate = function() {

	}

	return Model;
};
