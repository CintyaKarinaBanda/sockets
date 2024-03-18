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
        nombre: document.getElementById("nombre").value,
        usuario: document.getElementById("usuario").value,
        password: document.getElementById("password").value,
    };

    socket.emit("clienteGuardarUsuario", usuario);
    socket.on("servidorUsuarioGuardado", (mensaje) => {
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

}
// Eliminar datos de la base de datos de MongoDB
function borrarUsuario(id) {

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
                <a href="#" onclick="editarUsuario('${producto._id}')">Editar</a> /
                <a href="#" onclick="borrarUsuario('${producto._id}')">Borrar</a>
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
function editarUsuario(id) {

}
// Eliminar datos de la base de datos de MongoDB
function borrarUsuario(id) {

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