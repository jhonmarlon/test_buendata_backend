//Requiriendo configuración de .env
require('dotenv').config();

//Requerimos la clase server
const Server = require('./models/server');

//Instanciamos nuestro server
const server = new Server();

server.listen();