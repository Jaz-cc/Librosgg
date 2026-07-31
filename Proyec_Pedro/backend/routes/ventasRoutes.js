const express = require("express");

const router = express.Router();

const verificarToken = require("../middleware/authMiddleware");

const controlador = require("../controllers/ventasController");

router.post("/", verificarToken, controlador.realizarCompra);

module.exports = router;