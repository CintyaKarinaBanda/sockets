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
      try {
        if (usuario.id == "") {
          await new Usuario(usuario).save();
          io.emit("servidorUsuarioMensaje", "Usuario guardado");
        } else {
          await Usuario.findByIdAndUpdate(usuario.id, usuario);
          io.emit("servidorUsuarioMensaje", "Usuario modificado");
        }
      } catch (err) {
        console.error("Error al registrar/editar usuario" + err);
      }
    });

    // Obtener usuario por Id
    socket.on("clienteObtenerUsuarioPorId", async (id) => {
      const usuario = await Usuario.findById(id);
      io.emit("servidorObtenerUsuarioPorId", usuario);
    });

    //Borrar usuario
    socket.on("clienteBorrarUsuario", async (id) => {
      await Usuario.findByIdAndDelete(id);
      io.emit("servidorUsuarioMensaje", "Usuario Borrado");
      mostrarUsuarios();
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
          if (producto.id == "") {
              await new Producto(producto).save();
              io.emit("servidorProductoGuardado", "Producto Guardado");
          } else {
              await Producto.findByIdAndUpdate(producto.id, producto);
              io.emit("servidorProductoGuardado", "Producto Modificado");
          }
      } catch (err) {
          console.error("Error al registrar producto" + err);
      }
    });
    

    // Obtener producto por Id
    socket.on("clienteObtenerProductoPorId", async (id) => {
      const producto = await Producto.findById(id);
      io.emit("servidorObtenerProductoPorId", producto);
    });

    // Borrar producto
    socket.on("clienteBorrarProducto", async (id) => {
      await Producto.findByIdAndDelete(id);
      io.emit("servidorProductoGuardado", "Producto Borrado");
      mostrarProductos();
    });
  });
}

module.exports = socket;
