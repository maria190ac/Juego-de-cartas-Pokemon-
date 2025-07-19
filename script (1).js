// ("answer-input"); const submitAnswer = 
// Elementos

const welcome = document.getElementById("welcome-screen");

const passwordScreen = document.getElementById("password-screen");

const nameScreen = document.getElementById("name-screen");

const gameScreen = document.getElementById("game-screen");

const finalScreen = document.getElementById("final-screen");

const applause = document.getElementById("applause-sound");

const toPassword = document.getElementById("to-password");

const checkPassword = document.getElementById("check-password");

const passwordInput = document.getElementById("password-input");

const passwordError = document.getElementById("password-error");

const startGame = document.getElementById("start-game");

const player2Input = document.getElementById("player2-name");

const turnIndicator = document.getElementById("turn-indicator");

const cardGrid = document.getElementById("card-grid");

const questionBox = document.getElementById("question-box");

const questionText = document.getElementById("question-text");

const answerInput = document.getElementById("answer-input");

const submitAnswer = document.getElementById("submit-answer");

const nextRoundBtn = document.getElementById("next-round");

const scoreDisplay = document.getElementById("score-display");

const winnerText = document.getElementById("winner-text");

const fireworks = document.getElementById("fireworks");

const playAgain = document.getElementById("play-again");

let currentPlayer = "María";

let players = ["María", "Jugador 2"];

let scores = { "María": 0, "Jugador 2": 0 };

let flippedCards = [];

let matchedPairs = 0;

let currentRound = 1;

const questions = {

  1: [

    "¿Qué canción te recuerda a mí?",

    "¿Qué momento contigo repetirías mil veces?",

    "¿Cuál es nuestra frase más cursi?",

    "¿Qué te gusta más de nosotros?",

    "¿Cuál fue tu primer pensamiento sobre mí?",

    "¿Qué lugar sueñas con visitar conmigo?",

    "¿Cómo me describirías en 3 palabras?",

    "¿Qué harías si estuvieras conmigo ahora?",

    "¿Qué te gustaría que hiciéramos pronto?"

  ],

  2: [

    "¿Qué emoji usarías para describirme?",

    "¿Qué película veríamos en una cita ideal?",

    "¿Qué apodo tierno me pondrías?",

    "¿Cuál sería nuestro Pokémon como pareja?",

    "¿Qué recuerdo contigo te hace reír?",

    "¿Cómo me sorprenderías un día cualquiera?",

    "¿Qué me regalarías si hoy fuera mi cumpleaños?",

    "¿Qué locura te gustaría hacer conmigo?",

    "¿Qué canción pondrías para bailar juntos?"

  ],

  3: [

    "¿Qué tipo de foto me mandarías solo para mí?",

    "¿Qué te gustaría que hiciera solo contigo?",

    "¿Qué harías si te doy un beso sin aviso?",

    "¿Qué parte de mi personalidad te encanta?",

    "¿Qué broma me harías sin que me enoje?",

    "¿Qué palabra te hace pensar en mí?",

    "¿Qué mensaje me dejarías en un post-it?",

    "¿Qué comida compartiríamos abrazados?",

    "¿Qué secreto divertido me contarías?"

  ]

};

const pokemons = [

  [1, 4, 7, 25, 35, 52, 63, 92, 133],

  [2, 5, 10, 37, 54, 60, 81, 147, 152],

  [3, 8, 15, 39, 43, 66, 74, 88, 151]

];

// Navegación entre pantallas

toPassword.onclick = () => {

  welcome.classList.add("hidden");

  passwordScreen.classList.remove("hidden");

};

checkPassword.onclick = () => {

  if (passwordInput.value === "210924") {

    passwordScreen.classList.add("hidden");

    nameScreen.classList.remove("hidden");

  } else {

    passwordError.style.display = "block";

  }

};

startGame.onclick = () => {

  players[1] = player2Input.value || "Jugador 2";

  turnIndicator.textContent = "Turno de: " + currentPlayer;

  nameScreen.classList.add("hidden");

  gameScreen.classList.remove("hidden");

  iniciarRonda();

};

function iniciarRonda() {

  const rondaPokemons = pokemons[currentRound - 1];

  const rondaPreguntas = questions[currentRound];

  const pokes = [...rondaPokemons, ...rondaPokemons].sort(() => 0.5 - Math.random());

  cardGrid.innerHTML = "";

  flippedCards = [];

  matchedPairs = 0;

  document.getElementById("round-title").textContent = "Ronda " + currentRound;

  pokes.forEach((poke, index) => {

    const div = document.createElement("div");

    div.className = "card";

    div.dataset.pokemon = poke;

    div.dataset.index = index;

    div.innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke}.png" style="width:50px; display:none;" />`;

    div.onclick = () => voltearCarta(div, rondaPreguntas);

    cardGrid.appendChild(div);

  });

}

function voltearCarta(card, rondaPreguntas) {

  if (card.classList.contains("flipped") || card.classList.contains("matched") || flippedCards.length === 2) return;

  card.classList.add("flipped");

  card.querySelector("img").style.display = "block";

  flippedCards.push(card);

  if (flippedCards.length === 2) {

    const [c1, c2] = flippedCards;

    if (c1.dataset.pokemon === c2.dataset.pokemon) {

      c1.classList.add("matched");

      c2.classList.add("matched");

      applause.play();

      matchedPairs++;

      mostrarPregunta(rondaPreguntas[Math.floor(Math.random() * rondaPreguntas.length)]);

      scores[currentPlayer]++;

      flippedCards = [];

    } else {

      setTimeout(() => {

        c1.classList.remove("flipped");

        c2.classList.remove("flipped");

        c1.querySelector("img").style.display = "none";

        c2.querySelector("img").style.display = "none";

        flippedCards = [];

        cambiarTurno();

      }, 1000);

    }

  }

}

function mostrarPregunta(pregunta) {

  questionBox.classList.remove("hidden");

  questionText.textContent = `${currentPlayer}, ${pregunta}`;

  answerInput.value = "";

  submitAnswer.style.display = "inline-block";

  nextRoundBtn.style.display = "none";

  submitAnswer.onclick = () => {

    questionBox.classList.add("hidden");

    submitAnswer.style.display = "none";

    nextRoundBtn.style.display = "inline-block";

  };

}

nextRoundBtn.onclick = () => {

  questionBox.classList.add("hidden");

  nextRoundBtn.style.display = "none";

  if (matchedPairs === 9) {

    avanzarRonda();

  } else {

    cambiarTurno();

  }

};

function cambiarTurno() {

  currentPlayer = currentPlayer === players[0] ? players[1] : players[0];

  turnIndicator.textContent = "Turno de: " + currentPlayer;

}

function avanzarRonda() {

  currentRound++;

  if (currentRound <= 3) {

    iniciarRonda();

  } else {

    terminarJuego();

  }

}

function terminarJuego() {

  gameScreen.classList.add("hidden");

  finalScreen.classList.remove("hidden");

  const puntos1 = scores[players[0]];

  const puntos2 = scores[players[1]];

  scoreDisplay.textContent = `${players[0]}: ${puntos1} puntos\n${players[1]}: ${puntos2} puntos`;

  if (puntos1 > puntos2) {

    winnerText.textContent = `${players[0]} gana 🏆 ¡Pide tu premio!`;

  } else if (puntos2 > puntos1) {

    winnerText.textContent = `${players[1]} gana 🏆 ¡Pide tu premio!`;

  } else {

    winnerText.textContent = `¡Empate! Ambos se merecen premio 💖`;

  }

  fireworks.classList.remove("hidden");

}

playAgain.onclick = () => {

  location.reload();

};