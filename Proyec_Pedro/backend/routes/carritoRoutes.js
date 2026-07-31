const express = require("express");
const router = express.Router();

const carritoController = require("../controllers/carritoController");

const verificarToken = require("../middleware/authMiddleware");

// Obtener el carrito del usuario
router.get(
    "/",
    verificarToken,
    carritoController.getCarrito
);

// Agregar un libro
router.post(
    "/",
    verificarToken,
    carritoController.postCarrito
);

// Actualizar cantidad
router.put(
    "/:id",
    verificarToken,
    carritoController.putCarrito
);

// Eliminar un producto
router.delete(
    "/:id",
    verificarToken,
    carritoController.deleteProducto
);

// Vaciar carrito
router.delete(
    "/",
    verificarToken,
    carritoController.deleteCarrito
);

module.exports = router;