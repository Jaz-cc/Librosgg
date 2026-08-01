const API_USUARIOS = "http://localhost:3000/api/usuarios";


const authToken = localStorage.getItem("token");


document.addEventListener("DOMContentLoaded", cargarUsuarios);


async function cargarUsuarios() {

    try {

        const respuesta = await fetch(API_USUARIOS, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (!respuesta.ok) {
            const datos = await respuesta.json();
            alert(datos.mensaje || "No se pudieron cargar los usuarios");
            return;
        }

        const usuarios = await respuesta.json();

        const tabla = document.getElementById("tablaUsuarios");
        tabla.innerHTML = "";

        usuarios.forEach(usuario => {

            tabla.innerHTML += `
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.rol}</td>
                <td>
                    <button onclick='editarUsuario(${JSON.stringify(usuario)})'>
                        Editar
                    </button>
                    <button onclick="eliminarUsuario(${usuario.id})">
                        Eliminar
                    </button>
                </td>
            </tr>
            `;

        });

    } catch (error) {

        console.log(error);
        alert("Error al conectar con el servidor");

    }
}


// CREAR / ACTUALIZAR
document
    .getElementById("guardarUsuario")
    .addEventListener("click", async () => {

        const id = document.getElementById("idUsuario").value;

        const usuario = {
            nombre:   document.getElementById("nombreUsuario").value,
            correo:   document.getElementById("correoUsuario").value,
            password: document.getElementById("passwordUsuario").value,
            rol_id:   document.getElementById("rolUsuario").value
        };

        let metodo = "POST";
        let url = API_USUARIOS;

        if (id) {
            metodo = "PUT";
            url = `${API_USUARIOS}/${id}`;
        }

        try {

            const respuesta = await fetch(url, {
                method: metodo,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify(usuario)
            });

            const datos = await respuesta.json();

            alert(datos.mensaje);

            // Solo limpiamos y recargamos si de verdad se guardó
            if (respuesta.ok) {
                limpiarFormularioUsuario();
                cargarUsuarios();
            }

        } catch (error) {

            console.log(error);
            alert("Error al conectar con el servidor");

        }

    });


function editarUsuario(usuario) {

    document.getElementById("idUsuario").value = usuario.id;
    document.getElementById("nombreUsuario").value = usuario.nombre;
    document.getElementById("correoUsuario").value = usuario.correo;


    document.getElementById("passwordUsuario").value = "";

    document.getElementById("rolUsuario").value = usuario.rol_id;
}


async function eliminarUsuario(id) {

    if (!confirm("¿Eliminar usuario?"))
        return;

    try {

        const respuesta = await fetch(`${API_USUARIOS}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        const datos = await respuesta.json();

        alert(datos.mensaje);

        cargarUsuarios();

    } catch (error) {

        console.log(error);
        alert("Error al conectar con el servidor");

    }
}


function limpiarFormularioUsuario() {

    document.getElementById("idUsuario").value = "";
    document.getElementById("nombreUsuario").value = "";
    document.getElementById("correoUsuario").value = "";
    document.getElementById("passwordUsuario").value = "";
    document.getElementById("rolUsuario").value = "2"; // Cliente por defecto
}


document
    .getElementById("cancelarEdicionUsuario")
    .addEventListener("click", limpiarFormularioUsuario);
