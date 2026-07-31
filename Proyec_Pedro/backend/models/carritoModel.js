const conexion = require("../config/db");


// Buscar el carrito del usuario
const obtenerCarritoUsuario = async (usuario_id) => {

    const sql = `
        SELECT c.id
        FROM carrito c
        WHERE c.usuario_id = ?
    `;

    const [carrito] = await conexion.query(sql, [usuario_id]);

    return carrito;

};


// Crear un carrito
const crearCarrito = async (usuario_id) => {

    const sql = `
        INSERT INTO carrito (usuario_id)
        VALUES (?)
    `;

    const [resultado] = await conexion.query(sql, [usuario_id]);

    return resultado;

};


// Obtener los productos del carrito
const obtenerDetalleCarrito = async (carrito_id) => {

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

    const [productos] = await conexion.query(sql, [carrito_id]);

    return productos;

};


// Buscar si un libro ya está en carrito
const buscarLibroCarrito = async (carrito_id, libro_id) => {

    const sql = `
        SELECT *
        FROM detalle_carrito
        WHERE carrito_id = ?
        AND libro_id = ?
    `;

    const [producto] = await conexion.query(
        sql,
        [carrito_id, libro_id]
    );

    return producto;

};


// Agregar libro
const agregarLibro = async (carrito_id, libro_id, cantidad) => {

    const sql = `
        INSERT INTO detalle_carrito
        (carrito_id, libro_id, cantidad)
        VALUES (?, ?, ?)
    `;

    const [resultado] = await conexion.query(
        sql,
        [carrito_id, libro_id, cantidad]
    );

    return resultado;

};


// Actualizar cantidad
const actualizarCantidad = async (id, cantidad) => {

    const sql = `
        UPDATE detalle_carrito
        SET cantidad = ?
        WHERE id = ?
    `;

    const [resultado] = await conexion.query(
        sql,
        [cantidad, id]
    );

    return resultado;

};


// Eliminar producto
const eliminarProducto = async (id) => {

    const [resultado] = await conexion.query(
        "DELETE FROM detalle_carrito WHERE id = ?",
        [id]
    );

    return resultado;

};


// Vaciar carrito
const vaciarCarrito = async (carrito_id) => {

    const [resultado] = await conexion.query(
        "DELETE FROM detalle_carrito WHERE carrito_id = ?",
        [carrito_id]
    );

    return resultado;

};


// Obtener item por ID
const obtenerItemPorId = async (id) => {

    const sql = `
        SELECT *
        FROM detalle_carrito
        WHERE id = ?
    `;

    const [item] = await conexion.query(
        sql,
        [id]
    );

    return item;

};


// Actualizar stock libro
const actualizarStockLibro = async (idLibro, cantidad) => {

    const sql = `
        UPDATE libros
        SET stock = stock + ?
        WHERE id = ?
    `;

    const [resultado] = await conexion.query(
        sql,
        [cantidad, idLibro]
    );

    return resultado;

};


// Obtener items del carrito por usuario
const obtenerItemsCarrito = async (usuario_id) => {

    const sql = `
        SELECT
            dc.libro_id,
            dc.cantidad

        FROM detalle_carrito dc

        INNER JOIN carrito c
            ON dc.carrito_id = c.id

        WHERE c.usuario_id = ?
    `;

    const [items] = await conexion.query(
        sql,
        [usuario_id]
    );

    return items;

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