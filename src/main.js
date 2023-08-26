/** @format */
require("./styles.css");

import { ship, gameBoard, player } from "./game.js";
import { renderGameBoard, resetGameBoard } from "./render.js";

const p1gameBoard = document.querySelector(".player1-board");
const p2gameBoard = document.querySelector(".player2-board");
const messageBox = document.querySelector(".message");

let gameActive = false; //update based on status

//SETUP
const gridSize = 10;
let p1BoardInstance = gameBoard(gridSize);
let player1Board = p1BoardInstance.createBoard();
let p2BoardInstance = gameBoard(gridSize);
let player2Board = p2BoardInstance.createBoard();

//Make Player 1 ships
const p1carrier = ship("carrier", 5, 0, false, false);
const p1battleship = ship("battleship", 4, 0, false, false);
const p1destroyer = ship("destroyer", 3, 0, false, false);
const p1submarine = ship("submarine", 3, 0, false, false);
const p1patrolBoat = ship("patrolBoat", 2, 0, false, false);

const p1AllShips = [
  p1carrier,
  p1battleship,
  p1destroyer,
  p1submarine,
  p1patrolBoat,
];

let droppedArray = [];

let notDropped;

//Make AI ships
const p2carrier = ship("carrier", 5, 0, false, false);
const p2battleship = ship("battleship", 4, 0, false, false);
const p2destroyer = ship("destroyer", 3, 0, false, false);
const p2submarine = ship("submarine", 3, 0, false, false);
const p2patrolBoat = ship("patrolBoat", 2, 0, false, false);

const p2AllShips = [
  p2carrier,
  p2destroyer,
  p2battleship,
  p2submarine,
  p2patrolBoat,
];

//Make Players
const player1 = player(
  "Tom",
  player1Board,
  "Human",
  p1AllShips,
  p1BoardInstance
);

const player2 = player(
  "Computer",
  player2Board,
  "AI",
  p2AllShips,
  p2BoardInstance
);

//Render Initial Board
renderGameBoard(player1Board, p1gameBoard);
renderGameBoard(player2Board, p2gameBoard);

//Game loop

const startGameButton = document.querySelector("#start-button");
startGameButton.addEventListener("click", startGame);

/* const placePlayer2Ships = document.querySelector("#place-p2");
placePlayer2Ships.addEventListener("click", placeP2Ships); */

const attackTest = document.querySelector("#test-attacks");
attackTest.addEventListener("click", testAttacks);

function startGame() {
  if (droppedArray.length === 5) {
    messageBox.textContent = "Starting, the enemy is placing their ships....";
    console.log("starting game!");
    placeP2Ships();
  } else {
    messageBox.textContent = "Place all ships!";
    console.log("Place all ships!");
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

function testAttacks() {
  //Usage - attacks for testing only

  player2.attack(player1); //computer, no XY parameters needed
  player1.attack(player2, 6, 0);
  player1.attack(player2, 7, 0); //player, pass co-ordinates */
  player1.attack(player2, 9, 1);
  player1.attack(player2, 9, 2);
  player1.attack(player2, 9, 3);
  player1.attack(player2, 9, 4);
  player1.attack(player2, 9, 5);

  player1.attack(player2, 2, 1);
  player1.attack(player2, 3, 1);
  player1.attack(player2, 4, 1);

  player1.attack(player2, 3, 3);
  player1.attack(player2, 3, 4);
  player1.attack(player2, 3, 5);

  player1.attack(player2, 5, 2);
  player1.attack(player2, 5, 3);
  player1.attack(player2, 5, 4);
  player1.attack(player2, 5, 5); //win
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
  console.log(draggedShip);
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
  droppedArray.push(thisShip);
  console.log(droppedArray.length);
  p1BoardInstance.placeShip(player1Board, thisShip, startRow, startCol);

  if (!notDropped) {
    draggedShip.remove();
  }

  renderGameBoard(player1Board, p1gameBoard);
  draggedShip.classList.remove("dragging");
}
const player2BoardContainer = document.querySelector(".player2-board");
player2BoardContainer.addEventListener("click", selectTarget);
player2BoardContainer.addEventListener("mouseover", hover);
player2BoardContainer.addEventListener("mouseout", hover);

function selectTarget(e) {
  const col = parseInt(e.target.dataset.col, 10);
  const row = parseInt(e.target.dataset.row, 10);
  player1.attack(player2, row, col);
}

function hover(e) {
  let highlightedCell = e.target;
  highlightedCell.classList.toggle("highlighted");
}

//Click new game
//Add ability to rotate ships
//Drag ships to position
//Check all ships are placed
//Add logic for checking if valid position
//allow start game if true
// click on enemy board and register result
//Add logic to check if attack is valid - not selected before etc.
//swap turn to computer - generate random turn
// swap turn to player and repeat until win (checkForWin between turns)
//If won, display message, disable event listeners and enable restart game
//repeat

export { player1Board, player2Board, p1gameBoard };
