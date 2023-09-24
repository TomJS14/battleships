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
        _main__WEBPACK_IMPORTED_MODULE_0__.messageBox.textContent = `You've got a ${attackResult}!`;
      }
      if (attackResult == "MISS") {
        _main__WEBPACK_IMPORTED_MODULE_0__.messageBox.textContent = `You Missed`;
      }
      if (attackResult == "SUNK") {
        _main__WEBPACK_IMPORTED_MODULE_0__.messageBox.textContent = `BOOM! You sunk computers ship`;
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
            _main__WEBPACK_IMPORTED_MODULE_0__.messageBox.textContent = `They've got a ${aiAttackResult}!`;
          }
          if (aiAttackResult == "MISS") {
            _main__WEBPACK_IMPORTED_MODULE_0__.messageBox.textContent = `They Missed!`;
          }
          if (aiAttackResult == "SUNK") {
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
/* harmony export */   player2Board: () => (/* binding */ player2Board)
/* harmony export */ });
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/game.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ "./src/render.js");
/** @format */
__webpack_require__(/*! ./styles.css */ "./src/styles.css");


const main = document.querySelector(".main");

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

  //Start button
  startGameButton = document.createElement("button");
  startGameButton.setAttribute("id", "start-button");
  startGameButton.setAttribute("class", "start");
  startGameButton.textContent = "Press to Start";
  gameContainer.appendChild(startGameButton);

  //Message box
  messageBox = document.createElement("div");
  messageBox.setAttribute("class", "message");
  gameContainer.appendChild(messageBox);

  //Gameboards
  const player1Label = document.createElement("p");
  const playerName = prompt("What's your name", "Player 1");
  //Check PlayerName for null, if so default to Player1
  player1Label.textContent = playerName ? playerName : "You";
  gameContainer.appendChild(player1Label);
  p1gameBoard = document.createElement("div");
  p1gameBoard.setAttribute("class", "player1-board");
  gameContainer.appendChild(p1gameBoard);
  const player2Label = document.createElement("p");
  player2Label.textContent = "Computer";
  gameContainer.appendChild(player2Label);
  p2gameBoard = document.createElement("div");
  p2gameBoard.setAttribute("class", "player2-board");
  gameContainer.appendChild(p2gameBoard);

  //Shipyard
  const shipyard = document.createElement("div");
  shipyard.setAttribute("class", "shipyard");
  gameContainer.appendChild(shipyard);
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
  main.appendChild(gameContainer);
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
function startGame() {
  if (droppedArray.length >= p1AllShips.length && gameActive == false && restartable == false) {
    messageBox.textContent = "Starting, the enemy is placing their ships...";
    gameActive = true;
    restartable = false;
    startGameButton.disabled = true;
    placeP2Ships();
  } else if (gameActive == false && restartable == true) {
    resetGame();
  } else {
    messageBox.textContent = "Place all of your ships first";
  }
}
function resetGame() {
  //Update Messages
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
      } else if (board[row][col] === "HIT") {
        cellElement.classList.add("hit");
        cellElement.classList.add("disabled");
      } else if (board[row][col] === "MISS") {
        cellElement.classList.add("miss");
        cellElement.classList.add("disabled");
      } else if (board[row][col] === "SUNK") {
        cellElement.classList.add("sunk");
        cellElement.classList.add("disabled");
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

.start {
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
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  width: 50%;
}

.message {
  border: 1px solid black;
  width: 20rem;
  height: 4rem;
}

.game-container {
  display: flex;
  flex-direction: column;
  margin: 35px;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.board-container {
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  width: 40vw;
}

.shipyard {
  background-color: cyan;
  width: 50vw;
  height: 40vw;
  margin: 10px;
}

.board-row {
  display: flex;
  border: 0.1px dotted #ccc;
}

.board-cell {
  flex: 1;
  width: 1rem;
  height: 1rem;
  border: 0.1px dotted #ccc;
  background-color: #1b95e0;
  cursor: url(${___CSS_LOADER_URL_REPLACEMENT_0___}) 12 12, crosshair;
}

.ship {
  background-color: grey;
  height: 1rem;
  border: 1px solid white;
}

.enemy-ship {
  background-color: orange;
  height: 1rem;
  border: 1px solid white;
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

/* [data-ship-type="carrier"] {
  background-color: #222 !important;
  border-radius: 6px;
  position: relative;
} */

/* [data-ship-type="carrier"]::before {
  content: "";
  width: 80%;
  height: 60%;
  background: #ccc;
  position: absolute;
  top: 10%;
  left: 10%;
}

[data-ship-type="carrier"]::after {
  content: "";
  width: 20px;
  height: 10px;
  background: #555;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
} */

/* [data-ship-type="destroyer"] {
  background-color: #222 !important;
  border-radius: 10px;
  position: absolute;
} */

.carrier {
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

.hit {
  background-color: red;
}

.sunk {
  background-color: red;
}

.miss {
  background-color: white;
}

.player1 {
  margin-bottom: 50px;
}
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA,aAAa;;AAEb;EACE,mBAAmB;EACnB,mBAAmB;EACnB,qCAAqC;EACrC,sBAAsB;EACtB,cAAc;EACd,eAAe;EACf;;;2BAGyB;EACzB,gBAAgB;EAChB,iBAAiB;EACjB,iBAAiB;EACjB,iBAAiB;EACjB,yBAAyB;EACzB,0BAA0B;EAC1B,kBAAkB;EAClB,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,UAAU;EACV,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;EAChB,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,uBAAuB;EACvB,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,mBAAmB;EACnB,uBAAuB;EACvB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,mCAAmC;EACnC,WAAW;AACb;;AAEA;EACE,sBAAsB;EACtB,WAAW;EACX,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,aAAa;EACb,yBAAyB;AAC3B;;AAEA;EACE,OAAO;EACP,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,yBAAyB;EACzB,gEAA6C;AAC/C;;AAEA;EACE,sBAAsB;EACtB,YAAY;EACZ,uBAAuB;AACzB;;AAEA;EACE,wBAAwB;EACxB,YAAY;EACZ,uBAAuB;AACzB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;;;;GAIG;;AAEH;;;;;;;;;;;;;;;;;;;GAmBG;;AAEH;;;;GAIG;;AAEH;EACE,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,mBAAmB;AACrB","sourcesContent":["/** @format */\n\n.start {\n  background: #5e5df0;\n  border-radius: 99px;\n  box-shadow: #5e5df0 0 10px 20px -10px;\n  box-sizing: border-box;\n  color: #ffffff;\n  cursor: pointer;\n  font-family: Inter, Helvetica, \"Apple Color Emoji\", \"Segoe UI Emoji\",\n    NotoColorEmoji, \"Noto Color Emoji\", \"Segoe UI Symbol\", \"Android Emoji\",\n    EmojiSymbols, -apple-system, system-ui, \"Segoe UI\", Roboto, \"Helvetica Neue\",\n    \"Noto Sans\", sans-serif;\n  font-weight: 700;\n  line-height: 24px;\n  padding: 8px 18px;\n  user-select: none;\n  -webkit-user-select: none;\n  touch-action: manipulation;\n  width: fit-content;\n  word-break: break-word;\n  border: 0;\n}\n\n.start:disabled {\n  opacity: 0;\n  cursor: auto;\n}\n\n.message {\n  font-size: 1.2rem;\n  font-weight: 500;\n  text-align: center;\n  width: 50%;\n}\n\n.message {\n  border: 1px solid black;\n  width: 20rem;\n  height: 4rem;\n}\n\n.game-container {\n  display: flex;\n  flex-direction: column;\n  margin: 35px;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n}\n\n.board-container {\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  width: 40vw;\n}\n\n.shipyard {\n  background-color: cyan;\n  width: 50vw;\n  height: 40vw;\n  margin: 10px;\n}\n\n.board-row {\n  display: flex;\n  border: 0.1px dotted #ccc;\n}\n\n.board-cell {\n  flex: 1;\n  width: 1rem;\n  height: 1rem;\n  border: 0.1px dotted #ccc;\n  background-color: #1b95e0;\n  cursor: url(\"crosshair.png\") 12 12, crosshair;\n}\n\n.ship {\n  background-color: grey;\n  height: 1rem;\n  border: 1px solid white;\n}\n\n.enemy-ship {\n  background-color: orange;\n  height: 1rem;\n  border: 1px solid white;\n}\n\n.draggable {\n  cursor: move;\n}\n\n.dragging {\n  opacity: 0.5;\n}\n\n.highlighted {\n  opacity: 0.5;\n}\n\n/* [data-ship-type=\"carrier\"] {\n  background-color: #222 !important;\n  border-radius: 6px;\n  position: relative;\n} */\n\n/* [data-ship-type=\"carrier\"]::before {\n  content: \"\";\n  width: 80%;\n  height: 60%;\n  background: #ccc;\n  position: absolute;\n  top: 10%;\n  left: 10%;\n}\n\n[data-ship-type=\"carrier\"]::after {\n  content: \"\";\n  width: 20px;\n  height: 10px;\n  background: #555;\n  position: absolute;\n  top: 10%;\n  left: 50%;\n  transform: translateX(-50%);\n} */\n\n/* [data-ship-type=\"destroyer\"] {\n  background-color: #222 !important;\n  border-radius: 10px;\n  position: absolute;\n} */\n\n.carrier {\n  width: 12rem;\n}\n\n.battleship {\n  width: 9rem;\n}\n\n.destroyer {\n  width: 7rem;\n}\n\n.submarine {\n  width: 7rem;\n}\n\n.patrolBoat {\n  width: 4.5rem;\n}\n\n.hit {\n  background-color: red;\n}\n\n.sunk {\n  background-color: red;\n}\n\n.miss {\n  background-color: white;\n}\n\n.player1 {\n  margin-bottom: 50px;\n}\n"],"sourceRoot":""}]);
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

module.exports = __webpack_require__.p + "d10e93beff8667cf82a1.png";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQVdnQjtBQUMyQjtBQUUzQyxJQUFJUyxhQUFhLEdBQUcsT0FBTztBQUUzQixNQUFNQyxJQUFJLEdBQUdBLENBQUNDLElBQUksRUFBRUMsTUFBTSxFQUFFQyxRQUFRLEVBQUVDLFVBQVUsRUFBRUMsVUFBVSxLQUFLO0VBQy9ELE1BQU1DLEdBQUcsR0FBSU4sSUFBSSxJQUFLO0lBQ3BCQSxJQUFJLENBQUNHLFFBQVEsRUFBRTtJQUNmLE9BQU9ILElBQUksQ0FBQ0csUUFBUTtFQUN0QixDQUFDO0VBQ0QsTUFBTUksTUFBTSxHQUFJUCxJQUFJLElBQUs7SUFDdkIsSUFBSUEsSUFBSSxDQUFDRyxRQUFRLEtBQUtILElBQUksQ0FBQ0UsTUFBTSxFQUFFO01BQ2pDRixJQUFJLENBQUNJLFVBQVUsR0FBRyxJQUFJO0lBQ3hCO0lBQ0EsT0FBT0osSUFBSSxDQUFDSSxVQUFVO0VBQ3hCLENBQUM7RUFFRCxPQUFPO0lBQUVILElBQUk7SUFBRUMsTUFBTTtJQUFFQyxRQUFRO0lBQUVDLFVBQVU7SUFBRUUsR0FBRztJQUFFQyxNQUFNO0lBQUVGO0VBQVcsQ0FBQztBQUN4RSxDQUFDO0FBRUQsTUFBTUcsU0FBUyxHQUFJQyxRQUFRLElBQUs7RUFDOUIsTUFBTUMsV0FBVyxHQUFHQSxDQUFBLEtBQU07SUFDeEIsTUFBTUMsS0FBSyxHQUFHLElBQUlDLEtBQUssQ0FBQ0gsUUFBUSxDQUFDLENBQzlCSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ1ZDLEdBQUcsQ0FBQyxNQUFNLElBQUlGLEtBQUssQ0FBQ0gsUUFBUSxDQUFDLENBQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQyxPQUFPRixLQUFLO0VBQ2QsQ0FBQztFQUVELE1BQU1JLFVBQVUsR0FBR0EsQ0FBQSxLQUFNO0lBQ3ZCO0lBQ0EsU0FBSSxDQUFDSixLQUFLLEdBQUcsRUFBRTtJQUNmLFNBQUksQ0FBQ0EsS0FBSyxHQUFHLFNBQUksQ0FBQ0QsV0FBVyxDQUFDLENBQUM7RUFDakMsQ0FBQztFQUVELE1BQU1NLFNBQVMsR0FBR0EsQ0FBQ0wsS0FBSyxFQUFFWCxJQUFJLEVBQUVpQixXQUFXLEVBQUVDLFdBQVcsS0FBSztJQUMzRCxNQUFNYixVQUFVLEdBQUdMLElBQUksQ0FBQ0ssVUFBVTtJQUNsQyxNQUFNYyxVQUFVLEdBQUduQixJQUFJLENBQUNFLE1BQU07SUFDOUJGLElBQUksQ0FBQ2lCLFdBQVcsR0FBR0EsV0FBVztJQUM5QmpCLElBQUksQ0FBQ2tCLFdBQVcsR0FBR0EsV0FBVztJQUM5QjtJQUNBLElBQ0diLFVBQVUsSUFBSVksV0FBVyxHQUFHRSxVQUFVLEdBQUdWLFFBQVEsSUFDakQsQ0FBQ0osVUFBVSxJQUFJYSxXQUFXLEdBQUdDLFVBQVUsR0FBR1YsUUFBUyxFQUNwRDtNQUNBLE9BQU8sSUFBSSxDQUFDLENBQUM7SUFDZjs7SUFFQTtJQUNBLEtBQUssSUFBSVcsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRCxVQUFVLEVBQUVDLENBQUMsRUFBRSxFQUFFO01BQ25DLElBQUlmLFVBQVUsRUFBRTtRQUNkLElBQUlNLEtBQUssQ0FBQ00sV0FBVyxHQUFHRyxDQUFDLENBQUMsQ0FBQ0YsV0FBVyxDQUFDLEtBQUssT0FBTyxFQUFFO1VBQ25ELE9BQU8sSUFBSTtRQUNiO01BQ0YsQ0FBQyxNQUFNO1FBQ0wsSUFBSVAsS0FBSyxDQUFDTSxXQUFXLENBQUMsQ0FBQ0MsV0FBVyxHQUFHRSxDQUFDLENBQUMsS0FBSyxPQUFPLEVBQUU7VUFDbkQsT0FBTyxJQUFJO1FBQ2I7TUFDRjtJQUNGOztJQUVBO0lBQ0EsS0FBSyxJQUFJQSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdELFVBQVUsRUFBRUMsQ0FBQyxFQUFFLEVBQUU7TUFDbkMsSUFBSWYsVUFBVSxFQUFFO1FBQ2RNLEtBQUssQ0FBQ00sV0FBVyxHQUFHRyxDQUFDLENBQUMsQ0FBQ0YsV0FBVyxDQUFDLEdBQUdsQixJQUFJO01BQzVDLENBQUMsTUFBTTtRQUNMVyxLQUFLLENBQUNNLFdBQVcsQ0FBQyxDQUFDQyxXQUFXLEdBQUdFLENBQUMsQ0FBQyxHQUFHcEIsSUFBSTtNQUM1QztJQUNGO0lBRUEsT0FBT1csS0FBSztFQUNkLENBQUM7RUFFRCxNQUFNVSxhQUFhLEdBQUdBLENBQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFFWixLQUFLLEVBQUVhLEtBQUssS0FBSztJQUNoRCxJQUFJYixLQUFLLENBQUNXLEdBQUcsQ0FBQyxDQUFDQyxHQUFHLENBQUMsS0FBSyxPQUFPLEVBQUU7TUFDL0JaLEtBQUssQ0FBQ1csR0FBRyxDQUFDLENBQUNDLEdBQUcsQ0FBQyxHQUFHLE1BQU07TUFDeEIsT0FBTyxNQUFNO0lBQ2YsQ0FBQyxNQUFNLElBQUksT0FBT1osS0FBSyxDQUFDVyxHQUFHLENBQUMsQ0FBQ0MsR0FBRyxDQUFDLENBQUNqQixHQUFHLEtBQUssVUFBVSxFQUFFO01BQ3BELE1BQU1OLElBQUksR0FBR1csS0FBSyxDQUFDVyxHQUFHLENBQUMsQ0FBQ0MsR0FBRyxDQUFDO01BQzVCdkIsSUFBSSxDQUFDTSxHQUFHLENBQUNOLElBQUksQ0FBQztNQUVkLElBQUlBLElBQUksQ0FBQ08sTUFBTSxDQUFDUCxJQUFJLENBQUMsRUFBRTtRQUNyQixLQUFLLElBQUlvQixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdwQixJQUFJLENBQUNFLE1BQU0sRUFBRWtCLENBQUMsRUFBRSxFQUFFO1VBQ3BDLElBQUlwQixJQUFJLENBQUNLLFVBQVUsRUFBRTtZQUNuQk0sS0FBSyxDQUFDWCxJQUFJLENBQUNpQixXQUFXLEdBQUdHLENBQUMsQ0FBQyxDQUFDcEIsSUFBSSxDQUFDa0IsV0FBVyxDQUFDLEdBQUcsTUFBTTtVQUN4RCxDQUFDLE1BQU07WUFDTFAsS0FBSyxDQUFDWCxJQUFJLENBQUNpQixXQUFXLENBQUMsQ0FBQ2pCLElBQUksQ0FBQ2tCLFdBQVcsR0FBR0UsQ0FBQyxDQUFDLEdBQUcsTUFBTTtVQUN4RDtRQUNGO1FBQ0FLLFdBQVcsQ0FBQ0QsS0FBSyxDQUFDO1FBQ2xCLE9BQU8sTUFBTTtNQUNmO01BQ0FiLEtBQUssQ0FBQ1csR0FBRyxDQUFDLENBQUNDLEdBQUcsQ0FBQyxHQUFHLEtBQUs7TUFDdkJFLFdBQVcsQ0FBQ0QsS0FBSyxDQUFDO01BRWxCLE9BQU8sS0FBSztJQUNkO0VBQ0YsQ0FBQztFQUVELE1BQU1DLFdBQVcsR0FBSUQsS0FBSyxJQUFLO0lBQzdCO0lBQ0EsTUFBTUUsWUFBWSxHQUFHRixLQUFLLENBQUNHLEtBQUssQ0FBRTNCLElBQUksSUFBS0EsSUFBSSxDQUFDSSxVQUFVLENBQUM7SUFFM0QsSUFBSXNCLFlBQVksRUFBRTtNQUNoQixPQUFPLElBQUk7O01BRVg7SUFDRjs7SUFDQSxPQUFPLEtBQUs7RUFDZCxDQUFDO0VBRUQsT0FBTztJQUFFaEIsV0FBVztJQUFFSyxVQUFVO0lBQUVDLFNBQVM7SUFBRUssYUFBYTtJQUFFSTtFQUFZLENBQUM7QUFDM0UsQ0FBQztBQUVELE1BQU1HLE1BQU0sR0FBR0EsQ0FBQ0MsSUFBSSxFQUFFbEIsS0FBSyxFQUFFVixJQUFJLEVBQUV1QixLQUFLLEtBQUs7RUFDM0MsTUFBTU0sT0FBTyxHQUFHQSxDQUFBLEtBQU1ELElBQUksQ0FBQyxDQUFDOztFQUU1QixNQUFNRSxPQUFPLEdBQUdBLENBQUEsS0FBTTlCLElBQUksQ0FBQyxDQUFDOztFQUU1QixNQUFNK0IsV0FBVyxHQUFHQSxDQUFBLEtBQU07SUFDeEI7SUFDQSxNQUFNQyxjQUFjLEdBQUcsRUFBRTtJQUV6QixLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3ZCLEtBQUssQ0FBQ1QsTUFBTSxFQUFFZ0MsQ0FBQyxFQUFFLEVBQUU7TUFDckMsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUd4QixLQUFLLENBQUN1QixDQUFDLENBQUMsQ0FBQ2hDLE1BQU0sRUFBRWlDLENBQUMsRUFBRSxFQUFFO1FBQ3hDLElBQ0V4QixLQUFLLENBQUN1QixDQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLEtBQUssTUFBTSxJQUN0QnhCLEtBQUssQ0FBQ3VCLENBQUMsQ0FBQyxDQUFDQyxDQUFDLENBQUMsS0FBSyxLQUFLLElBQ3JCeEIsS0FBSyxDQUFDdUIsQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFDdEI7VUFDQUYsY0FBYyxDQUFDRyxJQUFJLENBQUM7WUFBRUYsQ0FBQztZQUFFQztVQUFFLENBQUMsQ0FBQztRQUMvQjtNQUNGO0lBQ0Y7SUFDQSxNQUFNRSxXQUFXLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUdQLGNBQWMsQ0FBQy9CLE1BQU0sQ0FBQztJQUNyRSxNQUFNdUMsUUFBUSxHQUFHUixjQUFjLENBQUNJLFdBQVcsQ0FBQztJQUM1QyxPQUFPSSxRQUFRO0VBQ2pCLENBQUM7RUFFRCxNQUFNQyxNQUFNLEdBQUdBLENBQUNDLEtBQUssRUFBRVQsQ0FBQyxFQUFFQyxDQUFDLEtBQUs7SUFDOUIsSUFBSXBDLGFBQWEsS0FBSyxPQUFPLEVBQUU7TUFDN0IsTUFBTTZDLFVBQVUsR0FBR2xELGtEQUFlO01BQ2xDLE1BQU1tRCxZQUFZLEdBQUdELFVBQVUsQ0FBQ3ZCLGFBQWEsQ0FDM0NhLENBQUMsRUFDREMsQ0FBQyxFQUNEUSxLQUFLLENBQUNoQyxLQUFLLEVBQ1hnQyxLQUFLLENBQUNuQixLQUNSLENBQUM7O01BRUQ7TUFDQSxJQUFJcUIsWUFBWSxJQUFJLEtBQUssRUFBRTtRQUN6QmhELDZDQUFVLENBQUNpRCxXQUFXLEdBQUksZ0JBQWVELFlBQWEsR0FBRTtNQUMxRDtNQUNBLElBQUlBLFlBQVksSUFBSSxNQUFNLEVBQUU7UUFDMUJoRCw2Q0FBVSxDQUFDaUQsV0FBVyxHQUFJLFlBQVc7TUFDdkM7TUFDQSxJQUFJRCxZQUFZLElBQUksTUFBTSxFQUFFO1FBQzFCaEQsNkNBQVUsQ0FBQ2lELFdBQVcsR0FBSSwrQkFBOEI7TUFDMUQ7TUFFQWhELHdEQUFlLENBQUNMLCtDQUFZLEVBQUVHLDhDQUFXLENBQUM7TUFDMUMsTUFBTW1ELGNBQWMsR0FBR0osS0FBSyxDQUFDbkIsS0FBSyxDQUFDRyxLQUFLLENBQUUzQixJQUFJLElBQUtBLElBQUksQ0FBQ0ksVUFBVSxDQUFDOztNQUVuRTtNQUNBLElBQUksQ0FBQzJDLGNBQWMsRUFBRTtRQUNuQmhELGFBQWEsR0FBRyxVQUFVO1FBQzFCLFNBQVNpRCxVQUFVQSxDQUFBLEVBQUc7VUFDcEIsTUFBTVAsUUFBUSxHQUFHVCxXQUFXLENBQUMsQ0FBQztVQUM5QixNQUFNaUIsY0FBYyxHQUFHdkQsa0RBQWUsQ0FBQzJCLGFBQWEsQ0FDbERvQixRQUFRLENBQUNQLENBQUMsRUFDVk8sUUFBUSxDQUFDTixDQUFDLEVBQ1Y3QywwQ0FBTyxDQUFDcUIsS0FBSyxFQUNickIsMENBQU8sQ0FBQ2tDLEtBQ1YsQ0FBQzs7VUFFRDtVQUNBLElBQUl5QixjQUFjLElBQUksS0FBSyxFQUFFO1lBQzNCcEQsNkNBQVUsQ0FBQ2lELFdBQVcsR0FBSSxpQkFBZ0JHLGNBQWUsR0FBRTtVQUM3RDtVQUNBLElBQUlBLGNBQWMsSUFBSSxNQUFNLEVBQUU7WUFDNUJwRCw2Q0FBVSxDQUFDaUQsV0FBVyxHQUFJLGNBQWE7VUFDekM7VUFDQSxJQUFJRyxjQUFjLElBQUksTUFBTSxFQUFFO1lBQzVCcEQsNkNBQVUsQ0FBQ2lELFdBQVcsR0FBSSxnQ0FBK0I7VUFDM0Q7VUFFQWhELHdEQUFlLENBQUNOLCtDQUFZLEVBQUVHLDhDQUFXLENBQUM7VUFDMUNJLGFBQWEsR0FBRyxPQUFPO1FBQ3pCO1FBQ0FtRCxVQUFVLENBQUNGLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO01BQy9CO0lBQ0Y7O0lBRUE7SUFDQSxPQUFPbEQsb0RBQWU7RUFDeEIsQ0FBQztFQUVELE9BQU87SUFDTCtCLElBQUk7SUFDSmxCLEtBQUs7SUFDTFYsSUFBSTtJQUNKNkIsT0FBTztJQUNQQyxPQUFPO0lBQ1BXLE1BQU07SUFDTlYsV0FBVztJQUNYUjtFQUNGLENBQUM7QUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDek5EO0FBQ0EyQixtQkFBTyxDQUFDLHNDQUFjLENBQUM7QUFFNkI7QUFDTjtBQUM5QyxNQUFNQyxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE9BQU8sQ0FBQzs7QUFFNUM7QUFDQSxJQUFJQyxVQUFVLEdBQUcsS0FBSztBQUN0QixJQUFJQyxXQUFXLEdBQUcsS0FBSztBQUN2QixJQUFJQyxZQUFZLEdBQUcsRUFBRTtBQUNyQixJQUFJQyxVQUFVO0FBQ2QsSUFBSUMsU0FBUyxFQUFFQyxZQUFZLEVBQUVDLFdBQVcsRUFBRUMsV0FBVyxFQUFFQyxZQUFZO0FBQ25FLElBQUlDLFNBQVMsRUFBRUMsWUFBWSxFQUFFQyxXQUFXLEVBQUVDLFdBQVcsRUFBRUMsWUFBWTtBQUNuRSxJQUFJQyxVQUFVLEVBQUVDLFVBQVU7QUFDMUIsSUFBSUMsV0FBVztBQUNmLElBQUk5RCxRQUFRLEdBQUcsRUFBRTtBQUNqQixJQUFJZixlQUFlLEdBQUdjLG1EQUFTLENBQUNDLFFBQVEsQ0FBQztBQUN6QyxJQUFJakIsWUFBWSxHQUFHRSxlQUFlLENBQUNnQixXQUFXLENBQUMsQ0FBQztBQUNoRCxJQUFJOEQsZUFBZSxHQUFHaEUsbURBQVMsQ0FBQ0MsUUFBUSxDQUFDO0FBQ3pDLElBQUloQixZQUFZLEdBQUcrRSxlQUFlLENBQUM5RCxXQUFXLENBQUMsQ0FBQztBQUNoRCxJQUFJcEIsT0FBTztBQUNYLElBQUlDLE9BQU87QUFDWCxJQUFJSSxXQUFXLEVBQUVDLFdBQVc7QUFDNUIsSUFBSTZFLGFBQWE7QUFDakIsSUFBSUMsZUFBZTtBQUNuQixJQUFJN0UsVUFBVTtBQUVkLFNBQVM4RSxRQUFRQSxDQUFBLEVBQUc7RUFDbEI7RUFDQSxNQUFNQyxhQUFhLEdBQUd2QixRQUFRLENBQUN3QixhQUFhLENBQUMsS0FBSyxDQUFDO0VBQ25ERCxhQUFhLENBQUNFLFlBQVksQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUM7O0VBRXJEO0VBQ0FKLGVBQWUsR0FBR3JCLFFBQVEsQ0FBQ3dCLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDbERILGVBQWUsQ0FBQ0ksWUFBWSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUM7RUFDbERKLGVBQWUsQ0FBQ0ksWUFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7RUFDOUNKLGVBQWUsQ0FBQzVCLFdBQVcsR0FBRyxnQkFBZ0I7RUFDOUM4QixhQUFhLENBQUNHLFdBQVcsQ0FBQ0wsZUFBZSxDQUFDOztFQUUxQztFQUNBN0UsVUFBVSxHQUFHd0QsUUFBUSxDQUFDd0IsYUFBYSxDQUFDLEtBQUssQ0FBQztFQUMxQ2hGLFVBQVUsQ0FBQ2lGLFlBQVksQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO0VBQzNDRixhQUFhLENBQUNHLFdBQVcsQ0FBQ2xGLFVBQVUsQ0FBQzs7RUFFckM7RUFDQSxNQUFNbUYsWUFBWSxHQUFHM0IsUUFBUSxDQUFDd0IsYUFBYSxDQUFDLEdBQUcsQ0FBQztFQUNoRCxNQUFNSSxVQUFVLEdBQUdDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLENBQUM7RUFDekQ7RUFDQUYsWUFBWSxDQUFDbEMsV0FBVyxHQUFHbUMsVUFBVSxHQUFHQSxVQUFVLEdBQUcsS0FBSztFQUMxREwsYUFBYSxDQUFDRyxXQUFXLENBQUNDLFlBQVksQ0FBQztFQUN2Q3JGLFdBQVcsR0FBRzBELFFBQVEsQ0FBQ3dCLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDM0NsRixXQUFXLENBQUNtRixZQUFZLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQztFQUNsREYsYUFBYSxDQUFDRyxXQUFXLENBQUNwRixXQUFXLENBQUM7RUFDdEMsTUFBTXdGLFlBQVksR0FBRzlCLFFBQVEsQ0FBQ3dCLGFBQWEsQ0FBQyxHQUFHLENBQUM7RUFDaERNLFlBQVksQ0FBQ3JDLFdBQVcsR0FBRyxVQUFVO0VBQ3JDOEIsYUFBYSxDQUFDRyxXQUFXLENBQUNJLFlBQVksQ0FBQztFQUN2Q3ZGLFdBQVcsR0FBR3lELFFBQVEsQ0FBQ3dCLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDM0NqRixXQUFXLENBQUNrRixZQUFZLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQztFQUNsREYsYUFBYSxDQUFDRyxXQUFXLENBQUNuRixXQUFXLENBQUM7O0VBRXRDO0VBQ0EsTUFBTXdGLFFBQVEsR0FBRy9CLFFBQVEsQ0FBQ3dCLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDOUNPLFFBQVEsQ0FBQ04sWUFBWSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUM7RUFDMUNGLGFBQWEsQ0FBQ0csV0FBVyxDQUFDSyxRQUFRLENBQUM7RUFDbkNBLFFBQVEsQ0FBQ3RDLFdBQVcsR0FBRyxFQUFFOztFQUV6QjtFQUNBLE1BQU11QyxLQUFLLEdBQUdoQyxRQUFRLENBQUN3QixhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzNDUSxLQUFLLENBQUNQLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLENBQUM7RUFDL0NPLEtBQUssQ0FBQ1AsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7RUFDN0JPLEtBQUssQ0FBQ1AsWUFBWSxDQUFDLE9BQU8sRUFBRSx3QkFBd0IsQ0FBQztFQUNyRE8sS0FBSyxDQUFDUCxZQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztFQUN2Q00sUUFBUSxDQUFDTCxXQUFXLENBQUNNLEtBQUssQ0FBQzs7RUFFM0I7RUFDQSxNQUFNQyxLQUFLLEdBQUdqQyxRQUFRLENBQUN3QixhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzNDUyxLQUFLLENBQUNSLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLENBQUM7RUFDakRRLEtBQUssQ0FBQ1IsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7RUFDN0JRLEtBQUssQ0FBQ1IsWUFBWSxDQUFDLE9BQU8sRUFBRSwwQkFBMEIsQ0FBQztFQUN2RFEsS0FBSyxDQUFDUixZQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztFQUN2Q00sUUFBUSxDQUFDTCxXQUFXLENBQUNPLEtBQUssQ0FBQzs7RUFFM0I7RUFDQSxNQUFNQyxLQUFLLEdBQUdsQyxRQUFRLENBQUN3QixhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzNDVSxLQUFLLENBQUNULFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLENBQUM7RUFDbERTLEtBQUssQ0FBQ1QsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7RUFDN0JTLEtBQUssQ0FBQ1QsWUFBWSxDQUFDLE9BQU8sRUFBRSwyQkFBMkIsQ0FBQztFQUN4RFMsS0FBSyxDQUFDVCxZQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztFQUN2Q00sUUFBUSxDQUFDTCxXQUFXLENBQUNRLEtBQUssQ0FBQzs7RUFFM0I7RUFDQSxNQUFNQyxLQUFLLEdBQUduQyxRQUFRLENBQUN3QixhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzNDVyxLQUFLLENBQUNWLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLENBQUM7RUFDakRVLEtBQUssQ0FBQ1YsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7RUFDN0JVLEtBQUssQ0FBQ1YsWUFBWSxDQUFDLE9BQU8sRUFBRSwwQkFBMEIsQ0FBQztFQUN2RFUsS0FBSyxDQUFDVixZQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztFQUN2Q00sUUFBUSxDQUFDTCxXQUFXLENBQUNTLEtBQUssQ0FBQzs7RUFFM0I7RUFDQSxNQUFNQyxLQUFLLEdBQUdwQyxRQUFRLENBQUN3QixhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzNDWSxLQUFLLENBQUNYLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLENBQUM7RUFDbERXLEtBQUssQ0FBQ1gsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7RUFDN0JXLEtBQUssQ0FBQ1gsWUFBWSxDQUFDLE9BQU8sRUFBRSwyQkFBMkIsQ0FBQztFQUN4RFcsS0FBSyxDQUFDWCxZQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztFQUN2Q00sUUFBUSxDQUFDTCxXQUFXLENBQUNVLEtBQUssQ0FBQztFQUUzQmhCLGFBQWEsR0FBRyxDQUFDWSxLQUFLLEVBQUVDLEtBQUssRUFBRUMsS0FBSyxFQUFFQyxLQUFLLEVBQUVDLEtBQUssQ0FBQztFQUVuRHJDLElBQUksQ0FBQzJCLFdBQVcsQ0FBQ0gsYUFBYSxDQUFDO0VBRS9CLE9BQU87SUFDTEEsYUFBYTtJQUNiakYsV0FBVztJQUNYQyxXQUFXO0lBQ1g4RSxlQUFlO0lBQ2ZVLFFBQVE7SUFDUlgsYUFBYTtJQUNiNUU7RUFDRixDQUFDO0FBQ0g7QUFFQSxTQUFTNkYsVUFBVUEsQ0FBQSxFQUFHO0VBQ3BCL0IsU0FBUyxHQUFHM0QsOENBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO0VBQzlDNEQsWUFBWSxHQUFHNUQsOENBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO0VBQ3JENkQsV0FBVyxHQUFHN0QsOENBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO0VBQ25EOEQsV0FBVyxHQUFHOUQsOENBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO0VBQ25EK0QsWUFBWSxHQUFHL0QsOENBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO0VBRXJEcUUsVUFBVSxHQUFHLENBQ1hWLFNBQVMsRUFDVEMsWUFBWSxFQUNaQyxXQUFXLEVBQ1hDLFdBQVcsRUFDWEMsWUFBWSxDQUNiO0VBRURDLFNBQVMsR0FBR2hFLDhDQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztFQUMvQ2lFLFlBQVksR0FBR2pFLDhDQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztFQUNyRGtFLFdBQVcsR0FBR2xFLDhDQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztFQUNuRG1FLFdBQVcsR0FBR25FLDhDQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztFQUNuRG9FLFlBQVksR0FBR3BFLDhDQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztFQUVyRHNFLFVBQVUsR0FBRyxDQUNYTixTQUFTLEVBQ1RFLFdBQVcsRUFDWEQsWUFBWSxFQUNaRSxXQUFXLEVBQ1hDLFlBQVksQ0FDYjs7RUFFRDtFQUNBOUUsT0FBTyxHQUFHc0MsZ0RBQU0sQ0FDZCxVQUFVLEVBQ1ZwQyxZQUFZLEVBQ1osT0FBTyxFQUNQNkUsVUFBVSxFQUNWM0UsZUFDRixDQUFDO0VBRURILE9BQU8sR0FBR3FDLGdEQUFNLENBQUMsVUFBVSxFQUFFbkMsWUFBWSxFQUFFLElBQUksRUFBRTZFLFVBQVUsRUFBRUUsZUFBZSxDQUFDO0VBRTdFMUUsMkRBQWUsQ0FBQ04sWUFBWSxFQUFFRyxXQUFXLENBQUM7RUFDMUNHLDJEQUFlLENBQUNMLFlBQVksRUFBRUcsV0FBVyxDQUFDOztFQUUxQztFQUNBK0YsbUJBQW1CLENBQUNoRyxXQUFXLEVBQUVDLFdBQVcsQ0FBQztFQUU3QyxPQUFPO0lBQ0xOLE9BQU87SUFDUEUsWUFBWTtJQUNaNkUsVUFBVTtJQUNWOUUsT0FBTztJQUNQRSxZQUFZO0lBQ1o2RTtFQUNGLENBQUM7QUFDSDtBQUVBLFNBQVNxQixtQkFBbUJBLENBQUNoRyxXQUFXLEVBQUVDLFdBQVcsRUFBRTtFQUNyRDZFLGFBQWEsQ0FBQ21CLE9BQU8sQ0FBRUMsU0FBUyxJQUFLO0lBQ25DQSxTQUFTLENBQUNDLGdCQUFnQixDQUFDLFdBQVcsRUFBRUMsU0FBUyxDQUFDO0lBQ2xERixTQUFTLENBQUNDLGdCQUFnQixDQUFDLFNBQVMsRUFBRUUsT0FBTyxDQUFDO0VBQ2hELENBQUMsQ0FBQztFQUVGckcsV0FBVyxDQUFDbUcsZ0JBQWdCLENBQUMsVUFBVSxFQUFFRyxRQUFRLENBQUM7RUFDbER0RyxXQUFXLENBQUNtRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUVJLFFBQVEsQ0FBQztFQUU5Q3RHLFdBQVcsQ0FBQ2tHLGdCQUFnQixDQUFDLE9BQU8sRUFBRUssWUFBWSxDQUFDO0VBQ25EdkcsV0FBVyxDQUFDa0csZ0JBQWdCLENBQUMsV0FBVyxFQUFFTSxLQUFLLENBQUM7RUFDaER4RyxXQUFXLENBQUNrRyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUVNLEtBQUssQ0FBQztFQUMvQzFCLGVBQWUsQ0FBQ29CLGdCQUFnQixDQUFDLE9BQU8sRUFBRU8sU0FBUyxDQUFDO0FBQ3REO0FBRUEsU0FBU0EsU0FBU0EsQ0FBQSxFQUFHO0VBQ25CLElBQ0U1QyxZQUFZLENBQUN2RCxNQUFNLElBQUltRSxVQUFVLENBQUNuRSxNQUFNLElBQ3hDcUQsVUFBVSxJQUFJLEtBQUssSUFDbkJDLFdBQVcsSUFBSSxLQUFLLEVBQ3BCO0lBQ0EzRCxVQUFVLENBQUNpRCxXQUFXLEdBQUcsK0NBQStDO0lBQ3hFUyxVQUFVLEdBQUcsSUFBSTtJQUNqQkMsV0FBVyxHQUFHLEtBQUs7SUFDbkJrQixlQUFlLENBQUM0QixRQUFRLEdBQUcsSUFBSTtJQUUvQkMsWUFBWSxDQUFDLENBQUM7RUFDaEIsQ0FBQyxNQUFNLElBQUloRCxVQUFVLElBQUksS0FBSyxJQUFJQyxXQUFXLElBQUksSUFBSSxFQUFFO0lBQ3JEZ0QsU0FBUyxDQUFDLENBQUM7RUFDYixDQUFDLE1BQU07SUFDTDNHLFVBQVUsQ0FBQ2lELFdBQVcsR0FBRywrQkFBK0I7RUFDMUQ7QUFDRjtBQUVBLFNBQVMwRCxTQUFTQSxDQUFBLEVBQUc7RUFDbkI7RUFDQTNHLFVBQVUsQ0FBQ2lELFdBQVcsR0FBRywrQkFBK0I7RUFDeEQ0QixlQUFlLENBQUM1QixXQUFXLEdBQUcsWUFBWTtFQUMxQztFQUNBVSxXQUFXLEdBQUcsS0FBSztFQUNuQkQsVUFBVSxHQUFHLEtBQUs7RUFDbEJFLFlBQVksR0FBRyxFQUFFO0VBQ2pCL0QsZUFBZSxHQUFHYyxtREFBUyxDQUFDQyxRQUFRLENBQUM7RUFDckNqQixZQUFZLEdBQUdFLGVBQWUsQ0FBQ2dCLFdBQVcsQ0FBQyxDQUFDO0VBQzVDOEQsZUFBZSxHQUFHaEUsbURBQVMsQ0FBQ0MsUUFBUSxDQUFDO0VBQ3JDaEIsWUFBWSxHQUFHK0UsZUFBZSxDQUFDOUQsV0FBVyxDQUFDLENBQUM7RUFDNUNnRixVQUFVLENBQUMsQ0FBQzs7RUFFWjtFQUNBdEMsSUFBSSxDQUFDTixXQUFXLEdBQUcsRUFBRTs7RUFFckI7RUFDQSxNQUFNO0lBQUVuRCxXQUFXO0lBQUVDO0VBQVksQ0FBQyxHQUFHK0UsUUFBUSxDQUFDLENBQUM7RUFFL0M3RSwyREFBZSxDQUFDTixZQUFZLEVBQUVHLFdBQVcsQ0FBQztFQUMxQ0csMkRBQWUsQ0FBQ0wsWUFBWSxFQUFFRyxXQUFXLENBQUM7RUFDMUMrRixtQkFBbUIsQ0FBQ2hHLFdBQVcsRUFBRUMsV0FBVyxDQUFDO0FBQy9DO0FBRUEsU0FBUzJHLFlBQVlBLENBQUEsRUFBRztFQUN0Qi9CLGVBQWUsQ0FBQ3hELFNBQVMsQ0FBQ3ZCLFlBQVksRUFBRXVFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3hEUSxlQUFlLENBQUN4RCxTQUFTLENBQUN2QixZQUFZLEVBQUV5RSxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUMxRE0sZUFBZSxDQUFDeEQsU0FBUyxDQUFDdkIsWUFBWSxFQUFFd0UsWUFBWSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDM0RPLGVBQWUsQ0FBQ3hELFNBQVMsQ0FBQ3ZCLFlBQVksRUFBRTBFLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzFESyxlQUFlLENBQUN4RCxTQUFTLENBQUN2QixZQUFZLEVBQUUyRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUMzRHRFLDJEQUFlLENBQUNMLFlBQVksRUFBRUcsV0FBVyxDQUFDO0FBQzVDO0FBRUEsU0FBU21HLFNBQVNBLENBQUNVLENBQUMsRUFBRTtFQUNwQmxDLFdBQVcsR0FBR2tDLENBQUMsQ0FBQ0MsTUFBTTtFQUN0Qm5DLFdBQVcsQ0FBQ29DLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztFQUNyQ2xELFVBQVUsR0FBRyxLQUFLO0FBQ3BCO0FBRUEsU0FBU3VDLFFBQVFBLENBQUNRLENBQUMsRUFBRTtFQUNuQi9DLFVBQVUsR0FBRyxLQUFLO0VBRWxCK0MsQ0FBQyxDQUFDSSxjQUFjLENBQUMsQ0FBQztBQUNwQjtBQUVBLFNBQVNiLE9BQU9BLENBQUNTLENBQUMsRUFBRTtFQUNsQmxDLFdBQVcsQ0FBQ29DLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUMxQztBQUVBLFNBQVNaLFFBQVFBLENBQUNPLENBQUMsRUFBRTtFQUNuQkEsQ0FBQyxDQUFDSSxjQUFjLENBQUMsQ0FBQztFQUNsQixNQUFNRSxRQUFRLEdBQUdDLFFBQVEsQ0FBQ1AsQ0FBQyxDQUFDQyxNQUFNLENBQUNPLE9BQU8sQ0FBQzFGLEdBQUcsRUFBRSxFQUFFLENBQUM7RUFDbkQsTUFBTTJGLFFBQVEsR0FBR0YsUUFBUSxDQUFDUCxDQUFDLENBQUNDLE1BQU0sQ0FBQ08sT0FBTyxDQUFDM0YsR0FBRyxFQUFFLEVBQUUsQ0FBQztFQUVuRCxNQUFNNkYsUUFBUSxHQUFHOUMsVUFBVSxDQUFDRSxXQUFXLENBQUM2QyxFQUFFLENBQUM7RUFDM0MsTUFBTUMsUUFBUSxHQUFHOUMsV0FBVyxDQUFDMEMsT0FBTyxDQUFDSyxRQUFRO0VBQzdDLE1BQU1DLGVBQWUsR0FBRzdILGVBQWUsQ0FBQ3NCLFNBQVMsQ0FDL0N4QixZQUFZLEVBQ1oySCxRQUFRLEVBQ1JELFFBQVEsRUFDUkgsUUFDRixDQUFDO0VBRUQsSUFBSVEsZUFBZSxFQUFFO0lBQ25COUQsWUFBWSxDQUFDckIsSUFBSSxDQUFDK0UsUUFBUSxDQUFDO0lBQzNCekgsZUFBZSxDQUFDc0IsU0FBUyxDQUFDeEIsWUFBWSxFQUFFMkgsUUFBUSxFQUFFRCxRQUFRLEVBQUVILFFBQVEsQ0FBQztJQUNyRXhDLFdBQVcsQ0FBQ3VDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCakgsVUFBVSxDQUFDaUQsV0FBVyxHQUFJLHNCQUFxQnVFLFFBQVMsRUFBQztFQUMzRCxDQUFDLE1BQU07SUFDTDNELFVBQVUsR0FBRyxJQUFJO0lBQ2pCN0QsVUFBVSxDQUFDaUQsV0FBVyxHQUFHLDRCQUE0QjtFQUN2RDtFQUNBaEQsMkRBQWUsQ0FBQ04sWUFBWSxFQUFFRyxXQUFXLENBQUM7RUFDMUM0RSxXQUFXLENBQUNvQyxTQUFTLENBQUNHLE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDMUM7QUFFQSxTQUFTWCxZQUFZQSxDQUFDTSxDQUFDLEVBQUU7RUFDdkIsSUFBSWxELFVBQVUsRUFBRTtJQUNkLElBQUlpRSxJQUFJLEdBQUdmLENBQUMsQ0FBQ0MsTUFBTTtJQUNuQixJQUFJYyxJQUFJLElBQUksQ0FBQ0EsSUFBSSxDQUFDYixTQUFTLENBQUNjLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtNQUNoRCxNQUFNbEcsR0FBRyxHQUFHeUYsUUFBUSxDQUFDUSxJQUFJLENBQUNQLE9BQU8sQ0FBQzFGLEdBQUcsRUFBRSxFQUFFLENBQUM7TUFDMUMsTUFBTUQsR0FBRyxHQUFHMEYsUUFBUSxDQUFDUSxJQUFJLENBQUNQLE9BQU8sQ0FBQzNGLEdBQUcsRUFBRSxFQUFFLENBQUM7TUFDMUNoQyxPQUFPLENBQUNvRCxNQUFNLENBQUNuRCxPQUFPLEVBQUUrQixHQUFHLEVBQUVDLEdBQUcsQ0FBQztNQUNqQzJCLFVBQVUsQ0FBQ3dFLHNCQUFzQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0M7RUFDRjtBQUNGOztBQUVBLFNBQVN0QixLQUFLQSxDQUFDSyxDQUFDLEVBQUU7RUFDaEIsSUFBSWtCLGVBQWUsR0FBR2xCLENBQUMsQ0FBQ0MsTUFBTTtFQUM5QmlCLGVBQWUsQ0FBQ2hCLFNBQVMsQ0FBQ2lCLE1BQU0sQ0FBQyxhQUFhLENBQUM7QUFDakQ7QUFFQSxTQUFTRixzQkFBc0JBLENBQUEsRUFBRztFQUNoQyxNQUFNRyxTQUFTLEdBQUdyRCxlQUFlLENBQUMvQyxXQUFXLENBQUNsQyxPQUFPLENBQUNpQyxLQUFLLENBQUM7RUFDNUQsTUFBTXNHLFVBQVUsR0FBR3BJLGVBQWUsQ0FBQytCLFdBQVcsQ0FBQ25DLE9BQU8sQ0FBQ2tDLEtBQUssQ0FBQztFQUU3RCxJQUFJcUcsU0FBUyxJQUFJQyxVQUFVLEVBQUU7SUFDM0J2RSxVQUFVLEdBQUcsS0FBSztJQUVsQm1CLGVBQWUsQ0FBQzVCLFdBQVcsR0FBRyxTQUFTO0lBQ3ZDNEIsZUFBZSxDQUFDNEIsUUFBUSxHQUFHLEtBQUs7SUFDaEM5QyxXQUFXLEdBQUcsSUFBSTtJQUNsQjVELFdBQVcsQ0FBQ21JLG1CQUFtQixDQUFDLE9BQU8sRUFBRTVCLFlBQVksQ0FBQztJQUV0RCxJQUFJMEIsU0FBUyxFQUFFO01BQ2JoSSxVQUFVLENBQUNpRCxXQUFXLEdBQUcscUJBQXFCO0lBQ2hEO0lBQ0EsSUFBSWdGLFVBQVUsRUFBRTtNQUNkakksVUFBVSxDQUFDaUQsV0FBVyxHQUFHLHNCQUFzQjtJQUNqRDtFQUNGO0FBQ0Y7O0FBRUE7QUFDQTZCLFFBQVEsQ0FBQyxDQUFDO0FBQ1ZlLFVBQVUsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDelVaOztBQUV3QztBQUV4QyxNQUFNNUYsZUFBZSxHQUFHQSxDQUFDYSxLQUFLLEVBQUVxSCxTQUFTLEtBQUs7RUFDNUMsTUFBTXZILFFBQVEsR0FBRyxFQUFFO0VBQ25CdUgsU0FBUyxDQUFDbEYsV0FBVyxHQUFHLEVBQUU7RUFDMUIsTUFBTW1GLGNBQWMsR0FBRzVFLFFBQVEsQ0FBQ3dCLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDcERvRCxjQUFjLENBQUN0QixTQUFTLENBQUNDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztFQUMvQ3FCLGNBQWMsQ0FBQ3RCLFNBQVMsQ0FBQ0MsR0FBRyxDQUMxQm9CLFNBQVMsS0FBS3JJLGlEQUFXLEdBQUcsU0FBUyxHQUFHLFNBQzFDLENBQUM7RUFDRCxLQUFLLElBQUkyQixHQUFHLEdBQUcsQ0FBQyxFQUFFQSxHQUFHLEdBQUdiLFFBQVEsRUFBRWEsR0FBRyxFQUFFLEVBQUU7SUFDdkMsTUFBTTRHLFVBQVUsR0FBRzdFLFFBQVEsQ0FBQ3dCLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDaERxRCxVQUFVLENBQUN2QixTQUFTLENBQUNDLEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFFckMsS0FBSyxJQUFJckYsR0FBRyxHQUFHLENBQUMsRUFBRUEsR0FBRyxHQUFHZCxRQUFRLEVBQUVjLEdBQUcsRUFBRSxFQUFFO01BQ3ZDLE1BQU00RyxXQUFXLEdBQUc5RSxRQUFRLENBQUN3QixhQUFhLENBQUMsS0FBSyxDQUFDO01BQ2pEc0QsV0FBVyxDQUFDeEIsU0FBUyxDQUFDQyxHQUFHLENBQUMsWUFBWSxDQUFDO01BQ3ZDdUIsV0FBVyxDQUFDbEIsT0FBTyxDQUFDM0YsR0FBRyxHQUFHQSxHQUFHO01BQzdCNkcsV0FBVyxDQUFDbEIsT0FBTyxDQUFDMUYsR0FBRyxHQUFHQSxHQUFHOztNQUU3QjtNQUNBLElBQUlaLEtBQUssQ0FBQ1csR0FBRyxDQUFDLENBQUNDLEdBQUcsQ0FBQyxLQUFLLE9BQU8sRUFBRTtRQUMvQjRHLFdBQVcsQ0FBQ3hCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztNQUNwQyxDQUFDLE1BQU0sSUFBSSxPQUFPakcsS0FBSyxDQUFDVyxHQUFHLENBQUMsQ0FBQ0MsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFO1FBQzlDLElBQUl5RyxTQUFTLElBQUlySSxpREFBVyxFQUFFO1VBQzVCd0ksV0FBVyxDQUFDeEIsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ25DLENBQUMsTUFBTTtVQUNMdUIsV0FBVyxDQUFDeEIsU0FBUyxDQUFDQyxHQUFHLENBQUMsWUFBWSxDQUFDO1FBQ3pDO1FBQ0F1QixXQUFXLENBQUNsQixPQUFPLENBQUNLLFFBQVEsR0FBSSxHQUFFM0csS0FBSyxDQUFDVyxHQUFHLENBQUMsQ0FBQ0MsR0FBRyxDQUFDLENBQUN0QixJQUFLLEVBQUM7TUFDMUQsQ0FBQyxNQUFNLElBQUlVLEtBQUssQ0FBQ1csR0FBRyxDQUFDLENBQUNDLEdBQUcsQ0FBQyxLQUFLLEtBQUssRUFBRTtRQUNwQzRHLFdBQVcsQ0FBQ3hCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUNoQ3VCLFdBQVcsQ0FBQ3hCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztNQUN2QyxDQUFDLE1BQU0sSUFBSWpHLEtBQUssQ0FBQ1csR0FBRyxDQUFDLENBQUNDLEdBQUcsQ0FBQyxLQUFLLE1BQU0sRUFBRTtRQUNyQzRHLFdBQVcsQ0FBQ3hCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNqQ3VCLFdBQVcsQ0FBQ3hCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztNQUN2QyxDQUFDLE1BQU0sSUFBSWpHLEtBQUssQ0FBQ1csR0FBRyxDQUFDLENBQUNDLEdBQUcsQ0FBQyxLQUFLLE1BQU0sRUFBRTtRQUNyQzRHLFdBQVcsQ0FBQ3hCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNqQ3VCLFdBQVcsQ0FBQ3hCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztNQUN2QztNQUNBc0IsVUFBVSxDQUFDbkQsV0FBVyxDQUFDb0QsV0FBVyxDQUFDO0lBQ3JDO0lBQ0FGLGNBQWMsQ0FBQ2xELFdBQVcsQ0FBQ21ELFVBQVUsQ0FBQztFQUN4QztFQUNBRixTQUFTLENBQUNqRCxXQUFXLENBQUNrRCxjQUFjLENBQUM7QUFDdkMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0NEO0FBQzBHO0FBQ2pCO0FBQ087QUFDaEcsNENBQTRDLHlHQUFnQztBQUM1RSw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GLHlDQUF5QyxzRkFBK0I7QUFDeEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbUNBQW1DO0FBQ25EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyx1RkFBdUYsS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxPQUFPLE9BQU8sYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFB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QTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOzs7OztXQ3JCQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc3R5bGVzLmNzcz80NGIyIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBmb3JtYXQgKi9cblxuaW1wb3J0IHtcbiAgcGxheWVyMSxcbiAgcGxheWVyMixcbiAgcGxheWVyMUJvYXJkLFxuICBwbGF5ZXIyQm9hcmQsXG4gIHAxQm9hcmRJbnN0YW5jZSxcbiAgcDFnYW1lQm9hcmQsXG4gIHAyZ2FtZUJvYXJkLFxuICBtZXNzYWdlQm94LFxufSBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyByZW5kZXJHYW1lQm9hcmQgfSBmcm9tIFwiLi9yZW5kZXJcIjtcblxubGV0IGN1cnJlbnRQbGF5ZXIgPSBcIkh1bWFuXCI7XG5cbmNvbnN0IHNoaXAgPSAodHlwZSwgbGVuZ3RoLCBoaXRDb3VudCwgc2lua1N0YXR1cywgaXNWZXJ0aWNhbCkgPT4ge1xuICBjb25zdCBoaXQgPSAoc2hpcCkgPT4ge1xuICAgIHNoaXAuaGl0Q291bnQrKztcbiAgICByZXR1cm4gc2hpcC5oaXRDb3VudDtcbiAgfTtcbiAgY29uc3QgaXNTdW5rID0gKHNoaXApID0+IHtcbiAgICBpZiAoc2hpcC5oaXRDb3VudCA9PT0gc2hpcC5sZW5ndGgpIHtcbiAgICAgIHNoaXAuc2lua1N0YXR1cyA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzaGlwLnNpbmtTdGF0dXM7XG4gIH07XG5cbiAgcmV0dXJuIHsgdHlwZSwgbGVuZ3RoLCBoaXRDb3VudCwgc2lua1N0YXR1cywgaGl0LCBpc1N1bmssIGlzVmVydGljYWwgfTtcbn07XG5cbmNvbnN0IGdhbWVCb2FyZCA9IChncmlkU2l6ZSkgPT4ge1xuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBib2FyZCA9IG5ldyBBcnJheShncmlkU2l6ZSlcbiAgICAgIC5maWxsKG51bGwpXG4gICAgICAubWFwKCgpID0+IG5ldyBBcnJheShncmlkU2l6ZSkuZmlsbChcIndhdGVyXCIpKTtcbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgcmVzZXRCb2FyZCA9ICgpID0+IHtcbiAgICAvL05vdCBiZWluZyB1c2VkIGN1cnJlbnRseVxuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICB0aGlzLmJvYXJkID0gdGhpcy5jcmVhdGVCb2FyZCgpO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChib2FyZCwgc2hpcCwgc3RhcnRpbmdSb3csIHN0YXJ0aW5nQ29sKSA9PiB7XG4gICAgY29uc3QgaXNWZXJ0aWNhbCA9IHNoaXAuaXNWZXJ0aWNhbDtcbiAgICBjb25zdCBzaGlwTGVuZ3RoID0gc2hpcC5sZW5ndGg7XG4gICAgc2hpcC5zdGFydGluZ1JvdyA9IHN0YXJ0aW5nUm93O1xuICAgIHNoaXAuc3RhcnRpbmdDb2wgPSBzdGFydGluZ0NvbDtcbiAgICAvL0NoZWNrIGlmIHNoaXAgcGxhY2VtZW50IGlzIGluIGJvdW5kc1xuICAgIGlmIChcbiAgICAgIChpc1ZlcnRpY2FsICYmIHN0YXJ0aW5nUm93ICsgc2hpcExlbmd0aCA+IGdyaWRTaXplKSB8fFxuICAgICAgKCFpc1ZlcnRpY2FsICYmIHN0YXJ0aW5nQ29sICsgc2hpcExlbmd0aCA+IGdyaWRTaXplKVxuICAgICkge1xuICAgICAgcmV0dXJuIG51bGw7IC8vIEludmFsaWQgcGxhY2VtZW50XG4gICAgfVxuXG4gICAgLy9DaGVjayBpZiBjZWxscyBhcmUgYWxyZWFkeSBvY2N1cGllZFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgICBpZiAoYm9hcmRbc3RhcnRpbmdSb3cgKyBpXVtzdGFydGluZ0NvbF0gIT09IFwid2F0ZXJcIikge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYm9hcmRbc3RhcnRpbmdSb3ddW3N0YXJ0aW5nQ29sICsgaV0gIT09IFwid2F0ZXJcIikge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9vdGhlcndpc2UgdmFsaWQsIHNvIHBsYWNlIHNoaXBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgICAgYm9hcmRbc3RhcnRpbmdSb3cgKyBpXVtzdGFydGluZ0NvbF0gPSBzaGlwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmRbc3RhcnRpbmdSb3ddW3N0YXJ0aW5nQ29sICsgaV0gPSBzaGlwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBib2FyZDtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sLCBib2FyZCwgc2hpcHMpID0+IHtcbiAgICBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIndhdGVyXCIpIHtcbiAgICAgIGJvYXJkW3Jvd11bY29sXSA9IFwiTUlTU1wiO1xuICAgICAgcmV0dXJuIFwiTUlTU1wiO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvYXJkW3Jvd11bY29sXS5oaXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY29uc3Qgc2hpcCA9IGJvYXJkW3Jvd11bY29sXTtcbiAgICAgIHNoaXAuaGl0KHNoaXApO1xuXG4gICAgICBpZiAoc2hpcC5pc1N1bmsoc2hpcCkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHNoaXAuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgYm9hcmRbc2hpcC5zdGFydGluZ1JvdyArIGldW3NoaXAuc3RhcnRpbmdDb2xdID0gXCJTVU5LXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvYXJkW3NoaXAuc3RhcnRpbmdSb3ddW3NoaXAuc3RhcnRpbmdDb2wgKyBpXSA9IFwiU1VOS1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaGVja0ZvcldpbihzaGlwcyk7XG4gICAgICAgIHJldHVybiBcIlNVTktcIjtcbiAgICAgIH1cbiAgICAgIGJvYXJkW3Jvd11bY29sXSA9IFwiSElUXCI7XG4gICAgICBjaGVja0ZvcldpbihzaGlwcyk7XG5cbiAgICAgIHJldHVybiBcIkhJVFwiO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja0ZvcldpbiA9IChzaGlwcykgPT4ge1xuICAgIC8vY2FsbGVkIGFmdGVyIGVhY2ggdHVyblxuICAgIGNvbnN0IGFsbFNoaXBzU3VuayA9IHNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLnNpbmtTdGF0dXMpO1xuXG4gICAgaWYgKGFsbFNoaXBzU3Vuaykge1xuICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgIC8vZW5kIGdhbWUgbG9vcCBhbmQgdXBkYXRlIFVJXG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4geyBjcmVhdGVCb2FyZCwgcmVzZXRCb2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBjaGVja0ZvcldpbiB9O1xufTtcblxuY29uc3QgcGxheWVyID0gKG5hbWUsIGJvYXJkLCB0eXBlLCBzaGlwcykgPT4ge1xuICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTsgLy9jaGFuZ2UgdG8gaW5wdXQgYWZ0ZXIgVUkgY3JlYXRlZFxuXG4gIGNvbnN0IGdldFR5cGUgPSAoKSA9PiB0eXBlOyAvL0h1bWFuIG9yIEFJXG5cbiAgY29uc3QgZ2V0QWlDaG9pY2UgPSAoKSA9PiB7XG4gICAgLy9USElTIElTIFZFUlkgU0xPVyAtIFVQREFURSEgaW5pdGlhbGlzZSBvdXRzaWRlIG9mIGZhY3Rvcnk/XG4gICAgY29uc3QgYXZhaWxhYmxlU3BvdHMgPSBbXTtcblxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgYm9hcmQubGVuZ3RoOyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgYm9hcmRbeF0ubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGJvYXJkW3hdW3ldICE9PSBcIk1JU1NcIiAmJlxuICAgICAgICAgIGJvYXJkW3hdW3ldICE9PSBcIkhJVFwiICYmXG4gICAgICAgICAgYm9hcmRbeF1beV0gIT09IFwiU1VOS1wiXG4gICAgICAgICkge1xuICAgICAgICAgIGF2YWlsYWJsZVNwb3RzLnB1c2goeyB4LCB5IH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlU3BvdHMubGVuZ3RoKTtcbiAgICBjb25zdCBhaUNob2ljZSA9IGF2YWlsYWJsZVNwb3RzW3JhbmRvbUluZGV4XTtcbiAgICByZXR1cm4gYWlDaG9pY2U7XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrID0gKGVuZW15LCB4LCB5KSA9PiB7XG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT09IFwiSHVtYW5cIikge1xuICAgICAgY29uc3QgZW5lbXlCb2FyZCA9IHAxQm9hcmRJbnN0YW5jZTtcbiAgICAgIGNvbnN0IGF0dGFja1Jlc3VsdCA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgZW5lbXkuYm9hcmQsXG4gICAgICAgIGVuZW15LnNoaXBzXG4gICAgICApO1xuXG4gICAgICAvL1RvIFVwZGF0ZSBtZXNzYWdlcyB0byBkaXNwbGF5IHdoaWNoIHNoaXAgaXMgc3Vua1xuICAgICAgaWYgKGF0dGFja1Jlc3VsdCA9PSBcIkhJVFwiKSB7XG4gICAgICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBgWW91J3ZlIGdvdCBhICR7YXR0YWNrUmVzdWx0fSFgO1xuICAgICAgfVxuICAgICAgaWYgKGF0dGFja1Jlc3VsdCA9PSBcIk1JU1NcIikge1xuICAgICAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gYFlvdSBNaXNzZWRgO1xuICAgICAgfVxuICAgICAgaWYgKGF0dGFja1Jlc3VsdCA9PSBcIlNVTktcIikge1xuICAgICAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gYEJPT00hIFlvdSBzdW5rIGNvbXB1dGVycyBzaGlwYDtcbiAgICAgIH1cblxuICAgICAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjJCb2FyZCwgcDJnYW1lQm9hcmQpO1xuICAgICAgY29uc3QgYWxsUDJzaGlwc1N1bmsgPSBlbmVteS5zaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5zaW5rU3RhdHVzKTtcblxuICAgICAgLy9jb21wdXRlcnMgdHVybiBpZiBub3QgYWxsIHN1bmtcbiAgICAgIGlmICghYWxsUDJzaGlwc1N1bmspIHtcbiAgICAgICAgY3VycmVudFBsYXllciA9IFwiQ29tcHV0ZXJcIjtcbiAgICAgICAgZnVuY3Rpb24gbWFrZUFpTW92ZSgpIHtcbiAgICAgICAgICBjb25zdCBhaUNob2ljZSA9IGdldEFpQ2hvaWNlKCk7XG4gICAgICAgICAgY29uc3QgYWlBdHRhY2tSZXN1bHQgPSBwMUJvYXJkSW5zdGFuY2UucmVjZWl2ZUF0dGFjayhcbiAgICAgICAgICAgIGFpQ2hvaWNlLngsXG4gICAgICAgICAgICBhaUNob2ljZS55LFxuICAgICAgICAgICAgcGxheWVyMS5ib2FyZCxcbiAgICAgICAgICAgIHBsYXllcjEuc2hpcHNcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy9UbyBVcGRhdGUgbWVzc2FnZXMgdG8gZGlzcGxheSB3aGljaCBzaGlwIGlzIHN1bmtcbiAgICAgICAgICBpZiAoYWlBdHRhY2tSZXN1bHQgPT0gXCJISVRcIikge1xuICAgICAgICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IGBUaGV5J3ZlIGdvdCBhICR7YWlBdHRhY2tSZXN1bHR9IWA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhaUF0dGFja1Jlc3VsdCA9PSBcIk1JU1NcIikge1xuICAgICAgICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IGBUaGV5IE1pc3NlZCFgO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYWlBdHRhY2tSZXN1bHQgPT0gXCJTVU5LXCIpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBgQk9PTSEgQ29tcHV0ZXIgc3VuayB5b3VyIHNoaXAhYDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZW5kZXJHYW1lQm9hcmQocGxheWVyMUJvYXJkLCBwMWdhbWVCb2FyZCk7XG4gICAgICAgICAgY3VycmVudFBsYXllciA9IFwiSHVtYW5cIjtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KG1ha2VBaU1vdmUsIDcwMCk7IC8vMC44cyBkZWxheSBiZXR3ZWVuIHR1cm5zXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy91cGRhdGVUdXJuTWVzc2FnZSgpO1xuICAgIHJldHVybiByZW5kZXJHYW1lQm9hcmQ7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIGJvYXJkLFxuICAgIHR5cGUsXG4gICAgZ2V0TmFtZSxcbiAgICBnZXRUeXBlLFxuICAgIGF0dGFjayxcbiAgICBnZXRBaUNob2ljZSxcbiAgICBzaGlwcyxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IHNoaXAsIGdhbWVCb2FyZCwgcGxheWVyIH07XG4iLCIvKiogQGZvcm1hdCAqL1xucmVxdWlyZShcIi4vc3R5bGVzLmNzc1wiKTtcblxuaW1wb3J0IHsgc2hpcCwgZ2FtZUJvYXJkLCBwbGF5ZXIgfSBmcm9tIFwiLi9nYW1lLmpzXCI7XG5pbXBvcnQgeyByZW5kZXJHYW1lQm9hcmQgfSBmcm9tIFwiLi9yZW5kZXIuanNcIjtcbmNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5cIik7XG5cbi8vR2xvYmFsIEdhbWUgc3RhdGUgdmFyaWFibGVzIC0tIFRvIHJlZmFjdG9yICYgRW5jYXBzdWxhdGVcbmxldCBnYW1lQWN0aXZlID0gZmFsc2U7XG5sZXQgcmVzdGFydGFibGUgPSBmYWxzZTtcbmxldCBkcm9wcGVkQXJyYXkgPSBbXTtcbmxldCBub3REcm9wcGVkO1xubGV0IHAxY2FycmllciwgcDFiYXR0bGVzaGlwLCBwMWRlc3Ryb3llciwgcDFzdWJtYXJpbmUsIHAxcGF0cm9sQm9hdDtcbmxldCBwMmNhcnJpZXIsIHAyYmF0dGxlc2hpcCwgcDJkZXN0cm95ZXIsIHAyc3VibWFyaW5lLCBwMnBhdHJvbEJvYXQ7XG5sZXQgcDFBbGxTaGlwcywgcDJBbGxTaGlwcztcbmxldCBkcmFnZ2VkU2hpcDtcbmxldCBncmlkU2l6ZSA9IDEwO1xubGV0IHAxQm9hcmRJbnN0YW5jZSA9IGdhbWVCb2FyZChncmlkU2l6ZSk7XG5sZXQgcGxheWVyMUJvYXJkID0gcDFCb2FyZEluc3RhbmNlLmNyZWF0ZUJvYXJkKCk7XG5sZXQgcDJCb2FyZEluc3RhbmNlID0gZ2FtZUJvYXJkKGdyaWRTaXplKTtcbmxldCBwbGF5ZXIyQm9hcmQgPSBwMkJvYXJkSW5zdGFuY2UuY3JlYXRlQm9hcmQoKTtcbmxldCBwbGF5ZXIxO1xubGV0IHBsYXllcjI7XG5sZXQgcDFnYW1lQm9hcmQsIHAyZ2FtZUJvYXJkO1xubGV0IHNoaXB5YXJkU2hpcHM7XG5sZXQgc3RhcnRHYW1lQnV0dG9uO1xubGV0IG1lc3NhZ2VCb3g7XG5cbmZ1bmN0aW9uIHNldFVwRG9tKCkge1xuICAvL2dhbWVDb250YWluZXJcbiAgY29uc3QgZ2FtZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGdhbWVDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJnYW1lLWNvbnRhaW5lclwiKTtcblxuICAvL1N0YXJ0IGJ1dHRvblxuICBzdGFydEdhbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBzdGFydEdhbWVCdXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzdGFydC1idXR0b25cIik7XG4gIHN0YXJ0R2FtZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0YXJ0XCIpO1xuICBzdGFydEdhbWVCdXR0b24udGV4dENvbnRlbnQgPSBcIlByZXNzIHRvIFN0YXJ0XCI7XG4gIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhcnRHYW1lQnV0dG9uKTtcblxuICAvL01lc3NhZ2UgYm94XG4gIG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBtZXNzYWdlQm94LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWVzc2FnZVwiKTtcbiAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChtZXNzYWdlQm94KTtcblxuICAvL0dhbWVib2FyZHNcbiAgY29uc3QgcGxheWVyMUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGNvbnN0IHBsYXllck5hbWUgPSBwcm9tcHQoXCJXaGF0J3MgeW91ciBuYW1lXCIsIFwiUGxheWVyIDFcIik7XG4gIC8vQ2hlY2sgUGxheWVyTmFtZSBmb3IgbnVsbCwgaWYgc28gZGVmYXVsdCB0byBQbGF5ZXIxXG4gIHBsYXllcjFMYWJlbC50ZXh0Q29udGVudCA9IHBsYXllck5hbWUgPyBwbGF5ZXJOYW1lIDogXCJZb3VcIjtcbiAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXIxTGFiZWwpO1xuICBwMWdhbWVCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHAxZ2FtZUJvYXJkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicGxheWVyMS1ib2FyZFwiKTtcbiAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwMWdhbWVCb2FyZCk7XG4gIGNvbnN0IHBsYXllcjJMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBwbGF5ZXIyTGFiZWwudGV4dENvbnRlbnQgPSBcIkNvbXB1dGVyXCI7XG4gIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVyMkxhYmVsKTtcbiAgcDJnYW1lQm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwMmdhbWVCb2FyZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInBsYXllcjItYm9hcmRcIik7XG4gIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQocDJnYW1lQm9hcmQpO1xuXG4gIC8vU2hpcHlhcmRcbiAgY29uc3Qgc2hpcHlhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlweWFyZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXB5YXJkXCIpO1xuICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHNoaXB5YXJkKTtcbiAgc2hpcHlhcmQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gIC8vMVxuICBjb25zdCBzaGlwMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXAxLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcC10eXBlXCIsIFwiY2FycmllclwiKTtcbiAgc2hpcDEuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCIwXCIpO1xuICBzaGlwMS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIGNhcnJpZXJcIik7XG4gIHNoaXAxLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gIHNoaXB5YXJkLmFwcGVuZENoaWxkKHNoaXAxKTtcblxuICAvLzJcbiAgY29uc3Qgc2hpcDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwMi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXAtdHlwZVwiLCBcImRlc3Ryb3llclwiKTtcbiAgc2hpcDIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCIxXCIpO1xuICBzaGlwMi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIGRlc3Ryb3llclwiKTtcbiAgc2hpcDIuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcbiAgc2hpcHlhcmQuYXBwZW5kQ2hpbGQoc2hpcDIpO1xuXG4gIC8vM1xuICBjb25zdCBzaGlwMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXAzLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcC10eXBlXCIsIFwiYmF0dGxlc2hpcFwiKTtcbiAgc2hpcDMuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCIyXCIpO1xuICBzaGlwMy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIGJhdHRsZXNoaXBcIik7XG4gIHNoaXAzLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gIHNoaXB5YXJkLmFwcGVuZENoaWxkKHNoaXAzKTtcblxuICAvLzRcbiAgY29uc3Qgc2hpcDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwNC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXAtdHlwZVwiLCBcInN1Ym1hcmluZVwiKTtcbiAgc2hpcDQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCIzXCIpO1xuICBzaGlwNC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIHN1Ym1hcmluZVwiKTtcbiAgc2hpcDQuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcbiAgc2hpcHlhcmQuYXBwZW5kQ2hpbGQoc2hpcDQpO1xuXG4gIC8vNVxuICBjb25zdCBzaGlwNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXA1LnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcC10eXBlXCIsIFwicGF0cm9sQm9hdFwiKTtcbiAgc2hpcDUuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCI0XCIpO1xuICBzaGlwNS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIHBhdHJvbEJvYXRcIik7XG4gIHNoaXA1LnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gIHNoaXB5YXJkLmFwcGVuZENoaWxkKHNoaXA1KTtcblxuICBzaGlweWFyZFNoaXBzID0gW3NoaXAxLCBzaGlwMiwgc2hpcDMsIHNoaXA0LCBzaGlwNV07XG5cbiAgbWFpbi5hcHBlbmRDaGlsZChnYW1lQ29udGFpbmVyKTtcblxuICByZXR1cm4ge1xuICAgIGdhbWVDb250YWluZXIsXG4gICAgcDFnYW1lQm9hcmQsXG4gICAgcDJnYW1lQm9hcmQsXG4gICAgc3RhcnRHYW1lQnV0dG9uLFxuICAgIHNoaXB5YXJkLFxuICAgIHNoaXB5YXJkU2hpcHMsXG4gICAgbWVzc2FnZUJveCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gaW5pdGlhbGlzZSgpIHtcbiAgcDFjYXJyaWVyID0gc2hpcChcImNhcnJpZXJcIiwgNSwgMCwgZmFsc2UsIHRydWUpO1xuICBwMWJhdHRsZXNoaXAgPSBzaGlwKFwiYmF0dGxlc2hpcFwiLCA0LCAwLCBmYWxzZSwgZmFsc2UpO1xuICBwMWRlc3Ryb3llciA9IHNoaXAoXCJkZXN0cm95ZXJcIiwgMywgMCwgZmFsc2UsIGZhbHNlKTtcbiAgcDFzdWJtYXJpbmUgPSBzaGlwKFwic3VibWFyaW5lXCIsIDMsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAxcGF0cm9sQm9hdCA9IHNoaXAoXCJwYXRyb2xCb2F0XCIsIDIsIDAsIGZhbHNlLCBmYWxzZSk7XG5cbiAgcDFBbGxTaGlwcyA9IFtcbiAgICBwMWNhcnJpZXIsXG4gICAgcDFiYXR0bGVzaGlwLFxuICAgIHAxZGVzdHJveWVyLFxuICAgIHAxc3VibWFyaW5lLFxuICAgIHAxcGF0cm9sQm9hdCxcbiAgXTtcblxuICBwMmNhcnJpZXIgPSBzaGlwKFwiY2FycmllclwiLCA1LCAwLCBmYWxzZSwgZmFsc2UpO1xuICBwMmJhdHRsZXNoaXAgPSBzaGlwKFwiYmF0dGxlc2hpcFwiLCA0LCAwLCBmYWxzZSwgZmFsc2UpO1xuICBwMmRlc3Ryb3llciA9IHNoaXAoXCJkZXN0cm95ZXJcIiwgMywgMCwgZmFsc2UsIGZhbHNlKTtcbiAgcDJzdWJtYXJpbmUgPSBzaGlwKFwic3VibWFyaW5lXCIsIDMsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAycGF0cm9sQm9hdCA9IHNoaXAoXCJwYXRyb2xCb2F0XCIsIDIsIDAsIGZhbHNlLCBmYWxzZSk7XG5cbiAgcDJBbGxTaGlwcyA9IFtcbiAgICBwMmNhcnJpZXIsXG4gICAgcDJkZXN0cm95ZXIsXG4gICAgcDJiYXR0bGVzaGlwLFxuICAgIHAyc3VibWFyaW5lLFxuICAgIHAycGF0cm9sQm9hdCxcbiAgXTtcblxuICAvL01ha2UgUGxheWVyc1xuICBwbGF5ZXIxID0gcGxheWVyKFxuICAgIFwiUGxheWVyIDFcIixcbiAgICBwbGF5ZXIxQm9hcmQsXG4gICAgXCJIdW1hblwiLFxuICAgIHAxQWxsU2hpcHMsXG4gICAgcDFCb2FyZEluc3RhbmNlXG4gICk7XG5cbiAgcGxheWVyMiA9IHBsYXllcihcIkNvbXB1dGVyXCIsIHBsYXllcjJCb2FyZCwgXCJBSVwiLCBwMkFsbFNoaXBzLCBwMkJvYXJkSW5zdGFuY2UpO1xuXG4gIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIxQm9hcmQsIHAxZ2FtZUJvYXJkKTtcbiAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjJCb2FyZCwgcDJnYW1lQm9hcmQpO1xuXG4gIC8vZXZlbnQgbGlzdGVuZXJzXG4gIHNldHVwRXZlbnRMaXN0ZW5lcnMocDFnYW1lQm9hcmQsIHAyZ2FtZUJvYXJkKTtcblxuICByZXR1cm4ge1xuICAgIHBsYXllcjEsXG4gICAgcGxheWVyMUJvYXJkLFxuICAgIHAxQWxsU2hpcHMsXG4gICAgcGxheWVyMixcbiAgICBwbGF5ZXIyQm9hcmQsXG4gICAgcDJBbGxTaGlwcyxcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2V0dXBFdmVudExpc3RlbmVycyhwMWdhbWVCb2FyZCwgcDJnYW1lQm9hcmQpIHtcbiAgc2hpcHlhcmRTaGlwcy5mb3JFYWNoKChkcmFnZ2FibGUpID0+IHtcbiAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnU3RhcnQpO1xuICAgIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBkcmFnRW5kKTtcbiAgfSk7XG5cbiAgcDFnYW1lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGRyYWdPdmVyKTtcbiAgcDFnYW1lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZHJvcFNoaXApO1xuXG4gIHAyZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzZWxlY3RUYXJnZXQpO1xuICBwMmdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGhvdmVyKTtcbiAgcDJnYW1lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIGhvdmVyKTtcbiAgc3RhcnRHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGFydEdhbWUpO1xufVxuXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gIGlmIChcbiAgICBkcm9wcGVkQXJyYXkubGVuZ3RoID49IHAxQWxsU2hpcHMubGVuZ3RoICYmXG4gICAgZ2FtZUFjdGl2ZSA9PSBmYWxzZSAmJlxuICAgIHJlc3RhcnRhYmxlID09IGZhbHNlXG4gICkge1xuICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBcIlN0YXJ0aW5nLCB0aGUgZW5lbXkgaXMgcGxhY2luZyB0aGVpciBzaGlwcy4uLlwiO1xuICAgIGdhbWVBY3RpdmUgPSB0cnVlO1xuICAgIHJlc3RhcnRhYmxlID0gZmFsc2U7XG4gICAgc3RhcnRHYW1lQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcblxuICAgIHBsYWNlUDJTaGlwcygpO1xuICB9IGVsc2UgaWYgKGdhbWVBY3RpdmUgPT0gZmFsc2UgJiYgcmVzdGFydGFibGUgPT0gdHJ1ZSkge1xuICAgIHJlc2V0R2FtZSgpO1xuICB9IGVsc2Uge1xuICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBcIlBsYWNlIGFsbCBvZiB5b3VyIHNoaXBzIGZpcnN0XCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzZXRHYW1lKCkge1xuICAvL1VwZGF0ZSBNZXNzYWdlc1xuICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJSZXN0YXJ0aW5nLCBQbGFjZSB5b3VyIHNoaXBzIVwiO1xuICBzdGFydEdhbWVCdXR0b24udGV4dENvbnRlbnQgPSBcIlN0YXJ0IGdhbWVcIjtcbiAgLy9VcGRhdGUgZ2xvYmFsIHZhcmlhYmxlc1xuICByZXN0YXJ0YWJsZSA9IGZhbHNlO1xuICBnYW1lQWN0aXZlID0gZmFsc2U7XG4gIGRyb3BwZWRBcnJheSA9IFtdO1xuICBwMUJvYXJkSW5zdGFuY2UgPSBnYW1lQm9hcmQoZ3JpZFNpemUpO1xuICBwbGF5ZXIxQm9hcmQgPSBwMUJvYXJkSW5zdGFuY2UuY3JlYXRlQm9hcmQoKTtcbiAgcDJCb2FyZEluc3RhbmNlID0gZ2FtZUJvYXJkKGdyaWRTaXplKTtcbiAgcGxheWVyMkJvYXJkID0gcDJCb2FyZEluc3RhbmNlLmNyZWF0ZUJvYXJkKCk7XG4gIGluaXRpYWxpc2UoKTtcblxuICAvL2NsZWFyIHRoZSBkb21cbiAgbWFpbi50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgLy9TZXQgdXAgZXZlbnQgbGlzdGVuZXJzICYgcmVuZGVyXG4gIGNvbnN0IHsgcDFnYW1lQm9hcmQsIHAyZ2FtZUJvYXJkIH0gPSBzZXRVcERvbSgpO1xuXG4gIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIxQm9hcmQsIHAxZ2FtZUJvYXJkKTtcbiAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjJCb2FyZCwgcDJnYW1lQm9hcmQpO1xuICBzZXR1cEV2ZW50TGlzdGVuZXJzKHAxZ2FtZUJvYXJkLCBwMmdhbWVCb2FyZCk7XG59XG5cbmZ1bmN0aW9uIHBsYWNlUDJTaGlwcygpIHtcbiAgcDJCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIyQm9hcmQsIHAyY2FycmllciwgOSwgMSk7XG4gIHAyQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMkJvYXJkLCBwMmRlc3Ryb3llciwgMywgMyk7XG4gIHAyQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMkJvYXJkLCBwMmJhdHRsZXNoaXAsIDUsIDIpO1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJzdWJtYXJpbmUsIDIsIDEpO1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJwYXRyb2xCb2F0LCA2LCAwKTtcbiAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjJCb2FyZCwgcDJnYW1lQm9hcmQpO1xufVxuXG5mdW5jdGlvbiBkcmFnU3RhcnQoZSkge1xuICBkcmFnZ2VkU2hpcCA9IGUudGFyZ2V0O1xuICBkcmFnZ2VkU2hpcC5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dpbmdcIik7XG4gIG5vdERyb3BwZWQgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZHJhZ092ZXIoZSkge1xuICBub3REcm9wcGVkID0gZmFsc2U7XG5cbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBkcmFnRW5kKGUpIHtcbiAgZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LnJlbW92ZShcImRyYWdnaW5nXCIpO1xufVxuXG5mdW5jdGlvbiBkcm9wU2hpcChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3Qgc3RhcnRDb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuICBjb25zdCBzdGFydFJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCk7XG5cbiAgY29uc3QgdGhpc1NoaXAgPSBwMUFsbFNoaXBzW2RyYWdnZWRTaGlwLmlkXTtcbiAgY29uc3Qgc2hpcE5hbWUgPSBkcmFnZ2VkU2hpcC5kYXRhc2V0LnNoaXBUeXBlO1xuICBjb25zdCBwbGFjZW1lbnRSZXN1bHQgPSBwMUJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKFxuICAgIHBsYXllcjFCb2FyZCxcbiAgICB0aGlzU2hpcCxcbiAgICBzdGFydFJvdyxcbiAgICBzdGFydENvbFxuICApO1xuXG4gIGlmIChwbGFjZW1lbnRSZXN1bHQpIHtcbiAgICBkcm9wcGVkQXJyYXkucHVzaCh0aGlzU2hpcCk7XG4gICAgcDFCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIxQm9hcmQsIHRoaXNTaGlwLCBzdGFydFJvdywgc3RhcnRDb2wpO1xuICAgIGRyYWdnZWRTaGlwLnJlbW92ZSgpO1xuICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBgWW91J3ZlIHBsYWNlZCB5b3VyICR7c2hpcE5hbWV9YDtcbiAgfSBlbHNlIHtcbiAgICBub3REcm9wcGVkID0gdHJ1ZTtcbiAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJDYW4ndCBnbyB0aGVyZSwgdHJ5IGFnYWluIVwiO1xuICB9XG4gIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIxQm9hcmQsIHAxZ2FtZUJvYXJkKTtcbiAgZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LnJlbW92ZShcImRyYWdnaW5nXCIpO1xufVxuXG5mdW5jdGlvbiBzZWxlY3RUYXJnZXQoZSkge1xuICBpZiAoZ2FtZUFjdGl2ZSkge1xuICAgIGxldCBjZWxsID0gZS50YXJnZXQ7XG4gICAgaWYgKGNlbGwgJiYgIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGlzYWJsZWRcIikpIHtcbiAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGNlbGwuZGF0YXNldC5jb2wsIDEwKTtcbiAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGNlbGwuZGF0YXNldC5yb3csIDEwKTtcbiAgICAgIHBsYXllcjEuYXR0YWNrKHBsYXllcjIsIHJvdywgY29sKTtcbiAgICAgIHNldFRpbWVvdXQoaGFuZGxlUmVzdWx0VmFsaWRhdGlvbiwgODAwKTsgLy9TZXQgdGhpcyBsb25nZXIgdGhhbiB0aGUgbW92ZSBkZWxheVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBob3ZlcihlKSB7XG4gIGxldCBoaWdobGlnaHRlZENlbGwgPSBlLnRhcmdldDtcbiAgaGlnaGxpZ2h0ZWRDZWxsLmNsYXNzTGlzdC50b2dnbGUoXCJoaWdobGlnaHRlZFwiKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlUmVzdWx0VmFsaWRhdGlvbigpIHtcbiAgY29uc3QgaXNHYW1lV29uID0gcDJCb2FyZEluc3RhbmNlLmNoZWNrRm9yV2luKHBsYXllcjIuc2hpcHMpO1xuICBjb25zdCBpc0dhbWVMb3N0ID0gcDFCb2FyZEluc3RhbmNlLmNoZWNrRm9yV2luKHBsYXllcjEuc2hpcHMpO1xuXG4gIGlmIChpc0dhbWVXb24gfHwgaXNHYW1lTG9zdCkge1xuICAgIGdhbWVBY3RpdmUgPSBmYWxzZTtcblxuICAgIHN0YXJ0R2FtZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUmVzdGFydFwiO1xuICAgIHN0YXJ0R2FtZUJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHJlc3RhcnRhYmxlID0gdHJ1ZTtcbiAgICBwMmdhbWVCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VsZWN0VGFyZ2V0KTtcblxuICAgIGlmIChpc0dhbWVXb24pIHtcbiAgICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBcIkdhbWUgb3ZlciwgeW91IHdpbiFcIjtcbiAgICB9XG4gICAgaWYgKGlzR2FtZUxvc3QpIHtcbiAgICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBcIkdhbWUgb3ZlciwgeW91IExvc2UhXCI7XG4gICAgfVxuICB9XG59XG5cbi8vU0VUVVAgR0FNRVxuc2V0VXBEb20oKTtcbmluaXRpYWxpc2UoKTtcblxuZXhwb3J0IHtcbiAgcGxheWVyMUJvYXJkLFxuICBwbGF5ZXIyQm9hcmQsXG4gIHAxZ2FtZUJvYXJkLFxuICBwMmdhbWVCb2FyZCxcbiAgcGxheWVyMSxcbiAgcGxheWVyMixcbiAgcDFCb2FyZEluc3RhbmNlLFxuICBwMkJvYXJkSW5zdGFuY2UsXG4gIG1lc3NhZ2VCb3gsXG59O1xuIiwiLyoqIEBmb3JtYXQgKi9cblxuaW1wb3J0IHsgcDFnYW1lQm9hcmQgfSBmcm9tIFwiLi9tYWluLmpzXCI7XG5cbmNvbnN0IHJlbmRlckdhbWVCb2FyZCA9IChib2FyZCwgY29udGFpbmVyKSA9PiB7XG4gIGNvbnN0IGdyaWRTaXplID0gMTA7XG4gIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGNvbnN0IGJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImJvYXJkLWNvbnRhaW5lclwiKTtcbiAgYm9hcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcbiAgICBjb250YWluZXIgPT09IHAxZ2FtZUJvYXJkID8gXCJwbGF5ZXIxXCIgOiBcInBsYXllcjJcIlxuICApO1xuICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBncmlkU2l6ZTsgcm93KyspIHtcbiAgICBjb25zdCByb3dFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3dFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJib2FyZC1yb3dcIik7XG5cbiAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBncmlkU2l6ZTsgY29sKyspIHtcbiAgICAgIGNvbnN0IGNlbGxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJib2FyZC1jZWxsXCIpO1xuICAgICAgY2VsbEVsZW1lbnQuZGF0YXNldC5yb3cgPSByb3c7XG4gICAgICBjZWxsRWxlbWVudC5kYXRhc2V0LmNvbCA9IGNvbDtcblxuICAgICAgLy9zZXQgc3R5bGluZyBiYXNlZCBvbiBjZWxsIGNvbnRlbnQgaS5lLiB3YXRlciwgaGl0LCBzaGlwLCBtaXNzXG4gICAgICBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIndhdGVyXCIpIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIndhdGVyXCIpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9hcmRbcm93XVtjb2xdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGlmIChjb250YWluZXIgPT0gcDFnYW1lQm9hcmQpIHtcbiAgICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZW5lbXktc2hpcFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjZWxsRWxlbWVudC5kYXRhc2V0LnNoaXBUeXBlID0gYCR7Ym9hcmRbcm93XVtjb2xdLnR5cGV9YDtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIkhJVFwiKSB7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIk1JU1NcIikge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xuICAgICAgfSBlbHNlIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IFwiU1VOS1wiKSB7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzdW5rXCIpO1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG4gICAgICByb3dFbGVtZW50LmFwcGVuZENoaWxkKGNlbGxFbGVtZW50KTtcbiAgICB9XG4gICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQocm93RWxlbWVudCk7XG4gIH1cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkQ29udGFpbmVyKTtcbn07XG5cbmV4cG9ydCB7IHJlbmRlckdhbWVCb2FyZCB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcImNyb3NzaGFpci5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qKiBAZm9ybWF0ICovXG5cbi5zdGFydCB7XG4gIGJhY2tncm91bmQ6ICM1ZTVkZjA7XG4gIGJvcmRlci1yYWRpdXM6IDk5cHg7XG4gIGJveC1zaGFkb3c6ICM1ZTVkZjAgMCAxMHB4IDIwcHggLTEwcHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtZmFtaWx5OiBJbnRlciwgSGVsdmV0aWNhLCBcIkFwcGxlIENvbG9yIEVtb2ppXCIsIFwiU2Vnb2UgVUkgRW1vamlcIixcbiAgICBOb3RvQ29sb3JFbW9qaSwgXCJOb3RvIENvbG9yIEVtb2ppXCIsIFwiU2Vnb2UgVUkgU3ltYm9sXCIsIFwiQW5kcm9pZCBFbW9qaVwiLFxuICAgIEVtb2ppU3ltYm9scywgLWFwcGxlLXN5c3RlbSwgc3lzdGVtLXVpLCBcIlNlZ29lIFVJXCIsIFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLFxuICAgIFwiTm90byBTYW5zXCIsIHNhbnMtc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xuICBwYWRkaW5nOiA4cHggMThweDtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHRvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uO1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XG4gIGJvcmRlcjogMDtcbn1cblxuLnN0YXJ0OmRpc2FibGVkIHtcbiAgb3BhY2l0eTogMDtcbiAgY3Vyc29yOiBhdXRvO1xufVxuXG4ubWVzc2FnZSB7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBmb250LXdlaWdodDogNTAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiA1MCU7XG59XG5cbi5tZXNzYWdlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gIHdpZHRoOiAyMHJlbTtcbiAgaGVpZ2h0OiA0cmVtO1xufVxuXG4uZ2FtZS1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBtYXJnaW46IDM1cHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDEwcHg7XG59XG5cbi5ib2FyZC1jb250YWluZXIge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcbiAgd2lkdGg6IDQwdnc7XG59XG5cbi5zaGlweWFyZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGN5YW47XG4gIHdpZHRoOiA1MHZ3O1xuICBoZWlnaHQ6IDQwdnc7XG4gIG1hcmdpbjogMTBweDtcbn1cblxuLmJvYXJkLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGJvcmRlcjogMC4xcHggZG90dGVkICNjY2M7XG59XG5cbi5ib2FyZC1jZWxsIHtcbiAgZmxleDogMTtcbiAgd2lkdGg6IDFyZW07XG4gIGhlaWdodDogMXJlbTtcbiAgYm9yZGVyOiAwLjFweCBkb3R0ZWQgI2NjYztcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFiOTVlMDtcbiAgY3Vyc29yOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSkgMTIgMTIsIGNyb3NzaGFpcjtcbn1cblxuLnNoaXAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xuICBoZWlnaHQ6IDFyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xufVxuXG4uZW5lbXktc2hpcCB7XG4gIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcbiAgaGVpZ2h0OiAxcmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcbn1cblxuLmRyYWdnYWJsZSB7XG4gIGN1cnNvcjogbW92ZTtcbn1cblxuLmRyYWdnaW5nIHtcbiAgb3BhY2l0eTogMC41O1xufVxuXG4uaGlnaGxpZ2h0ZWQge1xuICBvcGFjaXR5OiAwLjU7XG59XG5cbi8qIFtkYXRhLXNoaXAtdHlwZT1cImNhcnJpZXJcIl0ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufSAqL1xuXG4vKiBbZGF0YS1zaGlwLXR5cGU9XCJjYXJyaWVyXCJdOjpiZWZvcmUge1xuICBjb250ZW50OiBcIlwiO1xuICB3aWR0aDogODAlO1xuICBoZWlnaHQ6IDYwJTtcbiAgYmFja2dyb3VuZDogI2NjYztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDEwJTtcbiAgbGVmdDogMTAlO1xufVxuXG5bZGF0YS1zaGlwLXR5cGU9XCJjYXJyaWVyXCJdOjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHdpZHRoOiAyMHB4O1xuICBoZWlnaHQ6IDEwcHg7XG4gIGJhY2tncm91bmQ6ICM1NTU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxMCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xufSAqL1xuXG4vKiBbZGF0YS1zaGlwLXR5cGU9XCJkZXN0cm95ZXJcIl0ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn0gKi9cblxuLmNhcnJpZXIge1xuICB3aWR0aDogMTJyZW07XG59XG5cbi5iYXR0bGVzaGlwIHtcbiAgd2lkdGg6IDlyZW07XG59XG5cbi5kZXN0cm95ZXIge1xuICB3aWR0aDogN3JlbTtcbn1cblxuLnN1Ym1hcmluZSB7XG4gIHdpZHRoOiA3cmVtO1xufVxuXG4ucGF0cm9sQm9hdCB7XG4gIHdpZHRoOiA0LjVyZW07XG59XG5cbi5oaXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5zdW5rIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuXG4ubWlzcyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuXG4ucGxheWVyMSB7XG4gIG1hcmdpbi1ib3R0b206IDUwcHg7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLGFBQWE7O0FBRWI7RUFDRSxtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLHFDQUFxQztFQUNyQyxzQkFBc0I7RUFDdEIsY0FBYztFQUNkLGVBQWU7RUFDZjs7OzJCQUd5QjtFQUN6QixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIseUJBQXlCO0VBQ3pCLDBCQUEwQjtFQUMxQixrQkFBa0I7RUFDbEIsc0JBQXNCO0VBQ3RCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFVBQVU7RUFDVixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixVQUFVO0FBQ1o7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsU0FBUztBQUNYOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1DQUFtQztFQUNuQyxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsV0FBVztFQUNYLFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2IseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsT0FBTztFQUNQLFdBQVc7RUFDWCxZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLHlCQUF5QjtFQUN6QixnRUFBNkM7QUFDL0M7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHdCQUF3QjtFQUN4QixZQUFZO0VBQ1osdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBOzs7O0dBSUc7O0FBRUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7O0FBRUg7Ozs7R0FJRzs7QUFFSDtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiogQGZvcm1hdCAqL1xcblxcbi5zdGFydCB7XFxuICBiYWNrZ3JvdW5kOiAjNWU1ZGYwO1xcbiAgYm9yZGVyLXJhZGl1czogOTlweDtcXG4gIGJveC1zaGFkb3c6ICM1ZTVkZjAgMCAxMHB4IDIwcHggLTEwcHg7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBmb250LWZhbWlseTogSW50ZXIsIEhlbHZldGljYSwgXFxcIkFwcGxlIENvbG9yIEVtb2ppXFxcIiwgXFxcIlNlZ29lIFVJIEVtb2ppXFxcIixcXG4gICAgTm90b0NvbG9yRW1vamksIFxcXCJOb3RvIENvbG9yIEVtb2ppXFxcIiwgXFxcIlNlZ29lIFVJIFN5bWJvbFxcXCIsIFxcXCJBbmRyb2lkIEVtb2ppXFxcIixcXG4gICAgRW1vamlTeW1ib2xzLCAtYXBwbGUtc3lzdGVtLCBzeXN0ZW0tdWksIFxcXCJTZWdvZSBVSVxcXCIsIFJvYm90bywgXFxcIkhlbHZldGljYSBOZXVlXFxcIixcXG4gICAgXFxcIk5vdG8gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBwYWRkaW5nOiA4cHggMThweDtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHRvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uO1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcXG4gIGJvcmRlcjogMDtcXG59XFxuXFxuLnN0YXJ0OmRpc2FibGVkIHtcXG4gIG9wYWNpdHk6IDA7XFxuICBjdXJzb3I6IGF1dG87XFxufVxcblxcbi5tZXNzYWdlIHtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHdpZHRoOiA1MCU7XFxufVxcblxcbi5tZXNzYWdlIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgd2lkdGg6IDIwcmVtO1xcbiAgaGVpZ2h0OiA0cmVtO1xcbn1cXG5cXG4uZ2FtZS1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBtYXJnaW46IDM1cHg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDEwcHg7XFxufVxcblxcbi5ib2FyZC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgd2lkdGg6IDQwdnc7XFxufVxcblxcbi5zaGlweWFyZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBjeWFuO1xcbiAgd2lkdGg6IDUwdnc7XFxuICBoZWlnaHQ6IDQwdnc7XFxuICBtYXJnaW46IDEwcHg7XFxufVxcblxcbi5ib2FyZC1yb3cge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGJvcmRlcjogMC4xcHggZG90dGVkICNjY2M7XFxufVxcblxcbi5ib2FyZC1jZWxsIHtcXG4gIGZsZXg6IDE7XFxuICB3aWR0aDogMXJlbTtcXG4gIGhlaWdodDogMXJlbTtcXG4gIGJvcmRlcjogMC4xcHggZG90dGVkICNjY2M7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWI5NWUwO1xcbiAgY3Vyc29yOiB1cmwoXFxcImNyb3NzaGFpci5wbmdcXFwiKSAxMiAxMiwgY3Jvc3NoYWlyO1xcbn1cXG5cXG4uc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgaGVpZ2h0OiAxcmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxufVxcblxcbi5lbmVteS1zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcXG4gIGhlaWdodDogMXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcbn1cXG5cXG4uZHJhZ2dhYmxlIHtcXG4gIGN1cnNvcjogbW92ZTtcXG59XFxuXFxuLmRyYWdnaW5nIHtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XFxuXFxuLmhpZ2hsaWdodGVkIHtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XFxuXFxuLyogW2RhdGEtc2hpcC10eXBlPVxcXCJjYXJyaWVyXFxcIl0ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIyMiAhaW1wb3J0YW50O1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn0gKi9cXG5cXG4vKiBbZGF0YS1zaGlwLXR5cGU9XFxcImNhcnJpZXJcXFwiXTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgd2lkdGg6IDgwJTtcXG4gIGhlaWdodDogNjAlO1xcbiAgYmFja2dyb3VuZDogI2NjYztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMTAlO1xcbiAgbGVmdDogMTAlO1xcbn1cXG5cXG5bZGF0YS1zaGlwLXR5cGU9XFxcImNhcnJpZXJcXFwiXTo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICB3aWR0aDogMjBweDtcXG4gIGhlaWdodDogMTBweDtcXG4gIGJhY2tncm91bmQ6ICM1NTU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDEwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG59ICovXFxuXFxuLyogW2RhdGEtc2hpcC10eXBlPVxcXCJkZXN0cm95ZXJcXFwiXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyICFpbXBvcnRhbnQ7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbn0gKi9cXG5cXG4uY2FycmllciB7XFxuICB3aWR0aDogMTJyZW07XFxufVxcblxcbi5iYXR0bGVzaGlwIHtcXG4gIHdpZHRoOiA5cmVtO1xcbn1cXG5cXG4uZGVzdHJveWVyIHtcXG4gIHdpZHRoOiA3cmVtO1xcbn1cXG5cXG4uc3VibWFyaW5lIHtcXG4gIHdpZHRoOiA3cmVtO1xcbn1cXG5cXG4ucGF0cm9sQm9hdCB7XFxuICB3aWR0aDogNC41cmVtO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLnN1bmsge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG4ubWlzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLnBsYXllcjEge1xcbiAgbWFyZ2luLWJvdHRvbTogNTBweDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImluZGV4XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4uanNcIik7XG4iLCIiXSwibmFtZXMiOlsicGxheWVyMSIsInBsYXllcjIiLCJwbGF5ZXIxQm9hcmQiLCJwbGF5ZXIyQm9hcmQiLCJwMUJvYXJkSW5zdGFuY2UiLCJwMWdhbWVCb2FyZCIsInAyZ2FtZUJvYXJkIiwibWVzc2FnZUJveCIsInJlbmRlckdhbWVCb2FyZCIsImN1cnJlbnRQbGF5ZXIiLCJzaGlwIiwidHlwZSIsImxlbmd0aCIsImhpdENvdW50Iiwic2lua1N0YXR1cyIsImlzVmVydGljYWwiLCJoaXQiLCJpc1N1bmsiLCJnYW1lQm9hcmQiLCJncmlkU2l6ZSIsImNyZWF0ZUJvYXJkIiwiYm9hcmQiLCJBcnJheSIsImZpbGwiLCJtYXAiLCJyZXNldEJvYXJkIiwicGxhY2VTaGlwIiwic3RhcnRpbmdSb3ciLCJzdGFydGluZ0NvbCIsInNoaXBMZW5ndGgiLCJpIiwicmVjZWl2ZUF0dGFjayIsInJvdyIsImNvbCIsInNoaXBzIiwiY2hlY2tGb3JXaW4iLCJhbGxTaGlwc1N1bmsiLCJldmVyeSIsInBsYXllciIsIm5hbWUiLCJnZXROYW1lIiwiZ2V0VHlwZSIsImdldEFpQ2hvaWNlIiwiYXZhaWxhYmxlU3BvdHMiLCJ4IiwieSIsInB1c2giLCJyYW5kb21JbmRleCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImFpQ2hvaWNlIiwiYXR0YWNrIiwiZW5lbXkiLCJlbmVteUJvYXJkIiwiYXR0YWNrUmVzdWx0IiwidGV4dENvbnRlbnQiLCJhbGxQMnNoaXBzU3VuayIsIm1ha2VBaU1vdmUiLCJhaUF0dGFja1Jlc3VsdCIsInNldFRpbWVvdXQiLCJyZXF1aXJlIiwibWFpbiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImdhbWVBY3RpdmUiLCJyZXN0YXJ0YWJsZSIsImRyb3BwZWRBcnJheSIsIm5vdERyb3BwZWQiLCJwMWNhcnJpZXIiLCJwMWJhdHRsZXNoaXAiLCJwMWRlc3Ryb3llciIsInAxc3VibWFyaW5lIiwicDFwYXRyb2xCb2F0IiwicDJjYXJyaWVyIiwicDJiYXR0bGVzaGlwIiwicDJkZXN0cm95ZXIiLCJwMnN1Ym1hcmluZSIsInAycGF0cm9sQm9hdCIsInAxQWxsU2hpcHMiLCJwMkFsbFNoaXBzIiwiZHJhZ2dlZFNoaXAiLCJwMkJvYXJkSW5zdGFuY2UiLCJzaGlweWFyZFNoaXBzIiwic3RhcnRHYW1lQnV0dG9uIiwic2V0VXBEb20iLCJnYW1lQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwicGxheWVyMUxhYmVsIiwicGxheWVyTmFtZSIsInByb21wdCIsInBsYXllcjJMYWJlbCIsInNoaXB5YXJkIiwic2hpcDEiLCJzaGlwMiIsInNoaXAzIiwic2hpcDQiLCJzaGlwNSIsImluaXRpYWxpc2UiLCJzZXR1cEV2ZW50TGlzdGVuZXJzIiwiZm9yRWFjaCIsImRyYWdnYWJsZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJkcmFnU3RhcnQiLCJkcmFnRW5kIiwiZHJhZ092ZXIiLCJkcm9wU2hpcCIsInNlbGVjdFRhcmdldCIsImhvdmVyIiwic3RhcnRHYW1lIiwiZGlzYWJsZWQiLCJwbGFjZVAyU2hpcHMiLCJyZXNldEdhbWUiLCJlIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwicHJldmVudERlZmF1bHQiLCJyZW1vdmUiLCJzdGFydENvbCIsInBhcnNlSW50IiwiZGF0YXNldCIsInN0YXJ0Um93IiwidGhpc1NoaXAiLCJpZCIsInNoaXBOYW1lIiwic2hpcFR5cGUiLCJwbGFjZW1lbnRSZXN1bHQiLCJjZWxsIiwiY29udGFpbnMiLCJoYW5kbGVSZXN1bHRWYWxpZGF0aW9uIiwiaGlnaGxpZ2h0ZWRDZWxsIiwidG9nZ2xlIiwiaXNHYW1lV29uIiwiaXNHYW1lTG9zdCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjb250YWluZXIiLCJib2FyZENvbnRhaW5lciIsInJvd0VsZW1lbnQiLCJjZWxsRWxlbWVudCJdLCJzb3VyY2VSb290IjoiIn0=