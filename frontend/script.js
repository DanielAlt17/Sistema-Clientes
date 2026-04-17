// =====================================
// CARGA INICIAL DESDE LOCALSTORAGE
// =====================================

// Intentamos obtener los clientes guardados en el navegador
// Si no hay nada, usamos un array vacío
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];


// =====================================
// FUNCIÓN: GUARDAR EN LOCALSTORAGE
// =====================================

function guardarClientes() {
    // Convertimos el array a texto (JSON) y lo guardamos
    localStorage.setItem("clientes", JSON.stringify(clientes));
}


// =====================================
// FUNCIÓN: MOSTRAR CLIENTES EN PANTALLA
// =====================================

function obtenerClientes() {

    // Obtenemos la lista <ul> del HTML
    const lista = document.getElementById("lista");

    // Limpiamos la lista para evitar duplicados visuales
    lista.innerHTML = "";

    // Recorremos cada cliente
    clientes.forEach((cliente, index) => {

        // Creamos un <li> (elemento de lista)
        const li = document.createElement("li");

        // Creamos un <span> para el nombre
        const span = document.createElement("span");
        span.textContent = cliente.nombre;

        // Creamos botón eliminar
        const btn = document.createElement("button");
        btn.textContent = "Eliminar";
        btn.classList.add("btn-eliminar");

        // Evento click → elimina cliente
        btn.onclick = () => eliminarCliente(index);

        // Agregamos nombre y botón al <li>
        li.appendChild(span);
        li.appendChild(btn);

        // Agregamos el <li> a la lista
        lista.appendChild(li);
    });
}


// =====================================
// FUNCIÓN: AGREGAR CLIENTE
// =====================================

function agregarCliente() {

    // Obtenemos el valor del input
    const input = document.getElementById("nombre");
    const nombre = input.value.trim();

    // Validación: campo vacío
    if (!nombre) {
        alert("Por favor escribe un nombre");
        return;
    }

    // Validación: evitar duplicados
    const existe = clientes.some(c => c.nombre.toLowerCase() === nombre.toLowerCase());

    if (existe) {
        alert("Ese cliente ya existe");
        return;
    }

    // Agregamos cliente al array
    clientes.push({ nombre });

    // Guardamos en localStorage
    guardarClientes();

    // Limpiamos el input
    input.value = "";

    // Actualizamos la vista
    obtenerClientes();
}


// =====================================
// FUNCIÓN: ELIMINAR CLIENTE
// =====================================

function eliminarCliente(index) {

    // Eliminamos el cliente según su posición
    clientes.splice(index, 1);

    // Guardamos cambios
    guardarClientes();

    // Actualizamos la lista
    obtenerClientes();
}


// =====================================
// INICIO DE LA APP
// =====================================

// Cuando carga la página, mostramos los clientes guardados
obtenerClientes();