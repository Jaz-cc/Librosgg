const conexion = require("../config/db");


// Obtener todas las categorías
const obtenerCategorias = async () => {

    const [categorias] = await conexion.query(
        "SELECT * FROM categorias ORDER BY nombre"
    );

    return categorias;

};


// Obtener una categoría por ID
const obtenerCategoriaPorId = async (id) => {

    const [categoria] = await conexion.query(
        "SELECT * FROM categorias WHERE id = ?",
        [id]
    );

    return categoria;

};


// Crear categoría
const crearCategoria = async (categoria) => {

    const [resultado] = await conexion.query(
        "INSERT INTO categorias(nombre) VALUES(?)",
        [categoria.nombre]
    );

    return resultado;

};


// Actualizar categoría
const actualizarCategoria = async (id, categoria) => {

    const [resultado] = await conexion.query(
        "UPDATE categorias SET nombre=? WHERE id=?",
        [
            categoria.nombre,
            id
        ]
    );

    return resultado;

};


// Eliminar categoría
const eliminarCategoria = async (id) => {

    const [resultado] = await conexion.query(
        "DELETE FROM categorias WHERE id=?",
        [id]
    );

    return resultado;

};


module.exports = {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};