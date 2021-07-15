use ecommerce;
db.createCollection("mensajes");
db.createCollection("productos");
db.productos.insert([
    {
        "name": "Producto 1",
        "price": 800,
        "thumbnail": "http://imagen1"
    },
    {
        "name": "Producto 2",
        "price": 1050,
        "thumbnail": "http://imagen2"
    },
    {
        "name": "Producto 3",
        "price": 910,
        "thumbnail": "http://imagen3"
    },
    {
        "name": "Producto 4",
        "price": 750,
        "thumbnail": "http://imagen4"
    },
    {
        "name": "Producto 5",
        "price": 740,
        "thumbnail": "http://imagen5"
    },
    {
        "name": "Producto 6",
        "price": 3400,
        "thumbnail": "http://imagen6"
    },
    {
        "name": "Producto 7",
        "price": 4990,
        "thumbnail": "http://imagen7"
    },
    {
        "name": "Producto 8",
        "price": 1300,
        "thumbnail": "http://imagen8"
    },
    {
        "name": "Producto 9",
        "price": 650,
        "thumbnail": "http://imagen9"
    },
    {
        "name": "Producto 10",
        "price": 1700,
        "thumbnail": "http://imagen10"
    }
]);

db.mensajes.insert([
    {
        "mensaje": "mensaje1",
        "email": "usuario1@hotmail.com",
        "fecha": "2021-01-01T00:00:00.0Z"
    },
    {
        "mensaje": "mensaje2",
        "email": "usuario2@hotmail.com",
        "fecha": "2021-01-01T00:00:00.0Z"
    },
    {
        "mensaje": "mensaje3",
        "email": "usuario3@hotmail.com",
        "fecha": "2021-01-01T00:00:00.0Z"
    },
    {
        "mensaje": "mensaje4",
        "email": "usuario4@hotmail.com",
        "fecha": "2021-01-01T00:00:00.0Z"
    },
    {
        "mensaje": "mensaje5",
        "email": "usuario5@hotmail.com",
        "fecha": "2021-01-01T00:00:00.0Z"
    },
    {
        "mensaje": "mensaje6",
        "email": "usuario6@hotmail.com",
        "fecha": "2021-01-01T00:00:00.0Z"
    },
    {
        "mensaje": "mensaje7",
        "email": "usuario7@hotmail.com",
        "fecha": "2021-01-01T00:00:00.0Z"
    },
    {
        "mensaje": "mensaje8",
        "email": "usuario8@hotmail.com",
        "fecha": "2021-01-01T00:00:00.0Z"
    },
    {
        "mensaje": "mensaje9",
        "email": "usuario9@hotmail.com",
        "fecha": "2021-01-01T00:00:00.0Z"
    },
    {
        "mensaje": "mensaje10",
        "email": "usuario10@hotmail.com",
        "fecha": "2021-01-01T00:00:00.0Z"
    }
]);

db.productos.find();
db.mensajes.find();

db.productos.estimatedDocumentCount();
db.mensajes.estimatedDocumentCount();
db.productos.insert({
    "name": "Crema corporal",
    "price": 1200,
    "thumbnail": "http://imagen11"
});

db.productos.find({ "price": { $lt: 1000 } });
db.productos.find({ $and: [{ "price": { $gte: 1000 } }, { "price": { $lte: 3000 } }] });
db.productos.find({ "price": { $gt: 3000 } });
db.productos.find({}, { "name": 1, "_id": 0 }).sort({ "price": 1 }).skip(2).limit(1);
db.productos.update({}, { $set: { stock: 100 } }, { multi: true });
db.productos.update({ "price": { $gt: 4000 } }, { $set: { "stock": 0 } }, { multi: true });
db.productos.remove({ "price": { $lt: 1000 } });

use admin;
db.createUser(
    {
        user: "pepe",
        pwd: "asd456",
        roles: [
            { role: "read", db: "ecommerce" }
        ]
    }
);