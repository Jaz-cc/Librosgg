const conexion = require("../config/db");

const login = (correo, callback) => {

    const sql = `
        SELECT
            u.id,
            u.nombre,
            u.correo,
            u.password,
            r.nombre AS rol
        FROM usuarios u
        INNER JOIN roles r
            ON u.rol_id = r.id
        WHERE u.correo = ?;
    `;

    conexion.query(sql, [correo], callback);

};

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

    // rol_id = 2 -> Cliente (los administradores no se crean desde el registro público)
    const sql = `
        INSERT INTO usuarios (nombre, correo, password, rol_id)
        VALUES (?, ?, ?, 2);
    `;

    conexion.query(sql, [nombre, correo, password], callback);

};

module.exports = {
    login,
    buscarPorCorreo,
    registrar
};