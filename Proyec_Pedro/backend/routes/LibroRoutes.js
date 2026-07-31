const express = require("express");
const router = express.Router();

const libroController = require("../controllers/libroController");

const verificarToken = require("../middleware/authMiddleware");

const soloAdmin = require("../middleware/soloAdmi");

router.get("/", libroController.getLibros);

router.get("/:id", libroController.getLibroPorId);

router.post(
    "/",
    verificarToken,
    soloAdmin,
    libroController.postLibro
);

router.put(
    "/:id",
    verificarToken,
    soloAdmin,
    libroController.putLibro
);

router.delete(
    "/:id",
    verificarToken,
    soloAdmin,
    libroController.deleteLibro
);

module.exports = router;