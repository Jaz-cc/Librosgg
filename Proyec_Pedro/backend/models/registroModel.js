const conexion = require("../config/db");

const buscarPorCorreo = (correo, callback) => {

    const sql = `
        SELECT id
        FROM usuarios
        WHERE correo = ?;
    `;

    conexion.query(sql, [correo], callback);

};

const registrar = (usuario, callback) => {

    const { nombre, correo, password } = usuario;

    // rol_id = 2 -> Cliente (el registro público nunca crea Administradores)
    const sql = `
        INSERT INTO usuarios (nombre, correo, password, rol_id)
        VALUES (?, ?, ?, 2);
    `;

    conexion.query(sql, [nombre, correo, password], callback);

};

module.exports = {
    buscarPorCorreo,
    registrar
};
