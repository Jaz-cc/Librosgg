document.addEventListener("DOMContentLoaded", async () => {

    const contenedor = document.getElementById("listaLibros");

    try {

        const respuesta = await fetch("http://localhost:3000/api/libros");

        const libros = await respuesta.json();

        contenedor.innerHTML = "";

        libros.forEach(libro => {

            contenedor.innerHTML += `
                <div class="col-md-3 col-sm-6">

                    <div class="card libro-card">

                        <img src="imagenes/${libro.imagen}" class="card-img-top">

                        <div class="card-body">

                            <h6>${libro.titulo}</h6>

                            <div class="precio">$${libro.precio}</div>

                            <p class="${libro.stock > 0 ? 'text-success' : 'text-danger'}">
                                ${libro.stock > 0 ? 'Disponibles: ' + libro.stock : 'AGOTADO'}
                            </p>

                            <span class="envio">Envío gratis</span><br>

                            <a href="libros/libro.html?id=${libro.id}"
                               class="btn btn-primary btn-sm mt-2">

                               Ver más

                            </a>

                        </div>

                    </div>

                </div>
            `;

        });

    } catch (error) {

        console.error(error);

    }

});