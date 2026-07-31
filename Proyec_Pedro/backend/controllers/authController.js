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

module.exports = {
    login
};