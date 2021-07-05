const options = require('../config/database');
const mensajesBBDD = require('knex')(options.sqlite3);
const productosBBDD = require('knex')(options.mysql);

// exporto el objeto para usarlo en otros modulos
module.exports = {mensajesBBDD, productosBBDD};