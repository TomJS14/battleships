/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gameBoard: () => (/* binding */ gameBoard),
/* harmony export */   player: () => (/* binding */ player),
/* harmony export */   ship: () => (/* binding */ ship)
/* harmony export */ });
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main */ "./src/main.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/** @format */



let currentPlayer = "Human";
const theHit = new Audio();
theHit.src = "./shotSound.mp3";
const theMiss = new Audio();
theMiss.src = "./splash.mp3";
const theSunk = new Audio();
theSunk.src = "./sunk.mp3";
const ship = (type, length, hitCount, sinkStatus, isVertical) => {
  const hit = ship => {
    ship.hitCount++;
    return ship.hitCount;
  };
  const isSunk = ship => {
    if (ship.hitCount === ship.length) {
      ship.sinkStatus = true;
    }
    return ship.sinkStatus;
  };
  return {
    type,
    length,
    hitCount,
    sinkStatus,
    hit,
    isSunk,
    isVertical
  };
};
const gameBoard = gridSize => {
  const createBoard = () => {
    const board = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill("water"));
    return board;
  };
  const resetBoard = () => {
    //Not being used currently
    undefined.board = [];
    undefined.board = undefined.createBoard();
  };
  const placeShip = (board, ship, startingRow, startingCol) => {
    const isVertical = ship.isVertical;
    const shipLength = ship.length;
    ship.startingRow = startingRow;
    ship.startingCol = startingCol;
    //Check if ship placement is in bounds
    if (isVertical && startingRow + shipLength > gridSize || !isVertical && startingCol + shipLength > gridSize) {
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
  const checkForWin = ships => {
    //called after each turn
    const allShipsSunk = ships.every(ship => ship.sinkStatus);
    if (allShipsSunk) {
      return true;

      //end game loop and update UI
    }

    return false;
  };
  return {
    createBoard,
    resetBoard,
    placeShip,
    receiveAttack,
    checkForWin
  };
};
const player = (name, board, type, ships) => {
  const getName = () => name; //change to input after UI created

  const getType = () => type; //Human or AI

  const getAiChoice = () => {
    //THIS IS VERY SLOW - UPDATE! initialise outside of factory?
    const availableSpots = [];
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        if (board[x][y] !== "MISS" && board[x][y] !== "HIT" && board[x][y] !== "SUNK") {
          availableSpots.push({
            x,
            y
          });
        }
      }
    }
    const randomIndex = Math.floor(Math.random() * availableSpots.length);
    const aiChoice = availableSpots[randomIndex];
    return aiChoice;
  };
  const attack = (enemy, x, y) => {
    if (currentPlayer === "Human") {
      const enemyBoard = _main__WEBPACK_IMPORTED_MODULE_0__.p1BoardInstance;
      const attackResult = enemyBoard.receiveAttack(x, y, enemy.board, enemy.ships);

      //To Update messages to display which ship is sunk
      if (attackResult == "HIT") {
        theHit.currentTime = 1; //rewind
        theHit.play().then(() => {
          console.log("Audio played");
        }).catch(error => {
          console.log(error);
        });
        _main__WEBPACK_IMPORTED_MODULE_0__.messageBox.textContent = `You've got a ${attackResult}!`;
      }
      if (attackResult == "MISS") {
        theMiss.currentTime = 1;
        theMiss.play().then(() => {
          console.log("Audio played");
        }).catch(error => {
          console.log(error);
        });
        _main__WEBPACK_IMPORTED_MODULE_0__.messageBox.textContent = `You Missed`;
      }
      if (attackResult == "SUNK") {
        _main__WEBPACK_IMPORTED_MODULE_0__.messageBox.textContent = `BOOM! You sunk computers ship`;
        theSunk.currentTime = 1;
        theSunk.play().then(() => {
          console.log("Audio played");
        }).catch(error => {
          console.log(error);
        });
      }
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(_main__WEBPACK_IMPORTED_MODULE_0__.player2Board, _main__WEBPACK_IMPORTED_MODULE_0__.p2gameBoard);
      const allP2shipsSunk = enemy.ships.every(ship => ship.sinkStatus);

      //computers turn if not all sunk
      if (!allP2shipsSunk) {
        currentPlayer = "Computer";
        function makeAiMove() {
          const aiChoice = getAiChoice();
          const aiAttackResult = _main__WEBPACK_IMPORTED_MODULE_0__.p1BoardInstance.receiveAttack(aiChoice.x, aiChoice.y, _main__WEBPACK_IMPORTED_MODULE_0__.player1.board, _main__WEBPACK_IMPORTED_MODULE_0__.player1.ships);

          //To Update messages to display which ship is sunk
          if (aiAttackResult == "HIT") {
            theHit.currentTime = 1; //rewind
            theHit.play().then(() => {
              console.log("Audio played");
            }).catch(error => {
              console.log(error);
            });
            _main__WEBPACK_IMPORTED_MODULE_0__.messageBox.textContent = `They've got a ${aiAttackResult}!`;
          }
          if (aiAttackResult == "MISS") {
            theMiss.currentTime = 1;
            theMiss.play().then(() => {
              console.log("Audio played");
            }).catch(error => {
              console.log(error);
            });
            _main__WEBPACK_IMPORTED_MODULE_0__.messageBox.textContent = `They Missed!`;
          }
          if (aiAttackResult == "SUNK") {
            theSunk.currentTime = 1;
            theSunk.play().then(() => {
              console.log("Audio played");
            }).catch(error => {
              console.log(error);
            });
            _main__WEBPACK_IMPORTED_MODULE_0__.messageBox.textContent = `BOOM! Computer sunk your ship!`;
          }
          (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(_main__WEBPACK_IMPORTED_MODULE_0__.player1Board, _main__WEBPACK_IMPORTED_MODULE_0__.p1gameBoard);
          currentPlayer = "Human";
        }
        setTimeout(makeAiMove, 700); //0.8s delay between turns
      }
    }

    //updateTurnMessage();
    return _render__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard;
  };
  return {
    name,
    board,
    type,
    getName,
    getType,
    attack,
    getAiChoice,
    ships
  };
};


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   messageBox: () => (/* binding */ messageBox),
/* harmony export */   p1BoardInstance: () => (/* binding */ p1BoardInstance),
/* harmony export */   p1gameBoard: () => (/* binding */ p1gameBoard),
/* harmony export */   p2BoardInstance: () => (/* binding */ p2BoardInstance),
/* harmony export */   p2gameBoard: () => (/* binding */ p2gameBoard),
/* harmony export */   player1: () => (/* binding */ player1),
/* harmony export */   player1Board: () => (/* binding */ player1Board),
/* harmony export */   player2: () => (/* binding */ player2),
/* harmony export */   player2Board: () => (/* binding */ player2Board),
/* harmony export */   playerName: () => (/* binding */ playerName)
/* harmony export */ });
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/game.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ "./src/render.js");
/* harmony import */ var _wallpaper_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wallpaper.jpg */ "./src/wallpaper.jpg");
/* harmony import */ var _shotSound_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shotSound.mp3 */ "./src/shotSound.mp3");
/* harmony import */ var _splash_mp3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./splash.mp3 */ "./src/splash.mp3");
/* harmony import */ var _sunk_mp3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sunk.mp3 */ "./src/sunk.mp3");
/* harmony import */ var _dramaticStart_mp3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dramaticStart.mp3 */ "./src/dramaticStart.mp3");
/* harmony import */ var _winFanfare_mp3__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./winFanfare.mp3 */ "./src/winFanfare.mp3");
/** @format */
__webpack_require__(/*! ./styles.css */ "./src/styles.css");








const main = document.querySelector(".main");
let playerName;
const theShot = new Audio();
theShot.src = "./shotSound.mp3";
const startSound = new Audio();
startSound.src = "./dramaticStart.mp3";
const theWin = new Audio();
theWin.src = "./winFanfare.mp3";
const theDefeat = new Audio();
theDefeat.src = "./defeated.mp3";

//Splash Screen
function splashScreen() {
  main.classList.add("load");

  //container
  const splashScreenContainer = document.createElement("div");
  splashScreenContainer.classList.add("container");

  //Title
  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = "BATTLESHIPS";

  //Name Input
  const namePrompt = document.createElement("input");
  namePrompt.classList.add("nameInput");
  namePrompt.placeholder = "Enter Your Name";
  namePrompt.addEventListener("input", updateName);

  //GameButton
  const mainButton = document.createElement("button");
  mainButton.classList.add("start");
  mainButton.textContent = "START GAME";
  mainButton.addEventListener("click", loadGame);

  //Append Elements
  splashScreenContainer.appendChild(title);
  splashScreenContainer.appendChild(namePrompt);
  splashScreenContainer.appendChild(mainButton);
  main.appendChild(splashScreenContainer);

  //soundElements
}

