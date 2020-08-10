/* indent size: 1 */

module.exports = app => {
	const DataTypes = app.Sequelize;

	const Model = app.model.define('user', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		username: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true
		},
		nickname: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		avatar: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		address: {
			type: DataTypes.STRING(400),
			allowNull: true
		},
		pubkey: {
			type: DataTypes.STRING(400),
			allowNull: true
		},
		mnemonic: {
			type: DataTypes.STRING(400),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		phone: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		create_time: {
			type: DataTypes.TIME,
			allowNull: true
		},
		last_login_time: {
			type: DataTypes.DATE,
			allowNull: true
		},
		reg_ip: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		last_login_ip: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	}, {
		tableName: 'user',
		timestamps: false
	});

	Model.associate = function() {

	}

	return Model;
};
