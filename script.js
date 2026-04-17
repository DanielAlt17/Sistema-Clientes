// ==============================
// DATOS LOCALES (DEMO)
// ==============================
let clientes = [];


// ==============================
// OBTENER CLIENTES
// ==============================
function obtenerClientes() {

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    clientes.forEach((cliente, index) => {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = cliente.nombre;

        const btn = document.createElement("button");
        btn.textContent = "Eliminar";
        btn.classList.add("btn-eliminar");

        btn.onclick = () => eliminarCliente(index);

        li.appendChild(span);
        li.appendChild(btn);

        lista.appendChild(li);
    });
}


// ==============================
// AGREGAR CLIENTE
// ==============================
function agregarCliente() {

    const nombre = document.getElementById("nombre").value;

    if (!nombre.trim()) {
        alert("Escribe un nombre");
        return;
    }

    clientes.push({ nombre });

    document.getElementById("nombre").value = "";

    obtenerClientes();
}


// ==============================
// ELIMINAR CLIENTE
// ==============================
function eliminarCliente(index) {
    clientes.splice(index, 1);
    obtenerClientes();
}


// ==============================
// INICIO
// ==============================
obtenerClientes();