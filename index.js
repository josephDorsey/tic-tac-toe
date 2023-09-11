"use strict";

const userName = document.querySelector(".game-user-name");
const userNameText = document.querySelector(".game-user-name-text");
const buttonSaveUserName = document.querySelector(".game-board-button");
const buttonEditUserInfo = document.querySelector(".edit-button");

const markerX = document.querySelector(".marker-x");
const markerO = document.querySelector(".marker-o");
const modeTwoPlayer = document.querySelector(".game-board-two-player");
const modeOnePlayer = document.querySelector(".game-board-one-player");
const moveCounterTitle = document.querySelector(".move-count-title");

const gameBoardContainer = document.querySelector(".game-board-sections");
const gameBoardPlayerTitle = document.querySelector(".game-board-player-title");
const gameBoardMarkerContainer = document.querySelector(
  ".game-board-marker-container"
);
const gameBox = document.querySelectorAll(".game-board-box");
let player1;
const buttonStartGame = document.querySelector(".game-start");
const buttonResetGame = document.querySelector(".game-reset");

const gameOverScreen = document.querySelector(".game-over-screen");
const gameOverMessage = document.querySelector(".game-over-message");
const gameOverResults = document.querySelector(".game-over-results");
const gameBoardMessageOuterContainer = document.querySelector(
  ".game-board-message-outer-container"
);
const gameBoardPlayerInfoContainer = document.querySelector(
  ".game-board-player-info-container"
);
const gameBoardPlayerMarker = document.querySelector(
  ".game-board-player-marker"
);
function playerSelectMarker(symbol) {
  let newSymbol = symbol.toLowerCase();
  if (newSymbol === "x") {
    player1 = "X";
    markerX.classList.add("selected-marker");
    markerO.classList.remove("selected-marker");
  } else {
    player1 = "O";
    markerX.classList.remove("selected-marker");
    markerO.classList.add("selected-marker");
  }
}
// function startGame() {
//   moveCounterTitle.style.display = "flex";
//   gameBoardPlayerTitle.style.display = "flex";
//   gameBoardPlayerTitle.textContent = `current players turn`;
// }

