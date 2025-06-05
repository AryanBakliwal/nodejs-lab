const { DataTypes } = require("sequelize");
const sequelize = require("./db-connect.js");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    }, {
      tableName: 'users',
      timestamps: false, // disables Sequelize's default createdAt/updatedAt fields
    }
);

module.exports = User;

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true