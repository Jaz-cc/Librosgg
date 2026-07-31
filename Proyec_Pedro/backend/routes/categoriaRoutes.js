const express = require("express");
const router = express.Router();

const categoriaController = require("../controllers/categoriaController");
const verificarToken = require("../middleware/authMiddleware");
const soloAdmin = require("../middleware/soloAdmi");

router.get("/", categoriaController.getCategorias);

router.get("/:id", categoriaController.getCategoriaPorId);

router.post("/", verificarToken, soloAdmin, categoriaController.postCategoria);

router.put("/:id", verificarToken, soloAdmin, categoriaController.putCategoria);

router.delete("/:id",verificarToken, soloAdmin, categoriaController.deleteCategoria);

module.exports = router;