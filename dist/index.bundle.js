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



const p1gameBoard = document.querySelector(".player1-board");
const p2gameBoard = document.querySelector(".player2-board");
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
      console.log(`${currentPlayer} is taking aim!`);
      const enemyBoard = _main__WEBPACK_IMPORTED_MODULE_0__.p1BoardInstance;
      const attackResult = enemyBoard.receiveAttack(x, y, enemy.board, enemy.ships);
      /* console.log(
        `${currentPlayer} has attacked ${player2.getName()} and it is a ${attackResult}`
      ); */
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(_main__WEBPACK_IMPORTED_MODULE_0__.player2Board, p2gameBoard);

      //computers turn
      currentPlayer = "Computer";
      console.log(`${currentPlayer} is taking aim!`);
      function makeAiMove() {
        const aiChoice = getAiChoice();
        const aiAttackResult = _main__WEBPACK_IMPORTED_MODULE_0__.p1BoardInstance.receiveAttack(aiChoice.x, aiChoice.y, _main__WEBPACK_IMPORTED_MODULE_0__.player1.board, _main__WEBPACK_IMPORTED_MODULE_0__.player1.ships);
        /* console.log(
          `${currentPlayer} has attacked ${player1.getName()} and it is a ${aiAttackResult}`
        ); */
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(_main__WEBPACK_IMPORTED_MODULE_0__.player1Board, p1gameBoard);
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
/* harmony export */   player1: () => (/* binding */ player1),
/* harmony export */   player1Board: () => (/* binding */ player1Board),
/* harmony export */   player2: () => (/* binding */ player2),
/* harmony export */   player2Board: () => (/* binding */ player2Board)
/* harmony export */ });
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/game.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ "./src/render.js");
/** @format */
__webpack_require__(/*! ./styles.css */ "./src/styles.css");


