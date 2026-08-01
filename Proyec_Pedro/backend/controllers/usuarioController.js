const Usuario = require("../models/usuarioModel");


// GET todos
const getUsuarios = async (req, res) => {

    try {

        const usuarios = await Usuario.obtenerUsuarios();
        res.json(usuarios);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            mensaje: "Error al obtener usuarios"
        });

    }
};


// GET por ID
const getUsuarioPorId = async (req, res) => {

    try {

        const resultados = await Usuario.obtenerUsuarioPorId(req.params.id);

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.json(resultados[0]);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            mensaje: "Error al obtener el usuario"
        });

    }
};


// POST crear
const postUsuario = async (req, res) => {

    try {

        const { nombre, correo, password, rol_id } = req.body;

        if (!nombre || !correo || !password || !rol_id) {
            return res.status(400).json({
                mensaje: "Nombre, correo, contraseña y rol son obligatorios"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                mensaje: "La contraseña debe tener al menos 6 caracteres"
            });
        }

        const existentes = await Usuario.buscarPorCorreo(correo);

        if (existentes.length > 0) {
            return res.status(409).json({
                mensaje: "Ese correo ya está registrado"
            });
        }

        const resultado = await Usuario.crearUsuario({
            nombre,
            correo,
            password,
            rol_id
        });

        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            id: resultado.insertId
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            mensaje: "Error al crear el usuario"
        });

    }
};


// PUT actualizar
const putUsuario = async (req, res) => {

    try {

        const id = req.params.id;
        const { nombre, correo, password, rol_id } = req.body;

        if (!nombre || !correo || !rol_id) {
            return res.status(400).json({
                mensaje: "Nombre, correo y rol son obligatorios"
            });
        }

        // La contraseña es opcional al editar, pero si viene debe ser válida
        if (password && password.length < 6) {
            return res.status(400).json({
                mensaje: "La contraseña debe tener al menos 6 caracteres"
            });
        }

        // El correo no debe pertenecer a OTRO usuario
        const existentes = await Usuario.buscarPorCorreo(correo, id);

        if (existentes.length > 0) {
            return res.status(409).json({
                mensaje: "Ese correo ya pertenece a otro usuario"
            });
        }

        await Usuario.actualizarUsuario(id, {
            nombre,
            correo,
            password,
            rol_id
        });

        res.json({
            mensaje: "Usuario actualizado correctamente"
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            mensaje: "Error al actualizar el usuario"
        });

    }
};


// DELETE
const deleteUsuario = async (req, res) => {

    try {

        const id = req.params.id;

        // Evita que un administrador borre su propia cuenta mientras la usa
        if (req.usuario && Number(req.usuario.id) === Number(id)) {
            return res.status(400).json({
                mensaje: "No puedes eliminar tu propia cuenta mientras estás conectado"
            });
        }

        await Usuario.eliminarUsuario(id);

        res.json({
            mensaje: "Usuario eliminado correctamente"
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            mensaje: "Error al eliminar el usuario"
        });

    }
};


module.exports = {
    getUsuarios,
    getUsuarioPorId,
    postUsuario,
    putUsuario,
    deleteUsuario
};
