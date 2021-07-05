const knex = require('../database/knex');

knex.mensajesBBDD.schema.dropTable('mensajes');
knex.productosBBDD.schema.dropTable('productos');
