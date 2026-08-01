const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

const verificarToken = require("../middleware/authMiddleware");
const soloAdmin = require("../middleware/soloAdmi");


// Toda la gestión de usuarios es exclusiva de administradores.
router.get(
    "/",
    verificarToken,
    soloAdmin,
    usuarioController.getUsuarios
);

router.get(
    "/:id",
    verificarToken,
    soloAdmin,
    usuarioController.getUsuarioPorId
);

router.post(
    "/",
    verificarToken,
    soloAdmin,
    usuarioController.postUsuario
);

router.put(
    "/:id",
    verificarToken,
    soloAdmin,
    usuarioController.putUsuario
);

router.delete(
    "/:id",
    verificarToken,
    soloAdmin,
    usuarioController.deleteUsuario
);


module.exports = router;
