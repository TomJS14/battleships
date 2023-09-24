/** @format */
require("./styles.css");

import { ship, gameBoard, player } from "./game.js";
import { renderGameBoard } from "./render.js";
import backgroundImage from "./wallpaper.jpg";
const main = document.querySelector(".main");
const playerName = prompt("What's your name", "You");

const backgroundImg = document.querySelector(".background-img");
backgroundImg.style.backgroundImage = `url(${backgroundImage})`;

//Global Game state variables -- To refactor & Encapsulate
let gameActive = false;
let restartable = false;
let droppedArray = [];
let notDropped;
let p1carrier, p1battleship, p1destroyer, p1submarine, p1patrolBoat;
let p2carrier, p2battleship, p2destroyer, p2submarine, p2patrolBoat;
let p1AllShips, p2AllShips;
let draggedShip;
let gridSize = 10;
let p1BoardInstance = gameBoard(gridSize);
let player1Board = p1BoardInstance.createBoard();
let p2BoardInstance = gameBoard(gridSize);
let player2Board = p2BoardInstance.createBoard();
let player1;
let player2;
let p1gameBoard, p2gameBoard;
let shipyardShips;
let startGameButton;
let messageBox;

function setUpDom() {
  //gameContainer
  const gameContainer = document.createElement("div");
  gameContainer.setAttribute("class", "game-container");

  //Info section
  const infoSection = document.createElement("div");
  infoSection.setAttribute("class", "info");

  //Start button
  startGameButton = document.createElement("button");
  startGameButton.setAttribute("id", "start-button");
  startGameButton.setAttribute("class", "start");
  startGameButton.textContent = "Press to Start";
  infoSection.appendChild(startGameButton);

  //Message box
  messageBox = document.createElement("div");
  messageBox.textContent = "Time for war, place your ships!";
  messageBox.setAttribute("class", "message");
  infoSection.appendChild(messageBox);

  //Gameboards
  const player1Label = document.createElement("p");

  p1gameBoard = document.createElement("div");
  p1gameBoard.setAttribute("class", "player1-board");
  p1gameBoard.appendChild(player1Label);
  gameContainer.appendChild(p1gameBoard);
  const player2Label = document.createElement("p");

  gameContainer.appendChild(player2Label);
  p2gameBoard = document.createElement("div");
  p2gameBoard.setAttribute("class", "player2-board");
  gameContainer.appendChild(p2gameBoard);

  //shipyard container
  const shipyardContainer = document.createElement("div");
  shipyardContainer.setAttribute("class", "shipyardContainer");

  //shipyard label
  const shipyardLabel = document.createElement("div");
  shipyardLabel.textContent = "Your Shipyard";
  shipyardContainer.appendChild(shipyardLabel);

  //Shipyard
  const shipyard = document.createElement("div");
  shipyard.setAttribute("class", "shipyard");
  shipyardContainer.appendChild(shipyard);
  shipyard.textContent = "";

  //1
  const ship1 = document.createElement("div");

  ship1.setAttribute("data-ship-type", "carrier");
  ship1.setAttribute("id", "0");
  ship1.setAttribute("class", "draggable ship carrier");
  ship1.setAttribute("draggable", "true");
  shipyard.appendChild(ship1);

  //2
  const ship2 = document.createElement("div");
  ship2.setAttribute("data-ship-type", "destroyer");
  ship2.setAttribute("id", "1");
  ship2.setAttribute("class", "draggable ship destroyer");
  ship2.setAttribute("draggable", "true");
  shipyard.appendChild(ship2);

  //3
  const ship3 = document.createElement("div");
  ship3.setAttribute("data-ship-type", "battleship");
  ship3.setAttribute("id", "2");
  ship3.setAttribute("class", "draggable ship battleship");
  ship3.setAttribute("draggable", "true");
  shipyard.appendChild(ship3);

  //4
  const ship4 = document.createElement("div");
  ship4.setAttribute("data-ship-type", "submarine");
  ship4.setAttribute("id", "3");
  ship4.setAttribute("class", "draggable ship submarine");
  ship4.setAttribute("draggable", "true");
  shipyard.appendChild(ship4);

  //5
  const ship5 = document.createElement("div");
  ship5.setAttribute("data-ship-type", "patrolBoat");
  ship5.setAttribute("id", "4");
  ship5.setAttribute("class", "draggable ship patrolBoat");
  ship5.setAttribute("draggable", "true");
  shipyard.appendChild(ship5);

  shipyardShips = [ship1, ship2, ship3, ship4, ship5];

  main.appendChild(infoSection);
  main.appendChild(gameContainer);
  main.appendChild(shipyardContainer);

  return {
    gameContainer,
    p1gameBoard,
    p2gameBoard,
    startGameButton,
    shipyard,
    shipyardShips,
    messageBox,
  };
}

