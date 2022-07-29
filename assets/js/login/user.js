export default class User {
    #nombre;
    #apellidos;
    #email;
    #contrasenia;

    /**
     * @param {string} nombre
     */
    set Nombre(nombre = "") {
        if (!User.validarNombreApellidos(nombre)) {
            throw "Nombre no valido";
        }
        this.#nombre = nombre;
    }

    /**
     * @param {string} apellidos
     */
    set Apellidos(apellidos = "") {
        if (!User.validarNombreApellidos(apellidos)) {
            throw "Apellidos no validos";
        }
        this.#apellidos = apellidos;
    }

    /**
     * @param {string} email
     */
    set Email(email = "") {
        if (!User.validarCorreo(email)) {
            throw "Correo no valido";
        }
        this.#email = email;
    }

    get Email() {
        return this.#email;
    }

    get Contrasenia() {
        return this.#contrasenia;
    }

    /**
     * @param {string} contrasenia
     */
    set Contrasenia(contrasenia = "") {
        if (!User.validarContrasenia(contrasenia)) {
            throw "Contraseña no valida";
        }
        this.#contrasenia = contrasenia;
    }

    devolverValores() {
        return {
            Nombre: this.#nombre,
            Apellidos: this.#apellidos,
            Correo: this.#email,
            Contrasenia: this.#contrasenia,
        };
    }

    /**
     * @param {string} nombre
     */
    static validarNombreApellidos(nombre = "") {
        let nombres = nombre.split(" ");
        const patternNombreApaliidos = /\b[A-Z][a-z]+\b/g;
        let nombresValidados = nombre.match(patternNombreApaliidos);

        if (nombresValidados === null) {
            nombresValidados = [];
        }

        return JSON.stringify(nombres) === JSON.stringify(nombresValidados);
    }

    /**
     * @param {string} correo
     */
    static validarCorreo(correo = "") {
        const patternCorreo =
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{3,3}(?:[a-z0-9-]*[a-z0-9])?/g;
        return patternCorreo.test(correo);
    }

    /**
     * @param {string} contrasenia
     */
    static validarContrasenia(contrasenia = "") {
        const patternContrasenia =
            /^(?!\ )(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%"'*¿?&])([A-Za-z\d$@$'¿!%"*?&]|[^ ]){8,64}$/g;
        return patternContrasenia.test(contrasenia);
    }
}

// console.log(User.validarNombreApellidos("Mena Dzul"));
// console.log(User.validarNombreApellidos("Mena dzul"));
// console.log(User.validarNombreApellidos("mena dzul"));
// console.log(User.validarNombreApellidos("mena Dzul"));

// console.log(User.validarCorreo("jesusalbertomena2002@gmail.com"));
// console.log(User.validarContrasenia("nuevacontraseniA2%"));

// const user = new User();

// try {
//     user.Nombre = "Jesus alberto";
// } catch (error) {
//     error
// }

// console.log(user);
