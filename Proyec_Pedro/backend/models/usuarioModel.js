const conexion = require("../config/db");

const obtenerUsuarios = async () => {

    const sql = `
        SELECT
            u.id,
            u.nombre,
            u.correo,
            u.rol_id,
            r.nombre AS rol
        FROM usuarios u
        INNER JOIN roles r
            ON u.rol_id = r.id
        ORDER BY u.id;
    `;

    const [usuarios] = await conexion.query(sql);

    return usuarios;
};


// Un usuario por ID 
const obtenerUsuarioPorId = async (id) => {

    const sql = `
        SELECT
            u.id,
            u.nombre,
            u.correo,
            u.rol_id,
            r.nombre AS rol
        FROM usuarios u
        INNER JOIN roles r
            ON u.rol_id = r.id
        WHERE u.id = ?;
    `;

    const [usuario] = await conexion.query(sql, [id]);

    return usuario;
};


// Busca por correo para evitar duplicados.
// Al editar, se puede excluir el id del propio usuario.
const buscarPorCorreo = async (correo, excluirId = null) => {

    let sql = "SELECT id FROM usuarios WHERE correo = ?";
    const params = [correo];

    if (excluirId) {
        sql += " AND id <> ?";
        params.push(excluirId);
    }

    const [resultados] = await conexion.query(sql, params);

    return resultados;
};


// Crear usuario
const crearUsuario = async (usuario) => {

    const { nombre, correo, password, rol_id } = usuario;

    const sql = `
        INSERT INTO usuarios (nombre, correo, password, rol_id)
        VALUES (?, ?, ?, ?);
    `;

    const [resultado] = await conexion.query(
        sql,
        [nombre, correo, password, rol_id]
    );

    return resultado;
};


// Actualizar usuario.
const actualizarUsuario = async (id, usuario) => {

    const { nombre, correo, password, rol_id } = usuario;

    if (password) {

        const sql = `
            UPDATE usuarios
            SET nombre = ?, correo = ?, password = ?, rol_id = ?
            WHERE id = ?;
        `;

        const [resultado] = await conexion.query(
            sql,
            [nombre, correo, password, rol_id, id]
        );

        return resultado;
    }

    const sql = `
        UPDATE usuarios
        SET nombre = ?, correo = ?, rol_id = ?
        WHERE id = ?;
    `;

    const [resultado] = await conexion.query(
        sql,
        [nombre, correo, rol_id, id]
    );

    return resultado;
};


// Eliminar usuario
const eliminarUsuario = async (id) => {

    const [resultado] = await conexion.query(
        "DELETE FROM usuarios WHERE id = ?",
        [id]
    );

    return resultado;
};


module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    buscarPorCorreo,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};
