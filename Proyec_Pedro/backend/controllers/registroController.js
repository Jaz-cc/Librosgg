const Registro = require("../models/registroModel");

const registrar = async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;

        if (!nombre || !correo || !password) {
            return res.status(400).json({
                mensaje: "Nombre, correo y contraseña son obligatorios"
            }); 
        }

        if (password.length < 6) {
            return res.status(400).json({
                mensaje: "La contraseña debe tener al menos 6 caracteres"
            });
        }

        const existentes = await Registro.buscarPorCorreo(correo);

        if (existentes.length > 0) {
            return res.status(409).json({
                mensaje: "Ese correo ya está registrado"
            });
        }

        const resultado = await Registro.registrar({ nombre, correo, password });

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario: {
                id: resultado.insertId,
                nombre,
                correo
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al registrar el usuario"
        });
    }
};

module.exports = {
    registrar
};