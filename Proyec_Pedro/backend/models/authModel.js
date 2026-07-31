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

module.exports = {
    login
};