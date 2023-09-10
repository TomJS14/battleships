/** @format */

import {
  player1,
  player2,
  player1Board,
  player2Board,
  p1BoardInstance,
  p2BoardInstance,
} from "./main";
import { renderGameBoard } from "./render";

const p1gameBoard = document.querySelector(".player1-board");
const p2gameBoard = document.querySelector(".player2-board");
let currentPlayer = "Human";

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

const gameBoard = (gridSize) => {
  const createBoard = () => {
    const board = new Array(gridSize)
      .fill(null)
      .map(() => new Array(gridSize).fill("water"));
    return board;
  };

  const placeShip = (board, ship, startingRow, startingCol) => {
    const isVertical = ship.isVertical;
    const shipLength = ship.length;
    ship.startingRow = startingRow;
    ship.startingCol = startingCol;
    //Check if ship placement is in bounds
    if (
      (isVertical && startingRow + shipLength > gridSize) ||
      (!isVertical && startingCol + shipLength > gridSize)
    ) {
      return null; // Invalid placement
    }

    //Check if cells are already occupied
    for (let i = 0; i < shipLength; i++) {
      if (isVertical) {
        if (board[startingRow + i][startingCol] !== "water") {
          return null;
        }
      } else {
        if (board[startingRow][startingCol + i] !== "water") {
          return null;
        }
      }
    }

    //otherwise valid, so place ship
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
      const messageBox = document.querySelector(".message");
      messageBox.textContent = "YOU WIN";
      console.log("YOU WIN"); //end game loop and update UI
      return true;
    }
  };

  return { createBoard, placeShip, receiveAttack, checkForWin };
};

const player = (name, board, type, ships, gameBoardInstance) => {
  const getName = () => name; //change to input after UI created

  const getType = () => type; //Human or AI

  const getAiChoice = () => {
    //THIS IS VERY SLOW - UPDATE! initialise outside of factory?
    const availableSpots = [];

    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        if (
          board[x][y] !== "MISS" &&
          board[x][y] !== "HIT" &&
          board[x][y] !== "SUNK"
        ) {
          availableSpots.push({ x, y });
        }
      }
    }
    const randomIndex = Math.floor(Math.random() * availableSpots.length);
    const aiChoice = availableSpots[randomIndex];
    return aiChoice;
  };

  const attack = (enemy, x, y) => {
    if (currentPlayer === "Human") {
      console.log(`${currentPlayer} is taking aim!`);
      const enemyBoard = p1BoardInstance;
      const attackResult = enemyBoard.receiveAttack(
        x,
        y,
        enemy.board,
        enemy.ships
      );
      console.log(
        `${currentPlayer} has attacked ${player2.getName()} and it is a ${attackResult}`
      );
      renderGameBoard(player2Board, p2gameBoard);

      //computers turn
      currentPlayer = "Computer";
      console.log(`${currentPlayer} is taking aim!`);
      function makeAiMove() {
        const aiChoice = getAiChoice();
        const aiAttackResult = p1BoardInstance.receiveAttack(
          aiChoice.x,
          aiChoice.y,
          player1.board,
          player1.ships
        );
        console.log(
          `${currentPlayer} has attacked ${player1.getName()} and it is a ${aiAttackResult}`
        );
        renderGameBoard(player1Board, p1gameBoard);
        currentPlayer = "Human";
      }
      setTimeout(makeAiMove, 400); //0.4s delay between turns
    }

    //updateTurnMessage();
    return renderGameBoard;
  };

  return {
    name,
    board,
    type,
    getName,
    getType,
    attack,
    getAiChoice,
    ships,
  };
};

export { ship, gameBoard, player };
