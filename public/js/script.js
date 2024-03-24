const socket = io();

var enviarDatosUsuario = document.getElementById("enviarDatosUsuario"); 
var mensajeUsuario = document.getElementById("mensajeUsuario");
var datosUsuarios = document.getElementById("datosUsuarios");
var enviarDatosProducto = document.getElementById("enviarDatosProducto"); 
var mensajeProducto = document.getElementById("mensajeProducto"); 
var datosProductos = document.getElementById("datosProductos");

// USUARIOS
socket.on("ServidorEnviarUsuarios", (usuarios) => {
    var tr = "";
    usuarios.forEach((usuario, idLocal) => {
        tr = tr +            
            `<tr>
            <td>${(idLocal + 1) * 100}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.usuario}</td>
            <td>${usuario.password}</td>
            <td>
                <a href="#" onclick="editarUsuario('${usuario._id}')">Editar</a> /
                <a href="#" onclick="borrarUsuario('${usuario._id}')">Borrar</a>
            </td>
            </tr>
            `;
    });
    datosUsuarios.innerHTML = tr;
});
// Guardar datos en la base de datos de MongoDB
enviarDatosUsuario.addEventListener("submit", (e) => {
    e.preventDefault();
    //   Recivir datos
    var usuario = {
        id: document.getElementById("idUsuario").value,
        nombre: document.getElementById("nombre").value,
        usuario: document.getElementById("usuario").value,
        password: document.getElementById("password").value,
    };

    socket.emit("clienteGuardarUsuario", usuario);
    socket.on("servidorUsuarioMensaje", (mensaje) => {
        mensajeUsuario.innerHTML = mensaje;
        setTimeout(() => {
            mensajeUsuario.innerHTML = "";
            location.reload();
        }, 2000);

        document.getElementById("nombre").value = "";
        document.getElementById("usuario").value = "";
        document.getElementById("password").value = "";
        document.getElementById("nombre").focus();
        nombre.style.backgroundColor = "grey";

    });
});

// Modificar datos de un registro en la base de datos de MongoDB
function editarUsuario(id) {
    socket.emit("clienteObtenerUsuarioPorId",id);
}
socket.on("servidorObtenerUsuarioPorId",(usuario)=>{
    document.getElementById("tituloUsuario").innerHTML = "Editar Usuario";
    document.getElementById("botonUsuario").innerHTML = "Guardar Cambios";
    document.getElementById("idUsuario").value = usuario._id;
    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("usuario").value = usuario.usuario;
    document.getElementById("password").value = usuario.password;
});

// Eliminar datos de la base de datos de MongoDB
function borrarUsuario(id) {
    socket.emit("clienteBorrarUsuario", id);
}


// PRODUCTOS
socket.on("ServidorEnviarProductos", (productos) => {
    var tr = "";
    productos.forEach((producto, idLocal) => {
        tr = tr +            
            `<tr>
            <td>${(idLocal + 1) * 100}</td>
            <td>${producto.producto}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" onclick="editarProducto('${producto._id}')">Editar</a> /
                <a href="#" onclick="borrarProducto('${producto._id}')">Borrar</a>
            </td>
            </tr>
            `;
    });
    datosProductos.innerHTML = tr;
});
// Guardar datos en la base de datos de MongoDB
enviarDatosProducto.addEventListener("submit", (e) => {
    e.preventDefault();
    //   Recivir datos
    var producto = {
        id: document.getElementById("idProducto").value,
        producto: document.getElementById("producto").value,
        descripcion: document.getElementById("descripcion").value,
        precio: document.getElementById("precio").value,
    };

    socket.emit("clienteGuardarProducto", producto);
    socket.on("servidorProductoGuardado", (mensaje) => {
        mensajeProducto.innerHTML = mensaje;
        setTimeout(() => {
            mensajeProducto.innerHTML = "";
            location.reload();
        }, 2000);

        document.getElementById("producto").value = "";
        document.getElementById("descripcion").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("producto").focus();
        producto.style.backgroundColor = "grey";
    });
});

// Modificar datos de un registro en la base de datos de MongoDB
function editarProducto(id) {
    socket.emit("clienteObtenerProductoPorId",id);
}
socket.on("servidorObtenerProductoPorId",(usuario)=>{
    console.log(usuario._id);
    document.getElementById("tituloProducto").innerHTML = "Editar Usuario";
    document.getElementById("botonProducto").innerHTML = "Guardar Cambios";
    document.getElementById("idProducto").value = usuario._id;
    document.getElementById("producto").value = usuario.producto;
    document.getElementById("descripcion").value = usuario.descripcion;
    document.getElementById("precio").value = usuario.precio;
});

// Eliminar datos de la base de datos de MongoDB
function borrarProducto(id) {
    socket.emit("clienteBorrarProducto", id);
}


// FUNCION MENU
function showPage(pageId) {
    const pages = document.querySelectorAll('.content');
    const links = document.querySelectorAll('.nav-link');

    pages.forEach(page => {
        if (page.id === pageId) {
            page.classList.remove('d-none');
        } else {
            page.classList.add('d-none');
        }
    });

    links.forEach(link => {
        if (link.id === pageId + 'Link') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Guardar el estado del toggle en el almacenamiento local del navegador
    localStorage.setItem('currentPage', pageId);
}

// Restaurar el estado del toggle cuando la página se carga
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = localStorage.getItem('currentPage');
    if (currentPage) {
        showPage(currentPage);
    }
});