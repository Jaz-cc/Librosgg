async function login() {

    const correo = document.getElementById("correo").value;

    const password = document.getElementById("password").value;

    const mensaje = document.getElementById("mensaje");

    try {

        const respuesta = await fetch(
            "http://localhost:3000/api/login",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    correo,
                    password

                })

            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            mensaje.textContent = datos.mensaje;

            return;

        }

        // Guardar el token y el usuario
        localStorage.setItem("token", datos.token);

        localStorage.setItem(
            "usuario",
            JSON.stringify(datos.usuario)
        );

        mensaje.textContent = "Bienvenido " + datos.usuario.nombre;

        if (datos.usuario.rol === "Administrador") {

            window.location.href = "admin/index.html";

        } else {

            window.location.href = "index.html";

        }

    } catch (error) {

        mensaje.textContent = "Error al conectar con el servidor.";

    }

}