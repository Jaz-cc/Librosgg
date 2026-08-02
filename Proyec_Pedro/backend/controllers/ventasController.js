const ventasModel = require("../models/ventasModel");

const realizarCompra = async (req, res) => {

    try {

        const usuario_id = req.usuario.id;

        const carrito =
            await ventasModel.obtenerCarrito(usuario_id);

        if (carrito.length === 0) {

            return res.status(400).json({
                mensaje: "El carrito está vacío"
            });

        }

        let total = 0;

        carrito.forEach(item => {

            total += item.precio * item.cantidad;

        });

        const venta_id =
            await ventasModel.crearVenta(usuario_id, total);

        for (const item of carrito) {

            await ventasModel.guardarDetalle(

                venta_id,

                item.libro_id,

                item.cantidad,

                item.precio

            );

            const resultado = await ventasModel.descontarStock(

                item.libro_id,

                item.cantidad

            );

            if (resultado.affectedRows === 0) {

                return res.status(400).json({

                    mensaje: "No hay suficiente stock."

                });

            }

        }

        await ventasModel.vaciarCarrito(usuario_id);

        res.json({

            mensaje: "Compra realizada correctamente",

            venta_id

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje: "Error al realizar la compra"

        });

    }

};
const obtenerHistorial = async (req, res) => {

    try {

        const historial = await ventasModel.obtenerHistorial(
            req.usuario.id
        );

        res.json(historial);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje: "Error al obtener historial"

        });

    }

};

module.exports = {

    realizarCompra,
    obtenerHistorial

};