async function registrar() {

    const nombre = document.getElementById("nombre").value.trim();

    const correo = document.getElementById("correo").value.trim();

    const password = document.getElementById("password").value;

    const password2 = document.getElementById("password2").value;

    const mensaje = document.getElementById("mensaje");

    mensaje.classList.remove("text-danger", "text-success");
    mensaje.textContent = "";

    // Validaciones básicas en el cliente
    if (!nombre || !correo || !password || !password2) {

        mensaje.classList.add("text-danger");
        mensaje.textContent = "Por favor completa todos los campos.";

        return;

    }

    if (password.length < 6) {

        mensaje.classList.add("text-danger");
        mensaje.textContent = "La contraseña debe tener al menos 6 caracteres.";

        return;

    }

    if (password !== password2) {

        mensaje.classList.add("text-danger");
        mensaje.textContent = "Las contraseñas no coinciden.";

        return;

    }

    try {

        const respuesta = await fetch(
            "http://localhost:3000/api/registro",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    nombre,
                    correo,
                    password

                })

            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            mensaje.classList.add("text-danger");
            mensaje.textContent = datos.mensaje;

            return;

        }

        // No guardamos nada en localStorage.
        // Simplemente avisamos y lo mandamos a iniciar sesión.
        mensaje.classList.add("text-success");
        mensaje.textContent = "Cuenta creada correctamente. Redirigiendo al login...";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

    } catch (error) {

        mensaje.classList.add("text-danger");
        mensaje.textContent = "Error al conectar con el servidor.";

    }

}
