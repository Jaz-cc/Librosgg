const Categoria = require("../models/categoriaModel");

const getCategorias = (req, res) => {

    Categoria.obtenerCategorias((error, resultados) => {

        if (error)
            return res.status(500).json(error);

        res.json(resultados);

    });

};

const getCategoriaPorId = (req, res) => {

    Categoria.obtenerCategoriaPorId(req.params.id, (error, resultados) => {

        if (error)
            return res.status(500).json(error);

        if (resultados.length === 0)
            return res.status(404).json({
                mensaje: "Categoría no encontrada"
            });

        res.json(resultados[0]);

    });

};

const postCategoria = (req, res) => {

    Categoria.crearCategoria(req.body, (error, resultado) => {

        if (error)
            return res.status(500).json(error);

        res.status(201).json({
            mensaje: "Categoría creada",
            id: resultado.insertId
        });

    });

};

const putCategoria = (req, res) => {

    Categoria.actualizarCategoria(req.params.id, req.body, (error) => {

        if (error)
            return res.status(500).json(error);

        res.json({
            mensaje: "Categoría actualizada"
        });

    });

};

const deleteCategoria = (req, res) => {

    Categoria.eliminarCategoria(req.params.id, (error) => {

        if (error)
            return res.status(500).json(error);

        res.json({
            mensaje: "Categoría eliminada"
        });

    });

};

module.exports = {
    getCategorias,
    getCategoriaPorId,
    postCategoria,
    putCategoria,
    deleteCategoria
};