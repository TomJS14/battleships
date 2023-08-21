/** @format */

const { player1Board } = require("./main.js");
const gridSize = 10;
const p1gameBoard = document.querySelector(".player1-board"); // Define p1gameBoard
const p2gameBoard = document.querySelector(".player2-board");

const renderGameBoard = (board, container) => {
  console.log(board);
  console.log(container);

  container.textContent = "";
  const boardContainer = document.createElement("div");
  boardContainer.classList.add("board-container");

  boardContainer.classList.add(
    container === p1gameBoard ? "player1" : "player2"
  );
  for (let row = 0; row < gridSize; row++) {
    const rowElement = document.createElement("div");
    rowElement.classList.add("board-row");

    for (let col = 0; col < gridSize; col++) {
      const cellElement = document.createElement("div");
      cellElement.classList.add("board-cell");
      cellElement.dataset.row = row;
      cellElement.dataset.col = col;

      //set styling based on cell content i.e. water, hit, ship, miss
      if (board[row][col] === "water") {
        cellElement.classList.add("water");
      } else if (typeof board[row][col] === "object") {
        cellElement.classList.add("ship");
      } else if (board[row][col] === "HIT") {
        // Check for "HIT" status
        cellElement.classList.add("hit"); // Add "hit" class
      } else if (board[row][col] === "MISS") {
        cellElement.classList.add("miss");
      } else if (board[row][col] === "SUNK") {
        cellElement.classList.add("sunk");
      }
      rowElement.appendChild(cellElement);
    }
    boardContainer.appendChild(rowElement);
  }
  container.appendChild(boardContainer);
};

module.exports = { renderGameBoard };
