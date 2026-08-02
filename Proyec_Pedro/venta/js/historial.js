const API = "http://localhost:3000/api/ventas";

const token = localStorage.getItem("token");

async function cargarHistorial() {

    const respuesta = await fetch(API, {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    const historial = await respuesta.json();

    const lista = document.getElementById("listaHistorial");

    lista.innerHTML = "";

    if (historial.length === 0) {

        lista.innerHTML = `

            <div class="alert alert-info">

                No hay compras registradas.

            </div>

        `;

        return;

    }

    historial.forEach(venta => {

        let productos = "";

        venta.productos.forEach(producto => {

            productos += `

                <li>

                    ${producto.titulo}
                    x${producto.cantidad}
                    - $${producto.precio}

                </li>

            `;

        });

        lista.innerHTML += `

            <div class="card shadow mb-4">

                <div class="card-body">

                    <h4>

                        Orden #${venta.id}

                    </h4>

                    <p>

                        Fecha:
                        ${new Date(venta.fecha).toLocaleString()}

                    </p>

                    <ul>

                        ${productos}

                    </ul>

                    <h5>

                        Total:
                        $${venta.total}

                    </h5>

                </div>

            </div>

        `;

    });

}

document.addEventListener(

    "DOMContentLoaded",

    cargarHistorial

);