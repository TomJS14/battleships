/** @format */
require("./styles.css");

import { ship, gameBoard, player } from "./game.js";
import { renderGameBoard } from "./render.js";

const p1gameBoard = document.querySelector(".player1-board");
const p2gameBoard = document.querySelector(".player2-board");
const messageBox = document.querySelector(".message");

let gameActive = false; //update based on status
let restartable = false;
let droppedArray = [];
let player1Board, p1BoardInstance;
let player2Board, p2BoardInstance; //This is causing block scope issue
let notDropped;
let p1carrier, p1battleship, p1destroyer, p1submarine, p1patrolBoat;
let p2carrier, p2battleship, p2destroyer, p2submarine, p2patrolBoat;
let p1AllShips, p2AllShips;

function initialise() {
  let gridSize = 10;
  p1BoardInstance = gameBoard(gridSize);
  player1Board = p1BoardInstance.createBoard();
  p2BoardInstance = gameBoard(gridSize);
  player2Board = p2BoardInstance.createBoard();

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
  let player1 = player(
    "Tom",
    player1Board,
    "Human",
    p1AllShips,
    p1BoardInstance
  );

  let player2 = player(
    "Computer",
    player2Board,
    "AI",
    p2AllShips,
    p2BoardInstance
  );

  renderGameBoard(player1Board, p1gameBoard);
  renderGameBoard(player2Board, p2gameBoard);

  return {
    p1BoardInstance,
    player1,
    player1Board,
    p2BoardInstance,
    player2,
    player2Board,
    p1AllShips,
    p2AllShips,
  };
}

//SETUP
const {
  player1,
  player2,
  /* player1Board,
  p1BoardInstance,
  player2Board,
  p2BoardInstance, */
} = initialise();

const startGameButton = document.querySelector("#start-button");
startGameButton.addEventListener("click", startGame);

function startGame() {
  if (droppedArray.length >= 1 && gameActive == false && restartable == false) {
    messageBox.textContent = "Starting, the enemy is placing their ships...";
    gameActive = true;
    restartable = false;
    startGameButton.disabled = true;
    placeP2Ships(); //only call once!
  } else if (gameActive == false && restartable == true) {
    messageBox.textContent = "Restarting, Place your ships!";
    console.log("restarting");
    startGameButton.textContent = "Start game";
    restartable = false;
    gameActive = false;

    //logic for resetting game state
    initialise();
    console.log(player1Board);
    console.log(player2Board);
    console.log(player2.ships, player1.ships);
  } else {
    messageBox.textContent = "Place all of your ships first";
  }
}

function placeP2Ships() {
  p2BoardInstance.placeShip(player2Board, p2carrier, 9, 1);
  p2BoardInstance.placeShip(player2Board, p2destroyer, 3, 3);
  p2BoardInstance.placeShip(player2Board, p2battleship, 5, 2);
  p2BoardInstance.placeShip(player2Board, p2submarine, 2, 1);
  p2BoardInstance.placeShip(player2Board, p2patrolBoat, 6, 0);
  renderGameBoard(player2Board, p2gameBoard);
}

/* Drag player ships */

let draggedShip;
const draggables = document.querySelectorAll(".draggable");
const optionShips = Array.from(draggables);

//event listeners
optionShips.forEach((draggable) => {
  draggable.addEventListener("dragstart", dragStart);
  draggable.addEventListener("dragend", dragEnd);
});

const player1BoardContainer = document.querySelector(".player1-board");
player1BoardContainer.addEventListener("dragover", dragOver);
player1BoardContainer.addEventListener("drop", dropShip);

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
  const startCol = parseInt(e.target.dataset.col, 10);
  const startRow = parseInt(e.target.dataset.row, 10);
  const thisShip = p1AllShips[draggedShip.id]; //get the id of the ship from the p1 ship array to place
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
  } else {
    notDropped = true;
  }

  console.log(droppedArray);
  renderGameBoard(player1Board, p1gameBoard);
  draggedShip.classList.remove("dragging");
}
const player2BoardContainer = document.querySelector(".player2-board");
player2BoardContainer.addEventListener("click", selectTarget);
player2BoardContainer.addEventListener("mouseover", hover);
player2BoardContainer.addEventListener("mouseout", hover);

function selectTarget(e) {
  if (gameActive) {
    const col = parseInt(e.target.dataset.col, 10);
    const row = parseInt(e.target.dataset.row, 10);
    const attackResult = player1.attack(player2, row, col);
    const isGameWon = p2BoardInstance.checkForWin(player2.ships);

    if (isGameWon) {
      messageBox.textContent = "Game over, you win!";
      gameActive = false;
      startGameButton.textContent = "Restart";
      startGameButton.disabled = false;
      restartable = true;
    }
  }
}

function hover(e) {
  let highlightedCell = e.target;
  highlightedCell.classList.toggle("highlighted");
}

export {
  player1Board,
  player2Board,
  p1gameBoard,
  player1,
  player2,
  p1BoardInstance,
  p2BoardInstance,
};
