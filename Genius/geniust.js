const pads =
document.querySelectorAll(".pad");

const startBtn =
document.getElementById("startBtn");

const restartBtn =
document.getElementById("restartBtn");

const resetScoreBtn =
document.getElementById("resetScoreBtn");

const difficulty =
document.getElementById("difficulty");

const roundText =
document.getElementById("round");

const message =
document.getElementById("message");

const currentPlayerText =
document.getElementById("currentPlayerText");

const gameOver =
document.getElementById("gameOver");

const finalText =
document.getElementById("finalText");

const scoreText =
document.getElementById("scoreText");

const player1Input =
document.getElementById("player1Input");

const player2Input =
document.getElementById("player2Input");

const recordText =
document.getElementById("record");

const sounds = {
  green:
  document.getElementById("greenSound"),

  red:
  document.getElementById("redSound"),

  yellow:
  document.getElementById("yellowSound"),

  blue:
  document.getElementById("blueSound")
};

const colors = [
  "green",
  "red",
  "yellow",
  "blue"
];

let sequence = [];

let playerSequence = [];

let round = 0;

let canPlay = false;

let speed = 650;

let currentPlayer = 1;

let player1Score = 0;

let player2Score = 0;

let player1Round = 0;

let player2Round = 0;

let record =
localStorage.getItem(
  "geniusRecord"
) || 0;

recordText.textContent = record;

difficulty.addEventListener(
  "change",
  () => {

    speed =
    Number(difficulty.value);

});

startBtn.addEventListener(
  "click",
  startGame
);

restartBtn.addEventListener(
  "click",
  nextPlayer
);

resetScoreBtn.addEventListener(
  "click",
  resetScore
);

pads.forEach(pad => {

  pad.addEventListener(
    "click",
    () => {

      if(!canPlay) return;

      const color =
      pad.dataset.color;

      playerSequence.push(color);

      flash(color);

      playSound(color);

      checkMove();

  });

});

function resetScore(){

  player1Score = 0;

  player2Score = 0;

  scoreText.textContent =
  `${player1Score} x ${player2Score}`;

}

function startGame(){

  player1Score = 0;
  player2Score = 0;

  scoreText.textContent =
  `${player1Score} x ${player2Score}`;

  currentPlayer = 1;

  startPlayerGame();

}

function startPlayerGame(){

  round = 0;

  sequence = [];

  playerSequence = [];

  gameOver.classList.add(
    "hidden"
  );

  roundText.textContent = 0;

  const playerName =
  currentPlayer === 1
  ? player1Input.value || "Jogador 1"
  : player2Input.value || "Jogador 2";

  currentPlayerText.textContent =
  playerName;

  nextRound();

}

function nextRound(){

  canPlay = false;

  playerSequence = [];

  round++;

  roundText.textContent = round;

  const randomColor =
  colors[
    Math.floor(
      Math.random() *
      colors.length
    )
  ];

  sequence.push(randomColor);

  message.textContent =
  "Memorize";

  showSequence();

}

function showSequence(){

  sequence.forEach(
    (color,index) => {

    setTimeout(() => {

      flash(color);

      playSound(color);

    }, speed * index);

  });

  setTimeout(() => {

    canPlay = true;

    message.textContent =
    "Sua vez";

  }, speed * sequence.length);

}

function flash(color){

  const pad =
  document.querySelector(
    `[data-color="${color}"]`
  );

  pad.classList.add("active");

  setTimeout(() => {

    pad.classList.remove(
      "active"
    );

  }, speed / 2);

}

function playSound(color){

  sounds[color].currentTime = 0;

  sounds[color].play();

}

function checkMove(){

  const current =
  playerSequence.length - 1;

  if(
    playerSequence[current]
    !== sequence[current]
  ){

    loseGame();

    return;

  }

  if(
    playerSequence.length
    === sequence.length
  ){

    canPlay = false;

    message.textContent =
    "Acertou";

    setTimeout(() => {

      nextRound();

    }, 1200);

  }

}

function loseGame(){

  canPlay = false;

  if(round > record){

    record = round;

    localStorage.setItem(
      "geniusRecord",
      record
    );

    recordText.textContent =
    record;

  }

  if(currentPlayer === 1){

    player1Round = round;

  } else {

    player2Round = round;

  }

  const playerName =
  currentPlayer === 1
  ? player1Input.value || "Jogador 1"
  : player2Input.value || "Jogador 2";

  finalText.textContent =
  `${playerName} chegou até a rodada ${round}`;

  gameOver.classList.remove(
    "hidden"
  );

}

function nextPlayer(){

  gameOver.classList.add(
    "hidden"
  );

  if(currentPlayer === 1){

    currentPlayer = 2;

    startPlayerGame();

  } else {

    finishMatch();

  }

}

function finishMatch(){

  const player1Name =
  player1Input.value || "Jogador 1";

  const player2Name =
  player2Input.value || "Jogador 2";

  let winner = "";

  if(player1Round > player2Round){

    player1Score++;

    winner =
    `${player1Name} venceu!`;

  } else if(player2Round > player1Round){

    player2Score++;

    winner =
    `${player2Name} venceu!`;

  } else {

    winner = "Empate!";

  }

  scoreText.textContent =
  `${player1Score} x ${player2Score}`;

  finalText.textContent =
  `
  ${winner}

  ${player1Name}: rodada ${player1Round}

  ${player2Name}: rodada ${player2Round}
  `;

  gameOver.classList.remove(
    "hidden"
  );

  currentPlayer = 1;

}