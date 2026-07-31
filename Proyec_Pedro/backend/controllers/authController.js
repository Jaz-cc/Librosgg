const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");


const login = async (req, res) => {

    try {

        const { correo, password } = req.body;


        const resultados = await Auth.login(correo);


        if (resultados.length === 0) {

            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });

        }


        const usuario = resultados[0];


        // Por ahora comparación en texto plano
        // Después se puede cambiar a bcrypt

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


    } catch(error) {

        console.log(error);

        res.status(500).json({
            mensaje:"Error en el login"
        });

    }

};


module.exports = {
    login
};