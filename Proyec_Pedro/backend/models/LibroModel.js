const conexion = require("../config/db");


// Crear un libro
const crearLibro = async (libro) => {

    const sql = `
        INSERT INTO libros
        (titulo, autor, precio, stock, imagen, descripcion, categoria_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [resultado] = await conexion.query(sql, [
        libro.titulo,
        libro.autor,
        libro.precio,
        libro.stock,
        libro.imagen,
        libro.descripcion,
        libro.categoria_id
    ]);

    return resultado;
};


// Actualizar un libro
const actualizarLibro = async (id, libro) => {

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

    const [resultado] = await conexion.query(sql, [
        libro.titulo,
        libro.autor,
        libro.precio,
        libro.stock,
        libro.imagen,
        libro.descripcion,
        libro.categoria_id,
        id
    ]);

    return resultado;
};


// Eliminar un libro
const eliminarLibro = async (id) => {

    const [resultado] = await conexion.query(
        "DELETE FROM libros WHERE id = ?",
        [id]
    );

    return resultado;
};


// Obtener todos los libros
const obtenerLibros = async () => {

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

    const [libros] = await conexion.query(sql);

    return libros;
};


// Obtener un libro por ID
const obtenerLibroPorId = async (id) => {

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

    const [libro] = await conexion.query(sql, [id]);

    return libro;
};


// Obtener libro simple
const obtenerLibroPorIdSimple = async (id) => {

    const [libro] = await conexion.query(
        "SELECT * FROM libros WHERE id = ?",
        [id]
    );

    return libro;
};


// Descontar stock
const descontarStock = async (id, cantidad) => {

    const [resultado] = await conexion.query(
        `
        UPDATE libros
        SET stock = stock - ?
        WHERE id = ?
        `,
        [cantidad, id]
    );

    return resultado;
};


// Aumentar stock
const aumentarStock = async (id, cantidad) => {

    const [resultado] = await conexion.query(
        `
        UPDATE libros
        SET stock = stock + ?
        WHERE id = ?
        `,
        [cantidad, id]
    );

    return resultado;
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