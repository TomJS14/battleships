/** @format */
require("./styles.css");

const { player1Board, p1gameBoard } = require("./main.js");
const { renderGameBoard } = require("./render.js");

//Ship factory function
const ship = (type, length, hitCount, sinkStatus, isVertical) => {
  const hit = (ship) => {
    ship.hitCount++;
    return ship.hitCount;
  };
  const isSunk = (ship) => {
    if (ship.hitCount === ship.length) {
      ship.sinkStatus = true;
    }
    return ship.sinkStatus;
  };
  return { type, length, hitCount, sinkStatus, hit, isSunk, isVertical };
};

//gameboard factory

const gameBoard = (gridSize) => {
  const createBoard = () => {
    const board = new Array(gridSize)
      .fill(null)
      .map(() => new Array(gridSize).fill("water"));
    return board;
  };

  const placeShip = (board, ship, startingRow, startingCol, isVertical) => {
    const shipLength = ship.length;
    ship.startingRow = startingRow;
    ship.startingCol = startingCol;

    for (let i = 0; i < shipLength; i++) {
      if (isVertical) {
        board[startingRow + i][startingCol] = ship;
      } else {
        board[startingRow][startingCol + i] = ship;
      }
    }
    return board;
  };

  const receiveAttack = (row, col, board, ships) => {
    if (board[row][col] === "water") {
      board[row][col] = "MISS";
      return "MISS";
    } else if (typeof board[row][col].hit === "function") {
      const ship = board[row][col];
      ship.hit(ship);

      if (ship.isSunk(ship)) {
        for (let i = 0; i < ship.length; i++) {
          if (ship.isVertical) {
            board[ship.startingRow + i][ship.startingCol] = "SUNK";
          } else {
            board[ship.startingRow][ship.startingCol + i] = "SUNK";
          }
        }
        checkForWin(ships);
        return "SUNK";
      }
      board[row][col] = "HIT";
      checkForWin(ships);

      return "HIT";
    }
  };

  const checkForWin = (ships) => {
    //logic to report whether all ships have been sunk, call after each turn
    const allShipsSunk = ships.every((ship) => ship.sinkStatus);

    if (allShipsSunk) {
      console.log("YOU WIN"); //end game loop and update UI
    }
  };

  return { createBoard, placeShip, receiveAttack, checkForWin };
};

//Player factory

const player = (name, board, type, ships, gameBoardInstance) => {
  const getName = () => name; //change to input after UI created

  const getType = () => type; //Human or AI

  const getAiChoice = () => {
    //THIS IS VERY SLOW - UPDATE! initialise outside of factory?
    const availableSpots = [];
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        if (board[x][y] === "water") {
          availableSpots.push({ x, y });
        }
      }
    }
    const randomIndex = Math.floor(Math.random() * availableSpots.length);
    const aiChoice = availableSpots[randomIndex];

    return aiChoice;
  };

  const attack = (enemy, x, y) => {
    const enemyBoard = gameBoardInstance;

    if (enemy.getType() === "Human") {
      const aiChoice = getAiChoice();
      const attackResult = enemyBoard.receiveAttack(
        aiChoice.x,
        aiChoice.y,
        enemy.board,
        enemy.ships
      );
      console.log(attackResult);
      console.log(
        `${name} has attacked ${enemy.getName()} at ${aiChoice.x} x & ${
          aiChoice.y
        } Y and it is a ${attackResult}`
      );
      renderGameBoard(player1Board, p1gameBoard);
    } else {
      const attackResult = enemyBoard.receiveAttack(
        x,
        y,
        enemy.board,
        enemy.ships
      );
      console.log(
        `${name} has attacked ${enemy.getName()} at ${x} X & ${y} Y and it is a ${attackResult}`
      );
      renderGameBoard(player2Board, p2gameBoard);
    }
    return attackResult;
  };

  return { name, board, type, getName, getType, attack, getAiChoice, ships };
};

//Render function

//export for tests

module.exports = {
  ship,
  gameBoard,
  player,
  renderGameBoard,
};
