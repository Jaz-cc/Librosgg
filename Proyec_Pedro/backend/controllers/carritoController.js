const Carrito = require("../models/carritoModel");
const Libro = require("../models/libroModel");


// GET carrito del usuario
const getCarrito = async (req, res) => {

    try {

        const usuario_id = req.usuario.id;

        const carrito = await Carrito.obtenerCarritoUsuario(usuario_id);

        if (carrito.length === 0) {
            return res.json([]);
        }

        const productos = await Carrito.obtenerDetalleCarrito(
            carrito[0].id
        );

        res.json(productos);


    } catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};



// POST agregar libro al carrito
const postCarrito = async (req,res)=>{

    try {

        const usuario_id = req.usuario.id;

        const {
            libro_id,
            cantidad
        } = req.body;


        let carrito = await Carrito.obtenerCarritoUsuario(usuario_id);


        let carrito_id;


        if(carrito.length === 0){

            const nuevo = await Carrito.crearCarrito(usuario_id);

            carrito_id = nuevo.insertId;

        }else{

            carrito_id = carrito[0].id;

        }


        const libro = await Libro.obtenerLibroPorIdSimple(libro_id);


        if(libro.length === 0){

            return res.status(404).json({
                mensaje:"Libro no encontrado"
            });

        }


        if(libro[0].stock < cantidad){

            return res.status(400).json({
                mensaje:"Stock insuficiente"
            });

        }


        const existe = await Carrito.buscarLibroCarrito(
            carrito_id,
            libro_id
        );


        if(existe.length > 0){

            const nuevaCantidad =
                existe[0].cantidad + cantidad;


            await Carrito.actualizarCantidad(
                existe[0].id,
                nuevaCantidad
            );


        }else{

            await Carrito.agregarLibro(
                carrito_id,
                libro_id,
                cantidad
            );

        }


        await Libro.descontarStock(
            libro_id,
            cantidad
        );


        res.json({
            mensaje:"Libro agregado al carrito"
        });


    }catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};



// PUT actualizar cantidad
const putCarrito = async(req,res)=>{

    try{

        const id = req.params.id;

        const cantidad = req.body.cantidad;


        const item = await Carrito.obtenerItemPorId(id);


        if(item.length===0){

            return res.status(404).json({
                mensaje:"Producto no encontrado"
            });

        }


        await Carrito.actualizarCantidad(
            id,
            cantidad
        );


        res.json({
            mensaje:"Cantidad actualizada"
        });


    }catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};



// DELETE producto
const deleteProducto = async(req,res)=>{

    try{

        const id=req.params.id;


        await Carrito.eliminarProducto(id);


        res.json({
            mensaje:"Producto eliminado"
        });


    }catch(error){

        res.status(500).json(error);

    }

};



// DELETE vaciar carrito
const deleteTodoCarrito = async(req,res)=>{

    try{

        const usuario_id=req.usuario.id;


        const carrito =
            await Carrito.obtenerCarritoUsuario(usuario_id);


        if(carrito.length===0){

            return res.json({
                mensaje:"Carrito vacío"
            });

        }


        await Carrito.vaciarCarrito(
            carrito[0].id
        );


        res.json({
            mensaje:"Carrito vaciado correctamente"
        });


    }catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};



module.exports = {

    getCarrito,
    postCarrito,
    putCarrito,
    deleteProducto,
    deleteTodoCarrito

};