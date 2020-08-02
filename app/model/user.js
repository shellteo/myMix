/* indent size: 1 */

module.exports = app => {
	const DataTypes = app.Sequelize;

	const Model = app.model.define('user', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		username: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		email_status: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
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
		create_time: {
			type: DataTypes.TIME,
			allowNull: true
		},
		introduction: {
			type: DataTypes.STRING(400),
			allowNull: true
		},
		platform: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		reg_ip: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		last_login_time: {
			type: DataTypes.DATE,
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		last_login_ip: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		mobile: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		mobile_status: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		},
		level: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		status: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'user',
		timestamps: false
	});

	Model.associate = function() {

	}

	return Model;
};
