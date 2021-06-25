CREATE DATABASE if not exists prueba CHARACTER SET utf8;
use prueba;

CREATE TABLE if not exists items (
	id int NOT NULL AUTO_INCREMENT,
    nombre varchar(255) NOT NULL,
    categoria varchar(255) NOT NULL,
    stock int unsigned, 
    PRIMARY KEY (id) 
);

INSERT INTO items (nombre, categoria, stock) VALUES ("Fideos", "Harina", 20);

INSERT INTO items (nombre, categoria, stock) VALUES ("Leche", "Lácteos", 30);

INSERT INTO items (nombre, categoria, stock) VALUES ("Crema", "Lácteos", 15);

SELECT nombre,categoria, stock FROM items;

DELETE FROM items WHERE id = 1;

UPDATE items SET stock = 45 WHERE id = 2;

SELECT nombre,categoria, stock FROM items;

