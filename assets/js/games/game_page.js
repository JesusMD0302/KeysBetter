import gamesList from "./games-list.js";

const contenedor = document.getElementById("contenedor");

const mostraInfoJuego = (title, description, developer, editor, price, url_img) => {
    let contenedorInfoJuego = `
<section>
    <img
        src="${url_img}"
        alt=""
        class="img-fluid rounded d-block mx-auto"
    />
</section>
<section class="card mt-3 background-color-6">
    <div class="card-header">Videojuego</div>
    <div class="card-body">
        <h1 class="card-title">${title}</h1>
        <p class="card-text">
            ${description}
        </p>
        <div class="row">
            <div class="col-8">
                <div>
                    <h2 class="card-subtitle fs-5">Desarrolladora:</h2>
                    <p class="card-text">${developer}</p>
                </div>
                <div class="mt-3">
                    <h2 class="card-subtitle fs-5">Editora:</h2>
                    <p class="card-text">${editor}</p>
                </div>
            </div>
            <div class="col-4 text-center">
                <p class="card-text">Precio: <span class="precio">$${price}</span></p>
                <div class="d-flex justify-content-center align-items-center gap-2">
                    <a id="decrease" class="p-0 link-dark d-flex align-items-center" href="#">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-dash-circle"
                            viewbox="0 0 16 16"
                        >
                            <path
                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                                d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
                            />
                        </svg>
                    </a>

                    <p id="cantidad" class="my-0">0</p>

                    <a id="add" class="p-0 link-dark d-flex align-items-center" href="#">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-plus-circle"
                            viewbox="0 0 16 16"
                        >
                            <path
                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                            />
                        </svg>
                    </a>
                </div>
                <p class="card-text">Total: $<span class="total">0</span></p>
                <button
                    id="btn-carrito"
                    class="btn background-color-4 text-light mt-3"
                    href="/assets/pages/carrito.html"
                    disabled=""
                    >Agregar al carrito</button
                >
            </div>
        </div>
    </div>
</section>`;
    return contenedorInfoJuego;
};

const url = new URL(window.location.href);
const URL_Params = new URLSearchParams(url.search);
let id = URL_Params.get("id");

const game = gamesList.filter((game) => game.id === parseInt(id))[0];

if (!game) {
    window.history.back();
}

contenedor.innerHTML = mostraInfoJuego(
    game.title,
    game.description,
    game.developer,
    game.editor,
    game.price,
    game.urlImage
);

detectarBotonCarrit(game)