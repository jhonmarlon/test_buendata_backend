const { Sequelize } = require("sequelize")

const db = new Sequelize("pruebabuendata_db", "postgres", "admin", {
    host: "localhost",
    dialect: "postgres"
});

module.exports = db;