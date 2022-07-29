if (!localStorage.getItem("carrito")) {
    localStorage.setItem("carrito", JSON.stringify([]));
}

const obtenerCarrito = () => {
    if (localStorage.getItem("carrito").length > 0) {
        return JSON.parse(localStorage.getItem("carrito"));
    }
    return [];
};

const crearItemCarrito = (juego = {}, cantidad = 0) => {
    return { juego: juego, cantidad: cantidad };
};

const agregarCarrito = (datosJuego, cantidad) => {
    let itemCarrito = crearItemCarrito(datosJuego, cantidad);
    let carrito = obtenerCarrito();

    let carritoValidado = carrito.findIndex((e) => {
        return JSON.stringify(e.juego) === JSON.stringify(itemCarrito.juego);
    });

    if (carritoValidado >= 0) {
        carrito[carritoValidado].cantidad += itemCarrito.cantidad;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        return;
    }
    carrito.push(itemCarrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

const eliminarCarrito = (id) => {
    let carrito = obtenerCarrito();

    carrito.splice(id, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

const detectarBotonCarrit = (juego) => {
    const contenedorJuego = document.getElementById("contenedor");
    const btnCarrito = document.getElementById("btn-carrito");

    const total = contenedorJuego.querySelector(".total");
    const btnAdd = contenedorJuego.querySelector("#add");
    const btnDecrease = contenedorJuego.querySelector("#decrease");
    const cantidad = contenedorJuego.querySelector("#cantidad");

    btnAdd.addEventListener("click", (e) => {
        e.preventDefault();
        let cantidadKeys = parseInt(cantidad.innerText);
        cantidadKeys += 1;
        if (cantidadKeys > 0) {
            btnCarrito.removeAttribute("disabled");
        }
        cantidad.innerText = cantidadKeys;
        total.innerText = cantidadKeys * juego.price;
    });

    btnDecrease.addEventListener("click", (e) => {
        e.preventDefault();
        let cantidadKeys = parseInt(cantidad.innerText);
        cantidadKeys -= 1;
        if (cantidadKeys <= 0) {
            btnCarrito.setAttribute("disabled", "");
        }
        if (cantidadKeys < 0) {
            return;
        }
        cantidad.innerText = cantidadKeys;
        total.innerText = cantidadKeys * juego.price;
    });

    btnCarrito.addEventListener("click", () => {
        let cantidadKeys = parseInt(cantidad.innerText);
        agregarCarrito(juego.devolverValores(), cantidadKeys);
        history.back();
    });
};

const mostrarItemCarrito = (contenedor, id, url, titulo, precio, cantidad) => {
    let item = document.createElement("div");
    item.classList.add("card");
    item.classList.add("background-color-5");
    item.classList.add("px-o");
    item.setAttribute("id", id);
    item.innerHTML = `
    <div class="row">
        <div class="col-md-5">
            <img
                src="${url}"
                class="img-fluid rounded w-100 img-cover"
            />
        </div>
        <div class="col-md-7">
            <div
                class="card-body d-flex flex-column h-100 justify-content-center"
            >
                <h2 class="card-title">${titulo}</h2>
                <p class="card-subtitle">$${precio}</p>
                <div class="d-flex align-items-center gap-2">
                    <p class="my-0">${cantidad}</p>
                </div>
                <a href="#" class="eliminar link-danger text-decoration-none"
                    >Eliminar</a
                >
            </div>
        </div>
    </div>`;

    contenedor.append(item);

    item.querySelector(".eliminar").addEventListener("click", (e) => {
        e.preventDefault();
        const contenedor = e.target.closest(".card");
        const id = contenedor.getAttribute("id");
        eliminarCarrito(id);
        location.reload();
    });
};

const recorrerCarrito = () => {
    const contenedor = document.getElementById("contenedor-carrito");
    let carrito = obtenerCarrito();
    carrito.forEach((ele, index) => {
        mostrarItemCarrito(
            contenedor,
            index,
            ele.juego.urlImage,
            ele.juego.title,
            ele.juego.price,
            ele.cantidad
        );
    });
};

const calcularTotal = () => {
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

    const carrito = obtenerCarrito();
    const contenedorTotal = document.querySelector(".total");
    const subtotalContenedor = contenedorTotal.querySelector(".subtotal");
    const ivaContenedor = contenedorTotal.querySelector(".iva");
    const totalContenedor = contenedorTotal.querySelector(".total");
    const btnPagar = contenedorTotal.querySelector(".btn-pagar");
    const btnTrash = contenedorTotal.querySelector(".trash");

    let subtotal = parseInt(subtotalContenedor.innerText);
    let iva = parseInt(ivaContenedor.innerText);
    let total = parseInt(totalContenedor.innerText);

    carrito.forEach((ele) => {
        subtotal += ele.juego.price * ele.cantidad;
    });

    iva = subtotal * 0.16;
    total = subtotal + iva;

    subtotalContenedor.innerText = subtotal.toFixed(2);
    ivaContenedor.innerText = iva.toFixed(2);
    totalContenedor.innerText = total.toFixed(2);

    if (btnPagar) {
        btnPagar.addEventListener("click", (e) => {
            if (subtotal === 0 && iva === 0 && total === 0) {
                e.preventDefault();
                crearAlerta("No se ha agregado ningun elemento al carrito", "danger");
            }
        });
    }

    if (btnTrash) {
        btnTrash.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.setItem("carrito", JSON.stringify([]));
            location.reload();
        });
    }
};
