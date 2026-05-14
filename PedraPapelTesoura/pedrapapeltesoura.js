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

const popup =
document.getElementById("popup");

const popupBody =
document.getElementById("popupBody");

const closePopup =
document.getElementById("closePopup");

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

player1Input.addEventListener(
"input",
updateNames
);

player2Input.addEventListener(
"input",
updateNames
);

updateNames();

document.querySelectorAll(".choice")
.forEach(btn=>{

  btn.addEventListener("click",()=>{

    const choice =
    btn.dataset.choice;

    handleChoice(choice);

  });

});

document.getElementById("randomBtn")
.addEventListener("click",()=>{

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

    showResult();

  }

}

function showResult(){

  let winner = "";

  if(player1Choice === player2Choice){

    winner = "🤝 EMPATE!";

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
    `🏆 ${getPlayer1Name()} venceu a rodada!`;

    score1++;

  }

  else{

    winner =
    `🏆 ${getPlayer2Name()} venceu a rodada!`;

    score2++;

  }

  localStorage.setItem("score1",score1);
  localStorage.setItem("score2",score2);

  score1Text.textContent = score1;
  score2Text.textContent = score2;

  secretMessage.textContent =
  "Resultado revelado!";

  popup.style.display = "flex";

  popupBody.innerHTML = `

    <div class="popup-result">

      <h2 class="popup-title">
        RESULTADO
      </h2>

      <div class="popup-choices">

        <div class="popup-player">

          <h3>
            ${getPlayer1Name()}
          </h3>

          <div class="popup-choice">

            ${getEmoji(player1Choice)}

          </div>

          <p>
            ${player1Choice.toUpperCase()}
          </p>

        </div>

        <div class="popup-vs">
          VS
        </div>

        <div class="popup-player">

          <h3>
            ${getPlayer2Name()}
          </h3>

          <div class="popup-choice">

            ${getEmoji(player2Choice)}

          </div>

          <p>
            ${player2Choice.toUpperCase()}
          </p>

        </div>

      </div>

      <div class="popup-winner">

        ${winner}

      </div>

      <div class="popup-score">

        ${score1}
        X
        ${score2}

      </div>

    </div>

  `;

  if(score1 >= 5 || score2 >= 5){

    const champion =
    score1 >= 5
    ? getPlayer1Name()
    : getPlayer2Name();

    popupBody.innerHTML = `

      <div class="final-popup">

        <div class="trophy">
          🏆
        </div>

        <h2 class="champion-name">

          ${champion}

        </h2>

        <p class="champion-text">

          GANHOU A PARTIDA!

        </p>

        <div class="final-score">

          ${score1}
          X
          ${score2}

        </div>

      </div>

    `;

    resetGame();

  }

  player1Choice = null;
  player2Choice = null;

  player1Turn = true;

  currentPlayer.textContent =
  `Vez de ${getPlayer1Name()}`;

  turnPlayer.textContent =
  getPlayer1Name();

  statusText.textContent =
  "Nova rodada iniciada";

}

closePopup.addEventListener("click",()=>{

  popup.style.display = "none";

});

/* FECHAR AO CLICAR FORA */

popup.addEventListener("click",(e)=>{

  if(e.target === popup){

    popup.style.display = "none";

  }

});

function resetGame(){

  setTimeout(()=>{

    score1 = 0;
    score2 = 0;

    localStorage.setItem("score1",0);
    localStorage.setItem("score2",0);

    score1Text.textContent = 0;
    score2Text.textContent = 0;

  },3000);

}

document.getElementById("resetBtn")
.addEventListener("click",()=>{

  score1 = 0;
  score2 = 0;

  localStorage.setItem("score1",0);
  localStorage.setItem("score2",0);

  score1Text.textContent = 0;
  score2Text.textContent = 0;

  result.innerHTML =
  "Placar reiniciado!";

});

function getEmoji(choice){

  if(choice === "pedra"){
    return "✊";
  }

  if(choice === "papel"){
    return "✋";
  }

  if(choice === "tesoura"){
    return "✌️";
  }

}