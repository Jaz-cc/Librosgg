const API_LIBROS = "http://localhost:3000/api/libros";

let libroActual;

document.addEventListener("DOMContentLoaded", () => {

    const parametros = new URLSearchParams(window.location.search);

    const idLibro = parametros.get("id");

    console.log("URL:", window.location.href);
    console.log("ID:", idLibro);

    if (!idLibro) {
        alert("No se recibió el ID del libro.");
        return;
    }

    cargarLibro(idLibro);

    const formulario = document.getElementById("formCompra");

    formulario.addEventListener("submit", agregarAlCarrito);

});


async function cargarLibro(idLibro) {

    try {

        const respuesta = await fetch(`${API_LIBROS}/${idLibro}`);

        if (!respuesta.ok) {
            alert("Libro no encontrado.");
            return;
        }

        libroActual = await respuesta.json();

        document.getElementById("tituloLibro").innerText =
            libroActual.titulo;

        document.getElementById("autorLibro").innerText =
            "Autor: " + libroActual.autor;

        document.getElementById("descripcionLibro").innerText =
            libroActual.descripcion;

        document.getElementById("precioLibro").innerText =
            "$" + libroActual.precio;

        document.getElementById("stock").innerText =
            "Stock disponible: " + libroActual.stock;

        document.getElementById("imagenLibro").src =
            "../imagenes/" + libroActual.imagen;

    } catch (error) {

        console.error(error);

    }

}


async function agregarAlCarrito(e) {

    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {

        alert("Debes iniciar sesión.");

        window.location.href = "../login.html";

        return;

    }

    const cantidad =
        parseInt(document.getElementById("cantidad").value);

    const confirmacion =
        document.querySelector("#formCompra input[type='text']")
        .value
        .trim()
        .toUpperCase();

    if (confirmacion !== "SI") {

        alert("Debes escribir SI para confirmar.");

        return;

    }

    try {

        const respuesta = await fetch(
            "http://localhost:3000/api/carrito",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify({

                    libro_id: libroActual.id,

                    cantidad: cantidad

                })

            }

        );

        const datos = await respuesta.json();

        alert(datos.mensaje);

    } catch (error) {

        console.error(error);

    }

}