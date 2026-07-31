const Registro = require("../models/registroModel");

const registrar = (req, res) => {

    const { nombre, correo, password } = req.body;

    // Validación básica de campos
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

    // Verificamos que el correo no esté registrado
    Registro.buscarPorCorreo(correo, (error, resultados) => {

        if (error)
            return res.status(500).json(error);

        if (resultados.length > 0)
            return res.status(409).json({
                mensaje: "Ese correo ya está registrado"
            });

        // Por ahora guardamos la contraseña en texto plano,
        // igual que en el login. Después cambiaremos a bcrypt.
        Registro.registrar({ nombre, correo, password }, (error, resultado) => {

            if (error)
                return res.status(500).json(error);

            res.status(201).json({

                mensaje: "Usuario registrado correctamente",

                usuario: {

                    id: resultado.insertId,
                    nombre,
                    correo

                }

            });

        });

    });

};

module.exports = {
    registrar
};
