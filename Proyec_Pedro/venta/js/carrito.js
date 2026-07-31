const API_CARRITO = "http://localhost:3000/api/carrito";

const token = localStorage.getItem("token");

if (!token) {
    alert("Debes iniciar sesión");
    window.location.href = "login.html";
}

// =======================
// CARGAR CARRITO
// =======================

async function cargarCarrito() {

    const respuesta = await fetch(API_CARRITO, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    const carrito = await respuesta.json();

    const lista = document.getElementById("listaCarrito");

    const totalHTML = document.getElementById("totalCarrito");

    lista.innerHTML = "";

    let total = 0;

    if (carrito.length == 0) {

        lista.innerHTML = "<h4>Tu carrito está vacío.</h4>";

        totalHTML.innerText = "$0";

        return;

    }

    carrito.forEach(item => {

        const subtotal = item.precio * item.cantidad;

        total += subtotal;

        lista.innerHTML += `

        <div class="item-carrito">

            <img
                src="imagenes/${item.imagen}"
                width="120">

            <div class="item-info">

                <h4>${item.titulo}</h4>

                <p>

                    Precio:
                    $${item.precio}

                </p>

                <p>

                    Cantidad:
                    ${item.cantidad}

                </p>

                <p>

                    Subtotal:
                    $${subtotal}

                </p>

            </div>

            <div>

                <button
                    class="btn btn-success"
                    onclick="sumarCantidad(${item.id},${item.cantidad})">

                    +

                </button>

                <button
                    class="btn btn-warning"
                    onclick="restarCantidad(${item.id},${item.cantidad})">

                    -

                </button>

                <button
                    class="btn btn-danger"
                    onclick="eliminarProducto(${item.id})">

                    Eliminar

                </button>

            </div>

        </div>

        <hr>

        `;

    });

    totalHTML.innerText = "$" + total;

}

document.addEventListener(
    "DOMContentLoaded",
    cargarCarrito
);


// =======================
// SUMAR
// =======================

async function sumarCantidad(id, cantidad) {

    await fetch(`${API_CARRITO}/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`

        },

        body: JSON.stringify({

            cantidad: cantidad + 1

        })

    });

    cargarCarrito();

}


// =======================
// RESTAR
// =======================

async function restarCantidad(id, cantidad) {

    if (cantidad <= 1)
        return;

    await fetch(`${API_CARRITO}/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`

        },

        body: JSON.stringify({

            cantidad: cantidad - 1

        })

    });

    cargarCarrito();

}


// =======================
// ELIMINAR
// =======================

async function eliminarProducto(id) {

    if (!confirm("¿Eliminar libro?"))
        return;

    await fetch(`${API_CARRITO}/${id}`, {

        method: "DELETE",

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    cargarCarrito();

}


// =======================
// VACIAR
// =======================

async function vaciarCarrito() {

    if (!confirm("¿Vaciar carrito?"))
        return;

    await fetch(API_CARRITO, {

        method: "DELETE",

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    cargarCarrito();

}
async function realizarCompra() {

    const token = localStorage.getItem("token");

    const respuesta = await fetch(

        "http://localhost:3000/api/ventas",

        {

            method:"POST",

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

    const datos = await respuesta.json();

    alert(datos.mensaje);

    if(datos.venta_id){

        document.getElementById("ordenGenerada").innerText =
        "Orden #" + datos.venta_id;

        document.getElementById("pantallaExito").style.display = "flex";
    }

}


// =======================
// PAGO
// =======================

function realizarPago() {

    window.location.href = "pago.html";

}