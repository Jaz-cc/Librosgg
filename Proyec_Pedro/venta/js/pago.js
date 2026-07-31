const API_VENTAS = "http://localhost:3000/api/ventas";

const token = localStorage.getItem("token");

if (!token) {

    alert("Debes iniciar sesión");

    window.location.href = "login.html";

}

async function realizarCompra() {

    const nombre = document.getElementById("nombreCliente").value;
    const direccion = document.getElementById("direccionCliente").value;
    const tarjeta = document.getElementById("tarjetaCliente").value;
    const cvv = document.getElementById("cvvCliente").value;

    if (
        nombre == "" ||
        direccion == "" ||
        tarjeta == "" ||
        cvv == ""
    ) {

        alert("Completa todos los campos.");

        return;

    }

    const respuesta = await fetch(API_VENTAS, {

        method: "POST",

        headers: {

            "Authorization": `Bearer ${token}`

        }

    });

    const datos = await respuesta.json();

    alert(datos.mensaje);

    if (datos.venta_id) {

        document.getElementById("ordenGenerada").innerText =
            "Orden #" + datos.venta_id;

        document.getElementById("pantallaExito").style.display = "flex";

    }

}