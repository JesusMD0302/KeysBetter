export default class Game {
    constructor(
        id = 0,
        title = "",
        description = "",
        price = 0,
        urlImage = "",
        developer = "",
        editor = ""
    ) {
        this.Id = id;
        this.Title = title;
        this.Description = description;
        this.Price = price;
        this.UrlImage = urlImage;
        this.Developer = developer;
        this.Editor = editor;
    }

    /**
     * @param {number} id
     */
    set Id(id) {
        if (typeof id !== "number") {
            return;
        }
        this.id = id;
    }

    /**
     * @param {string} title
     */

    set Title(title) {
        const rgxTitle = /[a-zA-Z0-9\(\)]{2,}/g;
        this.checkValueString(title, rgxTitle);

        this.title = title;
    }

    /**
     * @param {string} description
     */

    set Description(description) {
        const rgxDescription = /[a-zA-Z0-9\(\)\.]{2,}/g;
        this.checkValueString(description, rgxDescription);
        this.description = description;
    }

    /**
     * @param {number} price
     */
    set Price(price) {
        if (typeof price !== "number" || price <= 0.0) {
            throw "El precio ingresado no es valido";
        }

        this.price = price;
    }

    /**
     * @param {string} urlImage
     */

    set UrlImage(urlImage) {
        this.checkURL(urlImage);
        this.urlImage = urlImage;
    }

    /**
     *  @param {string} developer
     */

    set Developer(developer) {
        const rgxDeveloper = /[a-zA-Z0-9\(\)\.]{2,}/g;
        this.checkValueString(developer, rgxDeveloper);
        this.developer = developer;
    }

    /**
     * @param {string} editor
     */

    set Editor(editor) {
        const rgxEditor = /[a-zA-Z0-9\(\)\.]{2,}/g;
        this.checkValueString(editor, rgxEditor);
        this.editor = editor;
    }

    /* 
        Método para crear el elemento card del juego
    */
    /**
     *
     * @param {Number} comprado
     */
    createCardElement(comprado = 1) {
        let ruta = "";
        let precio = `<p class="card-text">$${this.price}</p>`;

        switch (comprado) {
            case 1:
                ruta = "/assets/pages/juego_sin_login.html?id=";
                break;

            case 2:
                ruta = "/assets/pages/juego.html?id=";
                break;

            case 3:
                ruta = "/assets/pages/juego_comprado.html?id=";
                precio = "";
                break;

            default:
                break;
        }

        let cardBody = `
        <div class="col-lg-3 col-md-6 mb-3 game-card">
            <div class="card h-100">
                <img
                    class="card-img-top img-cover"
                    src="${this.urlImage}"
                    alt="Poster de ${this.title}"
                />
                <div class="card-body d-flex justify-content-between align-items-center">
                    <h2 class="card-title fs-5 mb-0">
                        <a class="text-decoration-none text-dark" href="${ruta + this.id}">${
            this.title
        }</a>
                    </h2>
                    ${precio}
                </div>
            </div>
        </div>`;

        return cardBody;
    }

    /**
     * @param {string} url
     */

    /* 
        Método para validar las url de las imagenes
    */
    checkURL(url) {
        url = url.trim();

        const regexURL =
            /(((http:\/\/www)|(http:\/\/)|(www)|(\/assets\/images\/))[-a-zA-Z0-9@:%_\+~#?&//=]+)\.(jpg|jpeg|gif|png|bmp|tiff|tga|svg){1,1}/g;

        if (!url.match(regexURL)) {
            throw "La ruta ingresada no es valida";
        }
    }

    /**
     * @param {string} value
     * @param {RegExp} regexRule
     */

    /* 
        Métodos para validar valores string
    */
    checkValueString(value, regexRule = /[a-zA-Z\.]{2,}/g) {
        value = value.trim();
        const regexValue = regexRule;
        if (typeof value !== "string" || value === "" || !value.match(regexValue)) {
            throw "El valor ingresado no es valido";
        }
    }

    devolverValores() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            price: this.price,
            urlImage: this.urlImage,
            developer: this.developer,
            editor: this.editor,
        };
    }

    /* 
        Método para buscar o filtrar los juegos que en su titulo contenga el valor de busqueda ingresado.
    */
    static searchGame(
        gamesContainer = document.getElementById("games"),
        listGames = [],
        searchValue = ""
    ) {
        gamesContainer.innerHTML = "";
        searchValue = searchValue.trim();

        if (searchValue === "") {
            return listGames;
        }

        const newGamesList = listGames.filter((e) => {
            return e.title.toLowerCase().includes(searchValue);
        });

        return newGamesList;
    }

    /* 
        Método para mostrar en el contenedor de juegos en el archivo html, los juegos indicados en el array de entrada, 
    */
    static showGames(
        gamesContainer = document.getElementById("games"),
        listGames = [],
        comprado = 1
    ) {
        listGames.forEach((e) => {
            gamesContainer.innerHTML += e.createCardElement(comprado);
        });

        if (!gamesContainer.hasChildNodes()) {
            gamesContainer.innerHTML = `<h2 class="col text-light fs-2 text-center mb-4 game-card">No se encontró ningun juego :(</h2>`;
        }
    }
}
