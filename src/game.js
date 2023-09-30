/** @format */

import {
  player1,
  player2,
  player1Board,
  player2Board,
  p1BoardInstance,
  p1gameBoard,
  p2gameBoard,
  messageBox,
} from "./main";
import { renderGameBoard } from "./render";

let currentPlayer = "Human";
const theHit = new Audio();
theHit.src = "./shotSound.mp3";

const theMiss = new Audio();
theMiss.src = "./splash.mp3";

const theSunk = new Audio();
theSunk.src = "./sunk.mp3";

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

  const resetBoard = () => {
    //Not being used currently
    this.board = [];
    this.board = this.createBoard();
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
    //called after each turn
    const allShipsSunk = ships.every((ship) => ship.sinkStatus);

    if (allShipsSunk) {
      return true;

      //end game loop and update UI
    }
    return false;
  };

  return { createBoard, resetBoard, placeShip, receiveAttack, checkForWin };
};

const player = (name, board, type, ships) => {
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
      const enemyBoard = p1BoardInstance;
      const attackResult = enemyBoard.receiveAttack(
        x,
        y,
        enemy.board,
        enemy.ships
      );

      //To Update messages to display which ship is sunk
      if (attackResult == "HIT") {
        theHit.currentTime = 1; //rewind
        theHit
          .play()
          .then(() => {
            console.log("Audio played");
          })
          .catch((error) => {
            console.log(error);
          });
        messageBox.textContent = `You've got a ${attackResult}!`;
      }
      if (attackResult == "MISS") {
        theMiss.currentTime = 1;
        theMiss
          .play()
          .then(() => {
            console.log("Audio played");
          })
          .catch((error) => {
            console.log(error);
          });
        messageBox.textContent = `You Missed`;
      }
      if (attackResult == "SUNK") {
        messageBox.textContent = `BOOM! You sunk computers ship`;
        theSunk.currentTime = 1;
        theSunk
          .play()
          .then(() => {
            console.log("Audio played");
          })
          .catch((error) => {
            console.log(error);
          });
      }

      renderGameBoard(player2Board, p2gameBoard);
      const allP2shipsSunk = enemy.ships.every((ship) => ship.sinkStatus);

      //computers turn if not all sunk
      if (!allP2shipsSunk) {
        currentPlayer = "Computer";
        function makeAiMove() {
          const aiChoice = getAiChoice();
          const aiAttackResult = p1BoardInstance.receiveAttack(
            aiChoice.x,
            aiChoice.y,
            player1.board,
            player1.ships
          );

          //To Update messages to display which ship is sunk
          if (aiAttackResult == "HIT") {
            theHit.currentTime = 1; //rewind
            theHit
              .play()
              .then(() => {
                console.log("Audio played");
              })
              .catch((error) => {
                console.log(error);
              });
            messageBox.textContent = `They've got a ${aiAttackResult}!`;
          }
          if (aiAttackResult == "MISS") {
            theMiss.currentTime = 1;
            theMiss
              .play()
              .then(() => {
                console.log("Audio played");
              })
              .catch((error) => {
                console.log(error);
              });
            messageBox.textContent = `They Missed!`;
          }
          if (aiAttackResult == "SUNK") {
            theSunk.currentTime = 1;
            theSunk
              .play()
              .then(() => {
                console.log("Audio played");
              })
              .catch((error) => {
                console.log(error);
              });
            messageBox.textContent = `BOOM! Computer sunk your ship!`;
          }

          renderGameBoard(player1Board, p1gameBoard);
          currentPlayer = "Human";
        }
        setTimeout(makeAiMove, 700); //0.8s delay between turns
      }
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
