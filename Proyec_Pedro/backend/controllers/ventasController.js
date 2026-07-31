const db = require("../config/db");

exports.realizarCompra = async (req, res) => {

    const usuario_id = req.usuario.id;

    try {

        // Obtener carrito

        const [carrito] = await db.query(

            `SELECT 
        dc.libro_id,
        dc.cantidad,
        l.precio

     FROM carrito c

     JOIN detalle_carrito dc
     ON c.id = dc.carrito_id

     JOIN libros l
     ON dc.libro_id = l.id

     WHERE c.usuario_id=?`,

            [usuario_id]

        );

        if (carrito.length == 0) {

            return res.json({

                mensaje: "El carrito está vacío"

            });

        }

        let total = 0;

        carrito.forEach(item => {

            total += item.precio * item.cantidad;

        });

        // Crear venta

        const [venta] = await db.query(

            `INSERT INTO ventas(usuario_id,total)
             VALUES(?,?)`,

            [usuario_id, total]

        );

        const venta_id = venta.insertId;

        // Guardar detalle

        for (const item of carrito) {

            await db.query(

                `INSERT INTO detalle_venta
                (venta_id,libro_id,cantidad,precio)
                VALUES(?,?,?,?)`,

                [
                    venta_id,
                    item.libro_id,
                    item.cantidad,
                    item.precio
                ]

            );

            // Restar stock

            await db.query(

                `UPDATE libros
                 SET stock=stock-?
                 WHERE id=?`,

                [
                    item.cantidad,
                    item.libro_id
                ]

            );

        }

        // Vaciar carrito

        await db.query(

            `DELETE dc
     FROM detalle_carrito dc
     JOIN carrito c
     ON dc.carrito_id=c.id
     WHERE c.usuario_id=?`,

            [usuario_id]

        );

        res.json({

            mensaje: "Compra realizada",

            venta_id

        });

    } catch (error) {

        console.log(error);

        res.status(500).json(error);

    }

}