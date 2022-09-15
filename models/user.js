const {DataTypes} = require("sequelize");
const db = require("../db/connection");


const User = db.define('users', {
    nombre: {
        type: DataTypes.STRING
    },
    fechanacimiento: {
        type: DataTypes.DATE
    },
    numidentificacion: {
        type: DataTypes.INTEGER
    }
},{ timestamps: false });

module.exports = User;