const gameBoardData = (() => {
  const gameBoard = Array.from({ length: 9 }, () => "");
  let mode = "";
  let turn = 1;
  let playerOne = "";
  let currentPlayerTurn = "";
  let playerTwo = mode === "Two Player" ? "" : "Computer";
  const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    return {
      getName,
      getMarker,
    };
  };
  const start = () => {
    moveCounterTitle.style.display = "flex";
    gameBoardPlayerTitle.style.display = "flex";
    if (playerOne.getMarker() === "X") {
      currentPlayerTurn = playerOne;
      gameBoardPlayerTitle.textContent = `Player ${currentPlayerTurn.getName()}'s turn`;
    }
    if (playerTwo.getMarker() === "X") {
      currentPlayerTurn = playerTwo;
      gameBoardPlayerTitle.textContent = `Player ${currentPlayerTurn.getName()}'s turn`;
    }
  };
  const setMode = () => {
    if (modeOnePlayer.checked) {
      mode = "One Player";
    }
    if (modeTwoPlayer.checked) {
      mode = "Two Player";
    }
  };
  const reset = () => {
    moveCounterTitle.style.display = "none";
    gameBoardPlayerTitle.style.display = "none";
    markerX.classList.remove("selected-marker");
    markerO.classList.remove("selected-marker");
    gameBox.forEach((box) => (box.innerHTML = ""));
    turn = 1;
  };

  const savePlayerInfo = () => {
    if (
      markerO.classList.value.includes("selected-marker") ||
      markerX.classList.value.includes("selected-marker")
    ) {
      userNameText.textContent = userName.value;
      playerOne = Player(
        userName.value,
        markerX.classList.value.includes("selected-marker") ? "X" : "O"
      );
      if (mode === "One Player") {
        playerTwo = Player(
          "Computer",
          markerX.classList.value.includes("selected-marker") ? "O" : "X"
        );
        console.log(`Single Player`);
      }
      userName.value = "";
      userName.classList.add("hidden");
      gameBoardMessageOuterContainer.classList.add("hidden");
      gameBoardPlayerInfoContainer.classList.remove("hidden");
      gameBoardPlayerMarker.textContent = `Marker: ${
        markerX.classList.value.includes("selected-marker") ? "X" : "O"
      }`;
      buttonSaveUserName.classList.add("hidden");
      buttonEditUserInfo.classList.remove("hidden");
    } else {
      console.log(`Please select a marker!`);
    }
  };
  const editPlayerInfo = () => {
    userName.value = userNameText.textContent;
    userName.classList.remove("hidden");
    gameBoardMessageOuterContainer.classList.remove("hidden");
    gameBoardPlayerInfoContainer.classList.add("hidden");
    buttonEditUserInfo.classList.add("hidden");
    buttonSaveUserName.classList.remove("hidden");
    userNameText.classList.add("hidden");
  };
  const checkBoard = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      // the Data for 3 Vertical Columns - X
      if (
        (gameBoard[0].includes("X") &&
          gameBoard[1].includes("X") &&
          gameBoard[2].includes("X")) ||
        (gameBoard[3].includes("X") &&
          gameBoard[4].includes("X") &&
          gameBoard[5].includes("X")) ||
        (gameBoard[6].includes("X") &&
          gameBoard[7].includes("X") &&
          gameBoard[8].includes("X")) ||
        (gameBoard[0].includes("X") &&
          gameBoard[4].includes("X") &&
          gameBoard[8].includes("X")) ||
        (gameBoard[2].includes("X") &&
          gameBoard[4].includes("X") &&
          gameBoard[5].includes("X"))
      ) {
        return gameOver("X");
      }
      if (
        (gameBoard[0].includes("O") &&
          gameBoard[1].includes("O") &&
          gameBoard[2].includes("O")) ||
        (gameBoard[3].includes("O") &&
          gameBoard[4].includes("O") &&
          gameBoard[5].includes("O")) ||
        (gameBoard[6].includes("O") &&
          gameBoard[7].includes("O") &&
          gameBoard[8].includes("O")) ||
        (gameBoard[0].includes("O") &&
          gameBoard[4].includes("O") &&
          gameBoard[8].includes("O")) ||
        (gameBoard[2].includes("O") &&
          gameBoard[4].includes("O") &&
          gameBoard[5].includes("O"))
      ) {
        return gameOver("O");
      }
      //
    }
  };
  const switchPlayers = () => {
    console.log(currentPlayerTurn.getMarker());
    currentPlayerTurn =
      currentPlayerTurn.getMarker() === playerOne.getMarker()
        ? playerTwo
        : playerOne;
  };
  const generatePosition = (marker) => {
    let num = Math.floor(Math.random() * 8) + 1;
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i] === marker) return;
      if (gameBoard[num] !== marker && gameBoard[num] === "") {
        gameBoard.splice(num, 1, marker);
        switchPlayers();
        turn++;
        moveCounterTitle.textContent = `Move: ` + turn;
        gameBoardPlayerTitle.textContent =
          currentPlayerTurn.getName() + "'s turn";
        document.querySelectorAll(".game-board-box")[i].textContent = marker;
        checkBoard();
      }
    }
  };
  const addMarker = (marker, position) => {
    if (gameBoard[position] === marker) return;
    if (mode === "Two Player") {
      if (gameBoard[position] !== marker && gameBoard[position] === "") {
        console.log(position);
        gameBoard.splice(position, 1, marker);
        switchPlayers();
        turn++;
        moveCounterTitle.textContent = `Move: ` + turn;
        gameBoardPlayerTitle.textContent =
          currentPlayerTurn.getName() + "'s turn";
        checkBoard();
        // if (currentPlayerTurn.getName() === "Computer") {
        //   generatePosition(currentPlayerTurn.getMarker());
        // }
      }
    }
    if (mode === "One Player") {
      let num = Math.floor(Math.random() * 8) + 1;
      if (
        gameBoard[position] !== marker &&
        gameBoard[position] === "" &&
        playerOne.getName() === currentPlayerTurn.getName()
      ) {
        console.log(position);
        gameBoard.splice(position, 1, marker);
        switchPlayers();
        turn++;
        moveCounterTitle.textContent = `Move: ` + turn;
        gameBoardPlayerTitle.textContent =
          currentPlayerTurn.getName() + "'s turn";
        checkBoard();
        // if (currentPlayerTurn.getName() === "Computer") {
        //   generatePosition(currentPlayerTurn.getMarker());
        // }
      }
      if (
        gameBoard[num] !== marker &&
        gameBoard[num] === "" &&
        currentPlayerTurn.getName() === "Computer"
      ) {
        console.log(num);
        gameBoard.splice(num, 1, currentPlayerTurn.getMarker());
        document.querySelectorAll(".game-board-box")[num].textContent =
          currentPlayerTurn.getMarker();
        switchPlayers();
        turn++;
        moveCounterTitle.textContent = `Move: ` + turn;
        gameBoardPlayerTitle.textContent =
          currentPlayerTurn.getName() + "'s turn";

        checkBoard();
        // if (currentPlayerTurn.getName() === "Computer") {
        //   generatePosition(currentPlayerTurn.getMarker());
        // }
      }
    }
  };
  const gameOver = (marker) => {
    gameOverScreen.style.display = "flex";
    gameOverMessage.textContent = `${marker} wins!`;
    gameOverResults.textContent = `Completed in ${turn} turns`;
  };
  const logData = () => {
    console.log(gameBoard);
    // console.log(`CURRENT PLAYER---` + currentPlayerTurn.getName());
    // console.log(`CURRENT PLAYER---` + currentPlayerTurn.getMarker());
    console.log(mode);
    console.log(playerOne.getName());
    console.log(playerTwo.getName());
  };
  const getMode = () => {
    console.log(mode);
    return mode;
  };
  const getCurrentPlayer = () => currentPlayerTurn;
  return {
    start,
    reset,
    savePlayerInfo,
    editPlayerInfo,
    addMarker,
    logData,
    setMode,
    getCurrentPlayer,
    getMode,
  };
})();

