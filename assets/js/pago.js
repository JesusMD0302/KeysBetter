calcularTotal();

const mainContainer = document.getElementById("main");
const btnPago = document.getElementById("pago");

const crearAlerta = (mensaje, tipo) => {
    const body = document.getElementsByTagName("body")[0];
    const alerta = document.createElement("div");
    alerta.classList.add("z-index-100");
    alerta.innerHTML = `
        <div class="alert alert-${tipo} position-absolute start-50 translate-middle-x alert-animation" role="alert">
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

btnPago.addEventListener("click", (e) => {
    e.preventDefault();
    let pagoOpcion = document.querySelector('input[name="pago"]:checked');

    if (!pagoOpcion) {
        crearAlerta("No se ha podido realizar la compra, ingrese un metodo de pago", "danger");
        return;
    }

    crearAlerta("La compra ha sido exitosa", "success");
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    const juegosComprados = JSON.parse(localStorage.getItem("juegos-comprados"));

    carrito.forEach((ele) => {
        let juegoEncontrado = juegosComprados.findIndex((e) => {
            return e.juego.id === ele.juego.id
        })

        if (juegoEncontrado >= 0) {
            juegosComprados[juegoEncontrado].cantidad += ele.cantidad;
        }

        juegosComprados.push(ele);
    });

    localStorage.setItem("juegos-comprados", JSON.stringify(juegosComprados));
    localStorage.setItem("carrito", JSON.stringify([]))

    setTimeout(() => {
        window.location.href = "/assets/pages/busqueda.html";
    }, 3000);
});
