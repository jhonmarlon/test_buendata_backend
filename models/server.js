const express = require("express");
const cors = require("cors");
const db = require("../db/connection");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;

        //Path routes
        this.usuariosRoutPath = '/api/users';

        this.dbConnection();
        //Middlewares
        this.middlewares();
        //Routes
        this.routes();
    }

    middlewares(){
        this.app.use(cors());

        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.json());
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log("Database online");
        } catch (error) {
            console.log(error);
        }
    }

    routes() {
        this.app.use(this.usuariosRoutPath, require("../routes/users"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on  port ${this.port}`);
        })
    }
}

module.exports = Server;