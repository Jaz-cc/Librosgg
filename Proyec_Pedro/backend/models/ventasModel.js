const db = require("../config/db");

// Crear venta
const crearVenta = async (usuario_id, total) => {

    const [venta] = await db.query(
        `INSERT INTO ventas(usuario_id,total)
         VALUES (?,?)`,
        [usuario_id, total]
    );

    return venta.insertId;
};

// Obtener carrito
const obtenerCarrito = async (usuario_id) => {

    const [rows] = await db.query(

        `SELECT
            dc.libro_id,
            dc.cantidad,
            l.precio
        FROM carrito c
        INNER JOIN detalle_carrito dc
            ON c.id = dc.carrito_id
        INNER JOIN libros l
            ON dc.libro_id = l.id
        WHERE c.usuario_id = ?`,

        [usuario_id]

    );

    return rows;

};

// Guardar detalle
const guardarDetalle = async (
    venta_id,
    libro_id,
    cantidad,
    precio
) => {

    await db.query(

        `INSERT INTO detalle_ventas
        (venta_id,libro_id,cantidad,precio)
        VALUES (?,?,?,?)`,

        [
            venta_id,
            libro_id,
            cantidad,
            precio
        ]

    );

};

// Vaciar carrito
const vaciarCarrito = async (usuario_id) => {

    const [carrito] = await db.query(

        "SELECT id FROM carrito WHERE usuario_id = ?",

        [usuario_id]

    );

    if (carrito.length === 0) return;

    const carrito_id = carrito[0].id;

    await db.query(

        "DELETE FROM detalle_carrito WHERE carrito_id = ?",

        [carrito_id]

    );

    await db.query(

        "DELETE FROM carrito WHERE id = ?",

        [carrito_id]

    );

};

const descontarStock = async (libro_id, cantidad) => {

    const [resultado] = await db.query(

        `UPDATE libros
         SET stock = stock - ?
         WHERE id = ?
         AND stock >= ?`,

        [
            cantidad,
            libro_id,
            cantidad
        ]

    );

    return resultado;

};
// Obtener historial de compras
const obtenerHistorial = async (usuario_id) => {

    const [ventas] = await db.query(

        `SELECT
            id,
            total,
            fecha
        FROM ventas
        WHERE usuario_id = ?
        ORDER BY fecha DESC`,

        [usuario_id]

    );

    for (const venta of ventas) {

        const [productos] = await db.query(

            `SELECT
                l.titulo,
                dv.cantidad,
                dv.precio

            FROM detalle_venta dv

            INNER JOIN libros l
                ON dv.libro_id = l.id

            WHERE dv.venta_id = ?`,

            [venta.id]

        );

        venta.productos = productos;

    }

    return ventas;

};

module.exports = {

    crearVenta,
    obtenerCarrito,
    guardarDetalle,
    vaciarCarrito,
    descontarStock,
    obtenerHistorial

};