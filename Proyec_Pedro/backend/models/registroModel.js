const conexion = require("../config/db");

const buscarPorCorreo = async (correo) => {
    const sql = `SELECT id FROM usuarios WHERE correo = ?;`;
    const [resultados] = await conexion.query(sql, [correo]);
    return resultados;
};

const registrar = async (usuario) => {
    const { nombre, correo, password } = usuario;
    const sql = `
        INSERT INTO usuarios (nombre, correo, password, rol_id)
        VALUES (?, ?, ?, 2);
    `;
    const [resultado] = await conexion.query(sql, [nombre, correo, password]);
    return resultado;
};

module.exports = {
    buscarPorCorreo,
    registrar
};