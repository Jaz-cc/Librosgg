const Carrito = require("../models/carritoModel");
const Libro = require("../models/libroModel");

// GET carrito del usuario
const getCarrito = (req, res) => {

    const usuario_id = req.usuario.id;

    Carrito.obtenerCarritoUsuario(usuario_id, (error, resultado) => {

        if (error) {
            return res.status(500).json(error);
        }

        if (resultado.length === 0) {
            return res.json([]);
        }

        const carrito_id = resultado[0].id;

        Carrito.obtenerDetalleCarrito(carrito_id, (error, productos) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json(productos);

        });

    });

};
const obtenerProductoCarrito = (id, callback) => {

    conexion.query(

        `
        SELECT *
        FROM detalle_carrito
        WHERE id = ?
        `,

        [id],

        callback

    );

};

// POST agregar libro al carrito
const postCarrito = (req, res) => {

    const usuario_id = req.usuario.id;

    const {

        libro_id,

        cantidad

    } = req.body;

    Carrito.obtenerCarritoUsuario(usuario_id, (error, resultado) => {

        if (error) {
            return res.status(500).json(error);
        }

        if (resultado.length === 0) {

            Carrito.crearCarrito(usuario_id, (error, nuevoCarrito) => {

                if (error) {
                    return res.status(500).json(error);
                }

                agregarProducto(
                    nuevoCarrito.insertId,
                    libro_id,
                    cantidad,
                    res
                );

            });

        } else {

            agregarProducto(
                resultado[0].id,
                libro_id,
                cantidad,
                res
            );

        }

    });

};


// PUT cambiar cantidad
const putCarrito = (req, res) => {

    const id = req.params.id;

    const nuevaCantidad = req.body.cantidad;

    Carrito.obtenerItemPorId(id, (error, resultado) => {

        if (error)
            return res.status(500).json(error);

        if (resultado.length == 0)
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });

        const item = resultado[0];

        const diferencia =
            item.cantidad - nuevaCantidad;

        Carrito.actualizarStockLibro(

            item.libro_id,

            diferencia,

            (error) => {

                if (error)
                    return res.status(500).json(error);

                Carrito.actualizarCantidad(

                    id,

                    nuevaCantidad,

                    (error) => {

                        if (error)
                            return res.status(500).json(error);

                        res.json({

                            mensaje:
                                "Cantidad actualizada"

                        });

                    }

                );

            }

        );

    });

};


// DELETE producto
const deleteProducto = (req, res) => {

    const id = req.params.id;

    Carrito.eliminarProducto(id, (error) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json({

            mensaje: "Producto eliminado"

        });

    });

};


// DELETE vaciar carrito
const deleteCarrito = (req, res) => {

    const id = req.params.id;

    Carrito.obtenerItemPorId(id, (error, resultado) => {

        if (error)
            return res.status(500).json(error);

        if (resultado.length == 0)
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });

        const item = resultado[0];

        Carrito.actualizarStockLibro(

            item.libro_id,

            item.cantidad,

            (error) => {

                if (error)
                    return res.status(500).json(error);

                Carrito.eliminarProducto(

                    id,

                    (error) => {

                        if (error)
                            return res.status(500).json(error);

                        res.json({

                            mensaje:
                                "Producto eliminado"

                        });

                    }

                );

            }

        );

    });

};

const deleteTodoCarrito = (req, res) => {

    const usuario_id = req.usuario.id;

    Carrito.obtenerItemsCarrito(usuario_id, (error, items) => {

        if (error)
            return res.status(500).json(error);

        if (items.length == 0)
            return res.json({
                mensaje: "Carrito vacío"
            });

        let pendientes = items.length;

        items.forEach(item => {

            Carrito.actualizarStockLibro(

                item.libro_id,

                item.cantidad,

                (error) => {

                    if (error)
                        return res.status(500).json(error);

                    pendientes--;

                    if (pendientes == 0) {

                        Carrito.vaciarCarrito(

                            usuario_id,

                            (error) => {

                                if (error)
                                    return res.status(500).json(error);

                                res.json({

                                    mensaje:
                                        "Carrito vaciado correctamente"

                                });

                            }

                        );

                    }

                }

            );

        });

    });

};


// Función privada
function agregarProducto(
    carrito_id,
    libro_id,
    cantidad,
    res
){

    Libro.obtenerLibroPorIdSimple(

        libro_id,

        (error, libro)=>{

            if(error){

                return res.status(500).json(error);

            }

            if(libro.length==0){

                return res.status(404).json({

                    mensaje:"Libro no encontrado"

                });

            }

            if(libro[0].stock < cantidad){

                return res.status(400).json({

                    mensaje:"Stock insuficiente"

                });

            }


            Libro.descontarStock(

                libro_id,

                cantidad,

                (error)=>{

                    if(error){

                        return res.status(500).json(error);

                    }


                    Carrito.buscarLibroCarrito(

                        carrito_id,

                        libro_id,

                        (error,resultado)=>{

                            if(error){

                                return res.status(500).json(error);

                            }

                            if(resultado.length>0){

                                const nuevaCantidad =
                                resultado[0].cantidad + cantidad;

                                Carrito.actualizarCantidad(

                                    resultado[0].id,

                                    nuevaCantidad,

                                    (error)=>{

                                        if(error){

                                            return res.status(500).json(error);

                                        }

                                        res.json({

                                            mensaje:"Cantidad actualizada"

                                        });

                                    }

                                );

                            }else{

                                Carrito.agregarLibro(

                                    carrito_id,

                                    libro_id,

                                    cantidad,

                                    (error)=>{

                                        if(error){

                                            return res.status(500).json(error);

                                        }

                                        res.json({

                                            mensaje:"Libro agregado"

                                        });

                                    }

                                );

                            }

                        }

                    );

                }

            );

        }

    );

}


module.exports = {

    getCarrito,

    postCarrito,

    putCarrito,

    deleteProducto,

    deleteCarrito

};