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
const player = (name, board, type, ships, gameBoardInstance) => {
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
      /* console.log(
        `${currentPlayer} has attacked ${player2.getName()} and it is a ${attackResult}`
      ); */
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(_main__WEBPACK_IMPORTED_MODULE_0__.player2Board, _main__WEBPACK_IMPORTED_MODULE_0__.p2gameBoard);

      //computers turn
      currentPlayer = "Computer";
      function makeAiMove() {
        const aiChoice = getAiChoice();
        const aiAttackResult = _main__WEBPACK_IMPORTED_MODULE_0__.p1BoardInstance.receiveAttack(aiChoice.x, aiChoice.y, _main__WEBPACK_IMPORTED_MODULE_0__.player1.board, _main__WEBPACK_IMPORTED_MODULE_0__.player1.ships);
        /* console.log(
          `${currentPlayer} has attacked ${player1.getName()} and it is a ${aiAttackResult}`
        ); */
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(_main__WEBPACK_IMPORTED_MODULE_0__.player1Board, _main__WEBPACK_IMPORTED_MODULE_0__.p1gameBoard);
        currentPlayer = "Human";
      }
      setTimeout(makeAiMove, 400); //0.4s delay between turns
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
/* let p1BoardInstance, p2BoardInstance; */ //BLock scoped variable clash

function setUpDom() {
  //gameContainer
  const gameContainer = document.createElement("div");
  gameContainer.setAttribute("class", "game-container");

  //Start button
  const startGameButton = document.createElement("button");
  startGameButton.setAttribute("id", "start-button");
  startGameButton.setAttribute("class", "start");
  startGameButton.textContent = "Press to Start";
  gameContainer.appendChild(startGameButton);

  //Message box
  const messageBox = document.createElement("div");
  messageBox.setAttribute("class", "message");
  gameContainer.appendChild(messageBox);

  //Gameboards
  const player1Label = document.createElement("p");
  player1Label.textContent = "Player 1";
  gameContainer.appendChild(player1Label);
  const p1gameBoard = document.createElement("div");
  p1gameBoard.setAttribute("class", "player1-board");
  gameContainer.appendChild(p1gameBoard);
  const player2Label = document.createElement("p");
  player2Label.textContent = "Player 2";
  gameContainer.appendChild(player2Label);
  const p2gameBoard = document.createElement("div");
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
  const shipyardShips = [ship1, ship2, ship3, ship4, ship5];
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
const {
  p1gameBoard,
  p2gameBoard,
  startGameButton,
  shipyardShips,
  messageBox
} = setUpDom();
function initialise() {
  let gridSize = 10;
  const p1BoardInstance = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard)(gridSize);
  const player1Board = p1BoardInstance.createBoard();
  const p2BoardInstance = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard)(gridSize);
  const player2Board = p2BoardInstance.createBoard();
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
  const player1 = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.player)("Tom", player1Board, "Human", p1AllShips, p1BoardInstance);
  const player2 = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.player)("Computer", player2Board, "AI", p2AllShips, p2BoardInstance);
  (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(player1Board, p1gameBoard);
  (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(player2Board, p2gameBoard);

  //event listeners
  setupEventListeners(p1gameBoard, p2gameBoard);
  return {
    p1BoardInstance,
    player1,
    player1Board,
    p2BoardInstance,
    player2,
    player2Board,
    p1AllShips,
    p2AllShips
  };
}

//SETUP
const {
  player1,
  player2,
  player1Board,
  p1BoardInstance,
  player2Board,
  p2BoardInstance
} = initialise();
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
  if (droppedArray.length >= 1 && gameActive == false && restartable == false) {
    messageBox.textContent = "Starting, the enemy is placing their ships...";
    gameActive = true;
    restartable = false;
    startGameButton.disabled = true;
    placeP2Ships(); //Up
  } else if (gameActive == false && restartable == true) {
    resetGame(p1BoardInstance); //logic for resetting game state - Move the rest in here!
  } else {
    messageBox.textContent = "Place all of your ships first";
  }
}
function resetGame(boardInstance) {
  //Update Messages
  messageBox.textContent = "Restarting, Place your ships!";
  startGameButton.textContent = "Start game";
  //Update global variables
  restartable = false;
  gameActive = false;
  droppedArray = [];
  //clear the dom
  main.textContent = "";
  //Set up event listeners & render
  const {
    player1,
    player2,
    player1Board,
    p1BoardInstance,
    player2Board,
    p2BoardInstance
  } = initialise();
  const {
    p1gameBoard,
    p2gameBoard
  } = setUpDom();
  setupEventListeners(p1gameBoard, p2gameBoard);
  (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(player1Board, p1gameBoard);
  (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(player2Board, p2gameBoard);
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
  //This is incorrectly using the old board not the newly created
  const placementResult = p1BoardInstance.placeShip(player1Board, thisShip, startRow, startCol);
  console.log(placementResult); // returning null due to old board as above

  if (placementResult) {
    droppedArray.push(thisShip);
    p1BoardInstance.placeShip(player1Board, thisShip, startRow, startCol);
    draggedShip.remove();
  } else {
    notDropped = true;
  }
  console.log(droppedArray);
  console.log(player1Board);
  (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(player1Board, p1gameBoard);
  draggedShip.classList.remove("dragging");
}
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
        cellElement.classList.add("ship");
        cellElement.dataset.shipType = `${board[row][col].type}`;
      } else if (board[row][col] === "HIT") {
        cellElement.classList.add("hit");
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
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/** @format */

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
  background-color: grey;
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
}

.ship {
  background-color: green;
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
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA,aAAa;;AAEb;EACE,uBAAuB;EACvB,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,mBAAmB;EACnB,uBAAuB;EACvB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,mCAAmC;EACnC,WAAW;AACb;;AAEA;EACE,sBAAsB;EACtB,WAAW;EACX,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,aAAa;EACb,yBAAyB;AAC3B;;AAEA;EACE,OAAO;EACP,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,yBAAyB;AAC3B;;AAEA;EACE,uBAAuB;EACvB,YAAY;EACZ,uBAAuB;AACzB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;;;;GAIG;;AAEH;;;;;;;;;;;;;;;;;;;GAmBG;;AAEH;;;;GAIG;;AAEH;EACE,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,mBAAmB;AACrB","sourcesContent":["/** @format */\n\n.message {\n  border: 1px solid black;\n  width: 20rem;\n  height: 4rem;\n}\n\n.game-container {\n  display: flex;\n  flex-direction: column;\n  margin: 35px;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n}\n\n.board-container {\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  width: 40vw;\n}\n\n.shipyard {\n  background-color: grey;\n  width: 50vw;\n  height: 40vw;\n  margin: 10px;\n}\n\n.board-row {\n  display: flex;\n  border: 0.1px dotted #ccc;\n}\n\n.board-cell {\n  flex: 1;\n  width: 1rem;\n  height: 1rem;\n  border: 0.1px dotted #ccc;\n  background-color: #1b95e0;\n}\n\n.ship {\n  background-color: green;\n  height: 1rem;\n  border: 1px solid white;\n}\n\n.draggable {\n  cursor: move;\n}\n\n.dragging {\n  opacity: 0.5;\n}\n\n.highlighted {\n  opacity: 0.5;\n}\n\n/* [data-ship-type=\"carrier\"] {\n  background-color: #222 !important;\n  border-radius: 6px;\n  position: relative;\n} */\n\n/* [data-ship-type=\"carrier\"]::before {\n  content: \"\";\n  width: 80%;\n  height: 60%;\n  background: #ccc;\n  position: absolute;\n  top: 10%;\n  left: 10%;\n}\n\n[data-ship-type=\"carrier\"]::after {\n  content: \"\";\n  width: 20px;\n  height: 10px;\n  background: #555;\n  position: absolute;\n  top: 10%;\n  left: 50%;\n  transform: translateX(-50%);\n} */\n\n/* [data-ship-type=\"destroyer\"] {\n  background-color: #222 !important;\n  border-radius: 10px;\n  position: absolute;\n} */\n\n.carrier {\n  width: 12rem;\n}\n\n.battleship {\n  width: 9rem;\n}\n\n.destroyer {\n  width: 7rem;\n}\n\n.submarine {\n  width: 7rem;\n}\n\n.patrolBoat {\n  width: 4.5rem;\n}\n\n.hit {\n  background-color: red;\n}\n\n.sunk {\n  background-color: red;\n}\n\n.miss {\n  background-color: white;\n}\n\n.player1 {\n  margin-bottom: 50px;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc3R5bGVzLmNzcz80NGIyIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKiBAZm9ybWF0ICovXG5cbmltcG9ydCB7XG4gIHBsYXllcjEsXG4gIHBsYXllcjIsXG4gIHBsYXllcjFCb2FyZCxcbiAgcGxheWVyMkJvYXJkLFxuICBwMUJvYXJkSW5zdGFuY2UsXG4gIHAyQm9hcmRJbnN0YW5jZSxcbiAgcDFnYW1lQm9hcmQsXG4gIHAyZ2FtZUJvYXJkLFxufSBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyByZW5kZXJHYW1lQm9hcmQgfSBmcm9tIFwiLi9yZW5kZXJcIjtcblxubGV0IGN1cnJlbnRQbGF5ZXIgPSBcIkh1bWFuXCI7XG5cbmNvbnN0IHNoaXAgPSAodHlwZSwgbGVuZ3RoLCBoaXRDb3VudCwgc2lua1N0YXR1cywgaXNWZXJ0aWNhbCkgPT4ge1xuICBjb25zdCBoaXQgPSAoc2hpcCkgPT4ge1xuICAgIHNoaXAuaGl0Q291bnQrKztcbiAgICByZXR1cm4gc2hpcC5oaXRDb3VudDtcbiAgfTtcbiAgY29uc3QgaXNTdW5rID0gKHNoaXApID0+IHtcbiAgICBpZiAoc2hpcC5oaXRDb3VudCA9PT0gc2hpcC5sZW5ndGgpIHtcbiAgICAgIHNoaXAuc2lua1N0YXR1cyA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzaGlwLnNpbmtTdGF0dXM7XG4gIH07XG5cbiAgcmV0dXJuIHsgdHlwZSwgbGVuZ3RoLCBoaXRDb3VudCwgc2lua1N0YXR1cywgaGl0LCBpc1N1bmssIGlzVmVydGljYWwgfTtcbn07XG5cbmNvbnN0IGdhbWVCb2FyZCA9IChncmlkU2l6ZSkgPT4ge1xuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBib2FyZCA9IG5ldyBBcnJheShncmlkU2l6ZSlcbiAgICAgIC5maWxsKG51bGwpXG4gICAgICAubWFwKCgpID0+IG5ldyBBcnJheShncmlkU2l6ZSkuZmlsbChcIndhdGVyXCIpKTtcbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgcmVzZXRCb2FyZCA9ICgpID0+IHtcbiAgICAvL05vdCBiZWluZyB1c2VkIGN1cnJlbnRseVxuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICB0aGlzLmJvYXJkID0gdGhpcy5jcmVhdGVCb2FyZCgpO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChib2FyZCwgc2hpcCwgc3RhcnRpbmdSb3csIHN0YXJ0aW5nQ29sKSA9PiB7XG4gICAgY29uc3QgaXNWZXJ0aWNhbCA9IHNoaXAuaXNWZXJ0aWNhbDtcbiAgICBjb25zdCBzaGlwTGVuZ3RoID0gc2hpcC5sZW5ndGg7XG4gICAgc2hpcC5zdGFydGluZ1JvdyA9IHN0YXJ0aW5nUm93O1xuICAgIHNoaXAuc3RhcnRpbmdDb2wgPSBzdGFydGluZ0NvbDtcbiAgICAvL0NoZWNrIGlmIHNoaXAgcGxhY2VtZW50IGlzIGluIGJvdW5kc1xuICAgIGlmIChcbiAgICAgIChpc1ZlcnRpY2FsICYmIHN0YXJ0aW5nUm93ICsgc2hpcExlbmd0aCA+IGdyaWRTaXplKSB8fFxuICAgICAgKCFpc1ZlcnRpY2FsICYmIHN0YXJ0aW5nQ29sICsgc2hpcExlbmd0aCA+IGdyaWRTaXplKVxuICAgICkge1xuICAgICAgcmV0dXJuIG51bGw7IC8vIEludmFsaWQgcGxhY2VtZW50XG4gICAgfVxuXG4gICAgLy9DaGVjayBpZiBjZWxscyBhcmUgYWxyZWFkeSBvY2N1cGllZFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgICBpZiAoYm9hcmRbc3RhcnRpbmdSb3cgKyBpXVtzdGFydGluZ0NvbF0gIT09IFwid2F0ZXJcIikge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYm9hcmRbc3RhcnRpbmdSb3ddW3N0YXJ0aW5nQ29sICsgaV0gIT09IFwid2F0ZXJcIikge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9vdGhlcndpc2UgdmFsaWQsIHNvIHBsYWNlIHNoaXBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgICAgYm9hcmRbc3RhcnRpbmdSb3cgKyBpXVtzdGFydGluZ0NvbF0gPSBzaGlwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmRbc3RhcnRpbmdSb3ddW3N0YXJ0aW5nQ29sICsgaV0gPSBzaGlwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBib2FyZDtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sLCBib2FyZCwgc2hpcHMpID0+IHtcbiAgICBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIndhdGVyXCIpIHtcbiAgICAgIGJvYXJkW3Jvd11bY29sXSA9IFwiTUlTU1wiO1xuICAgICAgcmV0dXJuIFwiTUlTU1wiO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvYXJkW3Jvd11bY29sXS5oaXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY29uc3Qgc2hpcCA9IGJvYXJkW3Jvd11bY29sXTtcbiAgICAgIHNoaXAuaGl0KHNoaXApO1xuXG4gICAgICBpZiAoc2hpcC5pc1N1bmsoc2hpcCkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHNoaXAuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgYm9hcmRbc2hpcC5zdGFydGluZ1JvdyArIGldW3NoaXAuc3RhcnRpbmdDb2xdID0gXCJTVU5LXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvYXJkW3NoaXAuc3RhcnRpbmdSb3ddW3NoaXAuc3RhcnRpbmdDb2wgKyBpXSA9IFwiU1VOS1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaGVja0ZvcldpbihzaGlwcyk7XG4gICAgICAgIHJldHVybiBcIlNVTktcIjtcbiAgICAgIH1cbiAgICAgIGJvYXJkW3Jvd11bY29sXSA9IFwiSElUXCI7XG4gICAgICBjaGVja0ZvcldpbihzaGlwcyk7XG5cbiAgICAgIHJldHVybiBcIkhJVFwiO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja0ZvcldpbiA9IChzaGlwcykgPT4ge1xuICAgIC8vY2FsbGVkIGFmdGVyIGVhY2ggdHVyblxuICAgIGNvbnN0IGFsbFNoaXBzU3VuayA9IHNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLnNpbmtTdGF0dXMpO1xuXG4gICAgaWYgKGFsbFNoaXBzU3Vuaykge1xuICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgIC8vZW5kIGdhbWUgbG9vcCBhbmQgdXBkYXRlIFVJXG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4geyBjcmVhdGVCb2FyZCwgcmVzZXRCb2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBjaGVja0ZvcldpbiB9O1xufTtcblxuY29uc3QgcGxheWVyID0gKG5hbWUsIGJvYXJkLCB0eXBlLCBzaGlwcywgZ2FtZUJvYXJkSW5zdGFuY2UpID0+IHtcbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7IC8vY2hhbmdlIHRvIGlucHV0IGFmdGVyIFVJIGNyZWF0ZWRcblxuICBjb25zdCBnZXRUeXBlID0gKCkgPT4gdHlwZTsgLy9IdW1hbiBvciBBSVxuXG4gIGNvbnN0IGdldEFpQ2hvaWNlID0gKCkgPT4ge1xuICAgIC8vVEhJUyBJUyBWRVJZIFNMT1cgLSBVUERBVEUhIGluaXRpYWxpc2Ugb3V0c2lkZSBvZiBmYWN0b3J5P1xuICAgIGNvbnN0IGF2YWlsYWJsZVNwb3RzID0gW107XG5cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGJvYXJkLmxlbmd0aDsgeCsrKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGJvYXJkW3hdLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBib2FyZFt4XVt5XSAhPT0gXCJNSVNTXCIgJiZcbiAgICAgICAgICBib2FyZFt4XVt5XSAhPT0gXCJISVRcIiAmJlxuICAgICAgICAgIGJvYXJkW3hdW3ldICE9PSBcIlNVTktcIlxuICAgICAgICApIHtcbiAgICAgICAgICBhdmFpbGFibGVTcG90cy5wdXNoKHsgeCwgeSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGF2YWlsYWJsZVNwb3RzLmxlbmd0aCk7XG4gICAgY29uc3QgYWlDaG9pY2UgPSBhdmFpbGFibGVTcG90c1tyYW5kb21JbmRleF07XG4gICAgcmV0dXJuIGFpQ2hvaWNlO1xuICB9O1xuXG4gIGNvbnN0IGF0dGFjayA9IChlbmVteSwgeCwgeSkgPT4ge1xuICAgIGlmIChjdXJyZW50UGxheWVyID09PSBcIkh1bWFuXCIpIHtcbiAgICAgIGNvbnN0IGVuZW15Qm9hcmQgPSBwMUJvYXJkSW5zdGFuY2U7XG4gICAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIGVuZW15LmJvYXJkLFxuICAgICAgICBlbmVteS5zaGlwc1xuICAgICAgKTtcbiAgICAgIC8qIGNvbnNvbGUubG9nKFxuICAgICAgICBgJHtjdXJyZW50UGxheWVyfSBoYXMgYXR0YWNrZWQgJHtwbGF5ZXIyLmdldE5hbWUoKX0gYW5kIGl0IGlzIGEgJHthdHRhY2tSZXN1bHR9YFxuICAgICAgKTsgKi9cbiAgICAgIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIyQm9hcmQsIHAyZ2FtZUJvYXJkKTtcblxuICAgICAgLy9jb21wdXRlcnMgdHVyblxuICAgICAgY3VycmVudFBsYXllciA9IFwiQ29tcHV0ZXJcIjtcbiAgICAgIGZ1bmN0aW9uIG1ha2VBaU1vdmUoKSB7XG4gICAgICAgIGNvbnN0IGFpQ2hvaWNlID0gZ2V0QWlDaG9pY2UoKTtcbiAgICAgICAgY29uc3QgYWlBdHRhY2tSZXN1bHQgPSBwMUJvYXJkSW5zdGFuY2UucmVjZWl2ZUF0dGFjayhcbiAgICAgICAgICBhaUNob2ljZS54LFxuICAgICAgICAgIGFpQ2hvaWNlLnksXG4gICAgICAgICAgcGxheWVyMS5ib2FyZCxcbiAgICAgICAgICBwbGF5ZXIxLnNoaXBzXG4gICAgICAgICk7XG4gICAgICAgIC8qIGNvbnNvbGUubG9nKFxuICAgICAgICAgIGAke2N1cnJlbnRQbGF5ZXJ9IGhhcyBhdHRhY2tlZCAke3BsYXllcjEuZ2V0TmFtZSgpfSBhbmQgaXQgaXMgYSAke2FpQXR0YWNrUmVzdWx0fWBcbiAgICAgICAgKTsgKi9cbiAgICAgICAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjFCb2FyZCwgcDFnYW1lQm9hcmQpO1xuICAgICAgICBjdXJyZW50UGxheWVyID0gXCJIdW1hblwiO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dChtYWtlQWlNb3ZlLCA0MDApOyAvLzAuNHMgZGVsYXkgYmV0d2VlbiB0dXJuc1xuICAgIH1cblxuICAgIC8vdXBkYXRlVHVybk1lc3NhZ2UoKTtcbiAgICByZXR1cm4gcmVuZGVyR2FtZUJvYXJkO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBib2FyZCxcbiAgICB0eXBlLFxuICAgIGdldE5hbWUsXG4gICAgZ2V0VHlwZSxcbiAgICBhdHRhY2ssXG4gICAgZ2V0QWlDaG9pY2UsXG4gICAgc2hpcHMsXG4gIH07XG59O1xuXG5leHBvcnQgeyBzaGlwLCBnYW1lQm9hcmQsIHBsYXllciB9O1xuIiwiLyoqIEBmb3JtYXQgKi9cbnJlcXVpcmUoXCIuL3N0eWxlcy5jc3NcIik7XG5cbmltcG9ydCB7IHNoaXAsIGdhbWVCb2FyZCwgcGxheWVyIH0gZnJvbSBcIi4vZ2FtZS5qc1wiO1xuaW1wb3J0IHsgcmVuZGVyR2FtZUJvYXJkIH0gZnJvbSBcIi4vcmVuZGVyLmpzXCI7XG5jb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluXCIpO1xuXG4vL0dsb2JhbCBHYW1lIHN0YXRlIHZhcmlhYmxlcyAtLSBUbyByZWZhY3RvciAmIEVuY2Fwc3VsYXRlXG5sZXQgZ2FtZUFjdGl2ZSA9IGZhbHNlO1xubGV0IHJlc3RhcnRhYmxlID0gZmFsc2U7XG5sZXQgZHJvcHBlZEFycmF5ID0gW107XG5sZXQgbm90RHJvcHBlZDtcbmxldCBwMWNhcnJpZXIsIHAxYmF0dGxlc2hpcCwgcDFkZXN0cm95ZXIsIHAxc3VibWFyaW5lLCBwMXBhdHJvbEJvYXQ7XG5sZXQgcDJjYXJyaWVyLCBwMmJhdHRsZXNoaXAsIHAyZGVzdHJveWVyLCBwMnN1Ym1hcmluZSwgcDJwYXRyb2xCb2F0O1xubGV0IHAxQWxsU2hpcHMsIHAyQWxsU2hpcHM7XG5sZXQgZHJhZ2dlZFNoaXA7XG4vKiBsZXQgcDFCb2FyZEluc3RhbmNlLCBwMkJvYXJkSW5zdGFuY2U7ICovIC8vQkxvY2sgc2NvcGVkIHZhcmlhYmxlIGNsYXNoXG5cbmZ1bmN0aW9uIHNldFVwRG9tKCkge1xuICAvL2dhbWVDb250YWluZXJcbiAgY29uc3QgZ2FtZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGdhbWVDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJnYW1lLWNvbnRhaW5lclwiKTtcblxuICAvL1N0YXJ0IGJ1dHRvblxuICBjb25zdCBzdGFydEdhbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBzdGFydEdhbWVCdXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzdGFydC1idXR0b25cIik7XG4gIHN0YXJ0R2FtZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0YXJ0XCIpO1xuICBzdGFydEdhbWVCdXR0b24udGV4dENvbnRlbnQgPSBcIlByZXNzIHRvIFN0YXJ0XCI7XG4gIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhcnRHYW1lQnV0dG9uKTtcblxuICAvL01lc3NhZ2UgYm94XG4gIGNvbnN0IG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBtZXNzYWdlQm94LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWVzc2FnZVwiKTtcbiAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChtZXNzYWdlQm94KTtcblxuICAvL0dhbWVib2FyZHNcbiAgY29uc3QgcGxheWVyMUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIHBsYXllcjFMYWJlbC50ZXh0Q29udGVudCA9IFwiUGxheWVyIDFcIjtcbiAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXIxTGFiZWwpO1xuICBjb25zdCBwMWdhbWVCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHAxZ2FtZUJvYXJkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicGxheWVyMS1ib2FyZFwiKTtcbiAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwMWdhbWVCb2FyZCk7XG4gIGNvbnN0IHBsYXllcjJMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBwbGF5ZXIyTGFiZWwudGV4dENvbnRlbnQgPSBcIlBsYXllciAyXCI7XG4gIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVyMkxhYmVsKTtcbiAgY29uc3QgcDJnYW1lQm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwMmdhbWVCb2FyZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInBsYXllcjItYm9hcmRcIik7XG4gIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQocDJnYW1lQm9hcmQpO1xuXG4gIC8vU2hpcHlhcmRcbiAgY29uc3Qgc2hpcHlhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlweWFyZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXB5YXJkXCIpO1xuICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHNoaXB5YXJkKTtcbiAgc2hpcHlhcmQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gIC8vMVxuICBjb25zdCBzaGlwMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXAxLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcC10eXBlXCIsIFwiY2FycmllclwiKTtcbiAgc2hpcDEuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCIwXCIpO1xuICBzaGlwMS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIGNhcnJpZXJcIik7XG4gIHNoaXAxLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gIHNoaXB5YXJkLmFwcGVuZENoaWxkKHNoaXAxKTtcblxuICAvLzJcbiAgY29uc3Qgc2hpcDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwMi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXAtdHlwZVwiLCBcImRlc3Ryb3llclwiKTtcbiAgc2hpcDIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCIxXCIpO1xuICBzaGlwMi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIGRlc3Ryb3llclwiKTtcbiAgc2hpcDIuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcbiAgc2hpcHlhcmQuYXBwZW5kQ2hpbGQoc2hpcDIpO1xuXG4gIC8vM1xuICBjb25zdCBzaGlwMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXAzLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcC10eXBlXCIsIFwiYmF0dGxlc2hpcFwiKTtcbiAgc2hpcDMuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCIyXCIpO1xuICBzaGlwMy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIGJhdHRsZXNoaXBcIik7XG4gIHNoaXAzLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gIHNoaXB5YXJkLmFwcGVuZENoaWxkKHNoaXAzKTtcblxuICAvLzRcbiAgY29uc3Qgc2hpcDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwNC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXAtdHlwZVwiLCBcInN1Ym1hcmluZVwiKTtcbiAgc2hpcDQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCIzXCIpO1xuICBzaGlwNC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIHN1Ym1hcmluZVwiKTtcbiAgc2hpcDQuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcbiAgc2hpcHlhcmQuYXBwZW5kQ2hpbGQoc2hpcDQpO1xuXG4gIC8vNVxuICBjb25zdCBzaGlwNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXA1LnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcC10eXBlXCIsIFwicGF0cm9sQm9hdFwiKTtcbiAgc2hpcDUuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCI0XCIpO1xuICBzaGlwNS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIHBhdHJvbEJvYXRcIik7XG4gIHNoaXA1LnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gIHNoaXB5YXJkLmFwcGVuZENoaWxkKHNoaXA1KTtcblxuICBjb25zdCBzaGlweWFyZFNoaXBzID0gW3NoaXAxLCBzaGlwMiwgc2hpcDMsIHNoaXA0LCBzaGlwNV07XG5cbiAgbWFpbi5hcHBlbmRDaGlsZChnYW1lQ29udGFpbmVyKTtcblxuICByZXR1cm4ge1xuICAgIGdhbWVDb250YWluZXIsXG4gICAgcDFnYW1lQm9hcmQsXG4gICAgcDJnYW1lQm9hcmQsXG4gICAgc3RhcnRHYW1lQnV0dG9uLFxuICAgIHNoaXB5YXJkLFxuICAgIHNoaXB5YXJkU2hpcHMsXG4gICAgbWVzc2FnZUJveCxcbiAgfTtcbn1cblxuY29uc3QgeyBwMWdhbWVCb2FyZCwgcDJnYW1lQm9hcmQsIHN0YXJ0R2FtZUJ1dHRvbiwgc2hpcHlhcmRTaGlwcywgbWVzc2FnZUJveCB9ID1cbiAgc2V0VXBEb20oKTtcblxuZnVuY3Rpb24gaW5pdGlhbGlzZSgpIHtcbiAgbGV0IGdyaWRTaXplID0gMTA7XG4gIGNvbnN0IHAxQm9hcmRJbnN0YW5jZSA9IGdhbWVCb2FyZChncmlkU2l6ZSk7XG4gIGNvbnN0IHBsYXllcjFCb2FyZCA9IHAxQm9hcmRJbnN0YW5jZS5jcmVhdGVCb2FyZCgpO1xuICBjb25zdCBwMkJvYXJkSW5zdGFuY2UgPSBnYW1lQm9hcmQoZ3JpZFNpemUpO1xuICBjb25zdCBwbGF5ZXIyQm9hcmQgPSBwMkJvYXJkSW5zdGFuY2UuY3JlYXRlQm9hcmQoKTtcblxuICBwMWNhcnJpZXIgPSBzaGlwKFwiY2FycmllclwiLCA1LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gIHAxYmF0dGxlc2hpcCA9IHNoaXAoXCJiYXR0bGVzaGlwXCIsIDQsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAxZGVzdHJveWVyID0gc2hpcChcImRlc3Ryb3llclwiLCAzLCAwLCBmYWxzZSwgZmFsc2UpO1xuICBwMXN1Ym1hcmluZSA9IHNoaXAoXCJzdWJtYXJpbmVcIiwgMywgMCwgZmFsc2UsIGZhbHNlKTtcbiAgcDFwYXRyb2xCb2F0ID0gc2hpcChcInBhdHJvbEJvYXRcIiwgMiwgMCwgZmFsc2UsIGZhbHNlKTtcblxuICBwMUFsbFNoaXBzID0gW1xuICAgIHAxY2FycmllcixcbiAgICBwMWJhdHRsZXNoaXAsXG4gICAgcDFkZXN0cm95ZXIsXG4gICAgcDFzdWJtYXJpbmUsXG4gICAgcDFwYXRyb2xCb2F0LFxuICBdO1xuXG4gIHAyY2FycmllciA9IHNoaXAoXCJjYXJyaWVyXCIsIDUsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAyYmF0dGxlc2hpcCA9IHNoaXAoXCJiYXR0bGVzaGlwXCIsIDQsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAyZGVzdHJveWVyID0gc2hpcChcImRlc3Ryb3llclwiLCAzLCAwLCBmYWxzZSwgZmFsc2UpO1xuICBwMnN1Ym1hcmluZSA9IHNoaXAoXCJzdWJtYXJpbmVcIiwgMywgMCwgZmFsc2UsIGZhbHNlKTtcbiAgcDJwYXRyb2xCb2F0ID0gc2hpcChcInBhdHJvbEJvYXRcIiwgMiwgMCwgZmFsc2UsIGZhbHNlKTtcblxuICBwMkFsbFNoaXBzID0gW1xuICAgIHAyY2FycmllcixcbiAgICBwMmRlc3Ryb3llcixcbiAgICBwMmJhdHRsZXNoaXAsXG4gICAgcDJzdWJtYXJpbmUsXG4gICAgcDJwYXRyb2xCb2F0LFxuICBdO1xuXG4gIC8vTWFrZSBQbGF5ZXJzXG4gIGNvbnN0IHBsYXllcjEgPSBwbGF5ZXIoXG4gICAgXCJUb21cIixcbiAgICBwbGF5ZXIxQm9hcmQsXG4gICAgXCJIdW1hblwiLFxuICAgIHAxQWxsU2hpcHMsXG4gICAgcDFCb2FyZEluc3RhbmNlXG4gICk7XG5cbiAgY29uc3QgcGxheWVyMiA9IHBsYXllcihcbiAgICBcIkNvbXB1dGVyXCIsXG4gICAgcGxheWVyMkJvYXJkLFxuICAgIFwiQUlcIixcbiAgICBwMkFsbFNoaXBzLFxuICAgIHAyQm9hcmRJbnN0YW5jZVxuICApO1xuXG4gIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIxQm9hcmQsIHAxZ2FtZUJvYXJkKTtcbiAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjJCb2FyZCwgcDJnYW1lQm9hcmQpO1xuXG4gIC8vZXZlbnQgbGlzdGVuZXJzXG4gIHNldHVwRXZlbnRMaXN0ZW5lcnMocDFnYW1lQm9hcmQsIHAyZ2FtZUJvYXJkKTtcblxuICByZXR1cm4ge1xuICAgIHAxQm9hcmRJbnN0YW5jZSxcbiAgICBwbGF5ZXIxLFxuICAgIHBsYXllcjFCb2FyZCxcbiAgICBwMkJvYXJkSW5zdGFuY2UsXG4gICAgcGxheWVyMixcbiAgICBwbGF5ZXIyQm9hcmQsXG4gICAgcDFBbGxTaGlwcyxcbiAgICBwMkFsbFNoaXBzLFxuICB9O1xufVxuXG4vL1NFVFVQXG5jb25zdCB7XG4gIHBsYXllcjEsXG4gIHBsYXllcjIsXG4gIHBsYXllcjFCb2FyZCxcbiAgcDFCb2FyZEluc3RhbmNlLFxuICBwbGF5ZXIyQm9hcmQsXG4gIHAyQm9hcmRJbnN0YW5jZSxcbn0gPSBpbml0aWFsaXNlKCk7XG5cbmZ1bmN0aW9uIHNldHVwRXZlbnRMaXN0ZW5lcnMocDFnYW1lQm9hcmQsIHAyZ2FtZUJvYXJkKSB7XG4gIHNoaXB5YXJkU2hpcHMuZm9yRWFjaCgoZHJhZ2dhYmxlKSA9PiB7XG4gICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZ1N0YXJ0KTtcbiAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZHJhZ0VuZCk7XG4gIH0pO1xuXG4gIHAxZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBkcmFnT3Zlcik7XG4gIHAxZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGRyb3BTaGlwKTtcblxuICBwMmdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VsZWN0VGFyZ2V0KTtcbiAgcDJnYW1lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBob3Zlcik7XG4gIHAyZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBob3Zlcik7XG4gIHN0YXJ0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhcnRHYW1lKTtcbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICBpZiAoZHJvcHBlZEFycmF5Lmxlbmd0aCA+PSAxICYmIGdhbWVBY3RpdmUgPT0gZmFsc2UgJiYgcmVzdGFydGFibGUgPT0gZmFsc2UpIHtcbiAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJTdGFydGluZywgdGhlIGVuZW15IGlzIHBsYWNpbmcgdGhlaXIgc2hpcHMuLi5cIjtcbiAgICBnYW1lQWN0aXZlID0gdHJ1ZTtcbiAgICByZXN0YXJ0YWJsZSA9IGZhbHNlO1xuICAgIHN0YXJ0R2FtZUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgcGxhY2VQMlNoaXBzKCk7IC8vVXBcbiAgfSBlbHNlIGlmIChnYW1lQWN0aXZlID09IGZhbHNlICYmIHJlc3RhcnRhYmxlID09IHRydWUpIHtcbiAgICByZXNldEdhbWUocDFCb2FyZEluc3RhbmNlKTsgLy9sb2dpYyBmb3IgcmVzZXR0aW5nIGdhbWUgc3RhdGUgLSBNb3ZlIHRoZSByZXN0IGluIGhlcmUhXG4gIH0gZWxzZSB7XG4gICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IFwiUGxhY2UgYWxsIG9mIHlvdXIgc2hpcHMgZmlyc3RcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNldEdhbWUoYm9hcmRJbnN0YW5jZSkge1xuICAvL1VwZGF0ZSBNZXNzYWdlc1xuICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJSZXN0YXJ0aW5nLCBQbGFjZSB5b3VyIHNoaXBzIVwiO1xuICBzdGFydEdhbWVCdXR0b24udGV4dENvbnRlbnQgPSBcIlN0YXJ0IGdhbWVcIjtcbiAgLy9VcGRhdGUgZ2xvYmFsIHZhcmlhYmxlc1xuICByZXN0YXJ0YWJsZSA9IGZhbHNlO1xuICBnYW1lQWN0aXZlID0gZmFsc2U7XG4gIGRyb3BwZWRBcnJheSA9IFtdO1xuICAvL2NsZWFyIHRoZSBkb21cbiAgbWFpbi50ZXh0Q29udGVudCA9IFwiXCI7XG4gIC8vU2V0IHVwIGV2ZW50IGxpc3RlbmVycyAmIHJlbmRlclxuICBjb25zdCB7XG4gICAgcGxheWVyMSxcbiAgICBwbGF5ZXIyLFxuICAgIHBsYXllcjFCb2FyZCxcbiAgICBwMUJvYXJkSW5zdGFuY2UsXG4gICAgcGxheWVyMkJvYXJkLFxuICAgIHAyQm9hcmRJbnN0YW5jZSxcbiAgfSA9IGluaXRpYWxpc2UoKTtcblxuICBjb25zdCB7IHAxZ2FtZUJvYXJkLCBwMmdhbWVCb2FyZCB9ID0gc2V0VXBEb20oKTtcbiAgc2V0dXBFdmVudExpc3RlbmVycyhwMWdhbWVCb2FyZCwgcDJnYW1lQm9hcmQpO1xuICByZW5kZXJHYW1lQm9hcmQocGxheWVyMUJvYXJkLCBwMWdhbWVCb2FyZCk7XG4gIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIyQm9hcmQsIHAyZ2FtZUJvYXJkKTtcbn1cblxuZnVuY3Rpb24gcGxhY2VQMlNoaXBzKCkge1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJjYXJyaWVyLCA5LCAxKTtcbiAgcDJCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIyQm9hcmQsIHAyZGVzdHJveWVyLCAzLCAzKTtcbiAgcDJCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIyQm9hcmQsIHAyYmF0dGxlc2hpcCwgNSwgMik7XG4gIHAyQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMkJvYXJkLCBwMnN1Ym1hcmluZSwgMiwgMSk7XG4gIHAyQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMkJvYXJkLCBwMnBhdHJvbEJvYXQsIDYsIDApO1xuICByZW5kZXJHYW1lQm9hcmQocGxheWVyMkJvYXJkLCBwMmdhbWVCb2FyZCk7XG59XG5cbmZ1bmN0aW9uIGRyYWdTdGFydChlKSB7XG4gIGRyYWdnZWRTaGlwID0gZS50YXJnZXQ7XG4gIGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5hZGQoXCJkcmFnZ2luZ1wiKTtcbiAgbm90RHJvcHBlZCA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBkcmFnT3ZlcihlKSB7XG4gIG5vdERyb3BwZWQgPSBmYWxzZTtcblxuICBlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIGRyYWdFbmQoZSkge1xuICBkcmFnZ2VkU2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZ2dpbmdcIik7XG59XG5cbmZ1bmN0aW9uIGRyb3BTaGlwKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBzdGFydENvbCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sLCAxMCk7XG4gIGNvbnN0IHN0YXJ0Um93ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3csIDEwKTtcblxuICBjb25zdCB0aGlzU2hpcCA9IHAxQWxsU2hpcHNbZHJhZ2dlZFNoaXAuaWRdO1xuICAvL1RoaXMgaXMgaW5jb3JyZWN0bHkgdXNpbmcgdGhlIG9sZCBib2FyZCBub3QgdGhlIG5ld2x5IGNyZWF0ZWRcbiAgY29uc3QgcGxhY2VtZW50UmVzdWx0ID0gcDFCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChcbiAgICBwbGF5ZXIxQm9hcmQsXG4gICAgdGhpc1NoaXAsXG4gICAgc3RhcnRSb3csXG4gICAgc3RhcnRDb2xcbiAgKTtcblxuICBjb25zb2xlLmxvZyhwbGFjZW1lbnRSZXN1bHQpOyAvLyByZXR1cm5pbmcgbnVsbCBkdWUgdG8gb2xkIGJvYXJkIGFzIGFib3ZlXG5cbiAgaWYgKHBsYWNlbWVudFJlc3VsdCkge1xuICAgIGRyb3BwZWRBcnJheS5wdXNoKHRoaXNTaGlwKTtcbiAgICBwMUJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjFCb2FyZCwgdGhpc1NoaXAsIHN0YXJ0Um93LCBzdGFydENvbCk7XG4gICAgZHJhZ2dlZFNoaXAucmVtb3ZlKCk7XG4gIH0gZWxzZSB7XG4gICAgbm90RHJvcHBlZCA9IHRydWU7XG4gIH1cblxuICBjb25zb2xlLmxvZyhkcm9wcGVkQXJyYXkpO1xuICBjb25zb2xlLmxvZyhwbGF5ZXIxQm9hcmQpO1xuICByZW5kZXJHYW1lQm9hcmQocGxheWVyMUJvYXJkLCBwMWdhbWVCb2FyZCk7XG4gIGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJkcmFnZ2luZ1wiKTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0VGFyZ2V0KGUpIHtcbiAgaWYgKGdhbWVBY3RpdmUpIHtcbiAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCk7XG4gICAgY29uc3QgYXR0YWNrUmVzdWx0ID0gcGxheWVyMS5hdHRhY2socGxheWVyMiwgcm93LCBjb2wpO1xuICAgIGNvbnN0IGlzR2FtZVdvbiA9IHAyQm9hcmRJbnN0YW5jZS5jaGVja0ZvcldpbihwbGF5ZXIyLnNoaXBzKTtcblxuICAgIGlmIChpc0dhbWVXb24pIHtcbiAgICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBcIkdhbWUgb3ZlciwgeW91IHdpbiFcIjtcbiAgICAgIGdhbWVBY3RpdmUgPSBmYWxzZTtcbiAgICAgIHN0YXJ0R2FtZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUmVzdGFydFwiO1xuICAgICAgc3RhcnRHYW1lQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICByZXN0YXJ0YWJsZSA9IHRydWU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGhvdmVyKGUpIHtcbiAgbGV0IGhpZ2hsaWdodGVkQ2VsbCA9IGUudGFyZ2V0O1xuICBoaWdobGlnaHRlZENlbGwuY2xhc3NMaXN0LnRvZ2dsZShcImhpZ2hsaWdodGVkXCIpO1xufVxuXG5leHBvcnQge1xuICBwbGF5ZXIxQm9hcmQsXG4gIHBsYXllcjJCb2FyZCxcbiAgcDFnYW1lQm9hcmQsXG4gIHAyZ2FtZUJvYXJkLFxuICBwbGF5ZXIxLFxuICBwbGF5ZXIyLFxuICBwMUJvYXJkSW5zdGFuY2UsXG4gIHAyQm9hcmRJbnN0YW5jZSxcbn07XG4iLCIvKiogQGZvcm1hdCAqL1xuXG5pbXBvcnQgeyBwMWdhbWVCb2FyZCB9IGZyb20gXCIuL21haW4uanNcIjtcblxuY29uc3QgcmVuZGVyR2FtZUJvYXJkID0gKGJvYXJkLCBjb250YWluZXIpID0+IHtcbiAgY29uc3QgZ3JpZFNpemUgPSAxMDtcbiAgY29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgY29uc3QgYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBib2FyZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtY29udGFpbmVyXCIpO1xuICBib2FyZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFxuICAgIGNvbnRhaW5lciA9PT0gcDFnYW1lQm9hcmQgPyBcInBsYXllcjFcIiA6IFwicGxheWVyMlwiXG4gICk7XG4gIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IGdyaWRTaXplOyByb3crKykge1xuICAgIGNvbnN0IHJvd0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvd0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkLXJvd1wiKTtcblxuICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGdyaWRTaXplOyBjb2wrKykge1xuICAgICAgY29uc3QgY2VsbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkLWNlbGxcIik7XG4gICAgICBjZWxsRWxlbWVudC5kYXRhc2V0LnJvdyA9IHJvdztcbiAgICAgIGNlbGxFbGVtZW50LmRhdGFzZXQuY29sID0gY29sO1xuXG4gICAgICAvL3NldCBzdHlsaW5nIGJhc2VkIG9uIGNlbGwgY29udGVudCBpLmUuIHdhdGVyLCBoaXQsIHNoaXAsIG1pc3NcbiAgICAgIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IFwid2F0ZXJcIikge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwid2F0ZXJcIik7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2FyZFtyb3ddW2NvbF0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgIGNlbGxFbGVtZW50LmRhdGFzZXQuc2hpcFR5cGUgPSBgJHtib2FyZFtyb3ddW2NvbF0udHlwZX1gO1xuICAgICAgfSBlbHNlIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IFwiSElUXCIpIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIk1JU1NcIikge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIlNVTktcIikge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic3Vua1wiKTtcbiAgICAgIH1cbiAgICAgIHJvd0VsZW1lbnQuYXBwZW5kQ2hpbGQoY2VsbEVsZW1lbnQpO1xuICAgIH1cbiAgICBib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChyb3dFbGVtZW50KTtcbiAgfVxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb250YWluZXIpO1xufTtcblxuZXhwb3J0IHsgcmVuZGVyR2FtZUJvYXJkIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyoqIEBmb3JtYXQgKi9cblxuLm1lc3NhZ2Uge1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgd2lkdGg6IDIwcmVtO1xuICBoZWlnaHQ6IDRyZW07XG59XG5cbi5nYW1lLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1hcmdpbjogMzVweDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbn1cblxuLmJvYXJkLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xuICB3aWR0aDogNDB2dztcbn1cblxuLnNoaXB5YXJkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbiAgd2lkdGg6IDUwdnc7XG4gIGhlaWdodDogNDB2dztcbiAgbWFyZ2luOiAxMHB4O1xufVxuXG4uYm9hcmQtcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYm9yZGVyOiAwLjFweCBkb3R0ZWQgI2NjYztcbn1cblxuLmJvYXJkLWNlbGwge1xuICBmbGV4OiAxO1xuICB3aWR0aDogMXJlbTtcbiAgaGVpZ2h0OiAxcmVtO1xuICBib3JkZXI6IDAuMXB4IGRvdHRlZCAjY2NjO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWI5NWUwO1xufVxuXG4uc2hpcCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xuICBoZWlnaHQ6IDFyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xufVxuXG4uZHJhZ2dhYmxlIHtcbiAgY3Vyc29yOiBtb3ZlO1xufVxuXG4uZHJhZ2dpbmcge1xuICBvcGFjaXR5OiAwLjU7XG59XG5cbi5oaWdobGlnaHRlZCB7XG4gIG9wYWNpdHk6IDAuNTtcbn1cblxuLyogW2RhdGEtc2hpcC10eXBlPVwiY2FycmllclwiXSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjIgIWltcG9ydGFudDtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59ICovXG5cbi8qIFtkYXRhLXNoaXAtdHlwZT1cImNhcnJpZXJcIl06OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHdpZHRoOiA4MCU7XG4gIGhlaWdodDogNjAlO1xuICBiYWNrZ3JvdW5kOiAjY2NjO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTAlO1xuICBsZWZ0OiAxMCU7XG59XG5cbltkYXRhLXNoaXAtdHlwZT1cImNhcnJpZXJcIl06OmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMTBweDtcbiAgYmFja2dyb3VuZDogIzU1NTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDEwJTtcbiAgbGVmdDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG59ICovXG5cbi8qIFtkYXRhLXNoaXAtdHlwZT1cImRlc3Ryb3llclwiXSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjIgIWltcG9ydGFudDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xufSAqL1xuXG4uY2FycmllciB7XG4gIHdpZHRoOiAxMnJlbTtcbn1cblxuLmJhdHRsZXNoaXAge1xuICB3aWR0aDogOXJlbTtcbn1cblxuLmRlc3Ryb3llciB7XG4gIHdpZHRoOiA3cmVtO1xufVxuXG4uc3VibWFyaW5lIHtcbiAgd2lkdGg6IDdyZW07XG59XG5cbi5wYXRyb2xCb2F0IHtcbiAgd2lkdGg6IDQuNXJlbTtcbn1cblxuLmhpdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuLnN1bmsge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5taXNzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbi5wbGF5ZXIxIHtcbiAgbWFyZ2luLWJvdHRvbTogNTBweDtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsYUFBYTs7QUFFYjtFQUNFLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUNBQW1DO0VBQ25DLFdBQVc7QUFDYjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixXQUFXO0VBQ1gsWUFBWTtFQUNaLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxPQUFPO0VBQ1AsV0FBVztFQUNYLFlBQVk7RUFDWix5QkFBeUI7RUFDekIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7Ozs7R0FJRzs7QUFFSDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRzs7QUFFSDs7OztHQUlHOztBQUVIO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qKiBAZm9ybWF0ICovXFxuXFxuLm1lc3NhZ2Uge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICB3aWR0aDogMjByZW07XFxuICBoZWlnaHQ6IDRyZW07XFxufVxcblxcbi5nYW1lLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIG1hcmdpbjogMzVweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMTBweDtcXG59XFxuXFxuLmJvYXJkLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICB3aWR0aDogNDB2dztcXG59XFxuXFxuLnNoaXB5YXJkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxuICB3aWR0aDogNTB2dztcXG4gIGhlaWdodDogNDB2dztcXG4gIG1hcmdpbjogMTBweDtcXG59XFxuXFxuLmJvYXJkLXJvdyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYm9yZGVyOiAwLjFweCBkb3R0ZWQgI2NjYztcXG59XFxuXFxuLmJvYXJkLWNlbGwge1xcbiAgZmxleDogMTtcXG4gIHdpZHRoOiAxcmVtO1xcbiAgaGVpZ2h0OiAxcmVtO1xcbiAgYm9yZGVyOiAwLjFweCBkb3R0ZWQgI2NjYztcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxYjk1ZTA7XFxufVxcblxcbi5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xcbiAgaGVpZ2h0OiAxcmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxufVxcblxcbi5kcmFnZ2FibGUge1xcbiAgY3Vyc29yOiBtb3ZlO1xcbn1cXG5cXG4uZHJhZ2dpbmcge1xcbiAgb3BhY2l0eTogMC41O1xcbn1cXG5cXG4uaGlnaGxpZ2h0ZWQge1xcbiAgb3BhY2l0eTogMC41O1xcbn1cXG5cXG4vKiBbZGF0YS1zaGlwLXR5cGU9XFxcImNhcnJpZXJcXFwiXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyICFpbXBvcnRhbnQ7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufSAqL1xcblxcbi8qIFtkYXRhLXNoaXAtdHlwZT1cXFwiY2FycmllclxcXCJdOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICB3aWR0aDogODAlO1xcbiAgaGVpZ2h0OiA2MCU7XFxuICBiYWNrZ3JvdW5kOiAjY2NjO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAxMCU7XFxuICBsZWZ0OiAxMCU7XFxufVxcblxcbltkYXRhLXNoaXAtdHlwZT1cXFwiY2FycmllclxcXCJdOjphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHdpZHRoOiAyMHB4O1xcbiAgaGVpZ2h0OiAxMHB4O1xcbiAgYmFja2dyb3VuZDogIzU1NTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xcbn0gKi9cXG5cXG4vKiBbZGF0YS1zaGlwLXR5cGU9XFxcImRlc3Ryb3llclxcXCJdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjIgIWltcG9ydGFudDtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxufSAqL1xcblxcbi5jYXJyaWVyIHtcXG4gIHdpZHRoOiAxMnJlbTtcXG59XFxuXFxuLmJhdHRsZXNoaXAge1xcbiAgd2lkdGg6IDlyZW07XFxufVxcblxcbi5kZXN0cm95ZXIge1xcbiAgd2lkdGg6IDdyZW07XFxufVxcblxcbi5zdWJtYXJpbmUge1xcbiAgd2lkdGg6IDdyZW07XFxufVxcblxcbi5wYXRyb2xCb2F0IHtcXG4gIHdpZHRoOiA0LjVyZW07XFxufVxcblxcbi5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG4uc3VuayB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVxcblxcbi5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4ucGxheWVyMSB7XFxuICBtYXJnaW4tYm90dG9tOiA1MHB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluLmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbInBsYXllcjEiLCJwbGF5ZXIyIiwicGxheWVyMUJvYXJkIiwicGxheWVyMkJvYXJkIiwicDFCb2FyZEluc3RhbmNlIiwicDJCb2FyZEluc3RhbmNlIiwicDFnYW1lQm9hcmQiLCJwMmdhbWVCb2FyZCIsInJlbmRlckdhbWVCb2FyZCIsImN1cnJlbnRQbGF5ZXIiLCJzaGlwIiwidHlwZSIsImxlbmd0aCIsImhpdENvdW50Iiwic2lua1N0YXR1cyIsImlzVmVydGljYWwiLCJoaXQiLCJpc1N1bmsiLCJnYW1lQm9hcmQiLCJncmlkU2l6ZSIsImNyZWF0ZUJvYXJkIiwiYm9hcmQiLCJBcnJheSIsImZpbGwiLCJtYXAiLCJyZXNldEJvYXJkIiwicGxhY2VTaGlwIiwic3RhcnRpbmdSb3ciLCJzdGFydGluZ0NvbCIsInNoaXBMZW5ndGgiLCJpIiwicmVjZWl2ZUF0dGFjayIsInJvdyIsImNvbCIsInNoaXBzIiwiY2hlY2tGb3JXaW4iLCJhbGxTaGlwc1N1bmsiLCJldmVyeSIsInBsYXllciIsIm5hbWUiLCJnYW1lQm9hcmRJbnN0YW5jZSIsImdldE5hbWUiLCJnZXRUeXBlIiwiZ2V0QWlDaG9pY2UiLCJhdmFpbGFibGVTcG90cyIsIngiLCJ5IiwicHVzaCIsInJhbmRvbUluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiYWlDaG9pY2UiLCJhdHRhY2siLCJlbmVteSIsImVuZW15Qm9hcmQiLCJhdHRhY2tSZXN1bHQiLCJtYWtlQWlNb3ZlIiwiYWlBdHRhY2tSZXN1bHQiLCJzZXRUaW1lb3V0IiwicmVxdWlyZSIsIm1haW4iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJnYW1lQWN0aXZlIiwicmVzdGFydGFibGUiLCJkcm9wcGVkQXJyYXkiLCJub3REcm9wcGVkIiwicDFjYXJyaWVyIiwicDFiYXR0bGVzaGlwIiwicDFkZXN0cm95ZXIiLCJwMXN1Ym1hcmluZSIsInAxcGF0cm9sQm9hdCIsInAyY2FycmllciIsInAyYmF0dGxlc2hpcCIsInAyZGVzdHJveWVyIiwicDJzdWJtYXJpbmUiLCJwMnBhdHJvbEJvYXQiLCJwMUFsbFNoaXBzIiwicDJBbGxTaGlwcyIsImRyYWdnZWRTaGlwIiwic2V0VXBEb20iLCJnYW1lQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsInN0YXJ0R2FtZUJ1dHRvbiIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJtZXNzYWdlQm94IiwicGxheWVyMUxhYmVsIiwicGxheWVyMkxhYmVsIiwic2hpcHlhcmQiLCJzaGlwMSIsInNoaXAyIiwic2hpcDMiLCJzaGlwNCIsInNoaXA1Iiwic2hpcHlhcmRTaGlwcyIsImluaXRpYWxpc2UiLCJzZXR1cEV2ZW50TGlzdGVuZXJzIiwiZm9yRWFjaCIsImRyYWdnYWJsZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJkcmFnU3RhcnQiLCJkcmFnRW5kIiwiZHJhZ092ZXIiLCJkcm9wU2hpcCIsInNlbGVjdFRhcmdldCIsImhvdmVyIiwic3RhcnRHYW1lIiwiZGlzYWJsZWQiLCJwbGFjZVAyU2hpcHMiLCJyZXNldEdhbWUiLCJib2FyZEluc3RhbmNlIiwiZSIsInRhcmdldCIsImNsYXNzTGlzdCIsImFkZCIsInByZXZlbnREZWZhdWx0IiwicmVtb3ZlIiwic3RhcnRDb2wiLCJwYXJzZUludCIsImRhdGFzZXQiLCJzdGFydFJvdyIsInRoaXNTaGlwIiwiaWQiLCJwbGFjZW1lbnRSZXN1bHQiLCJjb25zb2xlIiwibG9nIiwiaXNHYW1lV29uIiwiaGlnaGxpZ2h0ZWRDZWxsIiwidG9nZ2xlIiwiY29udGFpbmVyIiwiYm9hcmRDb250YWluZXIiLCJyb3dFbGVtZW50IiwiY2VsbEVsZW1lbnQiLCJzaGlwVHlwZSJdLCJzb3VyY2VSb290IjoiIn0=