const p1gameBoard = document.querySelector(".player1-board");
const p2gameBoard = document.querySelector(".player2-board");
const messageBox = document.querySelector(".message");
let gameActive = false; //update based on status
let restartable = false;
let droppedArray = [];
let player1Board, p1BoardInstance;
let player2Board, p2BoardInstance; //This is causing block scope issue
let notDropped;
let p1carrier, p1battleship, p1destroyer, p1submarine, p1patrolBoat;
let p2carrier, p2battleship, p2destroyer, p2submarine, p2patrolBoat;
let p1AllShips, p2AllShips;
function initialise() {
  let gridSize = 10;
  p1BoardInstance = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard)(gridSize);
  player1Board = p1BoardInstance.createBoard();
  p2BoardInstance = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard)(gridSize);
  player2Board = p2BoardInstance.createBoard();
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
  let player1 = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.player)("Tom", player1Board, "Human", p1AllShips, p1BoardInstance);
  let player2 = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.player)("Computer", player2Board, "AI", p2AllShips, p2BoardInstance);
  (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(player1Board, p1gameBoard);
  (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(player2Board, p2gameBoard);
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
  player2
  /* player1Board,
  p1BoardInstance,
  player2Board,
  p2BoardInstance, */
} = initialise();
const startGameButton = document.querySelector("#start-button");
startGameButton.addEventListener("click", startGame);
function startGame() {
  if (droppedArray.length >= 1 && gameActive == false && restartable == false) {
    messageBox.textContent = "Starting, the enemy is placing their ships...";
    gameActive = true;
    restartable = false;
    startGameButton.disabled = true;
    placeP2Ships(); //only call once!
  } else if (gameActive == false && restartable == true) {
    messageBox.textContent = "Restarting, Place your ships!";
    console.log("restarting");
    startGameButton.textContent = "Start game";
    restartable = false;
    gameActive = false;

    //logic for resetting game state
    initialise();
    console.log(player1Board);
    console.log(player2Board);
    console.log(player2.ships, player1.ships);
  } else {
    messageBox.textContent = "Place all of your ships first";
  }
}
function placeP2Ships() {
  p2BoardInstance.placeShip(player2Board, p2carrier, 9, 1);
  p2BoardInstance.placeShip(player2Board, p2destroyer, 3, 3);
  p2BoardInstance.placeShip(player2Board, p2battleship, 5, 2);
  p2BoardInstance.placeShip(player2Board, p2submarine, 2, 1);
  p2BoardInstance.placeShip(player2Board, p2patrolBoat, 6, 0);
  (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(player2Board, p2gameBoard);
}

/* Drag player ships */

let draggedShip;
const draggables = document.querySelectorAll(".draggable");
const optionShips = Array.from(draggables);

//event listeners
optionShips.forEach(draggable => {
  draggable.addEventListener("dragstart", dragStart);
  draggable.addEventListener("dragend", dragEnd);
});
const player1BoardContainer = document.querySelector(".player1-board");
player1BoardContainer.addEventListener("dragover", dragOver);
player1BoardContainer.addEventListener("drop", dropShip);
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
  const startCol = parseInt(e.target.dataset.col, 10);
  const startRow = parseInt(e.target.dataset.row, 10);
  const thisShip = p1AllShips[draggedShip.id]; //get the id of the ship from the p1 ship array to place
  const placementResult = p1BoardInstance.placeShip(player1Board, thisShip, startRow, startCol);
  if (placementResult) {
    droppedArray.push(thisShip);
    p1BoardInstance.placeShip(player1Board, thisShip, startRow, startCol);
    draggedShip.remove();
  } else {
    notDropped = true;
  }
  console.log(droppedArray);
  (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(player1Board, p1gameBoard);
  draggedShip.classList.remove("dragging");
}
const player2BoardContainer = document.querySelector(".player2-board");
player2BoardContainer.addEventListener("click", selectTarget);
player2BoardContainer.addEventListener("mouseover", hover);
player2BoardContainer.addEventListener("mouseout", hover);
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

[data-ship-type="carrier"] {
  background-color: #222 !important;
  border-radius: 6px;
  position: relative;
}

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
}

[data-ship-type="destroyer"] {
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
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA,aAAa;;AAEb;EACE,uBAAuB;EACvB,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,mBAAmB;EACnB,uBAAuB;EACvB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,mCAAmC;EACnC,WAAW;AACb;;AAEA;EACE,sBAAsB;EACtB,WAAW;EACX,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,aAAa;EACb,yBAAyB;AAC3B;;AAEA;EACE,OAAO;EACP,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,yBAAyB;AAC3B;;AAEA;EACE,uBAAuB;EACvB,YAAY;EACZ,uBAAuB;AACzB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,iCAAiC;EACjC,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;;;;;;;;;;;;;;;;;;;;;;;;;GAyBG;;AAEH;EACE,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,mBAAmB;AACrB","sourcesContent":["/** @format */\n\n.message {\n  border: 1px solid black;\n  width: 20rem;\n  height: 4rem;\n}\n\n.game-container {\n  display: flex;\n  flex-direction: column;\n  margin: 35px;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n}\n\n.board-container {\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  width: 40vw;\n}\n\n.shipyard {\n  background-color: grey;\n  width: 50vw;\n  height: 40vw;\n  margin: 10px;\n}\n\n.board-row {\n  display: flex;\n  border: 0.1px dotted #ccc;\n}\n\n.board-cell {\n  flex: 1;\n  width: 1rem;\n  height: 1rem;\n  border: 0.1px dotted #ccc;\n  background-color: #1b95e0;\n}\n\n.ship {\n  background-color: green;\n  height: 1rem;\n  border: 1px solid white;\n}\n\n.draggable {\n  cursor: move;\n}\n\n.dragging {\n  opacity: 0.5;\n}\n\n.highlighted {\n  opacity: 0.5;\n}\n\n[data-ship-type=\"carrier\"] {\n  background-color: #222 !important;\n  border-radius: 6px;\n  position: relative;\n}\n\n/* [data-ship-type=\"carrier\"]::before {\n  content: \"\";\n  width: 80%;\n  height: 60%;\n  background: #ccc;\n  position: absolute;\n  top: 10%;\n  left: 10%;\n}\n\n[data-ship-type=\"carrier\"]::after {\n  content: \"\";\n  width: 20px;\n  height: 10px;\n  background: #555;\n  position: absolute;\n  top: 10%;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n[data-ship-type=\"destroyer\"] {\n  background-color: #222 !important;\n  border-radius: 10px;\n  position: absolute;\n} */\n\n.carrier {\n  width: 12rem;\n}\n\n.battleship {\n  width: 9rem;\n}\n\n.destroyer {\n  width: 7rem;\n}\n\n.submarine {\n  width: 7rem;\n}\n\n.patrolBoat {\n  width: 4.5rem;\n}\n\n.hit {\n  background-color: red;\n}\n\n.sunk {\n  background-color: red;\n}\n\n.miss {\n  background-color: white;\n}\n\n.player1 {\n  margin-bottom: 50px;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sdUZBQXVGLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLDZCQUE2QixPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFB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Q0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9tYWluLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3JlbmRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zdHlsZXMuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlcy5jc3M/NDRiMiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGZvcm1hdCAqL1xuXG5pbXBvcnQge1xuICBwbGF5ZXIxLFxuICBwbGF5ZXIyLFxuICBwbGF5ZXIxQm9hcmQsXG4gIHBsYXllcjJCb2FyZCxcbiAgcDFCb2FyZEluc3RhbmNlLFxuICBwMkJvYXJkSW5zdGFuY2UsXG59IGZyb20gXCIuL21haW5cIjtcbmltcG9ydCB7IHJlbmRlckdhbWVCb2FyZCB9IGZyb20gXCIuL3JlbmRlclwiO1xuXG5jb25zdCBwMWdhbWVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMS1ib2FyZFwiKTtcbmNvbnN0IHAyZ2FtZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXIyLWJvYXJkXCIpO1xubGV0IGN1cnJlbnRQbGF5ZXIgPSBcIkh1bWFuXCI7XG5cbmNvbnN0IHNoaXAgPSAodHlwZSwgbGVuZ3RoLCBoaXRDb3VudCwgc2lua1N0YXR1cywgaXNWZXJ0aWNhbCkgPT4ge1xuICBjb25zdCBoaXQgPSAoc2hpcCkgPT4ge1xuICAgIHNoaXAuaGl0Q291bnQrKztcbiAgICByZXR1cm4gc2hpcC5oaXRDb3VudDtcbiAgfTtcbiAgY29uc3QgaXNTdW5rID0gKHNoaXApID0+IHtcbiAgICBpZiAoc2hpcC5oaXRDb3VudCA9PT0gc2hpcC5sZW5ndGgpIHtcbiAgICAgIHNoaXAuc2lua1N0YXR1cyA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzaGlwLnNpbmtTdGF0dXM7XG4gIH07XG5cbiAgcmV0dXJuIHsgdHlwZSwgbGVuZ3RoLCBoaXRDb3VudCwgc2lua1N0YXR1cywgaGl0LCBpc1N1bmssIGlzVmVydGljYWwgfTtcbn07XG5cbmNvbnN0IGdhbWVCb2FyZCA9IChncmlkU2l6ZSkgPT4ge1xuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBib2FyZCA9IG5ldyBBcnJheShncmlkU2l6ZSlcbiAgICAgIC5maWxsKG51bGwpXG4gICAgICAubWFwKCgpID0+IG5ldyBBcnJheShncmlkU2l6ZSkuZmlsbChcIndhdGVyXCIpKTtcbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKGJvYXJkLCBzaGlwLCBzdGFydGluZ1Jvdywgc3RhcnRpbmdDb2wpID0+IHtcbiAgICBjb25zdCBpc1ZlcnRpY2FsID0gc2hpcC5pc1ZlcnRpY2FsO1xuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBzaGlwLmxlbmd0aDtcbiAgICBzaGlwLnN0YXJ0aW5nUm93ID0gc3RhcnRpbmdSb3c7XG4gICAgc2hpcC5zdGFydGluZ0NvbCA9IHN0YXJ0aW5nQ29sO1xuICAgIC8vQ2hlY2sgaWYgc2hpcCBwbGFjZW1lbnQgaXMgaW4gYm91bmRzXG4gICAgaWYgKFxuICAgICAgKGlzVmVydGljYWwgJiYgc3RhcnRpbmdSb3cgKyBzaGlwTGVuZ3RoID4gZ3JpZFNpemUpIHx8XG4gICAgICAoIWlzVmVydGljYWwgJiYgc3RhcnRpbmdDb2wgKyBzaGlwTGVuZ3RoID4gZ3JpZFNpemUpXG4gICAgKSB7XG4gICAgICByZXR1cm4gbnVsbDsgLy8gSW52YWxpZCBwbGFjZW1lbnRcbiAgICB9XG5cbiAgICAvL0NoZWNrIGlmIGNlbGxzIGFyZSBhbHJlYWR5IG9jY3VwaWVkXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICAgIGlmIChib2FyZFtzdGFydGluZ1JvdyArIGldW3N0YXJ0aW5nQ29sXSAhPT0gXCJ3YXRlclwiKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChib2FyZFtzdGFydGluZ1Jvd11bc3RhcnRpbmdDb2wgKyBpXSAhPT0gXCJ3YXRlclwiKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL290aGVyd2lzZSB2YWxpZCwgc28gcGxhY2Ugc2hpcFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgICBib2FyZFtzdGFydGluZ1JvdyArIGldW3N0YXJ0aW5nQ29sXSA9IHNoaXA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2FyZFtzdGFydGluZ1Jvd11bc3RhcnRpbmdDb2wgKyBpXSA9IHNoaXA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvYXJkO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2wsIGJvYXJkLCBzaGlwcykgPT4ge1xuICAgIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IFwid2F0ZXJcIikge1xuICAgICAgYm9hcmRbcm93XVtjb2xdID0gXCJNSVNTXCI7XG4gICAgICByZXR1cm4gXCJNSVNTXCI7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYm9hcmRbcm93XVtjb2xdLmhpdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBjb25zdCBzaGlwID0gYm9hcmRbcm93XVtjb2xdO1xuICAgICAgc2hpcC5oaXQoc2hpcCk7XG5cbiAgICAgIGlmIChzaGlwLmlzU3VuayhzaGlwKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoc2hpcC5pc1ZlcnRpY2FsKSB7XG4gICAgICAgICAgICBib2FyZFtzaGlwLnN0YXJ0aW5nUm93ICsgaV1bc2hpcC5zdGFydGluZ0NvbF0gPSBcIlNVTktcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9hcmRbc2hpcC5zdGFydGluZ1Jvd11bc2hpcC5zdGFydGluZ0NvbCArIGldID0gXCJTVU5LXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNoZWNrRm9yV2luKHNoaXBzKTtcbiAgICAgICAgcmV0dXJuIFwiU1VOS1wiO1xuICAgICAgfVxuICAgICAgYm9hcmRbcm93XVtjb2xdID0gXCJISVRcIjtcbiAgICAgIGNoZWNrRm9yV2luKHNoaXBzKTtcblxuICAgICAgcmV0dXJuIFwiSElUXCI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNoZWNrRm9yV2luID0gKHNoaXBzKSA9PiB7XG4gICAgLy9jYWxsZWQgYWZ0ZXIgZWFjaCB0dXJuXG4gICAgY29uc3QgYWxsU2hpcHNTdW5rID0gc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuc2lua1N0YXR1cyk7XG5cbiAgICBpZiAoYWxsU2hpcHNTdW5rKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgLy9lbmQgZ2FtZSBsb29wIGFuZCB1cGRhdGUgVUlcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIHJldHVybiB7IGNyZWF0ZUJvYXJkLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2ssIGNoZWNrRm9yV2luIH07XG59O1xuXG5jb25zdCBwbGF5ZXIgPSAobmFtZSwgYm9hcmQsIHR5cGUsIHNoaXBzLCBnYW1lQm9hcmRJbnN0YW5jZSkgPT4ge1xuICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTsgLy9jaGFuZ2UgdG8gaW5wdXQgYWZ0ZXIgVUkgY3JlYXRlZFxuXG4gIGNvbnN0IGdldFR5cGUgPSAoKSA9PiB0eXBlOyAvL0h1bWFuIG9yIEFJXG5cbiAgY29uc3QgZ2V0QWlDaG9pY2UgPSAoKSA9PiB7XG4gICAgLy9USElTIElTIFZFUlkgU0xPVyAtIFVQREFURSEgaW5pdGlhbGlzZSBvdXRzaWRlIG9mIGZhY3Rvcnk/XG4gICAgY29uc3QgYXZhaWxhYmxlU3BvdHMgPSBbXTtcblxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgYm9hcmQubGVuZ3RoOyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgYm9hcmRbeF0ubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGJvYXJkW3hdW3ldICE9PSBcIk1JU1NcIiAmJlxuICAgICAgICAgIGJvYXJkW3hdW3ldICE9PSBcIkhJVFwiICYmXG4gICAgICAgICAgYm9hcmRbeF1beV0gIT09IFwiU1VOS1wiXG4gICAgICAgICkge1xuICAgICAgICAgIGF2YWlsYWJsZVNwb3RzLnB1c2goeyB4LCB5IH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlU3BvdHMubGVuZ3RoKTtcbiAgICBjb25zdCBhaUNob2ljZSA9IGF2YWlsYWJsZVNwb3RzW3JhbmRvbUluZGV4XTtcbiAgICByZXR1cm4gYWlDaG9pY2U7XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrID0gKGVuZW15LCB4LCB5KSA9PiB7XG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT09IFwiSHVtYW5cIikge1xuICAgICAgY29uc29sZS5sb2coYCR7Y3VycmVudFBsYXllcn0gaXMgdGFraW5nIGFpbSFgKTtcbiAgICAgIGNvbnN0IGVuZW15Qm9hcmQgPSBwMUJvYXJkSW5zdGFuY2U7XG4gICAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIGVuZW15LmJvYXJkLFxuICAgICAgICBlbmVteS5zaGlwc1xuICAgICAgKTtcbiAgICAgIC8qIGNvbnNvbGUubG9nKFxuICAgICAgICBgJHtjdXJyZW50UGxheWVyfSBoYXMgYXR0YWNrZWQgJHtwbGF5ZXIyLmdldE5hbWUoKX0gYW5kIGl0IGlzIGEgJHthdHRhY2tSZXN1bHR9YFxuICAgICAgKTsgKi9cbiAgICAgIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIyQm9hcmQsIHAyZ2FtZUJvYXJkKTtcblxuICAgICAgLy9jb21wdXRlcnMgdHVyblxuICAgICAgY3VycmVudFBsYXllciA9IFwiQ29tcHV0ZXJcIjtcbiAgICAgIGNvbnNvbGUubG9nKGAke2N1cnJlbnRQbGF5ZXJ9IGlzIHRha2luZyBhaW0hYCk7XG4gICAgICBmdW5jdGlvbiBtYWtlQWlNb3ZlKCkge1xuICAgICAgICBjb25zdCBhaUNob2ljZSA9IGdldEFpQ2hvaWNlKCk7XG4gICAgICAgIGNvbnN0IGFpQXR0YWNrUmVzdWx0ID0gcDFCb2FyZEluc3RhbmNlLnJlY2VpdmVBdHRhY2soXG4gICAgICAgICAgYWlDaG9pY2UueCxcbiAgICAgICAgICBhaUNob2ljZS55LFxuICAgICAgICAgIHBsYXllcjEuYm9hcmQsXG4gICAgICAgICAgcGxheWVyMS5zaGlwc1xuICAgICAgICApO1xuICAgICAgICAvKiBjb25zb2xlLmxvZyhcbiAgICAgICAgICBgJHtjdXJyZW50UGxheWVyfSBoYXMgYXR0YWNrZWQgJHtwbGF5ZXIxLmdldE5hbWUoKX0gYW5kIGl0IGlzIGEgJHthaUF0dGFja1Jlc3VsdH1gXG4gICAgICAgICk7ICovXG4gICAgICAgIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIxQm9hcmQsIHAxZ2FtZUJvYXJkKTtcbiAgICAgICAgY3VycmVudFBsYXllciA9IFwiSHVtYW5cIjtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQobWFrZUFpTW92ZSwgNDAwKTsgLy8wLjRzIGRlbGF5IGJldHdlZW4gdHVybnNcbiAgICB9XG5cbiAgICAvL3VwZGF0ZVR1cm5NZXNzYWdlKCk7XG4gICAgcmV0dXJuIHJlbmRlckdhbWVCb2FyZDtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgYm9hcmQsXG4gICAgdHlwZSxcbiAgICBnZXROYW1lLFxuICAgIGdldFR5cGUsXG4gICAgYXR0YWNrLFxuICAgIGdldEFpQ2hvaWNlLFxuICAgIHNoaXBzLFxuICB9O1xufTtcblxuZXhwb3J0IHsgc2hpcCwgZ2FtZUJvYXJkLCBwbGF5ZXIgfTtcbiIsIi8qKiBAZm9ybWF0ICovXG5yZXF1aXJlKFwiLi9zdHlsZXMuY3NzXCIpO1xuXG5pbXBvcnQgeyBzaGlwLCBnYW1lQm9hcmQsIHBsYXllciB9IGZyb20gXCIuL2dhbWUuanNcIjtcbmltcG9ydCB7IHJlbmRlckdhbWVCb2FyZCB9IGZyb20gXCIuL3JlbmRlci5qc1wiO1xuXG5jb25zdCBwMWdhbWVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMS1ib2FyZFwiKTtcbmNvbnN0IHAyZ2FtZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXIyLWJvYXJkXCIpO1xuY29uc3QgbWVzc2FnZUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVzc2FnZVwiKTtcblxubGV0IGdhbWVBY3RpdmUgPSBmYWxzZTsgLy91cGRhdGUgYmFzZWQgb24gc3RhdHVzXG5sZXQgcmVzdGFydGFibGUgPSBmYWxzZTtcbmxldCBkcm9wcGVkQXJyYXkgPSBbXTtcbmxldCBwbGF5ZXIxQm9hcmQsIHAxQm9hcmRJbnN0YW5jZTtcbmxldCBwbGF5ZXIyQm9hcmQsIHAyQm9hcmRJbnN0YW5jZTsgLy9UaGlzIGlzIGNhdXNpbmcgYmxvY2sgc2NvcGUgaXNzdWVcbmxldCBub3REcm9wcGVkO1xubGV0IHAxY2FycmllciwgcDFiYXR0bGVzaGlwLCBwMWRlc3Ryb3llciwgcDFzdWJtYXJpbmUsIHAxcGF0cm9sQm9hdDtcbmxldCBwMmNhcnJpZXIsIHAyYmF0dGxlc2hpcCwgcDJkZXN0cm95ZXIsIHAyc3VibWFyaW5lLCBwMnBhdHJvbEJvYXQ7XG5sZXQgcDFBbGxTaGlwcywgcDJBbGxTaGlwcztcblxuZnVuY3Rpb24gaW5pdGlhbGlzZSgpIHtcbiAgbGV0IGdyaWRTaXplID0gMTA7XG4gIHAxQm9hcmRJbnN0YW5jZSA9IGdhbWVCb2FyZChncmlkU2l6ZSk7XG4gIHBsYXllcjFCb2FyZCA9IHAxQm9hcmRJbnN0YW5jZS5jcmVhdGVCb2FyZCgpO1xuICBwMkJvYXJkSW5zdGFuY2UgPSBnYW1lQm9hcmQoZ3JpZFNpemUpO1xuICBwbGF5ZXIyQm9hcmQgPSBwMkJvYXJkSW5zdGFuY2UuY3JlYXRlQm9hcmQoKTtcblxuICBwMWNhcnJpZXIgPSBzaGlwKFwiY2FycmllclwiLCA1LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gIHAxYmF0dGxlc2hpcCA9IHNoaXAoXCJiYXR0bGVzaGlwXCIsIDQsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAxZGVzdHJveWVyID0gc2hpcChcImRlc3Ryb3llclwiLCAzLCAwLCBmYWxzZSwgZmFsc2UpO1xuICBwMXN1Ym1hcmluZSA9IHNoaXAoXCJzdWJtYXJpbmVcIiwgMywgMCwgZmFsc2UsIGZhbHNlKTtcbiAgcDFwYXRyb2xCb2F0ID0gc2hpcChcInBhdHJvbEJvYXRcIiwgMiwgMCwgZmFsc2UsIGZhbHNlKTtcblxuICBwMUFsbFNoaXBzID0gW1xuICAgIHAxY2FycmllcixcbiAgICBwMWJhdHRsZXNoaXAsXG4gICAgcDFkZXN0cm95ZXIsXG4gICAgcDFzdWJtYXJpbmUsXG4gICAgcDFwYXRyb2xCb2F0LFxuICBdO1xuXG4gIHAyY2FycmllciA9IHNoaXAoXCJjYXJyaWVyXCIsIDUsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAyYmF0dGxlc2hpcCA9IHNoaXAoXCJiYXR0bGVzaGlwXCIsIDQsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAyZGVzdHJveWVyID0gc2hpcChcImRlc3Ryb3llclwiLCAzLCAwLCBmYWxzZSwgZmFsc2UpO1xuICBwMnN1Ym1hcmluZSA9IHNoaXAoXCJzdWJtYXJpbmVcIiwgMywgMCwgZmFsc2UsIGZhbHNlKTtcbiAgcDJwYXRyb2xCb2F0ID0gc2hpcChcInBhdHJvbEJvYXRcIiwgMiwgMCwgZmFsc2UsIGZhbHNlKTtcblxuICBwMkFsbFNoaXBzID0gW1xuICAgIHAyY2FycmllcixcbiAgICBwMmRlc3Ryb3llcixcbiAgICBwMmJhdHRsZXNoaXAsXG4gICAgcDJzdWJtYXJpbmUsXG4gICAgcDJwYXRyb2xCb2F0LFxuICBdO1xuXG4gIC8vTWFrZSBQbGF5ZXJzXG4gIGxldCBwbGF5ZXIxID0gcGxheWVyKFxuICAgIFwiVG9tXCIsXG4gICAgcGxheWVyMUJvYXJkLFxuICAgIFwiSHVtYW5cIixcbiAgICBwMUFsbFNoaXBzLFxuICAgIHAxQm9hcmRJbnN0YW5jZVxuICApO1xuXG4gIGxldCBwbGF5ZXIyID0gcGxheWVyKFxuICAgIFwiQ29tcHV0ZXJcIixcbiAgICBwbGF5ZXIyQm9hcmQsXG4gICAgXCJBSVwiLFxuICAgIHAyQWxsU2hpcHMsXG4gICAgcDJCb2FyZEluc3RhbmNlXG4gICk7XG5cbiAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjFCb2FyZCwgcDFnYW1lQm9hcmQpO1xuICByZW5kZXJHYW1lQm9hcmQocGxheWVyMkJvYXJkLCBwMmdhbWVCb2FyZCk7XG5cbiAgcmV0dXJuIHtcbiAgICBwMUJvYXJkSW5zdGFuY2UsXG4gICAgcGxheWVyMSxcbiAgICBwbGF5ZXIxQm9hcmQsXG4gICAgcDJCb2FyZEluc3RhbmNlLFxuICAgIHBsYXllcjIsXG4gICAgcGxheWVyMkJvYXJkLFxuICAgIHAxQWxsU2hpcHMsXG4gICAgcDJBbGxTaGlwcyxcbiAgfTtcbn1cblxuLy9TRVRVUFxuY29uc3Qge1xuICBwbGF5ZXIxLFxuICBwbGF5ZXIyLFxuICAvKiBwbGF5ZXIxQm9hcmQsXG4gIHAxQm9hcmRJbnN0YW5jZSxcbiAgcGxheWVyMkJvYXJkLFxuICBwMkJvYXJkSW5zdGFuY2UsICovXG59ID0gaW5pdGlhbGlzZSgpO1xuXG5jb25zdCBzdGFydEdhbWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXJ0LWJ1dHRvblwiKTtcbnN0YXJ0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhcnRHYW1lKTtcblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICBpZiAoZHJvcHBlZEFycmF5Lmxlbmd0aCA+PSAxICYmIGdhbWVBY3RpdmUgPT0gZmFsc2UgJiYgcmVzdGFydGFibGUgPT0gZmFsc2UpIHtcbiAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJTdGFydGluZywgdGhlIGVuZW15IGlzIHBsYWNpbmcgdGhlaXIgc2hpcHMuLi5cIjtcbiAgICBnYW1lQWN0aXZlID0gdHJ1ZTtcbiAgICByZXN0YXJ0YWJsZSA9IGZhbHNlO1xuICAgIHN0YXJ0R2FtZUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgcGxhY2VQMlNoaXBzKCk7IC8vb25seSBjYWxsIG9uY2UhXG4gIH0gZWxzZSBpZiAoZ2FtZUFjdGl2ZSA9PSBmYWxzZSAmJiByZXN0YXJ0YWJsZSA9PSB0cnVlKSB7XG4gICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IFwiUmVzdGFydGluZywgUGxhY2UgeW91ciBzaGlwcyFcIjtcbiAgICBjb25zb2xlLmxvZyhcInJlc3RhcnRpbmdcIik7XG4gICAgc3RhcnRHYW1lQnV0dG9uLnRleHRDb250ZW50ID0gXCJTdGFydCBnYW1lXCI7XG4gICAgcmVzdGFydGFibGUgPSBmYWxzZTtcbiAgICBnYW1lQWN0aXZlID0gZmFsc2U7XG5cbiAgICAvL2xvZ2ljIGZvciByZXNldHRpbmcgZ2FtZSBzdGF0ZVxuICAgIGluaXRpYWxpc2UoKTtcbiAgICBjb25zb2xlLmxvZyhwbGF5ZXIxQm9hcmQpO1xuICAgIGNvbnNvbGUubG9nKHBsYXllcjJCb2FyZCk7XG4gICAgY29uc29sZS5sb2cocGxheWVyMi5zaGlwcywgcGxheWVyMS5zaGlwcyk7XG4gIH0gZWxzZSB7XG4gICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IFwiUGxhY2UgYWxsIG9mIHlvdXIgc2hpcHMgZmlyc3RcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBwbGFjZVAyU2hpcHMoKSB7XG4gIHAyQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMkJvYXJkLCBwMmNhcnJpZXIsIDksIDEpO1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJkZXN0cm95ZXIsIDMsIDMpO1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJiYXR0bGVzaGlwLCA1LCAyKTtcbiAgcDJCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIyQm9hcmQsIHAyc3VibWFyaW5lLCAyLCAxKTtcbiAgcDJCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIyQm9hcmQsIHAycGF0cm9sQm9hdCwgNiwgMCk7XG4gIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIyQm9hcmQsIHAyZ2FtZUJvYXJkKTtcbn1cblxuLyogRHJhZyBwbGF5ZXIgc2hpcHMgKi9cblxubGV0IGRyYWdnZWRTaGlwO1xuY29uc3QgZHJhZ2dhYmxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZHJhZ2dhYmxlXCIpO1xuY29uc3Qgb3B0aW9uU2hpcHMgPSBBcnJheS5mcm9tKGRyYWdnYWJsZXMpO1xuXG4vL2V2ZW50IGxpc3RlbmVyc1xub3B0aW9uU2hpcHMuZm9yRWFjaCgoZHJhZ2dhYmxlKSA9PiB7XG4gIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWdTdGFydCk7XG4gIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBkcmFnRW5kKTtcbn0pO1xuXG5jb25zdCBwbGF5ZXIxQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjEtYm9hcmRcIik7XG5wbGF5ZXIxQm9hcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGRyYWdPdmVyKTtcbnBsYXllcjFCb2FyZENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBkcm9wU2hpcCk7XG5cbmZ1bmN0aW9uIGRyYWdTdGFydChlKSB7XG4gIGRyYWdnZWRTaGlwID0gZS50YXJnZXQ7XG4gIGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5hZGQoXCJkcmFnZ2luZ1wiKTtcbiAgbm90RHJvcHBlZCA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBkcmFnT3ZlcihlKSB7XG4gIG5vdERyb3BwZWQgPSBmYWxzZTtcblxuICBlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIGRyYWdFbmQoZSkge1xuICBkcmFnZ2VkU2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZ2dpbmdcIik7XG59XG5cbmZ1bmN0aW9uIGRyb3BTaGlwKGUpIHtcbiAgY29uc3Qgc3RhcnRDb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuICBjb25zdCBzdGFydFJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCk7XG4gIGNvbnN0IHRoaXNTaGlwID0gcDFBbGxTaGlwc1tkcmFnZ2VkU2hpcC5pZF07IC8vZ2V0IHRoZSBpZCBvZiB0aGUgc2hpcCBmcm9tIHRoZSBwMSBzaGlwIGFycmF5IHRvIHBsYWNlXG4gIGNvbnN0IHBsYWNlbWVudFJlc3VsdCA9IHAxQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAoXG4gICAgcGxheWVyMUJvYXJkLFxuICAgIHRoaXNTaGlwLFxuICAgIHN0YXJ0Um93LFxuICAgIHN0YXJ0Q29sXG4gICk7XG5cbiAgaWYgKHBsYWNlbWVudFJlc3VsdCkge1xuICAgIGRyb3BwZWRBcnJheS5wdXNoKHRoaXNTaGlwKTtcbiAgICBwMUJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjFCb2FyZCwgdGhpc1NoaXAsIHN0YXJ0Um93LCBzdGFydENvbCk7XG4gICAgZHJhZ2dlZFNoaXAucmVtb3ZlKCk7XG4gIH0gZWxzZSB7XG4gICAgbm90RHJvcHBlZCA9IHRydWU7XG4gIH1cblxuICBjb25zb2xlLmxvZyhkcm9wcGVkQXJyYXkpO1xuICByZW5kZXJHYW1lQm9hcmQocGxheWVyMUJvYXJkLCBwMWdhbWVCb2FyZCk7XG4gIGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJkcmFnZ2luZ1wiKTtcbn1cbmNvbnN0IHBsYXllcjJCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMi1ib2FyZFwiKTtcbnBsYXllcjJCb2FyZENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VsZWN0VGFyZ2V0KTtcbnBsYXllcjJCb2FyZENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGhvdmVyKTtcbnBsYXllcjJCb2FyZENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgaG92ZXIpO1xuXG5mdW5jdGlvbiBzZWxlY3RUYXJnZXQoZSkge1xuICBpZiAoZ2FtZUFjdGl2ZSkge1xuICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sLCAxMCk7XG4gICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3csIDEwKTtcbiAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSBwbGF5ZXIxLmF0dGFjayhwbGF5ZXIyLCByb3csIGNvbCk7XG4gICAgY29uc3QgaXNHYW1lV29uID0gcDJCb2FyZEluc3RhbmNlLmNoZWNrRm9yV2luKHBsYXllcjIuc2hpcHMpO1xuXG4gICAgaWYgKGlzR2FtZVdvbikge1xuICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IFwiR2FtZSBvdmVyLCB5b3Ugd2luIVwiO1xuICAgICAgZ2FtZUFjdGl2ZSA9IGZhbHNlO1xuICAgICAgc3RhcnRHYW1lQnV0dG9uLnRleHRDb250ZW50ID0gXCJSZXN0YXJ0XCI7XG4gICAgICBzdGFydEdhbWVCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIHJlc3RhcnRhYmxlID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaG92ZXIoZSkge1xuICBsZXQgaGlnaGxpZ2h0ZWRDZWxsID0gZS50YXJnZXQ7XG4gIGhpZ2hsaWdodGVkQ2VsbC5jbGFzc0xpc3QudG9nZ2xlKFwiaGlnaGxpZ2h0ZWRcIik7XG59XG5cbmV4cG9ydCB7XG4gIHBsYXllcjFCb2FyZCxcbiAgcGxheWVyMkJvYXJkLFxuICBwMWdhbWVCb2FyZCxcbiAgcGxheWVyMSxcbiAgcGxheWVyMixcbiAgcDFCb2FyZEluc3RhbmNlLFxuICBwMkJvYXJkSW5zdGFuY2UsXG59O1xuIiwiLyoqIEBmb3JtYXQgKi9cblxuaW1wb3J0IHsgcDFnYW1lQm9hcmQgfSBmcm9tIFwiLi9tYWluLmpzXCI7XG5cbmNvbnN0IHJlbmRlckdhbWVCb2FyZCA9IChib2FyZCwgY29udGFpbmVyKSA9PiB7XG4gIGNvbnN0IGdyaWRTaXplID0gMTA7XG4gIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGNvbnN0IGJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImJvYXJkLWNvbnRhaW5lclwiKTtcbiAgYm9hcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcbiAgICBjb250YWluZXIgPT09IHAxZ2FtZUJvYXJkID8gXCJwbGF5ZXIxXCIgOiBcInBsYXllcjJcIlxuICApO1xuICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBncmlkU2l6ZTsgcm93KyspIHtcbiAgICBjb25zdCByb3dFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3dFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJib2FyZC1yb3dcIik7XG5cbiAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBncmlkU2l6ZTsgY29sKyspIHtcbiAgICAgIGNvbnN0IGNlbGxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJib2FyZC1jZWxsXCIpO1xuICAgICAgY2VsbEVsZW1lbnQuZGF0YXNldC5yb3cgPSByb3c7XG4gICAgICBjZWxsRWxlbWVudC5kYXRhc2V0LmNvbCA9IGNvbDtcblxuICAgICAgLy9zZXQgc3R5bGluZyBiYXNlZCBvbiBjZWxsIGNvbnRlbnQgaS5lLiB3YXRlciwgaGl0LCBzaGlwLCBtaXNzXG4gICAgICBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIndhdGVyXCIpIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIndhdGVyXCIpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9hcmRbcm93XVtjb2xdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgICBjZWxsRWxlbWVudC5kYXRhc2V0LnNoaXBUeXBlID0gYCR7Ym9hcmRbcm93XVtjb2xdLnR5cGV9YDtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIkhJVFwiKSB7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICB9IGVsc2UgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gXCJNSVNTXCIpIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XG4gICAgICB9IGVsc2UgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gXCJTVU5LXCIpIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInN1bmtcIik7XG4gICAgICB9XG4gICAgICByb3dFbGVtZW50LmFwcGVuZENoaWxkKGNlbGxFbGVtZW50KTtcbiAgICB9XG4gICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQocm93RWxlbWVudCk7XG4gIH1cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkQ29udGFpbmVyKTtcbn07XG5cbmV4cG9ydCB7IHJlbmRlckdhbWVCb2FyZCB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qKiBAZm9ybWF0ICovXG5cbi5tZXNzYWdlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gIHdpZHRoOiAyMHJlbTtcbiAgaGVpZ2h0OiA0cmVtO1xufVxuXG4uZ2FtZS1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBtYXJnaW46IDM1cHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDEwcHg7XG59XG5cbi5ib2FyZC1jb250YWluZXIge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcbiAgd2lkdGg6IDQwdnc7XG59XG5cbi5zaGlweWFyZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG4gIHdpZHRoOiA1MHZ3O1xuICBoZWlnaHQ6IDQwdnc7XG4gIG1hcmdpbjogMTBweDtcbn1cblxuLmJvYXJkLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGJvcmRlcjogMC4xcHggZG90dGVkICNjY2M7XG59XG5cbi5ib2FyZC1jZWxsIHtcbiAgZmxleDogMTtcbiAgd2lkdGg6IDFyZW07XG4gIGhlaWdodDogMXJlbTtcbiAgYm9yZGVyOiAwLjFweCBkb3R0ZWQgI2NjYztcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFiOTVlMDtcbn1cblxuLnNoaXAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcbiAgaGVpZ2h0OiAxcmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcbn1cblxuLmRyYWdnYWJsZSB7XG4gIGN1cnNvcjogbW92ZTtcbn1cblxuLmRyYWdnaW5nIHtcbiAgb3BhY2l0eTogMC41O1xufVxuXG4uaGlnaGxpZ2h0ZWQge1xuICBvcGFjaXR5OiAwLjU7XG59XG5cbltkYXRhLXNoaXAtdHlwZT1cImNhcnJpZXJcIl0ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4vKiBbZGF0YS1zaGlwLXR5cGU9XCJjYXJyaWVyXCJdOjpiZWZvcmUge1xuICBjb250ZW50OiBcIlwiO1xuICB3aWR0aDogODAlO1xuICBoZWlnaHQ6IDYwJTtcbiAgYmFja2dyb3VuZDogI2NjYztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDEwJTtcbiAgbGVmdDogMTAlO1xufVxuXG5bZGF0YS1zaGlwLXR5cGU9XCJjYXJyaWVyXCJdOjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHdpZHRoOiAyMHB4O1xuICBoZWlnaHQ6IDEwcHg7XG4gIGJhY2tncm91bmQ6ICM1NTU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxMCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xufVxuXG5bZGF0YS1zaGlwLXR5cGU9XCJkZXN0cm95ZXJcIl0ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn0gKi9cblxuLmNhcnJpZXIge1xuICB3aWR0aDogMTJyZW07XG59XG5cbi5iYXR0bGVzaGlwIHtcbiAgd2lkdGg6IDlyZW07XG59XG5cbi5kZXN0cm95ZXIge1xuICB3aWR0aDogN3JlbTtcbn1cblxuLnN1Ym1hcmluZSB7XG4gIHdpZHRoOiA3cmVtO1xufVxuXG4ucGF0cm9sQm9hdCB7XG4gIHdpZHRoOiA0LjVyZW07XG59XG5cbi5oaXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5zdW5rIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuXG4ubWlzcyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuXG4ucGxheWVyMSB7XG4gIG1hcmdpbi1ib3R0b206IDUwcHg7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLGFBQWE7O0FBRWI7RUFDRSx1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsU0FBUztBQUNYOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1DQUFtQztFQUNuQyxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsV0FBVztFQUNYLFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2IseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsT0FBTztFQUNQLFdBQVc7RUFDWCxZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsaUNBQWlDO0VBQ2pDLGtCQUFrQjtFQUNsQixrQkFBa0I7QUFDcEI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7O0FBRUg7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqIEBmb3JtYXQgKi9cXG5cXG4ubWVzc2FnZSB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIHdpZHRoOiAyMHJlbTtcXG4gIGhlaWdodDogNHJlbTtcXG59XFxuXFxuLmdhbWUtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgbWFyZ2luOiAzNXB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAxMHB4O1xcbn1cXG5cXG4uYm9hcmQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIHdpZHRoOiA0MHZ3O1xcbn1cXG5cXG4uc2hpcHlhcmQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gIHdpZHRoOiA1MHZ3O1xcbiAgaGVpZ2h0OiA0MHZ3O1xcbiAgbWFyZ2luOiAxMHB4O1xcbn1cXG5cXG4uYm9hcmQtcm93IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBib3JkZXI6IDAuMXB4IGRvdHRlZCAjY2NjO1xcbn1cXG5cXG4uYm9hcmQtY2VsbCB7XFxuICBmbGV4OiAxO1xcbiAgd2lkdGg6IDFyZW07XFxuICBoZWlnaHQ6IDFyZW07XFxuICBib3JkZXI6IDAuMXB4IGRvdHRlZCAjY2NjO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFiOTVlMDtcXG59XFxuXFxuLnNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XFxuICBoZWlnaHQ6IDFyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXG59XFxuXFxuLmRyYWdnYWJsZSB7XFxuICBjdXJzb3I6IG1vdmU7XFxufVxcblxcbi5kcmFnZ2luZyB7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcblxcbi5oaWdobGlnaHRlZCB7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcblxcbltkYXRhLXNoaXAtdHlwZT1cXFwiY2FycmllclxcXCJdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjIgIWltcG9ydGFudDtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLyogW2RhdGEtc2hpcC10eXBlPVxcXCJjYXJyaWVyXFxcIl06OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHdpZHRoOiA4MCU7XFxuICBoZWlnaHQ6IDYwJTtcXG4gIGJhY2tncm91bmQ6ICNjY2M7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDEwJTtcXG4gIGxlZnQ6IDEwJTtcXG59XFxuXFxuW2RhdGEtc2hpcC10eXBlPVxcXCJjYXJyaWVyXFxcIl06OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgd2lkdGg6IDIwcHg7XFxuICBoZWlnaHQ6IDEwcHg7XFxuICBiYWNrZ3JvdW5kOiAjNTU1O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAxMCU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XFxufVxcblxcbltkYXRhLXNoaXAtdHlwZT1cXFwiZGVzdHJveWVyXFxcIl0ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIyMiAhaW1wb3J0YW50O1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG59ICovXFxuXFxuLmNhcnJpZXIge1xcbiAgd2lkdGg6IDEycmVtO1xcbn1cXG5cXG4uYmF0dGxlc2hpcCB7XFxuICB3aWR0aDogOXJlbTtcXG59XFxuXFxuLmRlc3Ryb3llciB7XFxuICB3aWR0aDogN3JlbTtcXG59XFxuXFxuLnN1Ym1hcmluZSB7XFxuICB3aWR0aDogN3JlbTtcXG59XFxuXFxuLnBhdHJvbEJvYXQge1xcbiAgd2lkdGg6IDQuNXJlbTtcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVxcblxcbi5zdW5rIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLm1pc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVxcblxcbi5wbGF5ZXIxIHtcXG4gIG1hcmdpbi1ib3R0b206IDUwcHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4uanNcIik7XG4iLCIiXSwibmFtZXMiOlsicGxheWVyMSIsInBsYXllcjIiLCJwbGF5ZXIxQm9hcmQiLCJwbGF5ZXIyQm9hcmQiLCJwMUJvYXJkSW5zdGFuY2UiLCJwMkJvYXJkSW5zdGFuY2UiLCJyZW5kZXJHYW1lQm9hcmQiLCJwMWdhbWVCb2FyZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInAyZ2FtZUJvYXJkIiwiY3VycmVudFBsYXllciIsInNoaXAiLCJ0eXBlIiwibGVuZ3RoIiwiaGl0Q291bnQiLCJzaW5rU3RhdHVzIiwiaXNWZXJ0aWNhbCIsImhpdCIsImlzU3VuayIsImdhbWVCb2FyZCIsImdyaWRTaXplIiwiY3JlYXRlQm9hcmQiLCJib2FyZCIsIkFycmF5IiwiZmlsbCIsIm1hcCIsInBsYWNlU2hpcCIsInN0YXJ0aW5nUm93Iiwic3RhcnRpbmdDb2wiLCJzaGlwTGVuZ3RoIiwiaSIsInJlY2VpdmVBdHRhY2siLCJyb3ciLCJjb2wiLCJzaGlwcyIsImNoZWNrRm9yV2luIiwiYWxsU2hpcHNTdW5rIiwiZXZlcnkiLCJwbGF5ZXIiLCJuYW1lIiwiZ2FtZUJvYXJkSW5zdGFuY2UiLCJnZXROYW1lIiwiZ2V0VHlwZSIsImdldEFpQ2hvaWNlIiwiYXZhaWxhYmxlU3BvdHMiLCJ4IiwieSIsInB1c2giLCJyYW5kb21JbmRleCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImFpQ2hvaWNlIiwiYXR0YWNrIiwiZW5lbXkiLCJjb25zb2xlIiwibG9nIiwiZW5lbXlCb2FyZCIsImF0dGFja1Jlc3VsdCIsIm1ha2VBaU1vdmUiLCJhaUF0dGFja1Jlc3VsdCIsInNldFRpbWVvdXQiLCJyZXF1aXJlIiwibWVzc2FnZUJveCIsImdhbWVBY3RpdmUiLCJyZXN0YXJ0YWJsZSIsImRyb3BwZWRBcnJheSIsIm5vdERyb3BwZWQiLCJwMWNhcnJpZXIiLCJwMWJhdHRsZXNoaXAiLCJwMWRlc3Ryb3llciIsInAxc3VibWFyaW5lIiwicDFwYXRyb2xCb2F0IiwicDJjYXJyaWVyIiwicDJiYXR0bGVzaGlwIiwicDJkZXN0cm95ZXIiLCJwMnN1Ym1hcmluZSIsInAycGF0cm9sQm9hdCIsInAxQWxsU2hpcHMiLCJwMkFsbFNoaXBzIiwiaW5pdGlhbGlzZSIsInN0YXJ0R2FtZUJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdGFydEdhbWUiLCJ0ZXh0Q29udGVudCIsImRpc2FibGVkIiwicGxhY2VQMlNoaXBzIiwiZHJhZ2dlZFNoaXAiLCJkcmFnZ2FibGVzIiwicXVlcnlTZWxlY3RvckFsbCIsIm9wdGlvblNoaXBzIiwiZnJvbSIsImZvckVhY2giLCJkcmFnZ2FibGUiLCJkcmFnU3RhcnQiLCJkcmFnRW5kIiwicGxheWVyMUJvYXJkQ29udGFpbmVyIiwiZHJhZ092ZXIiLCJkcm9wU2hpcCIsImUiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJwcmV2ZW50RGVmYXVsdCIsInJlbW92ZSIsInN0YXJ0Q29sIiwicGFyc2VJbnQiLCJkYXRhc2V0Iiwic3RhcnRSb3ciLCJ0aGlzU2hpcCIsImlkIiwicGxhY2VtZW50UmVzdWx0IiwicGxheWVyMkJvYXJkQ29udGFpbmVyIiwic2VsZWN0VGFyZ2V0IiwiaG92ZXIiLCJpc0dhbWVXb24iLCJoaWdobGlnaHRlZENlbGwiLCJ0b2dnbGUiLCJjb250YWluZXIiLCJib2FyZENvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJyb3dFbGVtZW50IiwiY2VsbEVsZW1lbnQiLCJzaGlwVHlwZSIsImFwcGVuZENoaWxkIl0sInNvdXJjZVJvb3QiOiIifQ==