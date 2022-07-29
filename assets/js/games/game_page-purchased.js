import gamesList from "./games-list.js";

const contenedor = document.getElementById("contenedor");

const mostraInfoJuego = (title, description, developer, editor, url_img) => {
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
                <select class="form-select background-color-2 text-light">
                    <option selected>Key 1</option>
                    <option>Key 2</option>
                    <option>Key 3</option>
                </select>
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
    game.urlImage
);
