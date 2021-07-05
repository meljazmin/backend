const knex = require('../database/knex');

const migrate = async () => {
    const mensajes = await knex.mensajesBBDD('mensajes');
    await knex.mensajesBBDD.schema.dropTableIfExists('mensajes').createTable('mensajes', table => {
        table.increments('id');
        table.string('mensaje');
        table.string('email');
        table.timestamp('fecha', { useTz: true }).notNullable().defaultTo(knex.mensajesBBDD.fn.now());
    });
    if (mensajes && mensajes.length > 0)
        await knex.mensajesBBDD('mensajes').insert(mensajes);
    console.log('tabla mensajes migrada!');

    const productos = await knex.productosBBDD('productos');
    await knex.productosBBDD.schema.dropTableIfExists('productos').createTable('productos', table => {
        table.increments('id');
        table.string('name').notNullable();
        table.float('price').notNullable();
        table.string('thumbnail');
    });
    if (productos && productos.length > 0)
        await knex.productosBBDD('productos').insert(productos);
    console.log('tabla productos migrada!');
}

migrate().then(() => {
    console.log('Migracion finalizada!');
}).catch(error => {
    console.log('error:', error);
    throw error;
}).finally(() => {
    console.log('cerrando conexion...');
    process.exit(0);
});;