function initialise() {
  p1carrier = ship("carrier", 5, 0, false, true);
  p1battleship = ship("battleship", 4, 0, false, false);
  p1destroyer = ship("destroyer", 3, 0, false, false);
  p1submarine = ship("submarine", 3, 0, false, false);
  p1patrolBoat = ship("patrolBoat", 2, 0, false, false);

  p1AllShips = [
    p1carrier,
    p1battleship,
    p1destroyer,
    p1submarine,
    p1patrolBoat,
  ];

  p2carrier = ship("carrier", 5, 0, false, false);
  p2battleship = ship("battleship", 4, 0, false, false);
  p2destroyer = ship("destroyer", 3, 0, false, false);
  p2submarine = ship("submarine", 3, 0, false, false);
  p2patrolBoat = ship("patrolBoat", 2, 0, false, false);

  p2AllShips = [
    p2carrier,
    p2destroyer,
    p2battleship,
    p2submarine,
    p2patrolBoat,
  ];

  //Make Players
  player1 = player(
    "Player 1",
    player1Board,
    "Human",
    p1AllShips,
    p1BoardInstance
  );

  player2 = player("Computer", player2Board, "AI", p2AllShips, p2BoardInstance);

  renderGameBoard(player1Board, p1gameBoard);
  renderGameBoard(player2Board, p2gameBoard);

  //event listeners
  setupEventListeners(p1gameBoard, p2gameBoard);

  return {
    player1,
    player1Board,
    p1AllShips,
    player2,
    player2Board,
    p2AllShips,
  };
}

function setupEventListeners(p1gameBoard, p2gameBoard) {
  shipyardShips.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
    draggable.addEventListener("dragend", dragEnd);
  });

  p1gameBoard.addEventListener("dragover", dragOver);
  p1gameBoard.addEventListener("drop", dropShip);

  p2gameBoard.addEventListener("click", selectTarget);
  p2gameBoard.addEventListener("mouseover", hover);
  p2gameBoard.addEventListener("mouseout", hover);
  startGameButton.addEventListener("click", startGame);
}

function startGame(shipyard) {
  if (
    droppedArray.length >= p1AllShips.length &&
    gameActive == false &&
    restartable == false
  ) {
    messageBox.textContent = "Starting, take your shot!";
    gameActive = true;
    restartable = false;
    startGameButton.disabled = true;
    shipyard.textContent = "";

    placeP2Ships();
  } else if (gameActive == false && restartable == true) {
    resetGame();
  } else {
    messageBox.textContent = "Place all of your ships first";
  }
}

function resetGame() {
  messageBox.textContent = "Restarting, Place your ships!";
  startGameButton.textContent = "Start game";
  //Update global variables
  restartable = false;
  gameActive = false;
  droppedArray = [];
  p1BoardInstance = gameBoard(gridSize);
  player1Board = p1BoardInstance.createBoard();
  p2BoardInstance = gameBoard(gridSize);
  player2Board = p2BoardInstance.createBoard();
  initialise();

  //clear the dom
  main.textContent = "";

  //Set up event listeners & render
  const { p1gameBoard, p2gameBoard } = setUpDom();

  renderGameBoard(player1Board, p1gameBoard);
  renderGameBoard(player2Board, p2gameBoard);
  setupEventListeners(p1gameBoard, p2gameBoard);
}

function placeP2Ships() {
  p2BoardInstance.placeShip(player2Board, p2carrier, 9, 1);
  p2BoardInstance.placeShip(player2Board, p2destroyer, 3, 3);
  p2BoardInstance.placeShip(player2Board, p2battleship, 5, 2);
  p2BoardInstance.placeShip(player2Board, p2submarine, 2, 1);
  p2BoardInstance.placeShip(player2Board, p2patrolBoat, 6, 0);
  renderGameBoard(player2Board, p2gameBoard);
}

function dragStart(e) {
  draggedShip = e.target;
  draggedShip.classList.add("dragging");
  notDropped = false;
}

function dragOver(e) {
  notDropped = false;

  e.preventDefault();
}

function dragEnd(e) {
  draggedShip.classList.remove("dragging");
}

function dropShip(e) {
  e.preventDefault();
  const startCol = parseInt(e.target.dataset.col, 10);
  const startRow = parseInt(e.target.dataset.row, 10);

  const thisShip = p1AllShips[draggedShip.id];
  const shipName = draggedShip.dataset.shipType;
  const placementResult = p1BoardInstance.placeShip(
    player1Board,
    thisShip,
    startRow,
    startCol
  );

  if (placementResult) {
    droppedArray.push(thisShip);
    p1BoardInstance.placeShip(player1Board, thisShip, startRow, startCol);
    draggedShip.remove();
    messageBox.textContent = `You've placed your ${shipName}`;
  } else {
    notDropped = true;
    messageBox.textContent = "Can't go there, try again!";
  }
  renderGameBoard(player1Board, p1gameBoard);
  draggedShip.classList.remove("dragging");
}

function selectTarget(e) {
  if (gameActive) {
    let cell = e.target;
    if (cell && !cell.classList.contains("disabled")) {
      const col = parseInt(cell.dataset.col, 10);
      const row = parseInt(cell.dataset.row, 10);
      player1.attack(player2, row, col);
      setTimeout(handleResultValidation, 800); //Set this longer than the move delay
    }
  }
}

function hover(e) {
  let highlightedCell = e.target;
  highlightedCell.classList.toggle("highlighted");
}

function handleResultValidation() {
  const isGameWon = p2BoardInstance.checkForWin(player2.ships);
  const isGameLost = p1BoardInstance.checkForWin(player1.ships);

  if (isGameWon || isGameLost) {
    gameActive = false;

    startGameButton.textContent = "Restart";
    startGameButton.disabled = false;
    restartable = true;
    p2gameBoard.removeEventListener("click", selectTarget);

    if (isGameWon) {
      messageBox.textContent = "Game over, you win!";
    }
    if (isGameLost) {
      messageBox.textContent = "Game over, you Lose!";
    }
  }
}

//SETUP GAME
setUpDom();
initialise();

export {
  player1Board,
  player2Board,
  p1gameBoard,
  p2gameBoard,
  player1,
  player2,
  p1BoardInstance,
  p2BoardInstance,
  messageBox,
  playerName,
};
