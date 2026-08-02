const express = require("express");

const router = express.Router();

const ventasController =
require("../controllers/ventasController");

const verificarToken =
require("../middleware/authMiddleware");

router.post(

    "/",

    verificarToken,

    ventasController.realizarCompra

);

router.get(

    "/",

    verificarToken,

    ventasController.obtenerHistorial

);

module.exports = router;