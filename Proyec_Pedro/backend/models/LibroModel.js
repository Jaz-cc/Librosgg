const conexion = require("../config/db");

// Crear un libro
const crearLibro = (libro, callback) => {

    const sql = `
        INSERT INTO libros
        (titulo, autor, precio, stock, imagen, descripcion, categoria_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    conexion.query(sql, [
        libro.titulo,
        libro.autor,
        libro.precio,
        libro.stock,
        libro.imagen,
        libro.descripcion,
        libro.categoria_id
    ], callback);

};

// Actualizar un libro
const actualizarLibro = (id, libro, callback) => {

    const sql = `
        UPDATE libros
        SET
            titulo = ?,
            autor = ?,
            precio = ?,
            stock = ?,
            imagen = ?,
            descripcion = ?,
            categoria_id = ?
        WHERE id = ?
    `;

    conexion.query(sql, [
        libro.titulo,
        libro.autor,
        libro.precio,
        libro.stock,
        libro.imagen,
        libro.descripcion,
        libro.categoria_id,
        id
    ], callback);

};

// Eliminar un libro
const eliminarLibro = (id, callback) => {

    conexion.query(
        "DELETE FROM libros WHERE id = ?",
        [id],
        callback
    );

};

// Obtener todos los libros
const obtenerLibros = (callback) => {

    const sql = `
        SELECT
            l.id,
            l.titulo,
            l.autor,
            l.precio,
            l.stock,
            l.imagen,
            l.descripcion,
            c.nombre AS categoria
        FROM libros l
        INNER JOIN categorias c
            ON l.categoria_id = c.id;
    `;

    conexion.query(sql, callback);
};

// Obtener un libro por ID
const obtenerLibroPorId = (id, callback) => {

    const sql = `
        SELECT
            l.id,
            l.titulo,
            l.autor,
            l.precio,
            l.stock,
            l.imagen,
            l.descripcion,
            c.nombre AS categoria
        FROM libros l
        INNER JOIN categorias c
            ON l.categoria_id = c.id
        WHERE l.id = ?;
    `;

    conexion.query(sql, [id], callback);
};
// Obtener un libro por su ID
const obtenerLibroPorIdSimple = (id, callback) => {

    conexion.query(
        "SELECT * FROM libros WHERE id = ?",
        [id],
        callback
    );

};


// Descontar stock
const descontarStock = (id, cantidad, callback) => {

    conexion.query(
        `
        UPDATE libros
        SET stock = stock - ?
        WHERE id = ?
        `,
        [cantidad, id],
        callback
    );

};


// Aumentar stock
const aumentarStock = (id, cantidad, callback) => {

    conexion.query(
        `
        UPDATE libros
        SET stock = stock + ?
        WHERE id = ?
        `,
        [cantidad, id],
        callback
    );

};

module.exports = {
    obtenerLibros,
    obtenerLibroPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro,
    obtenerLibroPorIdSimple,
    descontarStock,
    aumentarStock
};