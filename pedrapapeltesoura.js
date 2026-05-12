const choices = ["pedra", "papel", "tesoura"];

let player1Choice = null;
let player2Choice = null;

let player1Turn = true;

let score1 = localStorage.getItem("score1")
? parseInt(localStorage.getItem("score1"))
: 0;

let score2 = localStorage.getItem("score2")
? parseInt(localStorage.getItem("score2"))
: 0;

const score1Text =
document.getElementById("score1");

const score2Text =
document.getElementById("score2");

const result =
document.getElementById("result");

const statusText =
document.getElementById("status");

const turnPlayer =
document.getElementById("turnPlayer");

const currentPlayer =
document.getElementById("currentPlayer");

const secretMessage =
document.getElementById("secretMessage");

const player1Input =
document.getElementById("player1Input");

const player2Input =
document.getElementById("player2Input");

const scoreName1 =
document.getElementById("scoreName1");

const scoreName2 =
document.getElementById("scoreName2");

score1Text.textContent = score1;
score2Text.textContent = score2;

function getPlayer1Name(){
  return player1Input.value || "Player 1";
}

function getPlayer2Name(){
  return player2Input.value || "Player 2";
}

function updateNames(){

  scoreName1.textContent =
  getPlayer1Name();

  scoreName2.textContent =
  getPlayer2Name();

  if(player1Turn){

    currentPlayer.textContent =
    `Vez de ${getPlayer1Name()}`;

    turnPlayer.textContent =
    getPlayer1Name();

  }

  else{

    currentPlayer.textContent =
    `Vez de ${getPlayer2Name()}`;

    turnPlayer.textContent =
    getPlayer2Name();

  }

}

player1Input.addEventListener("input", updateNames);
player2Input.addEventListener("input", updateNames);

updateNames();

document.querySelectorAll(".choice").forEach(btn=>{

  btn.addEventListener("click", ()=>{

    const choice = btn.dataset.choice;

    handleChoice(choice);

  });

});

document.getElementById("randomBtn")
.addEventListener("click", ()=>{

  const randomChoice =
  choices[Math.floor(Math.random()*3)];

  handleChoice(randomChoice);

});

function handleChoice(choice){

  if(player1Turn){

    player1Choice = choice;

    secretMessage.textContent =
    "Jogada salva em segredo!";

    player1Turn = false;

    currentPlayer.textContent =
    `Vez de ${getPlayer2Name()}`;

    turnPlayer.textContent =
    getPlayer2Name();

    statusText.textContent =
    `${getPlayer2Name()} precisa jogar`;

  }

  else{

    player2Choice = choice;

    secretMessage.textContent =
    "Jogada salva em segredo!";

    showResult();

  }

}

function showResult(){

  let winner = "";

  if(player1Choice === player2Choice){

    winner = "EMPATE!";

  }

  else if(

    (player1Choice === "pedra" &&
    player2Choice === "tesoura") ||

    (player1Choice === "papel" &&
    player2Choice === "pedra") ||

    (player1Choice === "tesoura" &&
    player2Choice === "papel")

  ){

    winner =
    `${getPlayer1Name()} venceu a rodada!`;

    score1++;

  }

  else{

    winner =
    `${getPlayer2Name()} venceu a rodada!`;

    score2++;

  }

  localStorage.setItem("score1", score1);
  localStorage.setItem("score2", score2);

  score1Text.textContent = score1;
  score2Text.textContent = score2;

  result.innerHTML = `
  
    ${getPlayer1Name()} escolheu
    <strong>${player1Choice.toUpperCase()}</strong>

    <br><br>

    ${getPlayer2Name()} escolheu
    <strong>${player2Choice.toUpperCase()}</strong>

    <br><br>

    <strong>${winner}</strong>

  `;

  if(score1 >= 5){

    result.innerHTML += `
      <div class="winner-message">
        🏆 ${getPlayer1Name()} GANHOU O JOGO!
      </div>
    `;

    resetGame();

  }

  else if(score2 >= 5){

    result.innerHTML += `
      <div class="winner-message">
        🏆 ${getPlayer2Name()} GANHOU O JOGO!
      </div>
    `;

    resetGame();

  }

  player1Choice = null;
  player2Choice = null;

  player1Turn = true;

  secretMessage.textContent =
  "Escolha secreta...";

  currentPlayer.textContent =
  `Vez de ${getPlayer1Name()}`;

  turnPlayer.textContent =
  getPlayer1Name();

  statusText.textContent =
  "Nova rodada iniciada";

}

function resetGame(){

  setTimeout(()=>{

    score1 = 0;
    score2 = 0;

    localStorage.setItem("score1",0);
    localStorage.setItem("score2",0);

    score1Text.textContent = 0;
    score2Text.textContent = 0;

  },2500);

}

document.getElementById("resetBtn")
.addEventListener("click", ()=>{

  score1 = 0;
  score2 = 0;

  localStorage.setItem("score1",0);
  localStorage.setItem("score2",0);

  score1Text.textContent = 0;
  score2Text.textContent = 0;

  result.innerHTML =
  "Placar reiniciado!";

});