splashScreen();
function updateName(e) {
  playerName = e.target.value;
  console.log(playerName);
}
function loadGame() {
  main.textContent = "";
  //Play sound - testing
  startSound.currentTime = 1; //rewind
  startSound.play().then(() => {
    console.log("Audio played");
  }).catch(error => {
    console.log(error);
  });
  setUpDom();
  initialise();
}
const backgroundImg = document.querySelector(".background-img");
backgroundImg.style.backgroundImage = `url(${_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_2__})`;

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
let p1BoardInstance = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard)(gridSize);
let player1Board = p1BoardInstance.createBoard();
let p2BoardInstance = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard)(gridSize);
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
    messageBox
  };
}
function initialise() {
  p1carrier = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("carrier", 5, 0, false, true);
  p1battleship = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("battleship", 4, 0, false, false);
  p1destroyer = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("destroyer", 3, 0, false, false);
  p1submarine = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("submarine", 3, 0, false, false);
  p1patrolBoat = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("patrolBoat", 2, 0, false, false);
  p1AllShips = [p1carrier, p1battleship, p1destroyer, p1submarine, p1patrolBoat];
  p2carrier = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("carrier", 5, 0, false, false);
  p2battleship = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("battleship", 4, 0, false, false);
  p2destroyer = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("destroyer", 3, 0, false, false);
  p2submarine = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("submarine", 3, 0, false, false);
  p2patrolBoat = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("patrolBoat", 2, 0, false, false);
  p2AllShips = [p2carrier, p2destroyer, p2battleship, p2submarine, p2patrolBoat];

  //Make Players
  player1 = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.player)("Player 1", player1Board, "Human", p1AllShips, p1BoardInstance);
  player2 = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.player)("Computer", player2Board, "AI", p2AllShips, p2BoardInstance);
  (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(player1Board, p1gameBoard);
  (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(player2Board, p2gameBoard);

  //event listeners
  setupEventListeners(p1gameBoard, p2gameBoard);
  return {
    player1,
    player1Board,
    p1AllShips,
    player2,
    player2Board,
    p2AllShips
  };
}
function setupEventListeners(p1gameBoard, p2gameBoard) {
  shipyardShips.forEach(draggable => {
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
  if (droppedArray.length >= p1AllShips.length && gameActive == false && restartable == false) {
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
  p1BoardInstance = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard)(gridSize);
  player1Board = p1BoardInstance.createBoard();
  p2BoardInstance = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard)(gridSize);
  player2Board = p2BoardInstance.createBoard();
  initialise();

  //clear the dom
  main.textContent = "";

  //Set up event listeners & render
  const {
    p1gameBoard,
    p2gameBoard
  } = setUpDom();
  (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(player1Board, p1gameBoard);
  (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(player2Board, p2gameBoard);
  setupEventListeners(p1gameBoard, p2gameBoard);
}
function placeP2Ships() {
  p2BoardInstance.placeShip(player2Board, p2carrier, 9, 1);
  p2BoardInstance.placeShip(player2Board, p2destroyer, 3, 3);
  p2BoardInstance.placeShip(player2Board, p2battleship, 5, 2);
  p2BoardInstance.placeShip(player2Board, p2submarine, 2, 1);
  p2BoardInstance.placeShip(player2Board, p2patrolBoat, 6, 0);
  (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(player2Board, p2gameBoard);
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
  const placementResult = p1BoardInstance.placeShip(player1Board, thisShip, startRow, startCol);
  if (placementResult) {
    droppedArray.push(thisShip);
    p1BoardInstance.placeShip(player1Board, thisShip, startRow, startCol);
    draggedShip.remove();
    messageBox.textContent = `You've placed your ${shipName}`;
  } else {
    notDropped = true;
    messageBox.textContent = "Can't go there, try again!";
  }
  (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(player1Board, p1gameBoard);
  draggedShip.classList.remove("dragging");
}
function selectTarget(e) {
  if (gameActive) {
    let cell = e.target;
    if (cell && !cell.classList.contains("disabled")) {
      const col = parseInt(cell.dataset.col, 10);
      const row = parseInt(cell.dataset.row, 10);
      player1.attack(player2, row, col);
      setTimeout(handleResultValidation, 800); //Set this longer than the move delay//
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
      theWin.play().then(() => {
        console.log("Audio played");
      }).catch(error => {
        console.log(error);
      });
      messageBox.textContent = "Game over, you win!";
    }
    if (isGameLost) {
      theDefeat.play().then(() => {
        console.log("Audio played");
      }).catch(error => {
        console.log(error);
      });
      messageBox.textContent = "Game over, you Lose!";
    }
  }
}


/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderGameBoard: () => (/* binding */ renderGameBoard)
/* harmony export */ });
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ "./src/main.js");
/** @format */


const renderGameBoard = (board, container) => {
  const gridSize = 10;
  container.textContent = "";
  const boardContainer = document.createElement("div");
  boardContainer.classList.add("board-container");
  boardContainer.classList.add(container === _main_js__WEBPACK_IMPORTED_MODULE_0__.p1gameBoard ? "player1" : "player2");
  const player1label = document.createElement("p");
  player1label.textContent = _main_js__WEBPACK_IMPORTED_MODULE_0__.playerName ? _main_js__WEBPACK_IMPORTED_MODULE_0__.playerName : "You";
  const player2label = document.createElement("p");
  player2label.textContent = "Computer";
  if (container === _main_js__WEBPACK_IMPORTED_MODULE_0__.p1gameBoard) {
    container.appendChild(player1label);
  } else {
    container.appendChild(player2label);
  }
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
        if (container == _main_js__WEBPACK_IMPORTED_MODULE_0__.p1gameBoard) {
          cellElement.classList.add("ship");
        } else {
          cellElement.classList.add("enemy-ship");
        }
        cellElement.dataset.shipType = `${board[row][col].type}`;
        cellElement.dataset.orientation = board[row][col].isVertical ? "vertical" : "horizontal";
      } else if (board[row][col] === "HIT") {
        cellElement.classList.add("hit");
        cellElement.classList.add("disabled");
        cellElement.classList.add("hitShip");
      } else if (board[row][col] === "MISS") {
        cellElement.classList.add("miss");
        cellElement.classList.add("disabled");
      } else if (board[row][col] === "SUNK") {
        cellElement.classList.add("sunk");
        cellElement.classList.add("disabled");
        cellElement.classList.add("hitShip");
      }
      rowElement.appendChild(cellElement);
    }
    boardContainer.appendChild(rowElement);
  }
  container.appendChild(boardContainer);
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! crosshair.png */ "./src/crosshair.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/** @format */

:root {
  font-family: "Ysabeau SC", sans-serif;
  font-size: 24px;
  color: white;
  --dark-cyan: #0e9594;
  --wheat: #f5dfbb;
  --mountbatten-pink: #95818d;
}

html {
  overscroll-behavior: none;
  height: 100%;
}

body {
  overflow: auto;
  height: 100%;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.background-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.7;
  z-index: -1;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  color: black;
  font-family: "Notable", sans-serif;
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 20px;
}

input {
  font-size: 1rem;
  text-align: center;
  margin: 0;
  outline: none;
  border: none;
  margin-bottom: 20px;
}

.draggable {
  text-align: center;
}

.info {
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
}

.game-container {
  display: flex;
  margin: 5px;
  justify-content: center;
  gap: 50px;
}

.player1-board,
.player2-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
}

.board-container {
  display: flex;
  flex-direction: column;
}

.shipyardContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  font-weight: 700;
}

.shipyard {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: rgba(56, 118, 217, 0.4);
  padding: 10px;
  width: 20vw;
  min-height: 5vw;
  border: 1px dashed black;
  border-radius: 8px;
}

.start {
  margin-top: 50px;
  background: #5e5df0;
  border-radius: 99px;
  box-shadow: #5e5df0 0 10px 20px -10px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  font-family: Inter, Helvetica, "Apple Color Emoji", "Segoe UI Emoji",
    NotoColorEmoji, "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji",
    EmojiSymbols, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue",
    "Noto Sans", sans-serif;
  font-weight: 700;
  line-height: 24px;
  padding: 8px 18px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: fit-content;
  word-break: break-word;
  border: 0;
}

.start:disabled {
  opacity: 0;
  cursor: auto;
}

.message {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  border: 1px solid black;
  border-radius: 5px;
  width: 20rem;
  height: 4rem;
}

.board-row {
  display: flex;
}

.board-cell {
  opacity: 0.9;
  flex: 1;
  width: 1rem;
  height: 1rem;
  border: 0.1px dotted rgba(255, 255, 255, 0.6);
  border-radius: 3px;
  background-color: #1b95e0;
  cursor: url(${___CSS_LOADER_URL_REPLACEMENT_0___}) 12 12, crosshair;
}

.ship {
  position: relative;
  background-color: grey;
  height: 1rem;
}

.hitShip {
  background-color: grey;
}

.ship::before {
  content: "";
  position: absolute;
  border: 0.3vmin solid rgba(255, 255, 255, 0.6);
  top: -1px;
  bottom: -1px;
  left: -1px;
  right: -1px;
}

[data-orientation="vertical"]::before {
  animation: ripplesY 3s linear infinite;
  border-top: none;
  border-bottom: none;
}

[data-orientation="horizontal"]::before {
  animation: ripplesX 3s linear infinite;
  border-left: none;
  border-right: none;
}

@keyframes ripplesX {
  0% {
    opacity: 1;
    transform: scaleX(1);
  }

  100% {
    opacity: 0;
    transform: scaleX(1.6);
  }
}

@keyframes ripplesY {
  0% {
    opacity: 1;
    transform: scaleY(1);
  }

  100% {
    opacity: 0;
    transform: scaleY(1.6);
  }
}

.enemy-ship {
  background-color: #1b95e0;
  height: 1rem;
}

.draggable {
  cursor: move;
}

.dragging {
  opacity: 0.5;
}

.highlighted {
  opacity: 0.5;
}

.carrier {
  width: 12rem;
}

.destroyer {
  width: 12rem;
}

.battleship {
  width: 9rem;
}

.destroyer {
  width: 7rem;
}

.submarine {
  width: 7rem;
}

.patrolBoat {
  width: 4.5rem;
}

.hit,
.miss,
.sunk {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hit::after,
.miss::after {
  content: "";
  position: absolute;
  border-radius: 100%;
  width: 2vmin;
  height: 2vmin;
}

.sunk {
  background-color: grey;
}

.miss::after {
  background-color: white;
}

.hit::after {
  background-color: red;
}

.miss::before {
  content: "";
  position: absolute;
  animation: miss 0.2s ease-out forwards;
  border: 0.1vmin solid white;
  border-radius: 100%;
  width: 2vmin;
  height: 2vmin;
}

/* @keyframes miss {
  0% {
    opacity: 1;
    transform: scale(0);
  }

  100% {
    opacity: 0;
    transform: scale(4);
  }
} */

.sunk::before {
  content: "X";
  color: rgb(211, 9, 50);
  border-radius: 10px;
  position: relative;
}

.player1 {
  margin-bottom: 50px;
}
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"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","sourcesContent":["/** @format */\n\n:root {\n  font-family: \"Ysabeau SC\", sans-serif;\n  font-size: 24px;\n  color: white;\n  --dark-cyan: #0e9594;\n  --wheat: #f5dfbb;\n  --mountbatten-pink: #95818d;\n}\n\nhtml {\n  overscroll-behavior: none;\n  height: 100%;\n}\n\nbody {\n  overflow: auto;\n  height: 100%;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n\n.background-img {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n  opacity: 0.7;\n  z-index: -1;\n}\n\n.container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.title {\n  color: black;\n  font-family: \"Notable\", sans-serif;\n  font-size: 2rem;\n  font-weight: 300;\n  margin-bottom: 20px;\n}\n\ninput {\n  font-size: 1rem;\n  text-align: center;\n  margin: 0;\n  outline: none;\n  border: none;\n  margin-bottom: 20px;\n}\n\n.draggable {\n  text-align: center;\n}\n\n.info {\n  display: flex;\n  gap: 10px;\n  flex-direction: column;\n  align-items: center;\n}\n\n.game-container {\n  display: flex;\n  margin: 5px;\n  justify-content: center;\n  gap: 50px;\n}\n\n.player1-board,\n.player2-board {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  color: black;\n}\n\n.board-container {\n  display: flex;\n  flex-direction: column;\n}\n\n.shipyardContainer {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  color: black;\n  font-weight: 700;\n}\n\n.shipyard {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  background-color: rgba(56, 118, 217, 0.4);\n  padding: 10px;\n  width: 20vw;\n  min-height: 5vw;\n  border: 1px dashed black;\n  border-radius: 8px;\n}\n\n.start {\n  margin-top: 50px;\n  background: #5e5df0;\n  border-radius: 99px;\n  box-shadow: #5e5df0 0 10px 20px -10px;\n  box-sizing: border-box;\n  color: #ffffff;\n  cursor: pointer;\n  font-family: Inter, Helvetica, \"Apple Color Emoji\", \"Segoe UI Emoji\",\n    NotoColorEmoji, \"Noto Color Emoji\", \"Segoe UI Symbol\", \"Android Emoji\",\n    EmojiSymbols, -apple-system, system-ui, \"Segoe UI\", Roboto, \"Helvetica Neue\",\n    \"Noto Sans\", sans-serif;\n  font-weight: 700;\n  line-height: 24px;\n  padding: 8px 18px;\n  user-select: none;\n  -webkit-user-select: none;\n  touch-action: manipulation;\n  width: fit-content;\n  word-break: break-word;\n  border: 0;\n}\n\n.start:disabled {\n  opacity: 0;\n  cursor: auto;\n}\n\n.message {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.2rem;\n  font-weight: 500;\n  text-align: center;\n  border: 1px solid black;\n  border-radius: 5px;\n  width: 20rem;\n  height: 4rem;\n}\n\n.board-row {\n  display: flex;\n}\n\n.board-cell {\n  opacity: 0.9;\n  flex: 1;\n  width: 1rem;\n  height: 1rem;\n  border: 0.1px dotted rgba(255, 255, 255, 0.6);\n  border-radius: 3px;\n  background-color: #1b95e0;\n  cursor: url(\"crosshair.png\") 12 12, crosshair;\n}\n\n.ship {\n  position: relative;\n  background-color: grey;\n  height: 1rem;\n}\n\n.hitShip {\n  background-color: grey;\n}\n\n.ship::before {\n  content: \"\";\n  position: absolute;\n  border: 0.3vmin solid rgba(255, 255, 255, 0.6);\n  top: -1px;\n  bottom: -1px;\n  left: -1px;\n  right: -1px;\n}\n\n[data-orientation=\"vertical\"]::before {\n  animation: ripplesY 3s linear infinite;\n  border-top: none;\n  border-bottom: none;\n}\n\n[data-orientation=\"horizontal\"]::before {\n  animation: ripplesX 3s linear infinite;\n  border-left: none;\n  border-right: none;\n}\n\n@keyframes ripplesX {\n  0% {\n    opacity: 1;\n    transform: scaleX(1);\n  }\n\n  100% {\n    opacity: 0;\n    transform: scaleX(1.6);\n  }\n}\n\n@keyframes ripplesY {\n  0% {\n    opacity: 1;\n    transform: scaleY(1);\n  }\n\n  100% {\n    opacity: 0;\n    transform: scaleY(1.6);\n  }\n}\n\n.enemy-ship {\n  background-color: #1b95e0;\n  height: 1rem;\n}\n\n.draggable {\n  cursor: move;\n}\n\n.dragging {\n  opacity: 0.5;\n}\n\n.highlighted {\n  opacity: 0.5;\n}\n\n.carrier {\n  width: 12rem;\n}\n\n.destroyer {\n  width: 12rem;\n}\n\n.battleship {\n  width: 9rem;\n}\n\n.destroyer {\n  width: 7rem;\n}\n\n.submarine {\n  width: 7rem;\n}\n\n.patrolBoat {\n  width: 4.5rem;\n}\n\n.hit,\n.miss,\n.sunk {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.hit::after,\n.miss::after {\n  content: \"\";\n  position: absolute;\n  border-radius: 100%;\n  width: 2vmin;\n  height: 2vmin;\n}\n\n.sunk {\n  background-color: grey;\n}\n\n.miss::after {\n  background-color: white;\n}\n\n.hit::after {\n  background-color: red;\n}\n\n.miss::before {\n  content: \"\";\n  position: absolute;\n  animation: miss 0.2s ease-out forwards;\n  border: 0.1vmin solid white;\n  border-radius: 100%;\n  width: 2vmin;\n  height: 2vmin;\n}\n\n/* @keyframes miss {\n  0% {\n    opacity: 1;\n    transform: scale(0);\n  }\n\n  100% {\n    opacity: 0;\n    transform: scale(4);\n  }\n} */\n\n.sunk::before {\n  content: \"X\";\n  color: rgb(211, 9, 50);\n  border-radius: 10px;\n  position: relative;\n}\n\n.player1 {\n  margin-bottom: 50px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/crosshair.png":
/*!***************************!*\
  !*** ./src/crosshair.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b4518c7f3b06bfcd3e84.png";

/***/ }),

