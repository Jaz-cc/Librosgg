const GOOGLE_BOOKS_API_KEY = "AIzaSyBpff3GInWGJ6OWfvBhxdSD8IBz06pS1KU";

function construirUrlBusqueda(texto) {
  const params = new URLSearchParams({
    q: texto,
    maxResults: "20",
    langRestrict: "es",
    printType: "books",
    orderBy: "relevance"
  });
  if (GOOGLE_BOOKS_API_KEY) params.append("key", GOOGLE_BOOKS_API_KEY);
  return `https://www.googleapis.com/books/v1/volumes?${params.toString()}`;
}

async function buscarLibro() {
  const texto = document.getElementById("busqueda").value.trim();
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  if (texto === "") {
    resultado.innerHTML = `
      <div class="sin-resultados">❌ Ingresa un término de búsqueda</div>`;
    return;
  }

  // Estado de carga mientras llega la respuesta
  resultado.innerHTML = `<div class="sin-resultados">⏳ Buscando…</div>`;

  try {
    const respuesta = await fetch(construirUrlBusqueda(texto));

    // Si el servidor responde con error
    if (!respuesta.ok) {
      throw new Error(`La API respondió ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    // Google devuelve items solo si hay coincidencias
    if (!datos.items || datos.items.length === 0) {
      resultado.innerHTML = `
        <div class="sin-resultados">❌ No se encontraron libros</div>`;
      return;
    }

    resultado.innerHTML = "";

    datos.items.forEach(item => {
      const info = item.volumeInfo || {};

      const titulo = info.title || "Sin título";
      const autor = info.authors ? info.authors.join(", ") : "Autor desconocido";
      // Google no siempre trae portada; usamos un placeholder si falta
      const imagen = info.imageLinks?.thumbnail || "./imagenes/404.png";
      const anio = info.publishedDate ? info.publishedDate.substring(0, 4) : "s/f";
      const editorial = info.publisher || "";
      // Enlace a la ficha/vista previa en Google Books
      const urlDestino = info.infoLink || "#";

      resultado.innerHTML += `
        <div class="resultado-libro">
          <img src="${imagen}" alt="Portada de ${titulo}">

          <div class="resultado-info">
            <h4>${titulo}</h4>

            <div class="resultado-extra">
              Autor: ${autor} <br>
              ${editorial ? editorial + " • " : ""}${anio}
            </div>

            <br>

            <a href="${urlDestino}" target="_blank" rel="noopener">Ver más</a>
            <br><br>
          </div>
        </div>`;
    });

  } catch (error) {
    // Errores de red, CORS, cuota, etc.
    console.error("Error al consultar Google Books:", error);
    resultado.innerHTML = `
      <div class="sin-resultados">
        ⚠️ Ocurrió un error al buscar. Intenta de nuevo.
      </div>`;
  }
}