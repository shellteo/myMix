/* indent size: 1 */

module.exports = app => {
	const DataTypes = app.Sequelize;

	const Model = app.model.define('exchange_purchase_log', {
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
		sold_token_symbol: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		sold_amount: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			defaultValue: '0.00000000'
		},
		bought_token_symbol: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		bought_amount: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			defaultValue: '0.00000000'
		},
		create_time: {
			type: DataTypes.TIME,
			allowNull: false
		},
		txhash1: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		txhash2: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'exchange_purchase_log',
		timestamps: false
	});

	Model.associate = function() {

	}

	return Model;
};
