/* indent size: 1 */

module.exports = app => {
	const DataTypes = app.Sequelize;

	const Model = app.model.define('token', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		symbol: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		decimals: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false
		},
		total_supply: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false
		},
		owner: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		token_address: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		token_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false
		},
		exchange_address: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		logo: {
			type: DataTypes.STRING(300),
			allowNull: true
		},
		token_block_number: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			defaultValue: '0'
		},
		exchange_block_number: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			defaultValue: '0'
		},
		create_time: {
			type: DataTypes.TIME,
			allowNull: true,
			defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'token',
		timestamps: false
	});

	Model.associate = function() {

	}

	return Model;
};
