module.exports = function (sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        domain_name: {
            type: DataTypes.STRING(253), //Max size of domain name
            allowNull: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        },
    }, {
            tableName: 'users'
        });
};
