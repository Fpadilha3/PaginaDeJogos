const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");

const guessInput = document.getElementById("guess");
const guessBtn = document.getElementById("guessBtn");

const message = document.getElementById("message");
const statusText = document.getElementById("status");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const resetScoreBtn = document.getElementById("resetScoreBtn");

const turnPlayer = document.getElementById("turnPlayer");

const score1Text = document.getElementById("score1");
const score2Text = document.getElementById("score2");

const scoreName1 = document.getElementById("scoreName1");
const scoreName2 = document.getElementById("scoreName2");

const triesText = document.getElementById("tries");

const winnerScreen = document.getElementById("winnerScreen");
const winnerText = document.getElementById("winnerText");

const bestScoreText = document.getElementById("bestScore");
const recordText = document.getElementById("recordText");

const difficulty = document.getElementById("difficulty");

const lastPlayer = document.getElementById("lastPlayer");
const lastGuess = document.getElementById("lastGuess");

let randomNumber = 0;

let currentPlayer = 1;

let tries = 0;

let score1 = 0;
let score2 = 0;

let gameStarted = false;

function updateRecord(){

  const record = localStorage.getItem("bestRecord");

  if(record){
    bestScoreText.textContent = record + " tentativas";
  }else{
    bestScoreText.textContent = "-";
  }
}

updateRecord();

function startGame(){

  const max = Number(difficulty.value);

  randomNumber = Math.floor(Math.random() * max) + 1;

  tries = 0;

  gameStarted = true;

  guessInput.disabled = false;
  guessBtn.disabled = false;

  const p1 = player1Input.value || "Jogador 1";
  const p2 = player2Input.value || "Jogador 2";

  scoreName1.textContent = p1;
  scoreName2.textContent = p2;

  currentPlayer = 1;

  turnPlayer.textContent = p1;

  statusText.textContent =
  "Número sorteado entre 1 e " + max;

  message.textContent =
  "Jogo iniciado! Boa sorte.";

  triesText.textContent = tries;

  lastPlayer.textContent = "-";
  lastGuess.textContent = "?";
}

function switchPlayer(){

  const p1 = player1Input.value || "Jogador 1";
  const p2 = player2Input.value || "Jogador 2";

  currentPlayer = currentPlayer === 1 ? 2 : 1;

  turnPlayer.textContent =
  currentPlayer === 1 ? p1 : p2;
}

function saveRecord(){

  const best = localStorage.getItem("bestRecord");

  if(!best || tries < best){

    localStorage.setItem("bestRecord", tries);

    recordText.textContent =
    "NOVO RECORDE: " + tries + " tentativas!";
  }else{

    recordText.textContent =
    "Recorde atual: " + best + " tentativas.";
  }

  updateRecord();
}

function checkGuess(){

  if(!gameStarted) return;

  const guess = Number(guessInput.value);

  if(!guess){
    message.textContent =
    "Digite um número válido.";
    return;
  }

  tries++;

  triesText.textContent = tries;

  const p1 = player1Input.value || "Jogador 1";
  const p2 = player2Input.value || "Jogador 2";

  const currentName =
  currentPlayer === 1 ? p1 : p2;

  lastPlayer.textContent = currentName;
  lastGuess.textContent = guess;

  if(guess < randomNumber){

    message.textContent =
    currentName + ": o número é MAIOR.";

    switchPlayer();

  }else if(guess > randomNumber){

    message.textContent =
    currentName + ": o número é MENOR.";

    switchPlayer();

  }else{

    message.textContent =
    currentName + " acertou!";

    statusText.textContent =
    "Partida encerrada.";

    guessInput.disabled = true;
    guessBtn.disabled = true;

    if(currentPlayer === 1){

      score1++;
      score1Text.textContent = score1;

    }else{

      score2++;
      score2Text.textContent = score2;
    }

    winnerText.textContent =
    currentName +
    " venceu em " +
    tries +
    " tentativas!";

    saveRecord();

    winnerScreen.style.display = "flex";
  }

  guessInput.value = "";
}

function restartGame(){

  gameStarted = false;

  tries = 0;

  triesText.textContent = "0";

  guessInput.value = "";

  guessInput.disabled = false;
  guessBtn.disabled = false;

  message.textContent =
  "Clique em iniciar para jogar novamente.";

  statusText.textContent =
  "Aguardando início...";

  turnPlayer.textContent = "J1";

  lastPlayer.textContent = "-";
  lastGuess.textContent = "?";
}

function resetScore(){

  score1 = 0;
  score2 = 0;

  score1Text.textContent = "0";
  score2Text.textContent = "0";
}

function closeWinner(){

  winnerScreen.style.display = "none";
}

startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", restartGame);

resetScoreBtn.addEventListener("click", resetScore);

guessBtn.addEventListener("click", checkGuess);

guessInput.addEventListener("keydown", (e)=>{

  if(e.key === "Enter"){
    checkGuess();
  }

});