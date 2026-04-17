# Importamos las herramientas necesarias de Flask
# Flask → para crear el servidor
# request → para recibir datos del frontend
# jsonify → para enviar datos en formato JSON
from flask import Flask, request, jsonify

# Importamos CORS para permitir conexión entre frontend y backend
from flask_cors import CORS

# Creamos la aplicación (el servidor)
app = Flask(__name__)

# Activamos CORS (permite que el frontend se conecte)
CORS(app)

# Creamos una "base de datos" temporal (lista vacía)
# Aquí se guardarán los clientes
clientes = []

# -------------------------
# RUTA PRINCIPAL
# -------------------------
@app.route('/')
def home():
    # Cuando alguien entra a la raíz del servidor (/)
    # devuelve este mensaje
    return "Servidor funcionando 🚀"


# -------------------------
# OBTENER CLIENTES (GET)
# -------------------------
@app.route('/clientes', methods=['GET'])
def obtener_clientes():
    # Devuelve la lista de clientes en formato JSON
    return jsonify(clientes)


# -------------------------
# AGREGAR CLIENTE (POST)
# -------------------------
@app.route('/clientes', methods=['POST'])
def agregar_cliente():
    # Recibe los datos enviados desde el frontend (JS)
    data = request.json

    # Agrega ese cliente a la lista
    clientes.append(data)

    # Devuelve un mensaje de confirmación junto con el cliente agregado
    return jsonify({
        "mensaje": "Cliente agregado",
        "cliente": data
    })


# -------------------------
# ELIMINAR CLIENTE (DELETE)
# -------------------------
@app.route('/clientes/<int:index>', methods=['DELETE'])
def eliminar_cliente(index):
    # Verifica que el índice exista en la lista
    if 0 <= index < len(clientes):

        # Elimina el cliente en esa posición
        eliminado = clientes.pop(index)

        # Devuelve confirmación
        return jsonify({
            "mensaje": "Cliente eliminado",
            "cliente": eliminado
        })
    else:
        # Si el índice no existe, devuelve error
        return jsonify({"error": "Índice no válido"}), 404


# -------------------------
# INICIAR EL SERVIDOR
# -------------------------
if __name__ == '__main__':
    # Ejecuta el servidor en modo desarrollo
    app.run(debug=True)