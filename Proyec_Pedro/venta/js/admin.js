const API = "http://localhost:3000/api/libros";

const token = localStorage.getItem("token");


if (!token) {

    alert("Debes iniciar sesión");

    window.location.href = "../index.html";

}



document.addEventListener(
    "DOMContentLoaded",
    cargarLibros
);



async function cargarLibros() {


    const respuesta = await fetch(API);

    const libros = await respuesta.json();


    const tabla = document.getElementById("tablaLibros");


    tabla.innerHTML = "";



    libros.forEach(libro => {


        tabla.innerHTML += `

        <tr>

            <td>${libro.id}</td>

            <td>${libro.titulo}</td>

            <td>${libro.autor}</td>

            <td>$${libro.precio}</td>

            <td>${libro.stock}</td>

            <td>
                <img src="${libro.imagen}" width="50">
            </td>


            <td>


            <button onclick='editarLibro(${JSON.stringify(libro)})'>
                Editar
            </button>



            <button onclick="eliminarLibro(${libro.id})">
                Eliminar
            </button>


            </td>


        </tr>

        `;


    });


}






// CREAR / ACTUALIZAR LIBRO

document
    .getElementById("guardarLibro")
    .addEventListener(
        "click",
        async () => {


            const id =
                document.getElementById("idLibro").value;



            const libro = {


                titulo:
                    document.getElementById("titulo").value,


                autor:
                    document.getElementById("autor").value,


                precio:
                    document.getElementById("precio").value,


                stock:
                    document.getElementById("stock").value,


                imagen:
                    document.getElementById("imagen").value,


                descripcion:
                    document.getElementById("descripcion").value,


                categoria_id:
                    document.getElementById("categoria_id").value


            };




            let metodo = "POST";

            let url = API;



            if (id) {

                metodo = "PUT";

                url = `${API}/${id}`;

            }




            const respuesta = await fetch(

                url,

                {

                    method: metodo,


                    headers: {


                        "Content-Type": "application/json",


                        "Authorization":
                            `Bearer ${token}`


                    },


                    body:
                        JSON.stringify(libro)


                }

            );



            const datos = await respuesta.json();



            alert(datos.mensaje);



            limpiarFormulario();


            cargarLibros();



        });








function editarLibro(libro) {



    document.getElementById("idLibro").value =
        libro.id;



    document.getElementById("titulo").value =
        libro.titulo;



    document.getElementById("autor").value =
        libro.autor;



    document.getElementById("precio").value =
        libro.precio;



    document.getElementById("stock").value =
        libro.stock;



    document.getElementById("imagen").value =
        libro.imagen;



    document.getElementById("descripcion").value =
        libro.descripcion;




}





async function eliminarLibro(id) {


    if (!confirm("¿Eliminar libro?"))
        return;



    const respuesta = await fetch(

        `${API}/${id}`,

        {

            method: "DELETE",


            headers: {


                "Authorization":
                    `Bearer ${token}`


            }


        }

    );



    const datos = await respuesta.json();



    alert(datos.mensaje);



    cargarLibros();


}








function limpiarFormulario() {


    document.getElementById("idLibro").value = "";


    document.getElementById("titulo").value = "";


    document.getElementById("autor").value = "";


    document.getElementById("precio").value = "";


    document.getElementById("stock").value = "";


    document.getElementById("imagen").value = "";


    document.getElementById("descripcion").value = "";


    document.getElementById("categoria_id").value = "";


}







document
    .getElementById("cancelarEdicion")
    .addEventListener(
        "click",
        limpiarFormulario
    );






document
    .getElementById("cerrarSesion")
    .addEventListener(
        "click",
        () => {


            localStorage.removeItem("token");

            localStorage.removeItem("usuario");


            window.location.href = "../login.html";


        });