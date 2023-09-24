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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG1DQUFtQztBQUNuRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sdUZBQXVGLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFVBQVUsT0FBTyxPQUFPLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFB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QTs7Ozs7Ozs7Ozs7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDbEJBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7V0NyQkE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlcy5jc3M/NDRiMiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKiBAZm9ybWF0ICovXG5cbmltcG9ydCB7XG4gIHBsYXllcjEsXG4gIHBsYXllcjIsXG4gIHBsYXllcjFCb2FyZCxcbiAgcGxheWVyMkJvYXJkLFxuICBwMUJvYXJkSW5zdGFuY2UsXG4gIHAxZ2FtZUJvYXJkLFxuICBwMmdhbWVCb2FyZCxcbiAgbWVzc2FnZUJveCxcbn0gZnJvbSBcIi4vbWFpblwiO1xuaW1wb3J0IHsgcmVuZGVyR2FtZUJvYXJkIH0gZnJvbSBcIi4vcmVuZGVyXCI7XG5cbmxldCBjdXJyZW50UGxheWVyID0gXCJIdW1hblwiO1xuXG5jb25zdCBzaGlwID0gKHR5cGUsIGxlbmd0aCwgaGl0Q291bnQsIHNpbmtTdGF0dXMsIGlzVmVydGljYWwpID0+IHtcbiAgY29uc3QgaGl0ID0gKHNoaXApID0+IHtcbiAgICBzaGlwLmhpdENvdW50Kys7XG4gICAgcmV0dXJuIHNoaXAuaGl0Q291bnQ7XG4gIH07XG4gIGNvbnN0IGlzU3VuayA9IChzaGlwKSA9PiB7XG4gICAgaWYgKHNoaXAuaGl0Q291bnQgPT09IHNoaXAubGVuZ3RoKSB7XG4gICAgICBzaGlwLnNpbmtTdGF0dXMgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gc2hpcC5zaW5rU3RhdHVzO1xuICB9O1xuXG4gIHJldHVybiB7IHR5cGUsIGxlbmd0aCwgaGl0Q291bnQsIHNpbmtTdGF0dXMsIGhpdCwgaXNTdW5rLCBpc1ZlcnRpY2FsIH07XG59O1xuXG5jb25zdCBnYW1lQm9hcmQgPSAoZ3JpZFNpemUpID0+IHtcbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgYm9hcmQgPSBuZXcgQXJyYXkoZ3JpZFNpemUpXG4gICAgICAuZmlsbChudWxsKVxuICAgICAgLm1hcCgoKSA9PiBuZXcgQXJyYXkoZ3JpZFNpemUpLmZpbGwoXCJ3YXRlclwiKSk7XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9O1xuXG4gIGNvbnN0IHJlc2V0Qm9hcmQgPSAoKSA9PiB7XG4gICAgLy9Ob3QgYmVpbmcgdXNlZCBjdXJyZW50bHlcbiAgICB0aGlzLmJvYXJkID0gW107XG4gICAgdGhpcy5ib2FyZCA9IHRoaXMuY3JlYXRlQm9hcmQoKTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoYm9hcmQsIHNoaXAsIHN0YXJ0aW5nUm93LCBzdGFydGluZ0NvbCkgPT4ge1xuICAgIGNvbnN0IGlzVmVydGljYWwgPSBzaGlwLmlzVmVydGljYWw7XG4gICAgY29uc3Qgc2hpcExlbmd0aCA9IHNoaXAubGVuZ3RoO1xuICAgIHNoaXAuc3RhcnRpbmdSb3cgPSBzdGFydGluZ1JvdztcbiAgICBzaGlwLnN0YXJ0aW5nQ29sID0gc3RhcnRpbmdDb2w7XG4gICAgLy9DaGVjayBpZiBzaGlwIHBsYWNlbWVudCBpcyBpbiBib3VuZHNcbiAgICBpZiAoXG4gICAgICAoaXNWZXJ0aWNhbCAmJiBzdGFydGluZ1JvdyArIHNoaXBMZW5ndGggPiBncmlkU2l6ZSkgfHxcbiAgICAgICghaXNWZXJ0aWNhbCAmJiBzdGFydGluZ0NvbCArIHNoaXBMZW5ndGggPiBncmlkU2l6ZSlcbiAgICApIHtcbiAgICAgIHJldHVybiBudWxsOyAvLyBJbnZhbGlkIHBsYWNlbWVudFxuICAgIH1cblxuICAgIC8vQ2hlY2sgaWYgY2VsbHMgYXJlIGFscmVhZHkgb2NjdXBpZWRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgICAgaWYgKGJvYXJkW3N0YXJ0aW5nUm93ICsgaV1bc3RhcnRpbmdDb2xdICE9PSBcIndhdGVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGJvYXJkW3N0YXJ0aW5nUm93XVtzdGFydGluZ0NvbCArIGldICE9PSBcIndhdGVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vb3RoZXJ3aXNlIHZhbGlkLCBzbyBwbGFjZSBzaGlwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICAgIGJvYXJkW3N0YXJ0aW5nUm93ICsgaV1bc3RhcnRpbmdDb2xdID0gc2hpcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvYXJkW3N0YXJ0aW5nUm93XVtzdGFydGluZ0NvbCArIGldID0gc2hpcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbCwgYm9hcmQsIHNoaXBzKSA9PiB7XG4gICAgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gXCJ3YXRlclwiKSB7XG4gICAgICBib2FyZFtyb3ddW2NvbF0gPSBcIk1JU1NcIjtcbiAgICAgIHJldHVybiBcIk1JU1NcIjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2FyZFtyb3ddW2NvbF0uaGl0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBib2FyZFtyb3ddW2NvbF07XG4gICAgICBzaGlwLmhpdChzaGlwKTtcblxuICAgICAgaWYgKHNoaXAuaXNTdW5rKHNoaXApKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChzaGlwLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgIGJvYXJkW3NoaXAuc3RhcnRpbmdSb3cgKyBpXVtzaGlwLnN0YXJ0aW5nQ29sXSA9IFwiU1VOS1wiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2FyZFtzaGlwLnN0YXJ0aW5nUm93XVtzaGlwLnN0YXJ0aW5nQ29sICsgaV0gPSBcIlNVTktcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2hlY2tGb3JXaW4oc2hpcHMpO1xuICAgICAgICByZXR1cm4gXCJTVU5LXCI7XG4gICAgICB9XG4gICAgICBib2FyZFtyb3ddW2NvbF0gPSBcIkhJVFwiO1xuICAgICAgY2hlY2tGb3JXaW4oc2hpcHMpO1xuXG4gICAgICByZXR1cm4gXCJISVRcIjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2hlY2tGb3JXaW4gPSAoc2hpcHMpID0+IHtcbiAgICAvL2NhbGxlZCBhZnRlciBlYWNoIHR1cm5cbiAgICBjb25zdCBhbGxTaGlwc1N1bmsgPSBzaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5zaW5rU3RhdHVzKTtcblxuICAgIGlmIChhbGxTaGlwc1N1bmspIHtcbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAvL2VuZCBnYW1lIGxvb3AgYW5kIHVwZGF0ZSBVSVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgcmV0dXJuIHsgY3JlYXRlQm9hcmQsIHJlc2V0Qm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgY2hlY2tGb3JXaW4gfTtcbn07XG5cbmNvbnN0IHBsYXllciA9IChuYW1lLCBib2FyZCwgdHlwZSwgc2hpcHMpID0+IHtcbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7IC8vY2hhbmdlIHRvIGlucHV0IGFmdGVyIFVJIGNyZWF0ZWRcblxuICBjb25zdCBnZXRUeXBlID0gKCkgPT4gdHlwZTsgLy9IdW1hbiBvciBBSVxuXG4gIGNvbnN0IGdldEFpQ2hvaWNlID0gKCkgPT4ge1xuICAgIC8vVEhJUyBJUyBWRVJZIFNMT1cgLSBVUERBVEUhIGluaXRpYWxpc2Ugb3V0c2lkZSBvZiBmYWN0b3J5P1xuICAgIGNvbnN0IGF2YWlsYWJsZVNwb3RzID0gW107XG5cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGJvYXJkLmxlbmd0aDsgeCsrKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGJvYXJkW3hdLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBib2FyZFt4XVt5XSAhPT0gXCJNSVNTXCIgJiZcbiAgICAgICAgICBib2FyZFt4XVt5XSAhPT0gXCJISVRcIiAmJlxuICAgICAgICAgIGJvYXJkW3hdW3ldICE9PSBcIlNVTktcIlxuICAgICAgICApIHtcbiAgICAgICAgICBhdmFpbGFibGVTcG90cy5wdXNoKHsgeCwgeSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGF2YWlsYWJsZVNwb3RzLmxlbmd0aCk7XG4gICAgY29uc3QgYWlDaG9pY2UgPSBhdmFpbGFibGVTcG90c1tyYW5kb21JbmRleF07XG4gICAgcmV0dXJuIGFpQ2hvaWNlO1xuICB9O1xuXG4gIGNvbnN0IGF0dGFjayA9IChlbmVteSwgeCwgeSkgPT4ge1xuICAgIGlmIChjdXJyZW50UGxheWVyID09PSBcIkh1bWFuXCIpIHtcbiAgICAgIGNvbnN0IGVuZW15Qm9hcmQgPSBwMUJvYXJkSW5zdGFuY2U7XG4gICAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIGVuZW15LmJvYXJkLFxuICAgICAgICBlbmVteS5zaGlwc1xuICAgICAgKTtcblxuICAgICAgLy9UbyBVcGRhdGUgbWVzc2FnZXMgdG8gZGlzcGxheSB3aGljaCBzaGlwIGlzIHN1bmtcbiAgICAgIGlmIChhdHRhY2tSZXN1bHQgPT0gXCJISVRcIikge1xuICAgICAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gYFlvdSd2ZSBnb3QgYSAke2F0dGFja1Jlc3VsdH0hYDtcbiAgICAgIH1cbiAgICAgIGlmIChhdHRhY2tSZXN1bHQgPT0gXCJNSVNTXCIpIHtcbiAgICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IGBZb3UgTWlzc2VkYDtcbiAgICAgIH1cbiAgICAgIGlmIChhdHRhY2tSZXN1bHQgPT0gXCJTVU5LXCIpIHtcbiAgICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IGBCT09NISBZb3Ugc3VuayBjb21wdXRlcnMgc2hpcGA7XG4gICAgICB9XG5cbiAgICAgIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIyQm9hcmQsIHAyZ2FtZUJvYXJkKTtcbiAgICAgIGNvbnN0IGFsbFAyc2hpcHNTdW5rID0gZW5lbXkuc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuc2lua1N0YXR1cyk7XG5cbiAgICAgIC8vY29tcHV0ZXJzIHR1cm4gaWYgbm90IGFsbCBzdW5rXG4gICAgICBpZiAoIWFsbFAyc2hpcHNTdW5rKSB7XG4gICAgICAgIGN1cnJlbnRQbGF5ZXIgPSBcIkNvbXB1dGVyXCI7XG4gICAgICAgIGZ1bmN0aW9uIG1ha2VBaU1vdmUoKSB7XG4gICAgICAgICAgY29uc3QgYWlDaG9pY2UgPSBnZXRBaUNob2ljZSgpO1xuICAgICAgICAgIGNvbnN0IGFpQXR0YWNrUmVzdWx0ID0gcDFCb2FyZEluc3RhbmNlLnJlY2VpdmVBdHRhY2soXG4gICAgICAgICAgICBhaUNob2ljZS54LFxuICAgICAgICAgICAgYWlDaG9pY2UueSxcbiAgICAgICAgICAgIHBsYXllcjEuYm9hcmQsXG4gICAgICAgICAgICBwbGF5ZXIxLnNoaXBzXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIC8vVG8gVXBkYXRlIG1lc3NhZ2VzIHRvIGRpc3BsYXkgd2hpY2ggc2hpcCBpcyBzdW5rXG4gICAgICAgICAgaWYgKGFpQXR0YWNrUmVzdWx0ID09IFwiSElUXCIpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBgVGhleSd2ZSBnb3QgYSAke2FpQXR0YWNrUmVzdWx0fSFgO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYWlBdHRhY2tSZXN1bHQgPT0gXCJNSVNTXCIpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBgVGhleSBNaXNzZWQhYDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFpQXR0YWNrUmVzdWx0ID09IFwiU1VOS1wiKSB7XG4gICAgICAgICAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gYEJPT00hIENvbXB1dGVyIHN1bmsgeW91ciBzaGlwIWA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjFCb2FyZCwgcDFnYW1lQm9hcmQpO1xuICAgICAgICAgIGN1cnJlbnRQbGF5ZXIgPSBcIkh1bWFuXCI7XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dChtYWtlQWlNb3ZlLCA3MDApOyAvLzAuOHMgZGVsYXkgYmV0d2VlbiB0dXJuc1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vdXBkYXRlVHVybk1lc3NhZ2UoKTtcbiAgICByZXR1cm4gcmVuZGVyR2FtZUJvYXJkO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBib2FyZCxcbiAgICB0eXBlLFxuICAgIGdldE5hbWUsXG4gICAgZ2V0VHlwZSxcbiAgICBhdHRhY2ssXG4gICAgZ2V0QWlDaG9pY2UsXG4gICAgc2hpcHMsXG4gIH07XG59O1xuXG5leHBvcnQgeyBzaGlwLCBnYW1lQm9hcmQsIHBsYXllciB9O1xuIiwiLyoqIEBmb3JtYXQgKi9cbnJlcXVpcmUoXCIuL3N0eWxlcy5jc3NcIik7XG5cbmltcG9ydCB7IHNoaXAsIGdhbWVCb2FyZCwgcGxheWVyIH0gZnJvbSBcIi4vZ2FtZS5qc1wiO1xuaW1wb3J0IHsgcmVuZGVyR2FtZUJvYXJkIH0gZnJvbSBcIi4vcmVuZGVyLmpzXCI7XG5jb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluXCIpO1xuXG4vL0dsb2JhbCBHYW1lIHN0YXRlIHZhcmlhYmxlcyAtLSBUbyByZWZhY3RvciAmIEVuY2Fwc3VsYXRlXG5sZXQgZ2FtZUFjdGl2ZSA9IGZhbHNlO1xubGV0IHJlc3RhcnRhYmxlID0gZmFsc2U7XG5sZXQgZHJvcHBlZEFycmF5ID0gW107XG5sZXQgbm90RHJvcHBlZDtcbmxldCBwMWNhcnJpZXIsIHAxYmF0dGxlc2hpcCwgcDFkZXN0cm95ZXIsIHAxc3VibWFyaW5lLCBwMXBhdHJvbEJvYXQ7XG5sZXQgcDJjYXJyaWVyLCBwMmJhdHRsZXNoaXAsIHAyZGVzdHJveWVyLCBwMnN1Ym1hcmluZSwgcDJwYXRyb2xCb2F0O1xubGV0IHAxQWxsU2hpcHMsIHAyQWxsU2hpcHM7XG5sZXQgZHJhZ2dlZFNoaXA7XG5sZXQgZ3JpZFNpemUgPSAxMDtcbmxldCBwMUJvYXJkSW5zdGFuY2UgPSBnYW1lQm9hcmQoZ3JpZFNpemUpO1xubGV0IHBsYXllcjFCb2FyZCA9IHAxQm9hcmRJbnN0YW5jZS5jcmVhdGVCb2FyZCgpO1xubGV0IHAyQm9hcmRJbnN0YW5jZSA9IGdhbWVCb2FyZChncmlkU2l6ZSk7XG5sZXQgcGxheWVyMkJvYXJkID0gcDJCb2FyZEluc3RhbmNlLmNyZWF0ZUJvYXJkKCk7XG5sZXQgcGxheWVyMTtcbmxldCBwbGF5ZXIyO1xubGV0IHAxZ2FtZUJvYXJkLCBwMmdhbWVCb2FyZDtcbmxldCBzaGlweWFyZFNoaXBzO1xubGV0IHN0YXJ0R2FtZUJ1dHRvbjtcbmxldCBtZXNzYWdlQm94O1xuXG5mdW5jdGlvbiBzZXRVcERvbSgpIHtcbiAgLy9nYW1lQ29udGFpbmVyXG4gIGNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBnYW1lQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZ2FtZS1jb250YWluZXJcIik7XG5cbiAgLy9TdGFydCBidXR0b25cbiAgc3RhcnRHYW1lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgc3RhcnRHYW1lQnV0dG9uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic3RhcnQtYnV0dG9uXCIpO1xuICBzdGFydEdhbWVCdXR0b24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzdGFydFwiKTtcbiAgc3RhcnRHYW1lQnV0dG9uLnRleHRDb250ZW50ID0gXCJQcmVzcyB0byBTdGFydFwiO1xuICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHN0YXJ0R2FtZUJ1dHRvbik7XG5cbiAgLy9NZXNzYWdlIGJveFxuICBtZXNzYWdlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbWVzc2FnZUJveC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1lc3NhZ2VcIik7XG4gIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQobWVzc2FnZUJveCk7XG5cbiAgLy9HYW1lYm9hcmRzXG4gIGNvbnN0IHBsYXllcjFMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBjb25zdCBwbGF5ZXJOYW1lID0gcHJvbXB0KFwiV2hhdCdzIHlvdXIgbmFtZVwiLCBcIlBsYXllciAxXCIpO1xuICAvL0NoZWNrIFBsYXllck5hbWUgZm9yIG51bGwsIGlmIHNvIGRlZmF1bHQgdG8gUGxheWVyMVxuICBwbGF5ZXIxTGFiZWwudGV4dENvbnRlbnQgPSBwbGF5ZXJOYW1lID8gcGxheWVyTmFtZSA6IFwiWW91XCI7XG4gIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVyMUxhYmVsKTtcbiAgcDFnYW1lQm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwMWdhbWVCb2FyZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInBsYXllcjEtYm9hcmRcIik7XG4gIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQocDFnYW1lQm9hcmQpO1xuICBjb25zdCBwbGF5ZXIyTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgcGxheWVyMkxhYmVsLnRleHRDb250ZW50ID0gXCJDb21wdXRlclwiO1xuICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllcjJMYWJlbCk7XG4gIHAyZ2FtZUJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcDJnYW1lQm9hcmQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwbGF5ZXIyLWJvYXJkXCIpO1xuICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHAyZ2FtZUJvYXJkKTtcblxuICAvL1NoaXB5YXJkXG4gIGNvbnN0IHNoaXB5YXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2hpcHlhcmQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlweWFyZFwiKTtcbiAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChzaGlweWFyZCk7XG4gIHNoaXB5YXJkLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAvLzFcbiAgY29uc3Qgc2hpcDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwMS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXAtdHlwZVwiLCBcImNhcnJpZXJcIik7XG4gIHNoaXAxLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiMFwiKTtcbiAgc2hpcDEuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkcmFnZ2FibGUgc2hpcCBjYXJyaWVyXCIpO1xuICBzaGlwMS5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJ0cnVlXCIpO1xuICBzaGlweWFyZC5hcHBlbmRDaGlsZChzaGlwMSk7XG5cbiAgLy8yXG4gIGNvbnN0IHNoaXAyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2hpcDIuc2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwLXR5cGVcIiwgXCJkZXN0cm95ZXJcIik7XG4gIHNoaXAyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiMVwiKTtcbiAgc2hpcDIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkcmFnZ2FibGUgc2hpcCBkZXN0cm95ZXJcIik7XG4gIHNoaXAyLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gIHNoaXB5YXJkLmFwcGVuZENoaWxkKHNoaXAyKTtcblxuICAvLzNcbiAgY29uc3Qgc2hpcDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwMy5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXAtdHlwZVwiLCBcImJhdHRsZXNoaXBcIik7XG4gIHNoaXAzLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiMlwiKTtcbiAgc2hpcDMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkcmFnZ2FibGUgc2hpcCBiYXR0bGVzaGlwXCIpO1xuICBzaGlwMy5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJ0cnVlXCIpO1xuICBzaGlweWFyZC5hcHBlbmRDaGlsZChzaGlwMyk7XG5cbiAgLy80XG4gIGNvbnN0IHNoaXA0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2hpcDQuc2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwLXR5cGVcIiwgXCJzdWJtYXJpbmVcIik7XG4gIHNoaXA0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiM1wiKTtcbiAgc2hpcDQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkcmFnZ2FibGUgc2hpcCBzdWJtYXJpbmVcIik7XG4gIHNoaXA0LnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gIHNoaXB5YXJkLmFwcGVuZENoaWxkKHNoaXA0KTtcblxuICAvLzVcbiAgY29uc3Qgc2hpcDUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwNS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXAtdHlwZVwiLCBcInBhdHJvbEJvYXRcIik7XG4gIHNoaXA1LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiNFwiKTtcbiAgc2hpcDUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkcmFnZ2FibGUgc2hpcCBwYXRyb2xCb2F0XCIpO1xuICBzaGlwNS5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJ0cnVlXCIpO1xuICBzaGlweWFyZC5hcHBlbmRDaGlsZChzaGlwNSk7XG5cbiAgc2hpcHlhcmRTaGlwcyA9IFtzaGlwMSwgc2hpcDIsIHNoaXAzLCBzaGlwNCwgc2hpcDVdO1xuXG4gIG1haW4uYXBwZW5kQ2hpbGQoZ2FtZUNvbnRhaW5lcik7XG5cbiAgcmV0dXJuIHtcbiAgICBnYW1lQ29udGFpbmVyLFxuICAgIHAxZ2FtZUJvYXJkLFxuICAgIHAyZ2FtZUJvYXJkLFxuICAgIHN0YXJ0R2FtZUJ1dHRvbixcbiAgICBzaGlweWFyZCxcbiAgICBzaGlweWFyZFNoaXBzLFxuICAgIG1lc3NhZ2VCb3gsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpc2UoKSB7XG4gIHAxY2FycmllciA9IHNoaXAoXCJjYXJyaWVyXCIsIDUsIDAsIGZhbHNlLCB0cnVlKTtcbiAgcDFiYXR0bGVzaGlwID0gc2hpcChcImJhdHRsZXNoaXBcIiwgNCwgMCwgZmFsc2UsIGZhbHNlKTtcbiAgcDFkZXN0cm95ZXIgPSBzaGlwKFwiZGVzdHJveWVyXCIsIDMsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAxc3VibWFyaW5lID0gc2hpcChcInN1Ym1hcmluZVwiLCAzLCAwLCBmYWxzZSwgZmFsc2UpO1xuICBwMXBhdHJvbEJvYXQgPSBzaGlwKFwicGF0cm9sQm9hdFwiLCAyLCAwLCBmYWxzZSwgZmFsc2UpO1xuXG4gIHAxQWxsU2hpcHMgPSBbXG4gICAgcDFjYXJyaWVyLFxuICAgIHAxYmF0dGxlc2hpcCxcbiAgICBwMWRlc3Ryb3llcixcbiAgICBwMXN1Ym1hcmluZSxcbiAgICBwMXBhdHJvbEJvYXQsXG4gIF07XG5cbiAgcDJjYXJyaWVyID0gc2hpcChcImNhcnJpZXJcIiwgNSwgMCwgZmFsc2UsIGZhbHNlKTtcbiAgcDJiYXR0bGVzaGlwID0gc2hpcChcImJhdHRsZXNoaXBcIiwgNCwgMCwgZmFsc2UsIGZhbHNlKTtcbiAgcDJkZXN0cm95ZXIgPSBzaGlwKFwiZGVzdHJveWVyXCIsIDMsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAyc3VibWFyaW5lID0gc2hpcChcInN1Ym1hcmluZVwiLCAzLCAwLCBmYWxzZSwgZmFsc2UpO1xuICBwMnBhdHJvbEJvYXQgPSBzaGlwKFwicGF0cm9sQm9hdFwiLCAyLCAwLCBmYWxzZSwgZmFsc2UpO1xuXG4gIHAyQWxsU2hpcHMgPSBbXG4gICAgcDJjYXJyaWVyLFxuICAgIHAyZGVzdHJveWVyLFxuICAgIHAyYmF0dGxlc2hpcCxcbiAgICBwMnN1Ym1hcmluZSxcbiAgICBwMnBhdHJvbEJvYXQsXG4gIF07XG5cbiAgLy9NYWtlIFBsYXllcnNcbiAgcGxheWVyMSA9IHBsYXllcihcbiAgICBcIlBsYXllciAxXCIsXG4gICAgcGxheWVyMUJvYXJkLFxuICAgIFwiSHVtYW5cIixcbiAgICBwMUFsbFNoaXBzLFxuICAgIHAxQm9hcmRJbnN0YW5jZVxuICApO1xuXG4gIHBsYXllcjIgPSBwbGF5ZXIoXCJDb21wdXRlclwiLCBwbGF5ZXIyQm9hcmQsIFwiQUlcIiwgcDJBbGxTaGlwcywgcDJCb2FyZEluc3RhbmNlKTtcblxuICByZW5kZXJHYW1lQm9hcmQocGxheWVyMUJvYXJkLCBwMWdhbWVCb2FyZCk7XG4gIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIyQm9hcmQsIHAyZ2FtZUJvYXJkKTtcblxuICAvL2V2ZW50IGxpc3RlbmVyc1xuICBzZXR1cEV2ZW50TGlzdGVuZXJzKHAxZ2FtZUJvYXJkLCBwMmdhbWVCb2FyZCk7XG5cbiAgcmV0dXJuIHtcbiAgICBwbGF5ZXIxLFxuICAgIHBsYXllcjFCb2FyZCxcbiAgICBwMUFsbFNoaXBzLFxuICAgIHBsYXllcjIsXG4gICAgcGxheWVyMkJvYXJkLFxuICAgIHAyQWxsU2hpcHMsXG4gIH07XG59XG5cbmZ1bmN0aW9uIHNldHVwRXZlbnRMaXN0ZW5lcnMocDFnYW1lQm9hcmQsIHAyZ2FtZUJvYXJkKSB7XG4gIHNoaXB5YXJkU2hpcHMuZm9yRWFjaCgoZHJhZ2dhYmxlKSA9PiB7XG4gICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZ1N0YXJ0KTtcbiAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZHJhZ0VuZCk7XG4gIH0pO1xuXG4gIHAxZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBkcmFnT3Zlcik7XG4gIHAxZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGRyb3BTaGlwKTtcblxuICBwMmdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VsZWN0VGFyZ2V0KTtcbiAgcDJnYW1lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBob3Zlcik7XG4gIHAyZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBob3Zlcik7XG4gIHN0YXJ0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhcnRHYW1lKTtcbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICBpZiAoXG4gICAgZHJvcHBlZEFycmF5Lmxlbmd0aCA+PSBwMUFsbFNoaXBzLmxlbmd0aCAmJlxuICAgIGdhbWVBY3RpdmUgPT0gZmFsc2UgJiZcbiAgICByZXN0YXJ0YWJsZSA9PSBmYWxzZVxuICApIHtcbiAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJTdGFydGluZywgdGhlIGVuZW15IGlzIHBsYWNpbmcgdGhlaXIgc2hpcHMuLi5cIjtcbiAgICBnYW1lQWN0aXZlID0gdHJ1ZTtcbiAgICByZXN0YXJ0YWJsZSA9IGZhbHNlO1xuICAgIHN0YXJ0R2FtZUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG5cbiAgICBwbGFjZVAyU2hpcHMoKTtcbiAgfSBlbHNlIGlmIChnYW1lQWN0aXZlID09IGZhbHNlICYmIHJlc3RhcnRhYmxlID09IHRydWUpIHtcbiAgICByZXNldEdhbWUoKTtcbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJQbGFjZSBhbGwgb2YgeW91ciBzaGlwcyBmaXJzdFwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc2V0R2FtZSgpIHtcbiAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IFwiUmVzdGFydGluZywgUGxhY2UgeW91ciBzaGlwcyFcIjtcbiAgc3RhcnRHYW1lQnV0dG9uLnRleHRDb250ZW50ID0gXCJTdGFydCBnYW1lXCI7XG4gIC8vVXBkYXRlIGdsb2JhbCB2YXJpYWJsZXNcbiAgcmVzdGFydGFibGUgPSBmYWxzZTtcbiAgZ2FtZUFjdGl2ZSA9IGZhbHNlO1xuICBkcm9wcGVkQXJyYXkgPSBbXTtcbiAgcDFCb2FyZEluc3RhbmNlID0gZ2FtZUJvYXJkKGdyaWRTaXplKTtcbiAgcGxheWVyMUJvYXJkID0gcDFCb2FyZEluc3RhbmNlLmNyZWF0ZUJvYXJkKCk7XG4gIHAyQm9hcmRJbnN0YW5jZSA9IGdhbWVCb2FyZChncmlkU2l6ZSk7XG4gIHBsYXllcjJCb2FyZCA9IHAyQm9hcmRJbnN0YW5jZS5jcmVhdGVCb2FyZCgpO1xuICBpbml0aWFsaXNlKCk7XG5cbiAgLy9jbGVhciB0aGUgZG9tXG4gIG1haW4udGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gIC8vU2V0IHVwIGV2ZW50IGxpc3RlbmVycyAmIHJlbmRlclxuICBjb25zdCB7IHAxZ2FtZUJvYXJkLCBwMmdhbWVCb2FyZCB9ID0gc2V0VXBEb20oKTtcblxuICByZW5kZXJHYW1lQm9hcmQocGxheWVyMUJvYXJkLCBwMWdhbWVCb2FyZCk7XG4gIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIyQm9hcmQsIHAyZ2FtZUJvYXJkKTtcbiAgc2V0dXBFdmVudExpc3RlbmVycyhwMWdhbWVCb2FyZCwgcDJnYW1lQm9hcmQpO1xufVxuXG5mdW5jdGlvbiBwbGFjZVAyU2hpcHMoKSB7XG4gIHAyQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMkJvYXJkLCBwMmNhcnJpZXIsIDksIDEpO1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJkZXN0cm95ZXIsIDMsIDMpO1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJiYXR0bGVzaGlwLCA1LCAyKTtcbiAgcDJCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIyQm9hcmQsIHAyc3VibWFyaW5lLCAyLCAxKTtcbiAgcDJCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIyQm9hcmQsIHAycGF0cm9sQm9hdCwgNiwgMCk7XG4gIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIyQm9hcmQsIHAyZ2FtZUJvYXJkKTtcbn1cblxuZnVuY3Rpb24gZHJhZ1N0YXJ0KGUpIHtcbiAgZHJhZ2dlZFNoaXAgPSBlLnRhcmdldDtcbiAgZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LmFkZChcImRyYWdnaW5nXCIpO1xuICBub3REcm9wcGVkID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGRyYWdPdmVyKGUpIHtcbiAgbm90RHJvcHBlZCA9IGZhbHNlO1xuXG4gIGUucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gZHJhZ0VuZChlKSB7XG4gIGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJkcmFnZ2luZ1wiKTtcbn1cblxuZnVuY3Rpb24gZHJvcFNoaXAoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IHN0YXJ0Q29sID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2wsIDEwKTtcbiAgY29uc3Qgc3RhcnRSb3cgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApO1xuXG4gIGNvbnN0IHRoaXNTaGlwID0gcDFBbGxTaGlwc1tkcmFnZ2VkU2hpcC5pZF07XG4gIGNvbnN0IHNoaXBOYW1lID0gZHJhZ2dlZFNoaXAuZGF0YXNldC5zaGlwVHlwZTtcbiAgY29uc3QgcGxhY2VtZW50UmVzdWx0ID0gcDFCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChcbiAgICBwbGF5ZXIxQm9hcmQsXG4gICAgdGhpc1NoaXAsXG4gICAgc3RhcnRSb3csXG4gICAgc3RhcnRDb2xcbiAgKTtcblxuICBpZiAocGxhY2VtZW50UmVzdWx0KSB7XG4gICAgZHJvcHBlZEFycmF5LnB1c2godGhpc1NoaXApO1xuICAgIHAxQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMUJvYXJkLCB0aGlzU2hpcCwgc3RhcnRSb3csIHN0YXJ0Q29sKTtcbiAgICBkcmFnZ2VkU2hpcC5yZW1vdmUoKTtcbiAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gYFlvdSd2ZSBwbGFjZWQgeW91ciAke3NoaXBOYW1lfWA7XG4gIH0gZWxzZSB7XG4gICAgbm90RHJvcHBlZCA9IHRydWU7XG4gICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IFwiQ2FuJ3QgZ28gdGhlcmUsIHRyeSBhZ2FpbiFcIjtcbiAgfVxuICByZW5kZXJHYW1lQm9hcmQocGxheWVyMUJvYXJkLCBwMWdhbWVCb2FyZCk7XG4gIGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJkcmFnZ2luZ1wiKTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0VGFyZ2V0KGUpIHtcbiAgaWYgKGdhbWVBY3RpdmUpIHtcbiAgICBsZXQgY2VsbCA9IGUudGFyZ2V0O1xuICAgIGlmIChjZWxsICYmICFjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcImRpc2FibGVkXCIpKSB7XG4gICAgICBjb25zdCBjb2wgPSBwYXJzZUludChjZWxsLmRhdGFzZXQuY29sLCAxMCk7XG4gICAgICBjb25zdCByb3cgPSBwYXJzZUludChjZWxsLmRhdGFzZXQucm93LCAxMCk7XG4gICAgICBwbGF5ZXIxLmF0dGFjayhwbGF5ZXIyLCByb3csIGNvbCk7XG4gICAgICBzZXRUaW1lb3V0KGhhbmRsZVJlc3VsdFZhbGlkYXRpb24sIDgwMCk7IC8vU2V0IHRoaXMgbG9uZ2VyIHRoYW4gdGhlIG1vdmUgZGVsYXlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaG92ZXIoZSkge1xuICBsZXQgaGlnaGxpZ2h0ZWRDZWxsID0gZS50YXJnZXQ7XG4gIGhpZ2hsaWdodGVkQ2VsbC5jbGFzc0xpc3QudG9nZ2xlKFwiaGlnaGxpZ2h0ZWRcIik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVJlc3VsdFZhbGlkYXRpb24oKSB7XG4gIGNvbnN0IGlzR2FtZVdvbiA9IHAyQm9hcmRJbnN0YW5jZS5jaGVja0ZvcldpbihwbGF5ZXIyLnNoaXBzKTtcbiAgY29uc3QgaXNHYW1lTG9zdCA9IHAxQm9hcmRJbnN0YW5jZS5jaGVja0ZvcldpbihwbGF5ZXIxLnNoaXBzKTtcblxuICBpZiAoaXNHYW1lV29uIHx8IGlzR2FtZUxvc3QpIHtcbiAgICBnYW1lQWN0aXZlID0gZmFsc2U7XG5cbiAgICBzdGFydEdhbWVCdXR0b24udGV4dENvbnRlbnQgPSBcIlJlc3RhcnRcIjtcbiAgICBzdGFydEdhbWVCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICByZXN0YXJ0YWJsZSA9IHRydWU7XG4gICAgcDJnYW1lQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbGVjdFRhcmdldCk7XG5cbiAgICBpZiAoaXNHYW1lV29uKSB7XG4gICAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJHYW1lIG92ZXIsIHlvdSB3aW4hXCI7XG4gICAgfVxuICAgIGlmIChpc0dhbWVMb3N0KSB7XG4gICAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJHYW1lIG92ZXIsIHlvdSBMb3NlIVwiO1xuICAgIH1cbiAgfVxufVxuXG4vL1NFVFVQIEdBTUVcbnNldFVwRG9tKCk7XG5pbml0aWFsaXNlKCk7XG5cbmV4cG9ydCB7XG4gIHBsYXllcjFCb2FyZCxcbiAgcGxheWVyMkJvYXJkLFxuICBwMWdhbWVCb2FyZCxcbiAgcDJnYW1lQm9hcmQsXG4gIHBsYXllcjEsXG4gIHBsYXllcjIsXG4gIHAxQm9hcmRJbnN0YW5jZSxcbiAgcDJCb2FyZEluc3RhbmNlLFxuICBtZXNzYWdlQm94LFxufTtcbiIsIi8qKiBAZm9ybWF0ICovXG5cbmltcG9ydCB7IHAxZ2FtZUJvYXJkIH0gZnJvbSBcIi4vbWFpbi5qc1wiO1xuXG5jb25zdCByZW5kZXJHYW1lQm9hcmQgPSAoYm9hcmQsIGNvbnRhaW5lcikgPT4ge1xuICBjb25zdCBncmlkU2l6ZSA9IDEwO1xuICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICBjb25zdCBib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJvYXJkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1jb250YWluZXJcIik7XG4gIGJvYXJkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXG4gICAgY29udGFpbmVyID09PSBwMWdhbWVCb2FyZCA/IFwicGxheWVyMVwiIDogXCJwbGF5ZXIyXCJcbiAgKTtcbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgZ3JpZFNpemU7IHJvdysrKSB7XG4gICAgY29uc3Qgcm93RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtcm93XCIpO1xuXG4gICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgZ3JpZFNpemU7IGNvbCsrKSB7XG4gICAgICBjb25zdCBjZWxsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtY2VsbFwiKTtcbiAgICAgIGNlbGxFbGVtZW50LmRhdGFzZXQucm93ID0gcm93O1xuICAgICAgY2VsbEVsZW1lbnQuZGF0YXNldC5jb2wgPSBjb2w7XG5cbiAgICAgIC8vc2V0IHN0eWxpbmcgYmFzZWQgb24gY2VsbCBjb250ZW50IGkuZS4gd2F0ZXIsIGhpdCwgc2hpcCwgbWlzc1xuICAgICAgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gXCJ3YXRlclwiKSB7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ3YXRlclwiKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvYXJkW3Jvd11bY29sXSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBpZiAoY29udGFpbmVyID09IHAxZ2FtZUJvYXJkKSB7XG4gICAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImVuZW15LXNoaXBcIik7XG4gICAgICAgIH1cbiAgICAgICAgY2VsbEVsZW1lbnQuZGF0YXNldC5zaGlwVHlwZSA9IGAke2JvYXJkW3Jvd11bY29sXS50eXBlfWA7XG4gICAgICB9IGVsc2UgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gXCJISVRcIikge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XG4gICAgICB9IGVsc2UgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gXCJNSVNTXCIpIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIlNVTktcIikge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic3Vua1wiKTtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xuICAgICAgfVxuICAgICAgcm93RWxlbWVudC5hcHBlbmRDaGlsZChjZWxsRWxlbWVudCk7XG4gICAgfVxuICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHJvd0VsZW1lbnQpO1xuICB9XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZENvbnRhaW5lcik7XG59O1xuXG5leHBvcnQgeyByZW5kZXJHYW1lQm9hcmQgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCJjcm9zc2hhaXIucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKiogQGZvcm1hdCAqL1xuXG4uc3RhcnQge1xuICBiYWNrZ3JvdW5kOiAjNWU1ZGYwO1xuICBib3JkZXItcmFkaXVzOiA5OXB4O1xuICBib3gtc2hhZG93OiAjNWU1ZGYwIDAgMTBweCAyMHB4IC0xMHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LWZhbWlseTogSW50ZXIsIEhlbHZldGljYSwgXCJBcHBsZSBDb2xvciBFbW9qaVwiLCBcIlNlZ29lIFVJIEVtb2ppXCIsXG4gICAgTm90b0NvbG9yRW1vamksIFwiTm90byBDb2xvciBFbW9qaVwiLCBcIlNlZ29lIFVJIFN5bWJvbFwiLCBcIkFuZHJvaWQgRW1vamlcIixcbiAgICBFbW9qaVN5bWJvbHMsIC1hcHBsZS1zeXN0ZW0sIHN5c3RlbS11aSwgXCJTZWdvZSBVSVwiLCBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIixcbiAgICBcIk5vdG8gU2Fuc1wiLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogNzAwO1xuICBsaW5lLWhlaWdodDogMjRweDtcbiAgcGFkZGluZzogOHB4IDE4cHg7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuICB3b3JkLWJyZWFrOiBicmVhay13b3JkO1xuICBib3JkZXI6IDA7XG59XG5cbi5zdGFydDpkaXNhYmxlZCB7XG4gIG9wYWNpdHk6IDA7XG4gIGN1cnNvcjogYXV0bztcbn1cblxuLm1lc3NhZ2Uge1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogNTAlO1xufVxuXG4ubWVzc2FnZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICB3aWR0aDogMjByZW07XG4gIGhlaWdodDogNHJlbTtcbn1cblxuLmdhbWUtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgbWFyZ2luOiAzNXB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xufVxuXG4uYm9hcmQtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG4gIHdpZHRoOiA0MHZ3O1xufVxuXG4uc2hpcHlhcmQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBjeWFuO1xuICB3aWR0aDogNTB2dztcbiAgaGVpZ2h0OiA0MHZ3O1xuICBtYXJnaW46IDEwcHg7XG59XG5cbi5ib2FyZC1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBib3JkZXI6IDAuMXB4IGRvdHRlZCAjY2NjO1xufVxuXG4uYm9hcmQtY2VsbCB7XG4gIGZsZXg6IDE7XG4gIHdpZHRoOiAxcmVtO1xuICBoZWlnaHQ6IDFyZW07XG4gIGJvcmRlcjogMC4xcHggZG90dGVkICNjY2M7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxYjk1ZTA7XG4gIGN1cnNvcjogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pIDEyIDEyLCBjcm9zc2hhaXI7XG59XG5cbi5zaGlwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbiAgaGVpZ2h0OiAxcmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcbn1cblxuLmVuZW15LXNoaXAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XG4gIGhlaWdodDogMXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XG59XG5cbi5kcmFnZ2FibGUge1xuICBjdXJzb3I6IG1vdmU7XG59XG5cbi5kcmFnZ2luZyB7XG4gIG9wYWNpdHk6IDAuNTtcbn1cblxuLmhpZ2hsaWdodGVkIHtcbiAgb3BhY2l0eTogMC41O1xufVxuXG4vKiBbZGF0YS1zaGlwLXR5cGU9XCJjYXJyaWVyXCJdIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIyMiAhaW1wb3J0YW50O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn0gKi9cblxuLyogW2RhdGEtc2hpcC10eXBlPVwiY2FycmllclwiXTo6YmVmb3JlIHtcbiAgY29udGVudDogXCJcIjtcbiAgd2lkdGg6IDgwJTtcbiAgaGVpZ2h0OiA2MCU7XG4gIGJhY2tncm91bmQ6ICNjY2M7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxMCU7XG4gIGxlZnQ6IDEwJTtcbn1cblxuW2RhdGEtc2hpcC10eXBlPVwiY2FycmllclwiXTo6YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiAxMHB4O1xuICBiYWNrZ3JvdW5kOiAjNTU1O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbn0gKi9cblxuLyogW2RhdGEtc2hpcC10eXBlPVwiZGVzdHJveWVyXCJdIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIyMiAhaW1wb3J0YW50O1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59ICovXG5cbi5jYXJyaWVyIHtcbiAgd2lkdGg6IDEycmVtO1xufVxuXG4uYmF0dGxlc2hpcCB7XG4gIHdpZHRoOiA5cmVtO1xufVxuXG4uZGVzdHJveWVyIHtcbiAgd2lkdGg6IDdyZW07XG59XG5cbi5zdWJtYXJpbmUge1xuICB3aWR0aDogN3JlbTtcbn1cblxuLnBhdHJvbEJvYXQge1xuICB3aWR0aDogNC41cmVtO1xufVxuXG4uaGl0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuXG4uc3VuayB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuLm1pc3Mge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuLnBsYXllcjEge1xuICBtYXJnaW4tYm90dG9tOiA1MHB4O1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSxhQUFhOztBQUViO0VBQ0UsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixxQ0FBcUM7RUFDckMsc0JBQXNCO0VBQ3RCLGNBQWM7RUFDZCxlQUFlO0VBQ2Y7OzsyQkFHeUI7RUFDekIsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLHlCQUF5QjtFQUN6QiwwQkFBMEI7RUFDMUIsa0JBQWtCO0VBQ2xCLHNCQUFzQjtFQUN0QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsWUFBWTtBQUNkOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsVUFBVTtBQUNaOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQ0FBbUM7RUFDbkMsV0FBVztBQUNiOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLFdBQVc7RUFDWCxZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLE9BQU87RUFDUCxXQUFXO0VBQ1gsWUFBWTtFQUNaLHlCQUF5QjtFQUN6Qix5QkFBeUI7RUFDekIsZ0VBQTZDO0FBQy9DOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsWUFBWTtFQUNaLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTs7OztHQUlHOztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHOztBQUVIOzs7O0dBSUc7O0FBRUg7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqIEBmb3JtYXQgKi9cXG5cXG4uc3RhcnQge1xcbiAgYmFja2dyb3VuZDogIzVlNWRmMDtcXG4gIGJvcmRlci1yYWRpdXM6IDk5cHg7XFxuICBib3gtc2hhZG93OiAjNWU1ZGYwIDAgMTBweCAyMHB4IC0xMHB4O1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZm9udC1mYW1pbHk6IEludGVyLCBIZWx2ZXRpY2EsIFxcXCJBcHBsZSBDb2xvciBFbW9qaVxcXCIsIFxcXCJTZWdvZSBVSSBFbW9qaVxcXCIsXFxuICAgIE5vdG9Db2xvckVtb2ppLCBcXFwiTm90byBDb2xvciBFbW9qaVxcXCIsIFxcXCJTZWdvZSBVSSBTeW1ib2xcXFwiLCBcXFwiQW5kcm9pZCBFbW9qaVxcXCIsXFxuICAgIEVtb2ppU3ltYm9scywgLWFwcGxlLXN5c3RlbSwgc3lzdGVtLXVpLCBcXFwiU2Vnb2UgVUlcXFwiLCBSb2JvdG8sIFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsXFxuICAgIFxcXCJOb3RvIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgcGFkZGluZzogOHB4IDE4cHg7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XFxuICBib3JkZXI6IDA7XFxufVxcblxcbi5zdGFydDpkaXNhYmxlZCB7XFxuICBvcGFjaXR5OiAwO1xcbiAgY3Vyc29yOiBhdXRvO1xcbn1cXG5cXG4ubWVzc2FnZSB7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB3aWR0aDogNTAlO1xcbn1cXG5cXG4ubWVzc2FnZSB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIHdpZHRoOiAyMHJlbTtcXG4gIGhlaWdodDogNHJlbTtcXG59XFxuXFxuLmdhbWUtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgbWFyZ2luOiAzNXB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAxMHB4O1xcbn1cXG5cXG4uYm9hcmQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIHdpZHRoOiA0MHZ3O1xcbn1cXG5cXG4uc2hpcHlhcmQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogY3lhbjtcXG4gIHdpZHRoOiA1MHZ3O1xcbiAgaGVpZ2h0OiA0MHZ3O1xcbiAgbWFyZ2luOiAxMHB4O1xcbn1cXG5cXG4uYm9hcmQtcm93IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBib3JkZXI6IDAuMXB4IGRvdHRlZCAjY2NjO1xcbn1cXG5cXG4uYm9hcmQtY2VsbCB7XFxuICBmbGV4OiAxO1xcbiAgd2lkdGg6IDFyZW07XFxuICBoZWlnaHQ6IDFyZW07XFxuICBib3JkZXI6IDAuMXB4IGRvdHRlZCAjY2NjO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFiOTVlMDtcXG4gIGN1cnNvcjogdXJsKFxcXCJjcm9zc2hhaXIucG5nXFxcIikgMTIgMTIsIGNyb3NzaGFpcjtcXG59XFxuXFxuLnNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gIGhlaWdodDogMXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcbn1cXG5cXG4uZW5lbXktc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XFxuICBoZWlnaHQ6IDFyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXG59XFxuXFxuLmRyYWdnYWJsZSB7XFxuICBjdXJzb3I6IG1vdmU7XFxufVxcblxcbi5kcmFnZ2luZyB7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcblxcbi5oaWdobGlnaHRlZCB7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcblxcbi8qIFtkYXRhLXNoaXAtdHlwZT1cXFwiY2FycmllclxcXCJdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjIgIWltcG9ydGFudDtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59ICovXFxuXFxuLyogW2RhdGEtc2hpcC10eXBlPVxcXCJjYXJyaWVyXFxcIl06OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHdpZHRoOiA4MCU7XFxuICBoZWlnaHQ6IDYwJTtcXG4gIGJhY2tncm91bmQ6ICNjY2M7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDEwJTtcXG4gIGxlZnQ6IDEwJTtcXG59XFxuXFxuW2RhdGEtc2hpcC10eXBlPVxcXCJjYXJyaWVyXFxcIl06OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgd2lkdGg6IDIwcHg7XFxuICBoZWlnaHQ6IDEwcHg7XFxuICBiYWNrZ3JvdW5kOiAjNTU1O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAxMCU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XFxufSAqL1xcblxcbi8qIFtkYXRhLXNoaXAtdHlwZT1cXFwiZGVzdHJveWVyXFxcIl0ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIyMiAhaW1wb3J0YW50O1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG59ICovXFxuXFxuLmNhcnJpZXIge1xcbiAgd2lkdGg6IDEycmVtO1xcbn1cXG5cXG4uYmF0dGxlc2hpcCB7XFxuICB3aWR0aDogOXJlbTtcXG59XFxuXFxuLmRlc3Ryb3llciB7XFxuICB3aWR0aDogN3JlbTtcXG59XFxuXFxuLnN1Ym1hcmluZSB7XFxuICB3aWR0aDogN3JlbTtcXG59XFxuXFxuLnBhdHJvbEJvYXQge1xcbiAgd2lkdGg6IDQuNXJlbTtcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVxcblxcbi5zdW5rIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLm1pc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVxcblxcbi5wbGF5ZXIxIHtcXG4gIG1hcmdpbi1ib3R0b206IDUwcHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJpbmRleFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluLmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbInBsYXllcjEiLCJwbGF5ZXIyIiwicGxheWVyMUJvYXJkIiwicGxheWVyMkJvYXJkIiwicDFCb2FyZEluc3RhbmNlIiwicDFnYW1lQm9hcmQiLCJwMmdhbWVCb2FyZCIsIm1lc3NhZ2VCb3giLCJyZW5kZXJHYW1lQm9hcmQiLCJjdXJyZW50UGxheWVyIiwic2hpcCIsInR5cGUiLCJsZW5ndGgiLCJoaXRDb3VudCIsInNpbmtTdGF0dXMiLCJpc1ZlcnRpY2FsIiwiaGl0IiwiaXNTdW5rIiwiZ2FtZUJvYXJkIiwiZ3JpZFNpemUiLCJjcmVhdGVCb2FyZCIsImJvYXJkIiwiQXJyYXkiLCJmaWxsIiwibWFwIiwicmVzZXRCb2FyZCIsInBsYWNlU2hpcCIsInN0YXJ0aW5nUm93Iiwic3RhcnRpbmdDb2wiLCJzaGlwTGVuZ3RoIiwiaSIsInJlY2VpdmVBdHRhY2siLCJyb3ciLCJjb2wiLCJzaGlwcyIsImNoZWNrRm9yV2luIiwiYWxsU2hpcHNTdW5rIiwiZXZlcnkiLCJwbGF5ZXIiLCJuYW1lIiwiZ2V0TmFtZSIsImdldFR5cGUiLCJnZXRBaUNob2ljZSIsImF2YWlsYWJsZVNwb3RzIiwieCIsInkiLCJwdXNoIiwicmFuZG9tSW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJhaUNob2ljZSIsImF0dGFjayIsImVuZW15IiwiZW5lbXlCb2FyZCIsImF0dGFja1Jlc3VsdCIsInRleHRDb250ZW50IiwiYWxsUDJzaGlwc1N1bmsiLCJtYWtlQWlNb3ZlIiwiYWlBdHRhY2tSZXN1bHQiLCJzZXRUaW1lb3V0IiwicmVxdWlyZSIsIm1haW4iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJnYW1lQWN0aXZlIiwicmVzdGFydGFibGUiLCJkcm9wcGVkQXJyYXkiLCJub3REcm9wcGVkIiwicDFjYXJyaWVyIiwicDFiYXR0bGVzaGlwIiwicDFkZXN0cm95ZXIiLCJwMXN1Ym1hcmluZSIsInAxcGF0cm9sQm9hdCIsInAyY2FycmllciIsInAyYmF0dGxlc2hpcCIsInAyZGVzdHJveWVyIiwicDJzdWJtYXJpbmUiLCJwMnBhdHJvbEJvYXQiLCJwMUFsbFNoaXBzIiwicDJBbGxTaGlwcyIsImRyYWdnZWRTaGlwIiwicDJCb2FyZEluc3RhbmNlIiwic2hpcHlhcmRTaGlwcyIsInN0YXJ0R2FtZUJ1dHRvbiIsInNldFVwRG9tIiwiZ2FtZUNvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInBsYXllcjFMYWJlbCIsInBsYXllck5hbWUiLCJwcm9tcHQiLCJwbGF5ZXIyTGFiZWwiLCJzaGlweWFyZCIsInNoaXAxIiwic2hpcDIiLCJzaGlwMyIsInNoaXA0Iiwic2hpcDUiLCJpbml0aWFsaXNlIiwic2V0dXBFdmVudExpc3RlbmVycyIsImZvckVhY2giLCJkcmFnZ2FibGUiLCJhZGRFdmVudExpc3RlbmVyIiwiZHJhZ1N0YXJ0IiwiZHJhZ0VuZCIsImRyYWdPdmVyIiwiZHJvcFNoaXAiLCJzZWxlY3RUYXJnZXQiLCJob3ZlciIsInN0YXJ0R2FtZSIsImRpc2FibGVkIiwicGxhY2VQMlNoaXBzIiwicmVzZXRHYW1lIiwiZSIsInRhcmdldCIsImNsYXNzTGlzdCIsImFkZCIsInByZXZlbnREZWZhdWx0IiwicmVtb3ZlIiwic3RhcnRDb2wiLCJwYXJzZUludCIsImRhdGFzZXQiLCJzdGFydFJvdyIsInRoaXNTaGlwIiwiaWQiLCJzaGlwTmFtZSIsInNoaXBUeXBlIiwicGxhY2VtZW50UmVzdWx0IiwiY2VsbCIsImNvbnRhaW5zIiwiaGFuZGxlUmVzdWx0VmFsaWRhdGlvbiIsImhpZ2hsaWdodGVkQ2VsbCIsInRvZ2dsZSIsImlzR2FtZVdvbiIsImlzR2FtZUxvc3QiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY29udGFpbmVyIiwiYm9hcmRDb250YWluZXIiLCJyb3dFbGVtZW50IiwiY2VsbEVsZW1lbnQiXSwic291cmNlUm9vdCI6IiJ9