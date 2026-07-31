const Libro = require("../models/libroModel");

// GET todos
const getLibros = (req, res) => {

    Libro.obtenerLibros((error, resultados) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultados);

    });

};

// GET por ID
const getLibroPorId = (req, res) => {

    const id = req.params.id;

    Libro.obtenerLibroPorId(id, (error, resultados) => {

        if (error) {
            return res.status(500).json(error);
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: "Libro no encontrado"
            });
        }

        res.json(resultados[0]);

    });

};
// POST
const postLibro = (req, res) => {

    Libro.crearLibro(req.body, (error, resultado) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.status(201).json({
            mensaje: "Libro agregado correctamente",
            id: resultado.insertId
        });

    });

};

// PUT
const putLibro = (req, res) => {

    const id = req.params.id;

    Libro.actualizarLibro(id, req.body, (error) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json({
            mensaje: "Libro actualizado correctamente"
        });

    });

};

// DELETE
const deleteLibro = (req, res) => {

    const id = req.params.id;

    Libro.eliminarLibro(id, (error) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json({
            mensaje: "Libro eliminado correctamente"
        });

    });

};

module.exports = {
    getLibros,
    getLibroPorId,
    postLibro,
    putLibro,
    deleteLibro
};