/***/ "./src/dramaticStart.mp3":
/*!*******************************!*\
  !*** ./src/dramaticStart.mp3 ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6a17eed9a0e0c45ca5b5.mp3";

/***/ }),

/***/ "./src/shotSound.mp3":
/*!***************************!*\
  !*** ./src/shotSound.mp3 ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d9de6e79cbf14593db3d.mp3";

/***/ }),

/***/ "./src/splash.mp3":
/*!************************!*\
  !*** ./src/splash.mp3 ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "886909412362d030e7d8.mp3";

/***/ }),

/***/ "./src/sunk.mp3":
/*!**********************!*\
  !*** ./src/sunk.mp3 ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0c0732314d58f502a05d.mp3";

/***/ }),

/***/ "./src/wallpaper.jpg":
/*!***************************!*\
  !*** ./src/wallpaper.jpg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6a9a57321b205f19508c.jpg";

/***/ }),

/***/ "./src/winFanfare.mp3":
/*!****************************!*\
  !*** ./src/winFanfare.mp3 ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a37d3c4ed83ed5c168bd.mp3";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbUNBQW1DO0FBQ25EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyx1RkFBdUYsS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLE1BQU0sTUFBTSxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLFVBQVUsT0FBTyxPQUFPLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxNQUFNLE1BQU0sS0FBSyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE1BQU0sTUFBTSxLQUFLLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUss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YkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOzs7OztXQ3JCQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc3R5bGVzLmNzcz80NGIyIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBmb3JtYXQgKi9cblxuaW1wb3J0IHtcbiAgcGxheWVyMSxcbiAgcGxheWVyMixcbiAgcGxheWVyMUJvYXJkLFxuICBwbGF5ZXIyQm9hcmQsXG4gIHAxQm9hcmRJbnN0YW5jZSxcbiAgcDFnYW1lQm9hcmQsXG4gIHAyZ2FtZUJvYXJkLFxuICBtZXNzYWdlQm94LFxufSBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyByZW5kZXJHYW1lQm9hcmQgfSBmcm9tIFwiLi9yZW5kZXJcIjtcblxubGV0IGN1cnJlbnRQbGF5ZXIgPSBcIkh1bWFuXCI7XG5jb25zdCB0aGVIaXQgPSBuZXcgQXVkaW8oKTtcbnRoZUhpdC5zcmMgPSBcIi4vc2hvdFNvdW5kLm1wM1wiO1xuXG5jb25zdCB0aGVNaXNzID0gbmV3IEF1ZGlvKCk7XG50aGVNaXNzLnNyYyA9IFwiLi9zcGxhc2gubXAzXCI7XG5cbmNvbnN0IHRoZVN1bmsgPSBuZXcgQXVkaW8oKTtcbnRoZVN1bmsuc3JjID0gXCIuL3N1bmsubXAzXCI7XG5cbmNvbnN0IHNoaXAgPSAodHlwZSwgbGVuZ3RoLCBoaXRDb3VudCwgc2lua1N0YXR1cywgaXNWZXJ0aWNhbCkgPT4ge1xuICBjb25zdCBoaXQgPSAoc2hpcCkgPT4ge1xuICAgIHNoaXAuaGl0Q291bnQrKztcbiAgICByZXR1cm4gc2hpcC5oaXRDb3VudDtcbiAgfTtcbiAgY29uc3QgaXNTdW5rID0gKHNoaXApID0+IHtcbiAgICBpZiAoc2hpcC5oaXRDb3VudCA9PT0gc2hpcC5sZW5ndGgpIHtcbiAgICAgIHNoaXAuc2lua1N0YXR1cyA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzaGlwLnNpbmtTdGF0dXM7XG4gIH07XG5cbiAgcmV0dXJuIHsgdHlwZSwgbGVuZ3RoLCBoaXRDb3VudCwgc2lua1N0YXR1cywgaGl0LCBpc1N1bmssIGlzVmVydGljYWwgfTtcbn07XG5cbmNvbnN0IGdhbWVCb2FyZCA9IChncmlkU2l6ZSkgPT4ge1xuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBib2FyZCA9IG5ldyBBcnJheShncmlkU2l6ZSlcbiAgICAgIC5maWxsKG51bGwpXG4gICAgICAubWFwKCgpID0+IG5ldyBBcnJheShncmlkU2l6ZSkuZmlsbChcIndhdGVyXCIpKTtcbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgcmVzZXRCb2FyZCA9ICgpID0+IHtcbiAgICAvL05vdCBiZWluZyB1c2VkIGN1cnJlbnRseVxuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICB0aGlzLmJvYXJkID0gdGhpcy5jcmVhdGVCb2FyZCgpO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChib2FyZCwgc2hpcCwgc3RhcnRpbmdSb3csIHN0YXJ0aW5nQ29sKSA9PiB7XG4gICAgY29uc3QgaXNWZXJ0aWNhbCA9IHNoaXAuaXNWZXJ0aWNhbDtcbiAgICBjb25zdCBzaGlwTGVuZ3RoID0gc2hpcC5sZW5ndGg7XG4gICAgc2hpcC5zdGFydGluZ1JvdyA9IHN0YXJ0aW5nUm93O1xuICAgIHNoaXAuc3RhcnRpbmdDb2wgPSBzdGFydGluZ0NvbDtcbiAgICAvL0NoZWNrIGlmIHNoaXAgcGxhY2VtZW50IGlzIGluIGJvdW5kc1xuICAgIGlmIChcbiAgICAgIChpc1ZlcnRpY2FsICYmIHN0YXJ0aW5nUm93ICsgc2hpcExlbmd0aCA+IGdyaWRTaXplKSB8fFxuICAgICAgKCFpc1ZlcnRpY2FsICYmIHN0YXJ0aW5nQ29sICsgc2hpcExlbmd0aCA+IGdyaWRTaXplKVxuICAgICkge1xuICAgICAgcmV0dXJuIG51bGw7IC8vIEludmFsaWQgcGxhY2VtZW50XG4gICAgfVxuXG4gICAgLy9DaGVjayBpZiBjZWxscyBhcmUgYWxyZWFkeSBvY2N1cGllZFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgICBpZiAoYm9hcmRbc3RhcnRpbmdSb3cgKyBpXVtzdGFydGluZ0NvbF0gIT09IFwid2F0ZXJcIikge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYm9hcmRbc3RhcnRpbmdSb3ddW3N0YXJ0aW5nQ29sICsgaV0gIT09IFwid2F0ZXJcIikge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9vdGhlcndpc2UgdmFsaWQsIHNvIHBsYWNlIHNoaXBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgICAgYm9hcmRbc3RhcnRpbmdSb3cgKyBpXVtzdGFydGluZ0NvbF0gPSBzaGlwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmRbc3RhcnRpbmdSb3ddW3N0YXJ0aW5nQ29sICsgaV0gPSBzaGlwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBib2FyZDtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sLCBib2FyZCwgc2hpcHMpID0+IHtcbiAgICBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIndhdGVyXCIpIHtcbiAgICAgIGJvYXJkW3Jvd11bY29sXSA9IFwiTUlTU1wiO1xuICAgICAgcmV0dXJuIFwiTUlTU1wiO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvYXJkW3Jvd11bY29sXS5oaXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY29uc3Qgc2hpcCA9IGJvYXJkW3Jvd11bY29sXTtcbiAgICAgIHNoaXAuaGl0KHNoaXApO1xuXG4gICAgICBpZiAoc2hpcC5pc1N1bmsoc2hpcCkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHNoaXAuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgYm9hcmRbc2hpcC5zdGFydGluZ1JvdyArIGldW3NoaXAuc3RhcnRpbmdDb2xdID0gXCJTVU5LXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvYXJkW3NoaXAuc3RhcnRpbmdSb3ddW3NoaXAuc3RhcnRpbmdDb2wgKyBpXSA9IFwiU1VOS1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaGVja0ZvcldpbihzaGlwcyk7XG4gICAgICAgIHJldHVybiBcIlNVTktcIjtcbiAgICAgIH1cbiAgICAgIGJvYXJkW3Jvd11bY29sXSA9IFwiSElUXCI7XG4gICAgICBjaGVja0ZvcldpbihzaGlwcyk7XG5cbiAgICAgIHJldHVybiBcIkhJVFwiO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja0ZvcldpbiA9IChzaGlwcykgPT4ge1xuICAgIC8vY2FsbGVkIGFmdGVyIGVhY2ggdHVyblxuICAgIGNvbnN0IGFsbFNoaXBzU3VuayA9IHNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLnNpbmtTdGF0dXMpO1xuXG4gICAgaWYgKGFsbFNoaXBzU3Vuaykge1xuICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgIC8vZW5kIGdhbWUgbG9vcCBhbmQgdXBkYXRlIFVJXG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4geyBjcmVhdGVCb2FyZCwgcmVzZXRCb2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBjaGVja0ZvcldpbiB9O1xufTtcblxuY29uc3QgcGxheWVyID0gKG5hbWUsIGJvYXJkLCB0eXBlLCBzaGlwcykgPT4ge1xuICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTsgLy9jaGFuZ2UgdG8gaW5wdXQgYWZ0ZXIgVUkgY3JlYXRlZFxuXG4gIGNvbnN0IGdldFR5cGUgPSAoKSA9PiB0eXBlOyAvL0h1bWFuIG9yIEFJXG5cbiAgY29uc3QgZ2V0QWlDaG9pY2UgPSAoKSA9PiB7XG4gICAgLy9USElTIElTIFZFUlkgU0xPVyAtIFVQREFURSEgaW5pdGlhbGlzZSBvdXRzaWRlIG9mIGZhY3Rvcnk/XG4gICAgY29uc3QgYXZhaWxhYmxlU3BvdHMgPSBbXTtcblxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgYm9hcmQubGVuZ3RoOyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgYm9hcmRbeF0ubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGJvYXJkW3hdW3ldICE9PSBcIk1JU1NcIiAmJlxuICAgICAgICAgIGJvYXJkW3hdW3ldICE9PSBcIkhJVFwiICYmXG4gICAgICAgICAgYm9hcmRbeF1beV0gIT09IFwiU1VOS1wiXG4gICAgICAgICkge1xuICAgICAgICAgIGF2YWlsYWJsZVNwb3RzLnB1c2goeyB4LCB5IH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlU3BvdHMubGVuZ3RoKTtcbiAgICBjb25zdCBhaUNob2ljZSA9IGF2YWlsYWJsZVNwb3RzW3JhbmRvbUluZGV4XTtcbiAgICByZXR1cm4gYWlDaG9pY2U7XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrID0gKGVuZW15LCB4LCB5KSA9PiB7XG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT09IFwiSHVtYW5cIikge1xuICAgICAgY29uc3QgZW5lbXlCb2FyZCA9IHAxQm9hcmRJbnN0YW5jZTtcbiAgICAgIGNvbnN0IGF0dGFja1Jlc3VsdCA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgZW5lbXkuYm9hcmQsXG4gICAgICAgIGVuZW15LnNoaXBzXG4gICAgICApO1xuXG4gICAgICAvL1RvIFVwZGF0ZSBtZXNzYWdlcyB0byBkaXNwbGF5IHdoaWNoIHNoaXAgaXMgc3Vua1xuICAgICAgaWYgKGF0dGFja1Jlc3VsdCA9PSBcIkhJVFwiKSB7XG4gICAgICAgIHRoZUhpdC5jdXJyZW50VGltZSA9IDE7IC8vcmV3aW5kXG4gICAgICAgIHRoZUhpdFxuICAgICAgICAgIC5wbGF5KClcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkF1ZGlvIHBsYXllZFwiKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IGBZb3UndmUgZ290IGEgJHthdHRhY2tSZXN1bHR9IWA7XG4gICAgICB9XG4gICAgICBpZiAoYXR0YWNrUmVzdWx0ID09IFwiTUlTU1wiKSB7XG4gICAgICAgIHRoZU1pc3MuY3VycmVudFRpbWUgPSAxO1xuICAgICAgICB0aGVNaXNzXG4gICAgICAgICAgLnBsYXkoKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXVkaW8gcGxheWVkXCIpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gYFlvdSBNaXNzZWRgO1xuICAgICAgfVxuICAgICAgaWYgKGF0dGFja1Jlc3VsdCA9PSBcIlNVTktcIikge1xuICAgICAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gYEJPT00hIFlvdSBzdW5rIGNvbXB1dGVycyBzaGlwYDtcbiAgICAgICAgdGhlU3Vuay5jdXJyZW50VGltZSA9IDE7XG4gICAgICAgIHRoZVN1bmtcbiAgICAgICAgICAucGxheSgpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBdWRpbyBwbGF5ZWRcIik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIyQm9hcmQsIHAyZ2FtZUJvYXJkKTtcbiAgICAgIGNvbnN0IGFsbFAyc2hpcHNTdW5rID0gZW5lbXkuc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuc2lua1N0YXR1cyk7XG5cbiAgICAgIC8vY29tcHV0ZXJzIHR1cm4gaWYgbm90IGFsbCBzdW5rXG4gICAgICBpZiAoIWFsbFAyc2hpcHNTdW5rKSB7XG4gICAgICAgIGN1cnJlbnRQbGF5ZXIgPSBcIkNvbXB1dGVyXCI7XG4gICAgICAgIGZ1bmN0aW9uIG1ha2VBaU1vdmUoKSB7XG4gICAgICAgICAgY29uc3QgYWlDaG9pY2UgPSBnZXRBaUNob2ljZSgpO1xuICAgICAgICAgIGNvbnN0IGFpQXR0YWNrUmVzdWx0ID0gcDFCb2FyZEluc3RhbmNlLnJlY2VpdmVBdHRhY2soXG4gICAgICAgICAgICBhaUNob2ljZS54LFxuICAgICAgICAgICAgYWlDaG9pY2UueSxcbiAgICAgICAgICAgIHBsYXllcjEuYm9hcmQsXG4gICAgICAgICAgICBwbGF5ZXIxLnNoaXBzXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIC8vVG8gVXBkYXRlIG1lc3NhZ2VzIHRvIGRpc3BsYXkgd2hpY2ggc2hpcCBpcyBzdW5rXG4gICAgICAgICAgaWYgKGFpQXR0YWNrUmVzdWx0ID09IFwiSElUXCIpIHtcbiAgICAgICAgICAgIHRoZUhpdC5jdXJyZW50VGltZSA9IDE7IC8vcmV3aW5kXG4gICAgICAgICAgICB0aGVIaXRcbiAgICAgICAgICAgICAgLnBsYXkoKVxuICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBdWRpbyBwbGF5ZWRcIik7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IGBUaGV5J3ZlIGdvdCBhICR7YWlBdHRhY2tSZXN1bHR9IWA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhaUF0dGFja1Jlc3VsdCA9PSBcIk1JU1NcIikge1xuICAgICAgICAgICAgdGhlTWlzcy5jdXJyZW50VGltZSA9IDE7XG4gICAgICAgICAgICB0aGVNaXNzXG4gICAgICAgICAgICAgIC5wbGF5KClcbiAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXVkaW8gcGxheWVkXCIpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBgVGhleSBNaXNzZWQhYDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFpQXR0YWNrUmVzdWx0ID09IFwiU1VOS1wiKSB7XG4gICAgICAgICAgICB0aGVTdW5rLmN1cnJlbnRUaW1lID0gMTtcbiAgICAgICAgICAgIHRoZVN1bmtcbiAgICAgICAgICAgICAgLnBsYXkoKVxuICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBdWRpbyBwbGF5ZWRcIik7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IGBCT09NISBDb21wdXRlciBzdW5rIHlvdXIgc2hpcCFgO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIxQm9hcmQsIHAxZ2FtZUJvYXJkKTtcbiAgICAgICAgICBjdXJyZW50UGxheWVyID0gXCJIdW1hblwiO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQobWFrZUFpTW92ZSwgNzAwKTsgLy8wLjhzIGRlbGF5IGJldHdlZW4gdHVybnNcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL3VwZGF0ZVR1cm5NZXNzYWdlKCk7XG4gICAgcmV0dXJuIHJlbmRlckdhbWVCb2FyZDtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgYm9hcmQsXG4gICAgdHlwZSxcbiAgICBnZXROYW1lLFxuICAgIGdldFR5cGUsXG4gICAgYXR0YWNrLFxuICAgIGdldEFpQ2hvaWNlLFxuICAgIHNoaXBzLFxuICB9O1xufTtcblxuZXhwb3J0IHsgc2hpcCwgZ2FtZUJvYXJkLCBwbGF5ZXIgfTtcbiIsIi8qKiBAZm9ybWF0ICovXG5yZXF1aXJlKFwiLi9zdHlsZXMuY3NzXCIpO1xuXG5pbXBvcnQgeyBzaGlwLCBnYW1lQm9hcmQsIHBsYXllciB9IGZyb20gXCIuL2dhbWUuanNcIjtcbmltcG9ydCB7IHJlbmRlckdhbWVCb2FyZCB9IGZyb20gXCIuL3JlbmRlci5qc1wiO1xuaW1wb3J0IGJhY2tncm91bmRJbWFnZSBmcm9tIFwiLi93YWxscGFwZXIuanBnXCI7XG5pbXBvcnQgc2hvdFNvdW5kIGZyb20gXCIuL3Nob3RTb3VuZC5tcDNcIjtcbmltcG9ydCBzcGxhc2ggZnJvbSBcIi4vc3BsYXNoLm1wM1wiO1xuaW1wb3J0IHN1bmtTb3VuZCBmcm9tIFwiLi9zdW5rLm1wM1wiO1xuaW1wb3J0IHN0YXJ0TXVzaWMgZnJvbSBcIi4vZHJhbWF0aWNTdGFydC5tcDNcIjtcbmltcG9ydCB3aW5NdXNpYyBmcm9tIFwiLi93aW5GYW5mYXJlLm1wM1wiO1xuXG5jb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluXCIpO1xubGV0IHBsYXllck5hbWU7XG5cbmNvbnN0IHRoZVNob3QgPSBuZXcgQXVkaW8oKTtcbnRoZVNob3Quc3JjID0gXCIuL3Nob3RTb3VuZC5tcDNcIjtcblxuY29uc3Qgc3RhcnRTb3VuZCA9IG5ldyBBdWRpbygpO1xuc3RhcnRTb3VuZC5zcmMgPSBcIi4vZHJhbWF0aWNTdGFydC5tcDNcIjtcblxuY29uc3QgdGhlV2luID0gbmV3IEF1ZGlvKCk7XG50aGVXaW4uc3JjID0gXCIuL3dpbkZhbmZhcmUubXAzXCI7XG5cbmNvbnN0IHRoZURlZmVhdCA9IG5ldyBBdWRpbygpO1xudGhlRGVmZWF0LnNyYyA9IFwiLi9kZWZlYXRlZC5tcDNcIjtcblxuLy9TcGxhc2ggU2NyZWVuXG5mdW5jdGlvbiBzcGxhc2hTY3JlZW4oKSB7XG4gIG1haW4uY2xhc3NMaXN0LmFkZChcImxvYWRcIik7XG5cbiAgLy9jb250YWluZXJcbiAgY29uc3Qgc3BsYXNoU2NyZWVuQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc3BsYXNoU2NyZWVuQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb250YWluZXJcIik7XG5cbiAgLy9UaXRsZVxuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0aXRsZVwiKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkJBVFRMRVNISVBTXCI7XG5cbiAgLy9OYW1lIElucHV0XG4gIGNvbnN0IG5hbWVQcm9tcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIG5hbWVQcm9tcHQuY2xhc3NMaXN0LmFkZChcIm5hbWVJbnB1dFwiKTtcbiAgbmFtZVByb21wdC5wbGFjZWhvbGRlciA9IFwiRW50ZXIgWW91ciBOYW1lXCI7XG4gIG5hbWVQcm9tcHQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHVwZGF0ZU5hbWUpO1xuXG4gIC8vR2FtZUJ1dHRvblxuICBjb25zdCBtYWluQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgbWFpbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwic3RhcnRcIik7XG4gIG1haW5CdXR0b24udGV4dENvbnRlbnQgPSBcIlNUQVJUIEdBTUVcIjtcbiAgbWFpbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbG9hZEdhbWUpO1xuXG4gIC8vQXBwZW5kIEVsZW1lbnRzXG4gIHNwbGFzaFNjcmVlbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIHNwbGFzaFNjcmVlbkNvbnRhaW5lci5hcHBlbmRDaGlsZChuYW1lUHJvbXB0KTtcbiAgc3BsYXNoU2NyZWVuQ29udGFpbmVyLmFwcGVuZENoaWxkKG1haW5CdXR0b24pO1xuICBtYWluLmFwcGVuZENoaWxkKHNwbGFzaFNjcmVlbkNvbnRhaW5lcik7XG5cbiAgLy9zb3VuZEVsZW1lbnRzXG59XG5cbnNwbGFzaFNjcmVlbigpO1xuXG5mdW5jdGlvbiB1cGRhdGVOYW1lKGUpIHtcbiAgcGxheWVyTmFtZSA9IGUudGFyZ2V0LnZhbHVlO1xuICBjb25zb2xlLmxvZyhwbGF5ZXJOYW1lKTtcbn1cblxuZnVuY3Rpb24gbG9hZEdhbWUoKSB7XG4gIG1haW4udGV4dENvbnRlbnQgPSBcIlwiO1xuICAvL1BsYXkgc291bmQgLSB0ZXN0aW5nXG4gIHN0YXJ0U291bmQuY3VycmVudFRpbWUgPSAxOyAvL3Jld2luZFxuICBzdGFydFNvdW5kXG4gICAgLnBsYXkoKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQXVkaW8gcGxheWVkXCIpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0pO1xuICBzZXRVcERvbSgpO1xuICBpbml0aWFsaXNlKCk7XG59XG5cbmNvbnN0IGJhY2tncm91bmRJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhY2tncm91bmQtaW1nXCIpO1xuYmFja2dyb3VuZEltZy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7YmFja2dyb3VuZEltYWdlfSlgO1xuXG4vL0dsb2JhbCBHYW1lIHN0YXRlIHZhcmlhYmxlcyAtLSBUbyByZWZhY3RvciAmIEVuY2Fwc3VsYXRlXG5sZXQgZ2FtZUFjdGl2ZSA9IGZhbHNlO1xubGV0IHJlc3RhcnRhYmxlID0gZmFsc2U7XG5sZXQgZHJvcHBlZEFycmF5ID0gW107XG5sZXQgbm90RHJvcHBlZDtcbmxldCBwMWNhcnJpZXIsIHAxYmF0dGxlc2hpcCwgcDFkZXN0cm95ZXIsIHAxc3VibWFyaW5lLCBwMXBhdHJvbEJvYXQ7XG5sZXQgcDJjYXJyaWVyLCBwMmJhdHRsZXNoaXAsIHAyZGVzdHJveWVyLCBwMnN1Ym1hcmluZSwgcDJwYXRyb2xCb2F0O1xubGV0IHAxQWxsU2hpcHMsIHAyQWxsU2hpcHM7XG5sZXQgZHJhZ2dlZFNoaXA7XG5sZXQgZ3JpZFNpemUgPSAxMDtcbmxldCBwMUJvYXJkSW5zdGFuY2UgPSBnYW1lQm9hcmQoZ3JpZFNpemUpO1xubGV0IHBsYXllcjFCb2FyZCA9IHAxQm9hcmRJbnN0YW5jZS5jcmVhdGVCb2FyZCgpO1xubGV0IHAyQm9hcmRJbnN0YW5jZSA9IGdhbWVCb2FyZChncmlkU2l6ZSk7XG5sZXQgcGxheWVyMkJvYXJkID0gcDJCb2FyZEluc3RhbmNlLmNyZWF0ZUJvYXJkKCk7XG5sZXQgcGxheWVyMTtcbmxldCBwbGF5ZXIyO1xubGV0IHAxZ2FtZUJvYXJkLCBwMmdhbWVCb2FyZDtcbmxldCBzaGlweWFyZFNoaXBzO1xubGV0IHN0YXJ0R2FtZUJ1dHRvbjtcbmxldCBtZXNzYWdlQm94O1xuXG5mdW5jdGlvbiBzZXRVcERvbSgpIHtcbiAgLy9nYW1lQ29udGFpbmVyXG4gIGNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBnYW1lQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZ2FtZS1jb250YWluZXJcIik7XG5cbiAgLy9JbmZvIHNlY3Rpb25cbiAgY29uc3QgaW5mb1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBpbmZvU2VjdGlvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImluZm9cIik7XG5cbiAgLy9TdGFydCBidXR0b25cbiAgc3RhcnRHYW1lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgc3RhcnRHYW1lQnV0dG9uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic3RhcnQtYnV0dG9uXCIpO1xuICBzdGFydEdhbWVCdXR0b24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzdGFydFwiKTtcbiAgc3RhcnRHYW1lQnV0dG9uLnRleHRDb250ZW50ID0gXCJQcmVzcyB0byBTdGFydFwiO1xuICBpbmZvU2VjdGlvbi5hcHBlbmRDaGlsZChzdGFydEdhbWVCdXR0b24pO1xuXG4gIC8vTWVzc2FnZSBib3hcbiAgbWVzc2FnZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBcIlRpbWUgZm9yIHdhciwgcGxhY2UgeW91ciBzaGlwcyFcIjtcbiAgbWVzc2FnZUJveC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1lc3NhZ2VcIik7XG4gIGluZm9TZWN0aW9uLmFwcGVuZENoaWxkKG1lc3NhZ2VCb3gpO1xuXG4gIC8vR2FtZWJvYXJkc1xuICBjb25zdCBwbGF5ZXIxTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblxuICBwMWdhbWVCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHAxZ2FtZUJvYXJkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicGxheWVyMS1ib2FyZFwiKTtcbiAgcDFnYW1lQm9hcmQuYXBwZW5kQ2hpbGQocGxheWVyMUxhYmVsKTtcbiAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwMWdhbWVCb2FyZCk7XG4gIGNvbnN0IHBsYXllcjJMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXG4gIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVyMkxhYmVsKTtcbiAgcDJnYW1lQm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwMmdhbWVCb2FyZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInBsYXllcjItYm9hcmRcIik7XG4gIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQocDJnYW1lQm9hcmQpO1xuXG4gIC8vc2hpcHlhcmQgY29udGFpbmVyXG4gIGNvbnN0IHNoaXB5YXJkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2hpcHlhcmRDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlweWFyZENvbnRhaW5lclwiKTtcblxuICAvL3NoaXB5YXJkIGxhYmVsXG4gIGNvbnN0IHNoaXB5YXJkTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlweWFyZExhYmVsLnRleHRDb250ZW50ID0gXCJZb3VyIFNoaXB5YXJkXCI7XG4gIHNoaXB5YXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHNoaXB5YXJkTGFiZWwpO1xuXG4gIC8vU2hpcHlhcmRcbiAgY29uc3Qgc2hpcHlhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlweWFyZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXB5YXJkXCIpO1xuICBzaGlweWFyZENvbnRhaW5lci5hcHBlbmRDaGlsZChzaGlweWFyZCk7XG4gIHNoaXB5YXJkLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAvLzFcbiAgY29uc3Qgc2hpcDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gIHNoaXAxLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcC10eXBlXCIsIFwiY2FycmllclwiKTtcbiAgc2hpcDEuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCIwXCIpO1xuICBzaGlwMS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIGNhcnJpZXJcIik7XG4gIHNoaXAxLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gIHNoaXB5YXJkLmFwcGVuZENoaWxkKHNoaXAxKTtcblxuICAvLzJcbiAgY29uc3Qgc2hpcDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwMi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXAtdHlwZVwiLCBcImRlc3Ryb3llclwiKTtcbiAgc2hpcDIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCIxXCIpO1xuICBzaGlwMi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIGRlc3Ryb3llclwiKTtcbiAgc2hpcDIuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcbiAgc2hpcHlhcmQuYXBwZW5kQ2hpbGQoc2hpcDIpO1xuXG4gIC8vM1xuICBjb25zdCBzaGlwMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXAzLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcC10eXBlXCIsIFwiYmF0dGxlc2hpcFwiKTtcbiAgc2hpcDMuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCIyXCIpO1xuICBzaGlwMy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIGJhdHRsZXNoaXBcIik7XG4gIHNoaXAzLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gIHNoaXB5YXJkLmFwcGVuZENoaWxkKHNoaXAzKTtcblxuICAvLzRcbiAgY29uc3Qgc2hpcDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwNC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXAtdHlwZVwiLCBcInN1Ym1hcmluZVwiKTtcbiAgc2hpcDQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCIzXCIpO1xuICBzaGlwNC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIHN1Ym1hcmluZVwiKTtcbiAgc2hpcDQuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcbiAgc2hpcHlhcmQuYXBwZW5kQ2hpbGQoc2hpcDQpO1xuXG4gIC8vNVxuICBjb25zdCBzaGlwNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXA1LnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcC10eXBlXCIsIFwicGF0cm9sQm9hdFwiKTtcbiAgc2hpcDUuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCI0XCIpO1xuICBzaGlwNS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIHBhdHJvbEJvYXRcIik7XG4gIHNoaXA1LnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gIHNoaXB5YXJkLmFwcGVuZENoaWxkKHNoaXA1KTtcblxuICBzaGlweWFyZFNoaXBzID0gW3NoaXAxLCBzaGlwMiwgc2hpcDMsIHNoaXA0LCBzaGlwNV07XG5cbiAgbWFpbi5hcHBlbmRDaGlsZChpbmZvU2VjdGlvbik7XG4gIG1haW4uYXBwZW5kQ2hpbGQoZ2FtZUNvbnRhaW5lcik7XG4gIG1haW4uYXBwZW5kQ2hpbGQoc2hpcHlhcmRDb250YWluZXIpO1xuXG4gIHJldHVybiB7XG4gICAgZ2FtZUNvbnRhaW5lcixcbiAgICBwMWdhbWVCb2FyZCxcbiAgICBwMmdhbWVCb2FyZCxcbiAgICBzdGFydEdhbWVCdXR0b24sXG4gICAgc2hpcHlhcmQsXG4gICAgc2hpcHlhcmRTaGlwcyxcbiAgICBtZXNzYWdlQm94LFxuICB9O1xufVxuXG5mdW5jdGlvbiBpbml0aWFsaXNlKCkge1xuICBwMWNhcnJpZXIgPSBzaGlwKFwiY2FycmllclwiLCA1LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gIHAxYmF0dGxlc2hpcCA9IHNoaXAoXCJiYXR0bGVzaGlwXCIsIDQsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAxZGVzdHJveWVyID0gc2hpcChcImRlc3Ryb3llclwiLCAzLCAwLCBmYWxzZSwgZmFsc2UpO1xuICBwMXN1Ym1hcmluZSA9IHNoaXAoXCJzdWJtYXJpbmVcIiwgMywgMCwgZmFsc2UsIGZhbHNlKTtcbiAgcDFwYXRyb2xCb2F0ID0gc2hpcChcInBhdHJvbEJvYXRcIiwgMiwgMCwgZmFsc2UsIGZhbHNlKTtcblxuICBwMUFsbFNoaXBzID0gW1xuICAgIHAxY2FycmllcixcbiAgICBwMWJhdHRsZXNoaXAsXG4gICAgcDFkZXN0cm95ZXIsXG4gICAgcDFzdWJtYXJpbmUsXG4gICAgcDFwYXRyb2xCb2F0LFxuICBdO1xuXG4gIHAyY2FycmllciA9IHNoaXAoXCJjYXJyaWVyXCIsIDUsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAyYmF0dGxlc2hpcCA9IHNoaXAoXCJiYXR0bGVzaGlwXCIsIDQsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAyZGVzdHJveWVyID0gc2hpcChcImRlc3Ryb3llclwiLCAzLCAwLCBmYWxzZSwgZmFsc2UpO1xuICBwMnN1Ym1hcmluZSA9IHNoaXAoXCJzdWJtYXJpbmVcIiwgMywgMCwgZmFsc2UsIGZhbHNlKTtcbiAgcDJwYXRyb2xCb2F0ID0gc2hpcChcInBhdHJvbEJvYXRcIiwgMiwgMCwgZmFsc2UsIGZhbHNlKTtcblxuICBwMkFsbFNoaXBzID0gW1xuICAgIHAyY2FycmllcixcbiAgICBwMmRlc3Ryb3llcixcbiAgICBwMmJhdHRsZXNoaXAsXG4gICAgcDJzdWJtYXJpbmUsXG4gICAgcDJwYXRyb2xCb2F0LFxuICBdO1xuXG4gIC8vTWFrZSBQbGF5ZXJzXG4gIHBsYXllcjEgPSBwbGF5ZXIoXG4gICAgXCJQbGF5ZXIgMVwiLFxuICAgIHBsYXllcjFCb2FyZCxcbiAgICBcIkh1bWFuXCIsXG4gICAgcDFBbGxTaGlwcyxcbiAgICBwMUJvYXJkSW5zdGFuY2VcbiAgKTtcblxuICBwbGF5ZXIyID0gcGxheWVyKFwiQ29tcHV0ZXJcIiwgcGxheWVyMkJvYXJkLCBcIkFJXCIsIHAyQWxsU2hpcHMsIHAyQm9hcmRJbnN0YW5jZSk7XG5cbiAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjFCb2FyZCwgcDFnYW1lQm9hcmQpO1xuICByZW5kZXJHYW1lQm9hcmQocGxheWVyMkJvYXJkLCBwMmdhbWVCb2FyZCk7XG5cbiAgLy9ldmVudCBsaXN0ZW5lcnNcbiAgc2V0dXBFdmVudExpc3RlbmVycyhwMWdhbWVCb2FyZCwgcDJnYW1lQm9hcmQpO1xuXG4gIHJldHVybiB7XG4gICAgcGxheWVyMSxcbiAgICBwbGF5ZXIxQm9hcmQsXG4gICAgcDFBbGxTaGlwcyxcbiAgICBwbGF5ZXIyLFxuICAgIHBsYXllcjJCb2FyZCxcbiAgICBwMkFsbFNoaXBzLFxuICB9O1xufVxuXG5mdW5jdGlvbiBzZXR1cEV2ZW50TGlzdGVuZXJzKHAxZ2FtZUJvYXJkLCBwMmdhbWVCb2FyZCkge1xuICBzaGlweWFyZFNoaXBzLmZvckVhY2goKGRyYWdnYWJsZSkgPT4ge1xuICAgIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWdTdGFydCk7XG4gICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIGRyYWdFbmQpO1xuICB9KTtcblxuICBwMWdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZHJhZ092ZXIpO1xuICBwMWdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBkcm9wU2hpcCk7XG5cbiAgcDJnYW1lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbGVjdFRhcmdldCk7XG4gIHAyZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgaG92ZXIpO1xuICBwMmdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgaG92ZXIpO1xuICBzdGFydEdhbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXJ0R2FtZSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZShzaGlweWFyZCkge1xuICBpZiAoXG4gICAgZHJvcHBlZEFycmF5Lmxlbmd0aCA+PSBwMUFsbFNoaXBzLmxlbmd0aCAmJlxuICAgIGdhbWVBY3RpdmUgPT0gZmFsc2UgJiZcbiAgICByZXN0YXJ0YWJsZSA9PSBmYWxzZVxuICApIHtcbiAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJTdGFydGluZywgdGFrZSB5b3VyIHNob3QhXCI7XG4gICAgZ2FtZUFjdGl2ZSA9IHRydWU7XG4gICAgcmVzdGFydGFibGUgPSBmYWxzZTtcbiAgICBzdGFydEdhbWVCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIHNoaXB5YXJkLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIHBsYWNlUDJTaGlwcygpO1xuICB9IGVsc2UgaWYgKGdhbWVBY3RpdmUgPT0gZmFsc2UgJiYgcmVzdGFydGFibGUgPT0gdHJ1ZSkge1xuICAgIHJlc2V0R2FtZSgpO1xuICB9IGVsc2Uge1xuICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBcIlBsYWNlIGFsbCBvZiB5b3VyIHNoaXBzIGZpcnN0XCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzZXRHYW1lKCkge1xuICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJSZXN0YXJ0aW5nLCBQbGFjZSB5b3VyIHNoaXBzIVwiO1xuICBzdGFydEdhbWVCdXR0b24udGV4dENvbnRlbnQgPSBcIlN0YXJ0IGdhbWVcIjtcbiAgLy9VcGRhdGUgZ2xvYmFsIHZhcmlhYmxlc1xuICByZXN0YXJ0YWJsZSA9IGZhbHNlO1xuICBnYW1lQWN0aXZlID0gZmFsc2U7XG4gIGRyb3BwZWRBcnJheSA9IFtdO1xuICBwMUJvYXJkSW5zdGFuY2UgPSBnYW1lQm9hcmQoZ3JpZFNpemUpO1xuICBwbGF5ZXIxQm9hcmQgPSBwMUJvYXJkSW5zdGFuY2UuY3JlYXRlQm9hcmQoKTtcbiAgcDJCb2FyZEluc3RhbmNlID0gZ2FtZUJvYXJkKGdyaWRTaXplKTtcbiAgcGxheWVyMkJvYXJkID0gcDJCb2FyZEluc3RhbmNlLmNyZWF0ZUJvYXJkKCk7XG4gIGluaXRpYWxpc2UoKTtcblxuICAvL2NsZWFyIHRoZSBkb21cbiAgbWFpbi50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgLy9TZXQgdXAgZXZlbnQgbGlzdGVuZXJzICYgcmVuZGVyXG4gIGNvbnN0IHsgcDFnYW1lQm9hcmQsIHAyZ2FtZUJvYXJkIH0gPSBzZXRVcERvbSgpO1xuXG4gIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIxQm9hcmQsIHAxZ2FtZUJvYXJkKTtcbiAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjJCb2FyZCwgcDJnYW1lQm9hcmQpO1xuICBzZXR1cEV2ZW50TGlzdGVuZXJzKHAxZ2FtZUJvYXJkLCBwMmdhbWVCb2FyZCk7XG59XG5cbmZ1bmN0aW9uIHBsYWNlUDJTaGlwcygpIHtcbiAgcDJCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIyQm9hcmQsIHAyY2FycmllciwgOSwgMSk7XG4gIHAyQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMkJvYXJkLCBwMmRlc3Ryb3llciwgMywgMyk7XG4gIHAyQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMkJvYXJkLCBwMmJhdHRsZXNoaXAsIDUsIDIpO1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJzdWJtYXJpbmUsIDIsIDEpO1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJwYXRyb2xCb2F0LCA2LCAwKTtcbiAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjJCb2FyZCwgcDJnYW1lQm9hcmQpO1xufVxuXG5mdW5jdGlvbiBkcmFnU3RhcnQoZSkge1xuICBkcmFnZ2VkU2hpcCA9IGUudGFyZ2V0O1xuICBkcmFnZ2VkU2hpcC5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dpbmdcIik7XG4gIG5vdERyb3BwZWQgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZHJhZ092ZXIoZSkge1xuICBub3REcm9wcGVkID0gZmFsc2U7XG5cbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBkcmFnRW5kKGUpIHtcbiAgZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LnJlbW92ZShcImRyYWdnaW5nXCIpO1xufVxuXG5mdW5jdGlvbiBkcm9wU2hpcChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3Qgc3RhcnRDb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuICBjb25zdCBzdGFydFJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCk7XG5cbiAgY29uc3QgdGhpc1NoaXAgPSBwMUFsbFNoaXBzW2RyYWdnZWRTaGlwLmlkXTtcbiAgY29uc3Qgc2hpcE5hbWUgPSBkcmFnZ2VkU2hpcC5kYXRhc2V0LnNoaXBUeXBlO1xuICBjb25zdCBwbGFjZW1lbnRSZXN1bHQgPSBwMUJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKFxuICAgIHBsYXllcjFCb2FyZCxcbiAgICB0aGlzU2hpcCxcbiAgICBzdGFydFJvdyxcbiAgICBzdGFydENvbFxuICApO1xuXG4gIGlmIChwbGFjZW1lbnRSZXN1bHQpIHtcbiAgICBkcm9wcGVkQXJyYXkucHVzaCh0aGlzU2hpcCk7XG4gICAgcDFCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIxQm9hcmQsIHRoaXNTaGlwLCBzdGFydFJvdywgc3RhcnRDb2wpO1xuICAgIGRyYWdnZWRTaGlwLnJlbW92ZSgpO1xuICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBgWW91J3ZlIHBsYWNlZCB5b3VyICR7c2hpcE5hbWV9YDtcbiAgfSBlbHNlIHtcbiAgICBub3REcm9wcGVkID0gdHJ1ZTtcbiAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJDYW4ndCBnbyB0aGVyZSwgdHJ5IGFnYWluIVwiO1xuICB9XG5cbiAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjFCb2FyZCwgcDFnYW1lQm9hcmQpO1xuICBkcmFnZ2VkU2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZ2dpbmdcIik7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdFRhcmdldChlKSB7XG4gIGlmIChnYW1lQWN0aXZlKSB7XG4gICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcbiAgICBpZiAoY2VsbCAmJiAhY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJkaXNhYmxlZFwiKSkge1xuICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoY2VsbC5kYXRhc2V0LmNvbCwgMTApO1xuICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoY2VsbC5kYXRhc2V0LnJvdywgMTApO1xuICAgICAgcGxheWVyMS5hdHRhY2socGxheWVyMiwgcm93LCBjb2wpO1xuICAgICAgc2V0VGltZW91dChoYW5kbGVSZXN1bHRWYWxpZGF0aW9uLCA4MDApOyAvL1NldCB0aGlzIGxvbmdlciB0aGFuIHRoZSBtb3ZlIGRlbGF5Ly9cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaG92ZXIoZSkge1xuICBsZXQgaGlnaGxpZ2h0ZWRDZWxsID0gZS50YXJnZXQ7XG4gIGhpZ2hsaWdodGVkQ2VsbC5jbGFzc0xpc3QudG9nZ2xlKFwiaGlnaGxpZ2h0ZWRcIik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVJlc3VsdFZhbGlkYXRpb24oKSB7XG4gIGNvbnN0IGlzR2FtZVdvbiA9IHAyQm9hcmRJbnN0YW5jZS5jaGVja0ZvcldpbihwbGF5ZXIyLnNoaXBzKTtcbiAgY29uc3QgaXNHYW1lTG9zdCA9IHAxQm9hcmRJbnN0YW5jZS5jaGVja0ZvcldpbihwbGF5ZXIxLnNoaXBzKTtcblxuICBpZiAoaXNHYW1lV29uIHx8IGlzR2FtZUxvc3QpIHtcbiAgICBnYW1lQWN0aXZlID0gZmFsc2U7XG5cbiAgICBzdGFydEdhbWVCdXR0b24udGV4dENvbnRlbnQgPSBcIlJlc3RhcnRcIjtcbiAgICBzdGFydEdhbWVCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICByZXN0YXJ0YWJsZSA9IHRydWU7XG4gICAgcDJnYW1lQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbGVjdFRhcmdldCk7XG5cbiAgICBpZiAoaXNHYW1lV29uKSB7XG4gICAgICB0aGVXaW5cbiAgICAgICAgLnBsYXkoKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJBdWRpbyBwbGF5ZWRcIik7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIH0pO1xuXG4gICAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJHYW1lIG92ZXIsIHlvdSB3aW4hXCI7XG4gICAgfVxuICAgIGlmIChpc0dhbWVMb3N0KSB7XG4gICAgICB0aGVEZWZlYXRcbiAgICAgICAgLnBsYXkoKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJBdWRpbyBwbGF5ZWRcIik7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IFwiR2FtZSBvdmVyLCB5b3UgTG9zZSFcIjtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgcGxheWVyMUJvYXJkLFxuICBwbGF5ZXIyQm9hcmQsXG4gIHAxZ2FtZUJvYXJkLFxuICBwMmdhbWVCb2FyZCxcbiAgcGxheWVyMSxcbiAgcGxheWVyMixcbiAgcDFCb2FyZEluc3RhbmNlLFxuICBwMkJvYXJkSW5zdGFuY2UsXG4gIG1lc3NhZ2VCb3gsXG4gIHBsYXllck5hbWUsXG59O1xuIiwiLyoqIEBmb3JtYXQgKi9cblxuaW1wb3J0IHsgcDFnYW1lQm9hcmQsIHBsYXllck5hbWUgfSBmcm9tIFwiLi9tYWluLmpzXCI7XG5cbmNvbnN0IHJlbmRlckdhbWVCb2FyZCA9IChib2FyZCwgY29udGFpbmVyKSA9PiB7XG4gIGNvbnN0IGdyaWRTaXplID0gMTA7XG4gIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGNvbnN0IGJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImJvYXJkLWNvbnRhaW5lclwiKTtcbiAgYm9hcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcbiAgICBjb250YWluZXIgPT09IHAxZ2FtZUJvYXJkID8gXCJwbGF5ZXIxXCIgOiBcInBsYXllcjJcIlxuICApO1xuICBjb25zdCBwbGF5ZXIxbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgcGxheWVyMWxhYmVsLnRleHRDb250ZW50ID0gcGxheWVyTmFtZSA/IHBsYXllck5hbWUgOiBcIllvdVwiO1xuICBjb25zdCBwbGF5ZXIybGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgcGxheWVyMmxhYmVsLnRleHRDb250ZW50ID0gXCJDb21wdXRlclwiO1xuXG4gIGlmIChjb250YWluZXIgPT09IHAxZ2FtZUJvYXJkKSB7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllcjFsYWJlbCk7XG4gIH0gZWxzZSB7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllcjJsYWJlbCk7XG4gIH1cblxuICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBncmlkU2l6ZTsgcm93KyspIHtcbiAgICBjb25zdCByb3dFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3dFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJib2FyZC1yb3dcIik7XG5cbiAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBncmlkU2l6ZTsgY29sKyspIHtcbiAgICAgIGNvbnN0IGNlbGxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJib2FyZC1jZWxsXCIpO1xuICAgICAgY2VsbEVsZW1lbnQuZGF0YXNldC5yb3cgPSByb3c7XG4gICAgICBjZWxsRWxlbWVudC5kYXRhc2V0LmNvbCA9IGNvbDtcblxuICAgICAgLy9zZXQgc3R5bGluZyBiYXNlZCBvbiBjZWxsIGNvbnRlbnQgaS5lLiB3YXRlciwgaGl0LCBzaGlwLCBtaXNzXG4gICAgICBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIndhdGVyXCIpIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIndhdGVyXCIpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9hcmRbcm93XVtjb2xdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGlmIChjb250YWluZXIgPT0gcDFnYW1lQm9hcmQpIHtcbiAgICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZW5lbXktc2hpcFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjZWxsRWxlbWVudC5kYXRhc2V0LnNoaXBUeXBlID0gYCR7Ym9hcmRbcm93XVtjb2xdLnR5cGV9YDtcbiAgICAgICAgY2VsbEVsZW1lbnQuZGF0YXNldC5vcmllbnRhdGlvbiA9IGJvYXJkW3Jvd11bY29sXS5pc1ZlcnRpY2FsXG4gICAgICAgICAgPyBcInZlcnRpY2FsXCJcbiAgICAgICAgICA6IFwiaG9yaXpvbnRhbFwiO1xuICAgICAgfSBlbHNlIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IFwiSElUXCIpIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGl0U2hpcFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIk1JU1NcIikge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xuICAgICAgfSBlbHNlIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IFwiU1VOS1wiKSB7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzdW5rXCIpO1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaXRTaGlwXCIpO1xuICAgICAgfVxuXG4gICAgICByb3dFbGVtZW50LmFwcGVuZENoaWxkKGNlbGxFbGVtZW50KTtcbiAgICB9XG4gICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQocm93RWxlbWVudCk7XG4gIH1cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkQ29udGFpbmVyKTtcbn07XG5cbmV4cG9ydCB7IHJlbmRlckdhbWVCb2FyZCB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcImNyb3NzaGFpci5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qKiBAZm9ybWF0ICovXG5cbjpyb290IHtcbiAgZm9udC1mYW1pbHk6IFwiWXNhYmVhdSBTQ1wiLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDI0cHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgLS1kYXJrLWN5YW46ICMwZTk1OTQ7XG4gIC0td2hlYXQ6ICNmNWRmYmI7XG4gIC0tbW91bnRiYXR0ZW4tcGluazogIzk1ODE4ZDtcbn1cblxuaHRtbCB7XG4gIG92ZXJzY3JvbGwtYmVoYXZpb3I6IG5vbmU7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuYm9keSB7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbm1haW4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgaGVpZ2h0OiAxMDB2aDtcbn1cblxuLmJhY2tncm91bmQtaW1nIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBvYmplY3QtcG9zaXRpb246IGNlbnRlcjtcbiAgb3BhY2l0eTogMC43O1xuICB6LWluZGV4OiAtMTtcbn1cblxuLmNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi50aXRsZSB7XG4gIGNvbG9yOiBibGFjaztcbiAgZm9udC1mYW1pbHk6IFwiTm90YWJsZVwiLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDJyZW07XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbmlucHV0IHtcbiAgZm9udC1zaXplOiAxcmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbjogMDtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4uZHJhZ2dhYmxlIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uaW5mbyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMTBweDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmdhbWUtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgbWFyZ2luOiA1cHg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDUwcHg7XG59XG5cbi5wbGF5ZXIxLWJvYXJkLFxuLnBsYXllcjItYm9hcmQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2xvcjogYmxhY2s7XG59XG5cbi5ib2FyZC1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4uc2hpcHlhcmRDb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2xvcjogYmxhY2s7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG5cbi5zaGlweWFyZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiAxMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDU2LCAxMTgsIDIxNywgMC40KTtcbiAgcGFkZGluZzogMTBweDtcbiAgd2lkdGg6IDIwdnc7XG4gIG1pbi1oZWlnaHQ6IDV2dztcbiAgYm9yZGVyOiAxcHggZGFzaGVkIGJsYWNrO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG59XG5cbi5zdGFydCB7XG4gIG1hcmdpbi10b3A6IDUwcHg7XG4gIGJhY2tncm91bmQ6ICM1ZTVkZjA7XG4gIGJvcmRlci1yYWRpdXM6IDk5cHg7XG4gIGJveC1zaGFkb3c6ICM1ZTVkZjAgMCAxMHB4IDIwcHggLTEwcHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtZmFtaWx5OiBJbnRlciwgSGVsdmV0aWNhLCBcIkFwcGxlIENvbG9yIEVtb2ppXCIsIFwiU2Vnb2UgVUkgRW1vamlcIixcbiAgICBOb3RvQ29sb3JFbW9qaSwgXCJOb3RvIENvbG9yIEVtb2ppXCIsIFwiU2Vnb2UgVUkgU3ltYm9sXCIsIFwiQW5kcm9pZCBFbW9qaVwiLFxuICAgIEVtb2ppU3ltYm9scywgLWFwcGxlLXN5c3RlbSwgc3lzdGVtLXVpLCBcIlNlZ29lIFVJXCIsIFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLFxuICAgIFwiTm90byBTYW5zXCIsIHNhbnMtc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xuICBwYWRkaW5nOiA4cHggMThweDtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHRvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uO1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XG4gIGJvcmRlcjogMDtcbn1cblxuLnN0YXJ0OmRpc2FibGVkIHtcbiAgb3BhY2l0eTogMDtcbiAgY3Vyc29yOiBhdXRvO1xufVxuXG4ubWVzc2FnZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICB3aWR0aDogMjByZW07XG4gIGhlaWdodDogNHJlbTtcbn1cblxuLmJvYXJkLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5ib2FyZC1jZWxsIHtcbiAgb3BhY2l0eTogMC45O1xuICBmbGV4OiAxO1xuICB3aWR0aDogMXJlbTtcbiAgaGVpZ2h0OiAxcmVtO1xuICBib3JkZXI6IDAuMXB4IGRvdHRlZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFiOTVlMDtcbiAgY3Vyc29yOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSkgMTIgMTIsIGNyb3NzaGFpcjtcbn1cblxuLnNoaXAge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG4gIGhlaWdodDogMXJlbTtcbn1cblxuLmhpdFNoaXAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xufVxuXG4uc2hpcDo6YmVmb3JlIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3JkZXI6IDAuM3ZtaW4gc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO1xuICB0b3A6IC0xcHg7XG4gIGJvdHRvbTogLTFweDtcbiAgbGVmdDogLTFweDtcbiAgcmlnaHQ6IC0xcHg7XG59XG5cbltkYXRhLW9yaWVudGF0aW9uPVwidmVydGljYWxcIl06OmJlZm9yZSB7XG4gIGFuaW1hdGlvbjogcmlwcGxlc1kgM3MgbGluZWFyIGluZmluaXRlO1xuICBib3JkZXItdG9wOiBub25lO1xuICBib3JkZXItYm90dG9tOiBub25lO1xufVxuXG5bZGF0YS1vcmllbnRhdGlvbj1cImhvcml6b250YWxcIl06OmJlZm9yZSB7XG4gIGFuaW1hdGlvbjogcmlwcGxlc1ggM3MgbGluZWFyIGluZmluaXRlO1xuICBib3JkZXItbGVmdDogbm9uZTtcbiAgYm9yZGVyLXJpZ2h0OiBub25lO1xufVxuXG5Aa2V5ZnJhbWVzIHJpcHBsZXNYIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiBzY2FsZVgoMSk7XG4gIH1cblxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogc2NhbGVYKDEuNik7XG4gIH1cbn1cblxuQGtleWZyYW1lcyByaXBwbGVzWSB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogc2NhbGVZKDEpO1xuICB9XG5cbiAgMTAwJSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgxLjYpO1xuICB9XG59XG5cbi5lbmVteS1zaGlwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFiOTVlMDtcbiAgaGVpZ2h0OiAxcmVtO1xufVxuXG4uZHJhZ2dhYmxlIHtcbiAgY3Vyc29yOiBtb3ZlO1xufVxuXG4uZHJhZ2dpbmcge1xuICBvcGFjaXR5OiAwLjU7XG59XG5cbi5oaWdobGlnaHRlZCB7XG4gIG9wYWNpdHk6IDAuNTtcbn1cblxuLmNhcnJpZXIge1xuICB3aWR0aDogMTJyZW07XG59XG5cbi5kZXN0cm95ZXIge1xuICB3aWR0aDogMTJyZW07XG59XG5cbi5iYXR0bGVzaGlwIHtcbiAgd2lkdGg6IDlyZW07XG59XG5cbi5kZXN0cm95ZXIge1xuICB3aWR0aDogN3JlbTtcbn1cblxuLnN1Ym1hcmluZSB7XG4gIHdpZHRoOiA3cmVtO1xufVxuXG4ucGF0cm9sQm9hdCB7XG4gIHdpZHRoOiA0LjVyZW07XG59XG5cbi5oaXQsXG4ubWlzcyxcbi5zdW5rIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5oaXQ6OmFmdGVyLFxuLm1pc3M6OmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICB3aWR0aDogMnZtaW47XG4gIGhlaWdodDogMnZtaW47XG59XG5cbi5zdW5rIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbn1cblxuLm1pc3M6OmFmdGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbi5oaXQ6OmFmdGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuXG4ubWlzczo6YmVmb3JlIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBhbmltYXRpb246IG1pc3MgMC4ycyBlYXNlLW91dCBmb3J3YXJkcztcbiAgYm9yZGVyOiAwLjF2bWluIHNvbGlkIHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICB3aWR0aDogMnZtaW47XG4gIGhlaWdodDogMnZtaW47XG59XG5cbi8qIEBrZXlmcmFtZXMgbWlzcyB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gIH1cblxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoNCk7XG4gIH1cbn0gKi9cblxuLnN1bms6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiWFwiO1xuICBjb2xvcjogcmdiKDIxMSwgOSwgNTApO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5wbGF5ZXIxIHtcbiAgbWFyZ2luLWJvdHRvbTogNTBweDtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsYUFBYTs7QUFFYjtFQUNFLHFDQUFxQztFQUNyQyxlQUFlO0VBQ2YsWUFBWTtFQUNaLG9CQUFvQjtFQUNwQixnQkFBZ0I7RUFDaEIsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGNBQWM7RUFDZCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZUFBZTtFQUNmLE1BQU07RUFDTixPQUFPO0VBQ1AsV0FBVztFQUNYLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1C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QUFtQjtFQUNuQixZQUFZO0VBQ1osYUFBYTtBQUNmOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixzQ0FBc0M7RUFDdEMsMkJBQTJCO0VBQzNCLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osYUFBYTtBQUNmOztBQUVBOzs7Ozs7Ozs7O0dBVUc7O0FBRUg7RUFDRSxZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqIEBmb3JtYXQgKi9cXG5cXG46cm9vdCB7XFxuICBmb250LWZhbWlseTogXFxcIllzYWJlYXUgU0NcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgLS1kYXJrLWN5YW46ICMwZTk1OTQ7XFxuICAtLXdoZWF0OiAjZjVkZmJiO1xcbiAgLS1tb3VudGJhdHRlbi1waW5rOiAjOTU4MThkO1xcbn1cXG5cXG5odG1sIHtcXG4gIG92ZXJzY3JvbGwtYmVoYXZpb3I6IG5vbmU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbmJvZHkge1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4uYmFja2dyb3VuZC1pbWcge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxuICBvYmplY3QtcG9zaXRpb246IGNlbnRlcjtcXG4gIG9wYWNpdHk6IDAuNztcXG4gIHotaW5kZXg6IC0xO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnRpdGxlIHtcXG4gIGNvbG9yOiBibGFjaztcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTm90YWJsZVxcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDJyZW07XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG59XFxuXFxuaW5wdXQge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWFyZ2luOiAwO1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxufVxcblxcbi5kcmFnZ2FibGUge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4uaW5mbyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAxMHB4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5nYW1lLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgbWFyZ2luOiA1cHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogNTBweDtcXG59XFxuXFxuLnBsYXllcjEtYm9hcmQsXFxuLnBsYXllcjItYm9hcmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4uYm9hcmQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4uc2hpcHlhcmRDb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY29sb3I6IGJsYWNrO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuXFxuLnNoaXB5YXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBnYXA6IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDU2LCAxMTgsIDIxNywgMC40KTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB3aWR0aDogMjB2dztcXG4gIG1pbi1oZWlnaHQ6IDV2dztcXG4gIGJvcmRlcjogMXB4IGRhc2hlZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcXG59XFxuXFxuLnN0YXJ0IHtcXG4gIG1hcmdpbi10b3A6IDUwcHg7XFxuICBiYWNrZ3JvdW5kOiAjNWU1ZGYwO1xcbiAgYm9yZGVyLXJhZGl1czogOTlweDtcXG4gIGJveC1zaGFkb3c6ICM1ZTVkZjAgMCAxMHB4IDIwcHggLTEwcHg7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBmb250LWZhbWlseTogSW50ZXIsIEhlbHZldGljYSwgXFxcIkFwcGxlIENvbG9yIEVtb2ppXFxcIiwgXFxcIlNlZ29lIFVJIEVtb2ppXFxcIixcXG4gICAgTm90b0NvbG9yRW1vamksIFxcXCJOb3RvIENvbG9yIEVtb2ppXFxcIiwgXFxcIlNlZ29lIFVJIFN5bWJvbFxcXCIsIFxcXCJBbmRyb2lkIEVtb2ppXFxcIixcXG4gICAgRW1vamlTeW1ib2xzLCAtYXBwbGUtc3lzdGVtLCBzeXN0ZW0tdWksIFxcXCJTZWdvZSBVSVxcXCIsIFJvYm90bywgXFxcIkhlbHZldGljYSBOZXVlXFxcIixcXG4gICAgXFxcIk5vdG8gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBwYWRkaW5nOiA4cHggMThweDtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHRvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uO1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcXG4gIGJvcmRlcjogMDtcXG59XFxuXFxuLnN0YXJ0OmRpc2FibGVkIHtcXG4gIG9wYWNpdHk6IDA7XFxuICBjdXJzb3I6IGF1dG87XFxufVxcblxcbi5tZXNzYWdlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIHdpZHRoOiAyMHJlbTtcXG4gIGhlaWdodDogNHJlbTtcXG59XFxuXFxuLmJvYXJkLXJvdyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uYm9hcmQtY2VsbCB7XFxuICBvcGFjaXR5OiAwLjk7XFxuICBmbGV4OiAxO1xcbiAgd2lkdGg6IDFyZW07XFxuICBoZWlnaHQ6IDFyZW07XFxuICBib3JkZXI6IDAuMXB4IGRvdHRlZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWI5NWUwO1xcbiAgY3Vyc29yOiB1cmwoXFxcImNyb3NzaGFpci5wbmdcXFwiKSAxMiAxMiwgY3Jvc3NoYWlyO1xcbn1cXG5cXG4uc2hpcCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgaGVpZ2h0OiAxcmVtO1xcbn1cXG5cXG4uaGl0U2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbn1cXG5cXG4uc2hpcDo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm9yZGVyOiAwLjN2bWluIHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcXG4gIHRvcDogLTFweDtcXG4gIGJvdHRvbTogLTFweDtcXG4gIGxlZnQ6IC0xcHg7XFxuICByaWdodDogLTFweDtcXG59XFxuXFxuW2RhdGEtb3JpZW50YXRpb249XFxcInZlcnRpY2FsXFxcIl06OmJlZm9yZSB7XFxuICBhbmltYXRpb246IHJpcHBsZXNZIDNzIGxpbmVhciBpbmZpbml0ZTtcXG4gIGJvcmRlci10b3A6IG5vbmU7XFxuICBib3JkZXItYm90dG9tOiBub25lO1xcbn1cXG5cXG5bZGF0YS1vcmllbnRhdGlvbj1cXFwiaG9yaXpvbnRhbFxcXCJdOjpiZWZvcmUge1xcbiAgYW5pbWF0aW9uOiByaXBwbGVzWCAzcyBsaW5lYXIgaW5maW5pdGU7XFxuICBib3JkZXItbGVmdDogbm9uZTtcXG4gIGJvcmRlci1yaWdodDogbm9uZTtcXG59XFxuXFxuQGtleWZyYW1lcyByaXBwbGVzWCB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogc2NhbGVYKDEpO1xcbiAgfVxcblxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogc2NhbGVYKDEuNik7XFxuICB9XFxufVxcblxcbkBrZXlmcmFtZXMgcmlwcGxlc1kge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgxKTtcXG4gIH1cXG5cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgxLjYpO1xcbiAgfVxcbn1cXG5cXG4uZW5lbXktc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWI5NWUwO1xcbiAgaGVpZ2h0OiAxcmVtO1xcbn1cXG5cXG4uZHJhZ2dhYmxlIHtcXG4gIGN1cnNvcjogbW92ZTtcXG59XFxuXFxuLmRyYWdnaW5nIHtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XFxuXFxuLmhpZ2hsaWdodGVkIHtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XFxuXFxuLmNhcnJpZXIge1xcbiAgd2lkdGg6IDEycmVtO1xcbn1cXG5cXG4uZGVzdHJveWVyIHtcXG4gIHdpZHRoOiAxMnJlbTtcXG59XFxuXFxuLmJhdHRsZXNoaXAge1xcbiAgd2lkdGg6IDlyZW07XFxufVxcblxcbi5kZXN0cm95ZXIge1xcbiAgd2lkdGg6IDdyZW07XFxufVxcblxcbi5zdWJtYXJpbmUge1xcbiAgd2lkdGg6IDdyZW07XFxufVxcblxcbi5wYXRyb2xCb2F0IHtcXG4gIHdpZHRoOiA0LjVyZW07XFxufVxcblxcbi5oaXQsXFxuLm1pc3MsXFxuLnN1bmsge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmhpdDo6YWZ0ZXIsXFxuLm1pc3M6OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm9yZGVyLXJhZGl1czogMTAwJTtcXG4gIHdpZHRoOiAydm1pbjtcXG4gIGhlaWdodDogMnZtaW47XFxufVxcblxcbi5zdW5rIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxufVxcblxcbi5taXNzOjphZnRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLmhpdDo6YWZ0ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG4ubWlzczo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYW5pbWF0aW9uOiBtaXNzIDAuMnMgZWFzZS1vdXQgZm9yd2FyZHM7XFxuICBib3JkZXI6IDAuMXZtaW4gc29saWQgd2hpdGU7XFxuICBib3JkZXItcmFkaXVzOiAxMDAlO1xcbiAgd2lkdGg6IDJ2bWluO1xcbiAgaGVpZ2h0OiAydm1pbjtcXG59XFxuXFxuLyogQGtleWZyYW1lcyBtaXNzIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gIH1cXG5cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDQpO1xcbiAgfVxcbn0gKi9cXG5cXG4uc3Vuazo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJYXFxcIjtcXG4gIGNvbG9yOiByZ2IoMjExLCA5LCA1MCk7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4ucGxheWVyMSB7XFxuICBtYXJnaW4tYm90dG9tOiA1MHB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiaW5kZXhcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJwbGF5ZXIxIiwicGxheWVyMiIsInBsYXllcjFCb2FyZCIsInBsYXllcjJCb2FyZCIsInAxQm9hcmRJbnN0YW5jZSIsInAxZ2FtZUJvYXJkIiwicDJnYW1lQm9hcmQiLCJtZXNzYWdlQm94IiwicmVuZGVyR2FtZUJvYXJkIiwiY3VycmVudFBsYXllciIsInRoZUhpdCIsIkF1ZGlvIiwic3JjIiwidGhlTWlzcyIsInRoZVN1bmsiLCJzaGlwIiwidHlwZSIsImxlbmd0aCIsImhpdENvdW50Iiwic2lua1N0YXR1cyIsImlzVmVydGljYWwiLCJoaXQiLCJpc1N1bmsiLCJnYW1lQm9hcmQiLCJncmlkU2l6ZSIsImNyZWF0ZUJvYXJkIiwiYm9hcmQiLCJBcnJheSIsImZpbGwiLCJtYXAiLCJyZXNldEJvYXJkIiwicGxhY2VTaGlwIiwic3RhcnRpbmdSb3ciLCJzdGFydGluZ0NvbCIsInNoaXBMZW5ndGgiLCJpIiwicmVjZWl2ZUF0dGFjayIsInJvdyIsImNvbCIsInNoaXBzIiwiY2hlY2tGb3JXaW4iLCJhbGxTaGlwc1N1bmsiLCJldmVyeSIsInBsYXllciIsIm5hbWUiLCJnZXROYW1lIiwiZ2V0VHlwZSIsImdldEFpQ2hvaWNlIiwiYXZhaWxhYmxlU3BvdHMiLCJ4IiwieSIsInB1c2giLCJyYW5kb21JbmRleCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImFpQ2hvaWNlIiwiYXR0YWNrIiwiZW5lbXkiLCJlbmVteUJvYXJkIiwiYXR0YWNrUmVzdWx0IiwiY3VycmVudFRpbWUiLCJwbGF5IiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJjYXRjaCIsImVycm9yIiwidGV4dENvbnRlbnQiLCJhbGxQMnNoaXBzU3VuayIsIm1ha2VBaU1vdmUiLCJhaUF0dGFja1Jlc3VsdCIsInNldFRpbWVvdXQiLCJyZXF1aXJlIiwiYmFja2dyb3VuZEltYWdlIiwic2hvdFNvdW5kIiwic3BsYXNoIiwic3Vua1NvdW5kIiwic3RhcnRNdXNpYyIsIndpbk11c2ljIiwibWFpbiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInBsYXllck5hbWUiLCJ0aGVTaG90Iiwic3RhcnRTb3VuZCIsInRoZVdpbiIsInRoZURlZmVhdCIsInNwbGFzaFNjcmVlbiIsImNsYXNzTGlzdCIsImFkZCIsInNwbGFzaFNjcmVlbkNvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJ0aXRsZSIsIm5hbWVQcm9tcHQiLCJwbGFjZWhvbGRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1cGRhdGVOYW1lIiwibWFpbkJ1dHRvbiIsImxvYWRHYW1lIiwiYXBwZW5kQ2hpbGQiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJzZXRVcERvbSIsImluaXRpYWxpc2UiLCJiYWNrZ3JvdW5kSW1nIiwic3R5bGUiLCJnYW1lQWN0aXZlIiwicmVzdGFydGFibGUiLCJkcm9wcGVkQXJyYXkiLCJub3REcm9wcGVkIiwicDFjYXJyaWVyIiwicDFiYXR0bGVzaGlwIiwicDFkZXN0cm95ZXIiLCJwMXN1Ym1hcmluZSIsInAxcGF0cm9sQm9hdCIsInAyY2FycmllciIsInAyYmF0dGxlc2hpcCIsInAyZGVzdHJveWVyIiwicDJzdWJtYXJpbmUiLCJwMnBhdHJvbEJvYXQiLCJwMUFsbFNoaXBzIiwicDJBbGxTaGlwcyIsImRyYWdnZWRTaGlwIiwicDJCb2FyZEluc3RhbmNlIiwic2hpcHlhcmRTaGlwcyIsInN0YXJ0R2FtZUJ1dHRvbiIsImdhbWVDb250YWluZXIiLCJzZXRBdHRyaWJ1dGUiLCJpbmZvU2VjdGlvbiIsInBsYXllcjFMYWJlbCIsInBsYXllcjJMYWJlbCIsInNoaXB5YXJkQ29udGFpbmVyIiwic2hpcHlhcmRMYWJlbCIsInNoaXB5YXJkIiwic2hpcDEiLCJzaGlwMiIsInNoaXAzIiwic2hpcDQiLCJzaGlwNSIsInNldHVwRXZlbnRMaXN0ZW5lcnMiLCJmb3JFYWNoIiwiZHJhZ2dhYmxlIiwiZHJhZ1N0YXJ0IiwiZHJhZ0VuZCIsImRyYWdPdmVyIiwiZHJvcFNoaXAiLCJzZWxlY3RUYXJnZXQiLCJob3ZlciIsInN0YXJ0R2FtZSIsImRpc2FibGVkIiwicGxhY2VQMlNoaXBzIiwicmVzZXRHYW1lIiwicHJldmVudERlZmF1bHQiLCJyZW1vdmUiLCJzdGFydENvbCIsInBhcnNlSW50IiwiZGF0YXNldCIsInN0YXJ0Um93IiwidGhpc1NoaXAiLCJpZCIsInNoaXBOYW1lIiwic2hpcFR5cGUiLCJwbGFjZW1lbnRSZXN1bHQiLCJjZWxsIiwiY29udGFpbnMiLCJoYW5kbGVSZXN1bHRWYWxpZGF0aW9uIiwiaGlnaGxpZ2h0ZWRDZWxsIiwidG9nZ2xlIiwiaXNHYW1lV29uIiwiaXNHYW1lTG9zdCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjb250YWluZXIiLCJib2FyZENvbnRhaW5lciIsInBsYXllcjFsYWJlbCIsInBsYXllcjJsYWJlbCIsInJvd0VsZW1lbnQiLCJjZWxsRWxlbWVudCIsIm9yaWVudGF0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==