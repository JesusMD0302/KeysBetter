import User from "./user.js";

const usuarios = [];
const usuarioDefecto = new User();
usuarioDefecto.Email = "administrador@gmail.com";
usuarioDefecto.Contrasenia = "contraseniaAdmin2$";
usuarios.push(usuarioDefecto.devolverValores());

if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

const body = document.getElementsByTagName("body")[0];
const formLogin = document.getElementById("form-login");
const formRegistro = document.getElementById("form-registro");
const btnsMostrar = document.querySelectorAll(".mostrar");

/* 
--------------------------------
--- Declaración de funciones ---
--------------------------------
*/

const obtenerUsuarios = () => {
    return JSON.parse(localStorage.getItem("usuarios"));
};

const guardarUsuarioNuevo = (usuario) => {
    const usuarios = obtenerUsuarios();
    usuarios.push(usuario.devolverValores());
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
};

const toggleVisibilidadContrasenia = (contenedor) => {
    const input = contenedor.getElementsByTagName("input")[0];
    const type = input.getAttribute("type");

    if (type === "password") {
        input.setAttribute("type", "text");
    }

    if (type === "text") {
        input.setAttribute("type", "password");
    }
};

const crearAlerta = (mensaje, tipo) => {
    const alerta = document.createElement("div");
    alerta.innerHTML = `
    <div id="alerta" class="alert alert-${tipo} position-absolute start-50 translate-middle-x alert-animation" role="alert">
        ${mensaje}
    </div>`;
    body.append(alerta);

    setTimeout(() => {
        alerta.querySelector(".alert").classList.add("alert-animation-out");
    }, 2400);
    setTimeout(() => {
        body.removeChild(alerta);
    }, 3000);
};

const obtenerAtributoName = (target) => {
    const nameInput = target.getAttribute("name");
    return nameInput;
};

const toggleIsInvalidInput = (target, valido) => {
    if (valido) {
        target.classList.remove("is-invalid");
        target.classList.add("is-valid");
    } else {
        target.classList.remove("is-valid");
        target.classList.add("is-invalid");
    }
};

/* 
-----------------------------------------------------------
--- Evento para cambiar la visibilidad de la contraseña ---
-----------------------------------------------------------
*/

btnsMostrar.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        e.preventDefault();
        const contenedor = e.target.closest(".mb-3");
        toggleVisibilidadContrasenia(contenedor);
        // console.log(input.value);
    });
});

/* 
------------------------------------------------------------
--- Eventos input para el formulario login y de registro ---
------------------------------------------------------------
*/
formLogin.addEventListener("input", (e) => {
    let target = e.target;
    let targetName = obtenerAtributoName(target);
    let targetValue = target.value;

    switch (targetName) {
        case "email":
            if (!User.validarCorreo(targetValue)) {
                toggleIsInvalidInput(target, false);
                return;
            }
            toggleIsInvalidInput(target, true);
            break;

        case "contrasenia":
            if (!User.validarContrasenia(targetValue)) {
                toggleIsInvalidInput(target, false);
                return;
            }
            toggleIsInvalidInput(target, true);
            break;

        default:
            break;
    }
});

formRegistro.addEventListener("input", (e) => {
    let target = e.target;
    let targetName = obtenerAtributoName(target);
    let targetValue = target.value;

    switch (targetName) {
        case "nombre":
            if (!User.validarNombreApellidos(targetValue)) {
                toggleIsInvalidInput(target, false);
                return;
            }
            toggleIsInvalidInput(target, true);
            break;

        case "apellidos":
            if (!User.validarNombreApellidos(targetValue)) {
                toggleIsInvalidInput(target, false);
                return;
            }
            toggleIsInvalidInput(target, true);
            break;

        case "email":
            if (!User.validarCorreo(targetValue)) {
                toggleIsInvalidInput(target, false);
                return;
            }
            toggleIsInvalidInput(target, true);
            break;

        case "contrasenia":
            if (!User.validarContrasenia(targetValue)) {
                toggleIsInvalidInput(target, false);
                return;
            }
            toggleIsInvalidInput(target, true);
            break;

        default:
            break;
    }
});

/* 
--------------------------------------------------------------
--- Evento submit para los formularios login y de registro ---
--------------------------------------------------------------
*/

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = formLogin.getElementsByTagName("input");
    const correo = inputs[0].value;
    const contrasenia = inputs[1].value;

    let usuarioElegido = obtenerUsuarios().filter((ele) => {
        return ele.Correo === correo && ele.Contrasenia === contrasenia;
    })[0];

    if (!usuarioElegido) {
        crearAlerta("No existe ningún usuario con los datos ingresados", "danger");
        return;
    }

    window.location.href = "http://localhost:5500/assets/pages/busqueda.html";
});

formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    let usuario = new User();
    let inputs = formRegistro.getElementsByTagName("input");

    try {
        usuario.Nombre = inputs[0].value;
        usuario.Apellidos = inputs[1].value;
        usuario.Email = inputs[2].value;
        usuario.Contrasenia = inputs[3].value;
    } catch (error) {
        crearAlerta(error, "danger");
        return;
    }

    guardarUsuarioNuevo(usuario);

    location.reload();
});
