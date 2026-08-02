const API_CARRITO = "http://localhost:3000/api/carrito";
const API_VENTAS = "http://localhost:3000/api/ventas";

const token = localStorage.getItem("token");

if (!token) {
    alert("Debes iniciar sesión");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    cargarResumen();
});

async function cargarResumen() {

    const respuesta = await fetch(API_CARRITO, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    const carrito = await respuesta.json();

    const resumen = document.getElementById("resumenPedido");
    const totalHTML = document.getElementById("totalPedido");

    resumen.innerHTML = "";

    let total = 0;

    carrito.forEach(item => {

        const subtotal = item.precio * item.cantidad;

        total += subtotal;

        resumen.innerHTML += `
            <div class="d-flex justify-content-between border-bottom py-2">

                <div>

                    <strong>${item.titulo}</strong><br>

                    Cantidad: ${item.cantidad}

                </div>

                <div>

                    $${subtotal}

                </div>

            </div>
        `;

    });

    totalHTML.innerHTML = `
        <h4 class="text-end">
            Total: $${total}
        </h4>
    `;

}

async function realizarCompra() {

    const nombre = document.getElementById("nombreCliente").value.trim();
    const direccion = document.getElementById("direccionCliente").value.trim();
    const tarjeta = document.getElementById("tarjetaCliente").value.trim();
    const cvv = document.getElementById("cvvCliente").value.trim();

    if (!nombre || !direccion || !tarjeta || !cvv) {

        alert("Completa todos los campos.");

        return;

    }

    const respuesta = await fetch(API_VENTAS, {

        method: "POST",

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {

        alert(datos.mensaje);

        return;

    }

    document.getElementById("ordenGenerada").innerText =
        "Número de orden: " + datos.venta_id;

    document.getElementById("pantallaExito").style.display = "flex";

}

function cerrarExito() {

    document.getElementById("pantallaExito").style.display = "none";

    window.location.href = "index.html";

}