// Buttons
gameBoardContainer.addEventListener("click", function (e) {
  let box = e.target;
  let index = e.target.dataset.box;
  let container = e.target.parentElement.classList.value;
  console.log(index);
  let selectedBox = Array.from(document.querySelectorAll(".game-board-box"));
  // console.log(selectedBox);
  if (container.includes("game-board-section")) {
    let currentMarker = gameBoardData.getCurrentPlayer().getMarker();
    console.log(gameBoardData);
    for (let i = 1; i <= 9; i++) {
      let boxNumber = "box-" + i;
      let mainIndex = i - 1;
      let randomRoll = Math.floor(Math.random() * 8) + 1;
      let randomBoxNumber = "box-" + randomRoll;
      if (
        index === boxNumber &&
        box.textContent === "" &&
        gameBoardData.getCurrentPlayer().getName() !== "Computer"
      ) {
        box.textContent = currentMarker;
        console.log(selectedBox);
        gameBoardData.addMarker(currentMarker, mainIndex);
      }
      if (
        index === randomBoxNumber &&
        box.textContent === "" &&
        gameBoardData.getCurrentPlayer().getName() === "Computer"
      ) {
        box.textContent = currentMarker;
        console.log(selectedBox);
        gameBoardData.addMarker(currentMarker, randomRoll);
      }
      if (index === boxNumber && box.textContent !== "") return;
    }
  }
  // if () {

  // }
});

gameBoardMarkerContainer.addEventListener("click", function (e) {
  if (e.target.name === "x") playerSelectMarker("x");
  if (e.target.name === "o") playerSelectMarker("o");
});

gameOverScreen.addEventListener("click", function (e) {
  if (!e.target.classList.value.includes("game-over-screen"))
    gameOverScreen.style.display = "none";
});

buttonSaveUserName.addEventListener("click", function (e) {
  e.preventDefault();
  gameBoardData.savePlayerInfo();
});
buttonEditUserInfo.addEventListener("click", gameBoardData.editPlayerInfo);
buttonStartGame.addEventListener("click", gameBoardData.start);
buttonResetGame.addEventListener("click", gameBoardData.reset);

modeOnePlayer.addEventListener("click", gameBoardData.setMode);
modeTwoPlayer.addEventListener("click", gameBoardData.setMode);
