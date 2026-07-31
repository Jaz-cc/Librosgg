const conexion = require("../config/db");

// Buscar el carrito del usuario
const obtenerCarritoUsuario = (usuario_id, callback) => {

    const sql = `
        SELECT c.id
        FROM carrito c
        WHERE c.usuario_id = ?
    `;

    conexion.query(sql, [usuario_id], callback);

};


// Crear un carrito
const crearCarrito = (usuario_id, callback) => {

    const sql = `
        INSERT INTO carrito (usuario_id)
        VALUES (?)
    `;

    conexion.query(sql, [usuario_id], callback);

};


// Obtener los productos del carrito
const obtenerDetalleCarrito = (carrito_id, callback) => {

    const sql = `
        SELECT
            dc.id,
            l.id AS libro_id,
            l.titulo,
            l.precio,
            l.imagen,
            dc.cantidad
        FROM detalle_carrito dc
        INNER JOIN libros l
            ON dc.libro_id = l.id
        WHERE dc.carrito_id = ?
    `;

    conexion.query(sql, [carrito_id], callback);

};


// Verificar si un libro ya está en el carrito
const buscarLibroCarrito = (carrito_id, libro_id, callback) => {

    const sql = `
        SELECT *
        FROM detalle_carrito
        WHERE carrito_id = ?
        AND libro_id = ?
    `;

    conexion.query(sql, [carrito_id, libro_id], callback);

};


// Agregar un libro
const agregarLibro = (carrito_id, libro_id, cantidad, callback) => {

    const sql = `
        INSERT INTO detalle_carrito
        (carrito_id, libro_id, cantidad)
        VALUES (?, ?, ?)
    `;

    conexion.query(
        sql,
        [carrito_id, libro_id, cantidad],
        callback
    );

};


// Actualizar cantidad
const actualizarCantidad = (id, cantidad, callback) => {

    const sql = `
        UPDATE detalle_carrito
        SET cantidad = ?
        WHERE id = ?
    `;

    conexion.query(sql, [cantidad, id], callback);

};


// Eliminar un producto
const eliminarProducto = (id, callback) => {

    conexion.query(
        "DELETE FROM detalle_carrito WHERE id = ?",
        [id],
        callback
    );

};


// Vaciar carrito
const vaciarCarrito = (carrito_id, callback) => {

    conexion.query(
        "DELETE FROM detalle_carrito WHERE carrito_id = ?",
        [carrito_id],
        callback
    );

};

const obtenerItemPorId = (id, callback) => {

    const sql = `
        SELECT *
        FROM detalle_carrito
        WHERE id = ?
    `;

    conexion.query(sql, [id], callback);

};

const actualizarStockLibro = (idLibro, cantidad, callback) => {

    const sql = `
        UPDATE libros
        SET stock = stock + ?
        WHERE id = ?
    `;

    conexion.query(sql, [cantidad, idLibro], callback);

};
const obtenerItemsCarrito = (usuario_id, callback) => {

    const sql = `
        SELECT
            libro_id,
            cantidad
        FROM detalle_carrito
        WHERE usuario_id = ?
    `;

    conexion.query(sql, [usuario_id], callback);

};


module.exports = {

    obtenerCarritoUsuario,
    crearCarrito,
    obtenerDetalleCarrito,
    buscarLibroCarrito,
    agregarLibro,
    actualizarCantidad,
    eliminarProducto,
    vaciarCarrito,
    obtenerItemPorId,
    actualizarStockLibro,
    obtenerItemsCarrito

};