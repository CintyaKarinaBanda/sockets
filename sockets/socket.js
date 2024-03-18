const Usuario = require("../modelos/usuario");
const Producto = require("../modelos/producto");

// Conexión con la base de datos y el cliente

function socket(io) {
  io.on("connection", (socket) => {

    // USUARIOS
    // Mostrar usuarios
    mostrarUsuarios();
    async function mostrarUsuarios() {
      const usuarios = await Usuario.find();
      io.emit("ServidorEnviarUsuarios", usuarios);
    }

    // Guardar usuario
    socket.on("clienteGuardarUsuario", async (usuario) => {
      console.log(usuario);
      try {
        await new Usuario(usuario).save();
        io.emit("servidorUsuarioGuardado", "Usuario Guardado");
      } catch (err) {
        console.error("Error al registrar usuario"+err);
      }
    });

    // PRODUCTOS
    // Mostrar productos
    mostrarProductos();
    async function mostrarProductos() {
      const productos = await Producto.find();
      io.emit("ServidorEnviarProductos", productos);
    }

    // Guardar producto
    socket.on("clienteGuardarProducto", async (producto) => {
      try {
        await new Producto(producto).save();
        io.emit("servidorProductoGuardado", "Producto Guardado");
      } catch (err) {
        console.error("Error al registrar producto" + err );
      }
    });
  }); 
}

module.exports = socket;