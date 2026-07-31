const conexion = require("../config/db");

// Obtener todas las categorías
const obtenerCategorias = (callback) => {

    conexion.query(
        "SELECT * FROM categorias ORDER BY nombre",
        callback
    );

};

// Obtener una categoría por ID
const obtenerCategoriaPorId = (id, callback) => {

    conexion.query(
        "SELECT * FROM categorias WHERE id = ?",
        [id],
        callback
    );

};

// Crear categoría
const crearCategoria = (categoria, callback) => {

    conexion.query(
        "INSERT INTO categorias(nombre) VALUES(?)",
        [categoria.nombre],
        callback
    );

};

// Actualizar categoría
const actualizarCategoria = (id, categoria, callback) => {

    conexion.query(
        "UPDATE categorias SET nombre=? WHERE id=?",
        [categoria.nombre, id],
        callback
    );

};

// Eliminar categoría
const eliminarCategoria = (id, callback) => {

    conexion.query(
        "DELETE FROM categorias WHERE id=?",
        [id],
        callback
    );

};

module.exports = {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};