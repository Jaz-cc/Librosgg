const conexion = require("../config/db");

const login = async (correo) => {

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

    const [usuario] = await conexion.query(
        sql,
        [correo]
    );

    return usuario;

};


module.exports = {
    login
};