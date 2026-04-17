
// =====================================
// URL DEL BACKEND (SERVIDOR FLASK)
// =====================================

// Aquí guardamos la dirección del servidor donde está tu API
const URL = "http://127.0.0.1:5000/clientes";


// =====================================
// FUNCIÓN: OBTENER CLIENTES (GET)
// =====================================

function obtenerClientes() {

    // fetch hace una petición GET a la API
    fetch(URL)

        // Convierte la respuesta del servidor a JSON
        .then(res => res.json())

        // data = lista de clientes que manda el backend
        .then(data => {

            // Selecciona el elemento <ul id="lista"> del HTML
            const lista = document.getElementById("lista");

            // Limpia la lista antes de volver a dibujarla
            // (evita duplicados)
            lista.innerHTML = "";

            // Recorre cada cliente que viene del backend
            data.forEach((cliente, index) => {

                // Crea un elemento <li>
                const li = document.createElement("li");

                // Crea un <span> para mostrar el nombre
                const span = document.createElement("span");
                span.textContent = cliente.nombre;

                // Crea el botón de eliminar
                const btn = document.createElement("button");
                btn.textContent = "Eliminar";
                btn.classList.add("btn-eliminar");

                // Cuando se hace clic en el botón eliminar
                // llama a la función eliminarCliente con el índice
                btn.onclick = () => eliminarCliente(index);

                // Mete el texto y el botón dentro del <li>
                li.appendChild(span);
                li.appendChild(btn);

                // Agrega el <li> a la lista <ul>
                lista.appendChild(li);
            });
        });
}


// =====================================
// FUNCIÓN: ELIMINAR CLIENTE (DELETE)
// =====================================

function eliminarCliente(index) {

    // Hace una petición DELETE al backend
    fetch(`http://127.0.0.1:5000/clientes/${index}`, {
        method: "DELETE"
    })

    // Cuando termina, vuelve a cargar la lista
    .then(() => obtenerClientes())

    // Si hay error, lo muestra en consola
    .catch(error => console.error(error));
}


// =====================================
// FUNCIÓN: AGREGAR CLIENTE (POST)
// =====================================

function agregarCliente() {

    // Obtiene el valor escrito en el input
    const nombre = document.getElementById("nombre").value;

    // Hace una petición POST al backend
    fetch(URL, {

        // Método POST = enviar datos al servidor
        method: "POST",

        // Encabezados: indican que enviamos JSON
        headers: {
            "Content-Type": "application/json"
        },

        // body = datos que se envían al backend
        // JSON.stringify convierte el objeto JS a JSON
        body: JSON.stringify({ nombre: nombre })
    })

    // Cuando termina de enviar los datos
    .then(() => {

        // Recarga la lista para mostrar el nuevo cliente
        obtenerClientes();

        // Limpia el input
        document.getElementById("nombre").value = "";
    });
}


// =====================================
// EJECUCIÓN INICIAL
// =====================================

// Cuando la página carga, se ejecuta esto automáticamente
// para mostrar los clientes desde el inicio
obtenerClientes();