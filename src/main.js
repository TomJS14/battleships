/** @format */

const { ship, gameBoard, player } = require("./game.js");
const { renderGameBoard } = require("./render.js"); //circular??

const p1gameBoard = document.querySelector(".player1-board"); // Define p1gameBoard
const p2gameBoard = document.querySelector(".player2-board");

let gameActive = false; //update based on win status

//SETUP
const gridSize = 10;
//Make Game Boards
const p1BoardInstance = gameBoard(gridSize);
const player1Board = p1BoardInstance.createBoard();
const p2BoardInstance = gameBoard(gridSize);
const player2Board = p2BoardInstance.createBoard();

//Make Player 1 ships
const p1carrier = ship("carrier", 5, 0, false, true);
const p1battleship = ship("battleship", 4, 0, false, false);
const p1destroyer = ship("destroyer", 3, 0, false, true);
const p1submarine = ship("submarine", 3, 0, false, true);
const p1patrolBoat = ship("patrolBoat", 2, 0, false, false);

const p1AllShips = [
  p1carrier,
  p1destroyer,
  p1battleship,
  p1submarine,
  p1patrolBoat,
];

//Make AI ships
const p2carrier = ship("carrier", 5, 0, false, true);
const p2battleship = ship("battleship", 4, 0, false, false);
const p2destroyer = ship("destroyer", 3, 0, false, true);
const p2submarine = ship("submarine", 3, 0, false, true);
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
console.log("Player 1 = ", player1.getName(), player1.board, player1.getType());

const player2 = player(
  "Computer",
  player2Board,
  "AI",
  p2AllShips,
  p2BoardInstance
);
console.log("Player 2 = ", player2.getName(), player2.board, player2.getType());

//Place P1 Ships - predefined for now
p1BoardInstance.placeShip(player1Board, p1carrier, 0, 1, false);
p1BoardInstance.placeShip(player1Board, p1destroyer, 3, 3, false);
p1BoardInstance.placeShip(player1Board, p1battleship, 5, 2, false);
p1BoardInstance.placeShip(player1Board, p1submarine, 2, 1, true);
p1BoardInstance.placeShip(player1Board, p1patrolBoat, 6, 0, true);

//Place P2 Ships - predefined for now
p2BoardInstance.placeShip(player2Board, p2carrier, 9, 1, false);
p2BoardInstance.placeShip(player2Board, p2destroyer, 3, 3, false);
p2BoardInstance.placeShip(player2Board, p2battleship, 5, 2, false);
p2BoardInstance.placeShip(player2Board, p2submarine, 2, 1, true);
p2BoardInstance.placeShip(player2Board, p2patrolBoat, 6, 0, true);

//Render board

renderGameBoard(player1Board, p1gameBoard);
renderGameBoard(player2Board, p2gameBoard);

//Usage - attacks

player2.attack(player1); //computer, no XY parameters needed
/* player1.attack(player2, 6, 0); //player, pass co-ordinates */
/* player1.attack(player2, 9, 1); //player, pass co-ordinates */

module.exports = {
  player1Board,
  player2Board,
  p1gameBoard,
};
