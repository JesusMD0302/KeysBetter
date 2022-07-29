import Game from "./game.js";
import gamesList from "./games-list.js";

const gamesContainer = document.getElementById("games");
const formSearch = document.getElementById("form-busqueda");
const inputSearch = document.getElementById("input-busqueda");

/* 
    Evento de carga para el documento
    El evento muestra el array de juegos en el documento
*/
document.addEventListener("DOMContentLoaded", () => {
    Game.showGames(gamesContainer, gamesList, 1);
});

/* 
    Evento que se activa al hacer submit en el formúlario de busqueda
    El evento sirve para filtrar el array de juegos con el valor de busqueda y mostrar los juegos en el documento
*/
formSearch.addEventListener("input", (e) => {
    e.preventDefault();
    const valueSearch = inputSearch.value.toLowerCase();

    Game.showGames(gamesContainer, Game.searchGame(gamesContainer, gamesList, valueSearch), 1);
});
