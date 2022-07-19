import Game from "./game.js";

const cuphead = new Game(
    "Cuphead",
    'Es un juego de acción clásico estilo "corre y dispara" que se centra en combates contra el jefe. Inspirado en los dibujos animados de los años 30',
    349,
    "/assets/images/cuphead.jpeg",
    "Studio MDHR Entertainment Inc.",
    "Studio MDHR Entertainment Inc."
);

const gearsOfWars = new Game(
    "Gears Of War 4",
    "Una nueva saga comienza para una de las franquicias de videojuegos más aclamadas de la historia. Tras esccapar por los pelos de un ataque en su poblado, JD Fenix y sus amigos, Kait y Del, deben rescatar a sus seres queridos y descubrir el origen de un monstruoso y desconocido enemigo.",
    500,
    "/assets/images/gears.jpeg",
    "The Coalition",
    "Xbox Game Studios"
);

const hearthStone = new Game(
    "HearthStone",
    "El aclamado juego de cartas coleccionables de Blizzard Entertainment. Colecciona cartas poderosas y crea mazos. Invoca esbirros y lanza hechizos para tomar el control de los campos de batalla cambiantes. Diseña estrategias y derrota a todos los jugadores que se atrevan a retarte.",
    680,
    "/assets/images/hearthstone.jpeg",
    "Blizzard Entertainment",
    "Blizzard Entertainment"
);

const metroLastLight = new Game(
    "Metro Last Light",
    "Metro 2033, basado en la novela del mismo nombre, continúa en esta secuela para Xbox 360 que nos vuelve a llevar a un Moscú post-apocalíptico en el que los pocos supervivientes se refugian de los mutantes y otras amenazas en los túneles de metro de la capital rusa.",
    185,
    "/assets/images/metro.jpeg",
    "4A Games",
    "Deep Silver"
);

const minecraft = new Game(
    "Minecraft",
    "Explora tu propio mundo único, sobrevive a la noche y crea todo lo que puedas imaginar",
    600,
    "/assets/images/minecraft.jpeg",
    "Mojang Studios",
    "Xbox Game Studios"
);

const overwatch = new Game(
    "Overwatch",
    "Overwatch es un variado juego de acción basado en equipos que presenta un listado diverso de héroes poderosos. Viaja por el mundo, forma un equipo y cumple objetivos en un emocionante combate de 6 vs 6.",
    799,
    "/assets/images/overwatch.jpeg",
    "Blizzard Entertainment",
    "Blizzard Entertainment"
);

const starCraft = new Game(
    "StarCraft",
    "Vive el juego que revolucionó el género de estrategia en tiempo real. Prepara tu ejército terran, zerg o protross y conquista la galaxio",
    250,
    "/assets/images/starcraft.jpeg",
    "Blizzard Entertainment",
    "Blizzard Entertainment"
);

const WoW = new Game(
    "World Of Warcraft",
    "En World of Warcraft, juegas con un poderoso héroe que lucha contra mounstruos gigantes, se adentra en peligrosas mazmorras y defiende el mundo de Azeroth contra todo tipo de amenaza",
    500,
    "/assets/images/wow.jpeg",
    "Blizzard Entertainment",
    "Blizzard Entertainment"
);

const gamesList = [cuphead, gearsOfWars, hearthStone, metroLastLight, minecraft, overwatch, starCraft, WoW];
const purchasedGamesList = [starCraft, gearsOfWars, minecraft, metroLastLight];



export default gamesList;
export {purchasedGamesList};