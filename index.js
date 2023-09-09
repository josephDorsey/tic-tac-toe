"use strict";

const userName = document.querySelector(".game-user-name");
const userNameText = document.querySelector(".game-user-name-text");
const buttonSaveUserName = document.querySelector(".game-board-button");

const markerX = document.querySelector(".marker-x");
const markerO = document.querySelector(".marker-o");

const moveCounterTitle = document.querySelector(".move-count-title");

const gameBoard = document.querySelector(".game-board");
const gameBoardPlayerTitle = document.querySelector(".game-board-player-title");
const gameBoardMarkerContainer = document.querySelector(
  ".game-board-marker-container"
);

const buttonStartGame = document.querySelector(".game-start");
const buttonResetGame = document.querySelector(".game-reset");

function playerSelectMarker(symbol) {
  let newSymbol = symbol.toLowerCase();
  if (newSymbol === "x") {
    markerX.classList.add("selected-marker");
    markerO.classList.remove("selected-marker");
  } else {
    markerX.classList.remove("selected-marker");
    markerO.classList.add("selected-marker");
  }
}
function startGame() {
  moveCounterTitle.style.display = "flex";
  gameBoardPlayerTitle.style.display = "flex";
}

function resetGame() {
  moveCounterTitle.style.display = "none";
  gameBoardPlayerTitle.style.display = "none";
  markerX.classList.remove("selected-marker");
  markerO.classList.remove("selected-marker");
}

// Buttons
gameBoardMarkerContainer.addEventListener("click", function (e) {
  if (e.target.name === "x") playerSelectMarker("x");
  if (e.target.name === "o") playerSelectMarker("o");
});

buttonSaveUserName.addEventListener("click", function (e) {
  e.preventDefault();
  userNameText.textContent = userName.value;
  userName.value = "";
  userName.classList.add("hidden");
});

buttonStartGame.addEventListener("click", startGame);
buttonResetGame.addEventListener("click", resetGame);
