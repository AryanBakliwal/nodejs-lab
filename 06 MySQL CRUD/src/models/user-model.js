const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../config/db.js");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }, 
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User