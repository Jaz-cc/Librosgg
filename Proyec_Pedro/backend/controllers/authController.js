const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");

const login = (req, res) => {

    const { correo, password } = req.body;

    Auth.login(correo, (error, resultados) => {

        if (error)
            return res.status(500).json(error);

        if (resultados.length === 0)
            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });

        const usuario = resultados[0];

        // Por ahora compararemos texto plano.
        // Después cambiaremos a bcrypt.
        if (usuario.password !== password) {

            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });

        }

        const token = jwt.sign(

            {
                id: usuario.id,
                rol: usuario.rol
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "2h"
            }

        );

        res.json({

            mensaje: "Login correcto",

            token,

            usuario: {

                id: usuario.id,
                nombre: usuario.nombre,
                rol: usuario.rol

            }

        });

    });

};

const register = (req, res) => {

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
    Auth.buscarPorCorreo(correo, (error, resultados) => {

        if (error)
            return res.status(500).json(error);

        if (resultados.length > 0)
            return res.status(409).json({
                mensaje: "Ese correo ya está registrado"
            });

        // Por ahora guardamos la contraseña en texto plano,
        // igual que en el login. Después cambiaremos a bcrypt.
        Auth.registrar({ nombre, correo, password }, (error, resultado) => {

            if (error)
                return res.status(500).json(error);

            const token = jwt.sign(

                {
                    id: resultado.insertId,
                    rol: "Cliente"
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "2h"
                }

            );

            res.status(201).json({

                mensaje: "Usuario registrado correctamente",

                token,

                usuario: {

                    id: resultado.insertId,
                    nombre,
                    rol: "Cliente"

                }

            });

        });

    });

};

module.exports = {
    login,
    register
};