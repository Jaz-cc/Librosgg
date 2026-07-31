const Libro = require("../models/libroModel");


// GET todos
const getLibros = async (req, res) => {

    try {

        const libros = await Libro.obtenerLibros();

        res.json(libros);

    } catch(error){

        console.log(error);

        res.status(500).json({
            mensaje:"Error al obtener libros"
        });

    }

};


// GET por ID
const getLibroPorId = async (req, res) => {

    try {

        const id = req.params.id;

        const resultados = await Libro.obtenerLibroPorId(id);


        if (resultados.length === 0) {

            return res.status(404).json({
                mensaje:"Libro no encontrado"
            });

        }


        res.json(resultados[0]);


    } catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};



// POST
const postLibro = async (req, res) => {

    try {

        const resultado = await Libro.crearLibro(req.body);


        res.status(201).json({

            mensaje:"Libro agregado correctamente",

            id:resultado.insertId

        });


    } catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};



// PUT
const putLibro = async (req, res) => {

    try {

        const id = req.params.id;


        await Libro.actualizarLibro(
            id,
            req.body
        );


        res.json({

            mensaje:"Libro actualizado correctamente"

        });


    } catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};



// DELETE
const deleteLibro = async (req, res) => {

    try {

        const id = req.params.id;


        await Libro.eliminarLibro(id);


        res.json({

            mensaje:"Libro eliminado correctamente"

        });


    } catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};


module.exports = {

    getLibros,
    getLibroPorId,
    postLibro,
    putLibro,
    deleteLibro

};