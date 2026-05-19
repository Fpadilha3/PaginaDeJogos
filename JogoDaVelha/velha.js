const cells =
document.querySelectorAll(".cell");

const statusText =
document.getElementById("status");

const turnText =
document.getElementById("turn");

const startBtn =
document.getElementById("startBtn");

const restartBtn =
document.getElementById("restartBtn");

const resetScoreBtn =
document.getElementById("resetScoreBtn");

const scoreXText =
document.getElementById("scoreX");

const scoreOText =
document.getElementById("scoreO");

const playerXInput =
document.getElementById("playerX");

const playerOInput =
document.getElementById("playerO");

const nameX =
document.getElementById("nameX");

const nameO =
document.getElementById("nameO");

const winnerPopup =
document.getElementById("winnerPopup");

const winnerTitle =
document.getElementById("winnerTitle");

const closePopup =
document.getElementById("closePopup");

let board = [
  "", "", "",
  "", "", "",
  "", "", ""
];

let currentPlayer = "X";

let gameRunning = false;

let scoreX = 0;

let scoreO = 0;

const winningCombinations = [

  [0,1,2],
  [3,4,5],
  [6,7,8],

  [0,3,6],
  [1,4,7],
  [2,5,8],

  [0,4,8],
  [2,4,6]

];

startBtn.addEventListener(
  "click",
  startGame
);

restartBtn.addEventListener(
  "click",
  restartGame
);

resetScoreBtn.addEventListener(
  "click",
  resetScore
);

closePopup.addEventListener(
  "click",
  closeWinnerPopup
);

cells.forEach(cell => {

  cell.addEventListener(
    "click",
    handleCellClick
  );

});

function startGame(){

  clearBoard();

  updatePlayerNames();

  currentPlayer = "X";

  updateTurnColor();

  updateStatus();

  gameRunning = true;
}

function handleCellClick(event){

  const cell =
  event.target;

  const index =
  cell.dataset.index;

  if(
    board[index] !== ""
    ||
    !gameRunning
  ){
    return;
  }

  board[index] =
  currentPlayer;

  cell.textContent =
  currentPlayer;

  cell.classList.add(
    currentPlayer.toLowerCase()
  );

  checkWinner();
}

function checkWinner(){

  let roundWon = false;

  let winningCombo = [];

  for(
    let i = 0;
    i < winningCombinations.length;
    i++
  ){

    const combination =
    winningCombinations[i];

    const a =
    board[combination[0]];

    const b =
    board[combination[1]];

    const c =
    board[combination[2]];

    if(
      a === ""
      ||
      b === ""
      ||
      c === ""
    ){
      continue;
    }

    if(a === b && b === c){

      roundWon = true;

      winningCombo = combination;

      break;
    }
  }

  if(roundWon){

    winningCombo.forEach(index => {

      cells[index]
      .classList
      .add("winner");

    });

    const winnerName =

      currentPlayer === "X"

      ?

      nameX.textContent

      :

      nameO.textContent;

    winnerTitle.innerHTML =
    `${winnerName} venceu!`;

    winnerPopup.classList.add(
      "show"
    );

    if(currentPlayer === "X"){

      scoreX++;

      scoreXText.textContent =
      scoreX;

    }else{

      scoreO++;

      scoreOText.textContent =
      scoreO;
    }

    statusText.innerHTML =
    `${winnerName} venceu!`;

    gameRunning = false;

    return;
  }

  if(!board.includes("")){

    winnerTitle.innerHTML =
    "EMPATE!";

    winnerPopup.classList.add(
      "show"
    );

    statusText.innerHTML =
    "EMPATE!";

    gameRunning = false;

    return;
  }

  changePlayer();
}

function changePlayer(){

  currentPlayer =

  currentPlayer === "X"

  ?

  "O"

  :

  "X";

  updateTurnColor();

  updateStatus();
}

function updateStatus(){

  const currentName =

    currentPlayer === "X"

    ?

    nameX.textContent

    :

    nameO.textContent;

  statusText.innerHTML =
  `Vez de ${currentName}`;

  turnText.textContent =
  currentPlayer;
}

function updateTurnColor(){

  if(currentPlayer === "X"){

    turnText.style.color =
    "#38bdf8";

    turnText.style.textShadow =
    "0 0 15px #38bdf8";

  }else{

    turnText.style.color =
    "#d16cff";

    turnText.style.textShadow =
    "0 0 15px #d16cff";
  }
}

function updatePlayerNames(){

  const playerXName =

    playerXInput
    .value
    .trim()

    ||

    "Jogador X";

  const playerOName =

    playerOInput
    .value
    .trim()

    ||

    "Jogador O";

  nameX.textContent =
  playerXName;

  nameO.textContent =
  playerOName;
}

function clearBoard(){

  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  cells.forEach(cell => {

    cell.textContent = "";

    cell.classList.remove("x");
    cell.classList.remove("o");
    cell.classList.remove("winner");

  });
}

function restartGame(){

  clearBoard();

  winnerPopup.classList.remove(
    "show"
  );

  currentPlayer = "X";

  updateTurnColor();

  updateStatus();

  gameRunning = true;
}

function resetScore(){

  scoreX = 0;

  scoreO = 0;

  scoreXText.textContent = 0;

  scoreOText.textContent = 0;
}

function closeWinnerPopup(){

  winnerPopup.classList.remove(
    "show"
  );

  restartGame();
}

updateTurnColor();