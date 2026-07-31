const express = require("express");

const router = express.Router();

const registroController = require("../controllers/registroController");

router.post("/registro", registroController.registrar);

module.exports = router;
