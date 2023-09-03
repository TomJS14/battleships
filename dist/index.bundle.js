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
    let isValidPosition = checkIfValid(startingRow, startingCol, shipLength, isVertical);
    for (let i = 0; i < shipLength; i++) {
      if (isVertical && isValidPosition) {
        board[startingRow + i][startingCol] = ship;
      } else if (isValidPosition) {
        board[startingRow][startingCol + i] = ship;
      }
    }
    return board;
  };
  const checkIfValid = (startingRow, startingCol, shipLength, isVertical) => {
    let valid;
    if (isVertical) {
      valid = startingRow + shipLength <= 10 ? true : false;
    }
    if (!isVertical) {
      valid = startingCol + shipLength <= 10 ? true : false;
    }
    return valid;
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
    //logic to report whether all ships have been sunk, call after each turn
    const allShipsSunk = ships.every(ship => ship.sinkStatus);
    if (allShipsSunk) {
      const messageBox = document.querySelector(".message");
      messageBox.textContent = "YOU WIN";
      console.log("YOU WIN"); //end game loop and update UI
    }
  };

  return {
    createBoard,
    placeShip,
    receiveAttack,
    checkForWin,
    checkIfValid
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
      console.log(`${currentPlayer} has attacked ${_main__WEBPACK_IMPORTED_MODULE_0__.player2.getName()} and it is a ${attackResult}`);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(_main__WEBPACK_IMPORTED_MODULE_0__.player2Board, p2gameBoard);

      //computers turn
      currentPlayer = "Computer";
      console.log(`${currentPlayer} is taking aim!`);
      function makeAiMove() {
        const aiChoice = getAiChoice();
        const aiAttackResult = _main__WEBPACK_IMPORTED_MODULE_0__.p1BoardInstance.receiveAttack(aiChoice.x, aiChoice.y, _main__WEBPACK_IMPORTED_MODULE_0__.player1.board, _main__WEBPACK_IMPORTED_MODULE_0__.player1.ships);
        console.log(`${currentPlayer} has attacked ${_main__WEBPACK_IMPORTED_MODULE_0__.player1.getName()} and it is a ${aiAttackResult}`);
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

//SETUP
const gridSize = 10;
let p1BoardInstance = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard)(gridSize);
let player1Board = p1BoardInstance.createBoard();
let p2BoardInstance = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard)(gridSize);
let player2Board = p2BoardInstance.createBoard();

//Make Player 1 ships
const p1carrier = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("carrier", 5, 0, false, true);
const p1battleship = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("battleship", 4, 0, false, false);
const p1destroyer = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("destroyer", 3, 0, false, false);
const p1submarine = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("submarine", 3, 0, false, false);
const p1patrolBoat = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("patrolBoat", 2, 0, false, false);
const p1AllShips = [p1carrier, p1battleship, p1destroyer, p1submarine, p1patrolBoat];

//Keep track of p1 dropped ships
let droppedArray = [];
let notDropped;

//Make AI ships
const p2carrier = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("carrier", 5, 0, false, false);
const p2battleship = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("battleship", 4, 0, false, false);
const p2destroyer = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("destroyer", 3, 0, false, false);
const p2submarine = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("submarine", 3, 0, false, false);
const p2patrolBoat = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.ship)("patrolBoat", 2, 0, false, false);
const p2AllShips = [p2carrier, p2destroyer, p2battleship, p2submarine, p2patrolBoat];

//Make Players
const player1 = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.player)("Tom", player1Board, "Human", p1AllShips, p1BoardInstance);
const player2 = (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.player)("Computer", player2Board, "AI", p2AllShips, p2BoardInstance);

//Render Initial Board
(0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(player1Board, p1gameBoard);
(0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(player2Board, p2gameBoard);

//Game loop

const startGameButton = document.querySelector("#start-button");
startGameButton.addEventListener("click", startGame);
function startGame() {
  if (droppedArray.length >= 1) {
    messageBox.textContent = "Starting, the enemy is placing their ships....";
    console.log("starting game!");
    gameActive = true;
    placeP2Ships();
  } else {
    messageBox.textContent = "Place all ships!";
    console.log("Place all ships!");
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

  const isValidPosition = p1BoardInstance.checkIfValid(startRow, startCol, thisShip.length, thisShip.isVertical);
  if (isValidPosition) {
    droppedArray.push(thisShip);
    p1BoardInstance.placeShip(player1Board, thisShip, startRow, startCol);
    draggedShip.remove();
  } else {
    notDropped = true;
  }
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
    player1.attack(player2, row, col);
  }
}
function hover(e) {
  let highlightedCell = e.target;
  highlightedCell.classList.toggle("highlighted");
}

//Click new game
//Add ability to rotate ships
//Drag ships to position - DONE
//Check all ships are placed - DONE
//Add logic for checking if valid position - DONE (Need to check not already occupied!)
//allow start game if true - DONE
// click on enemy board and register result - DONE
//Add logic to check if attack is valid - not selected before etc.
//swap turn to computer - generate random turn
// swap turn to player and repeat until win (checkForWin between turns)
//If won, display message, disable event listeners and enable restart game
//repeat

console.log(p1BoardInstance);


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
  border: 0.1px solid #ccc;
}

.board-cell {
  flex: 1;
  width: 1rem;
  height: 1rem;
  border: 0.1px solid #ccc;
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
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA,aAAa;;AAEb;EACE,uBAAuB;EACvB,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,mBAAmB;EACnB,uBAAuB;EACvB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,mCAAmC;EACnC,WAAW;AACb;;AAEA;EACE,sBAAsB;EACtB,WAAW;EACX,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,aAAa;EACb,wBAAwB;AAC1B;;AAEA;EACE,OAAO;EACP,WAAW;EACX,YAAY;EACZ,wBAAwB;EACxB,yBAAyB;AAC3B;;AAEA;EACE,uBAAuB;EACvB,YAAY;EACZ,uBAAuB;AACzB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,mBAAmB;AACrB","sourcesContent":["/** @format */\n\n.message {\n  border: 1px solid black;\n  width: 20rem;\n  height: 4rem;\n}\n\n.game-container {\n  display: flex;\n  flex-direction: column;\n  margin: 35px;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n}\n\n.board-container {\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  width: 40vw;\n}\n\n.shipyard {\n  background-color: grey;\n  width: 50vw;\n  height: 40vw;\n  margin: 10px;\n}\n\n.board-row {\n  display: flex;\n  border: 0.1px solid #ccc;\n}\n\n.board-cell {\n  flex: 1;\n  width: 1rem;\n  height: 1rem;\n  border: 0.1px solid #ccc;\n  background-color: #1b95e0;\n}\n\n.ship {\n  background-color: green;\n  height: 1rem;\n  border: 1px solid white;\n}\n\n.draggable {\n  cursor: move;\n}\n\n.dragging {\n  opacity: 0.5;\n}\n\n.highlighted {\n  opacity: 0.5;\n}\n\n.carrier {\n  width: 12rem;\n}\n\n.battleship {\n  width: 9rem;\n}\n\n.destroyer {\n  width: 7rem;\n}\n\n.submarine {\n  width: 7rem;\n}\n\n.patrolBoat {\n  width: 4.5rem;\n}\n\n.hit {\n  background-color: red;\n}\n\n.sunk {\n  background-color: red;\n}\n\n.miss {\n  background-color: white;\n}\n\n.player1 {\n  margin-bottom: 50px;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBOzs7Ozs7VUNiQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zdHlsZXMuY3NzPzQ0YjIiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBmb3JtYXQgKi9cblxuaW1wb3J0IHtcbiAgcGxheWVyMSxcbiAgcGxheWVyMixcbiAgcGxheWVyMUJvYXJkLFxuICBwbGF5ZXIyQm9hcmQsXG4gIHAxQm9hcmRJbnN0YW5jZSxcbiAgcDJCb2FyZEluc3RhbmNlLFxufSBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyByZW5kZXJHYW1lQm9hcmQgfSBmcm9tIFwiLi9yZW5kZXJcIjtcblxuY29uc3QgcDFnYW1lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjEtYm9hcmRcIik7XG5jb25zdCBwMmdhbWVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMi1ib2FyZFwiKTtcbmxldCBjdXJyZW50UGxheWVyID0gXCJIdW1hblwiO1xuXG5jb25zdCBzaGlwID0gKHR5cGUsIGxlbmd0aCwgaGl0Q291bnQsIHNpbmtTdGF0dXMsIGlzVmVydGljYWwpID0+IHtcbiAgY29uc3QgaGl0ID0gKHNoaXApID0+IHtcbiAgICBzaGlwLmhpdENvdW50Kys7XG4gICAgcmV0dXJuIHNoaXAuaGl0Q291bnQ7XG4gIH07XG4gIGNvbnN0IGlzU3VuayA9IChzaGlwKSA9PiB7XG4gICAgaWYgKHNoaXAuaGl0Q291bnQgPT09IHNoaXAubGVuZ3RoKSB7XG4gICAgICBzaGlwLnNpbmtTdGF0dXMgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gc2hpcC5zaW5rU3RhdHVzO1xuICB9O1xuXG4gIHJldHVybiB7IHR5cGUsIGxlbmd0aCwgaGl0Q291bnQsIHNpbmtTdGF0dXMsIGhpdCwgaXNTdW5rLCBpc1ZlcnRpY2FsIH07XG59O1xuXG5jb25zdCBnYW1lQm9hcmQgPSAoZ3JpZFNpemUpID0+IHtcbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgYm9hcmQgPSBuZXcgQXJyYXkoZ3JpZFNpemUpXG4gICAgICAuZmlsbChudWxsKVxuICAgICAgLm1hcCgoKSA9PiBuZXcgQXJyYXkoZ3JpZFNpemUpLmZpbGwoXCJ3YXRlclwiKSk7XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChib2FyZCwgc2hpcCwgc3RhcnRpbmdSb3csIHN0YXJ0aW5nQ29sKSA9PiB7XG4gICAgY29uc3QgaXNWZXJ0aWNhbCA9IHNoaXAuaXNWZXJ0aWNhbDtcbiAgICBjb25zdCBzaGlwTGVuZ3RoID0gc2hpcC5sZW5ndGg7XG4gICAgc2hpcC5zdGFydGluZ1JvdyA9IHN0YXJ0aW5nUm93O1xuICAgIHNoaXAuc3RhcnRpbmdDb2wgPSBzdGFydGluZ0NvbDtcbiAgICBsZXQgaXNWYWxpZFBvc2l0aW9uID0gY2hlY2tJZlZhbGlkKFxuICAgICAgc3RhcnRpbmdSb3csXG4gICAgICBzdGFydGluZ0NvbCxcbiAgICAgIHNoaXBMZW5ndGgsXG4gICAgICBpc1ZlcnRpY2FsXG4gICAgKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXNWZXJ0aWNhbCAmJiBpc1ZhbGlkUG9zaXRpb24pIHtcbiAgICAgICAgYm9hcmRbc3RhcnRpbmdSb3cgKyBpXVtzdGFydGluZ0NvbF0gPSBzaGlwO1xuICAgICAgfSBlbHNlIGlmIChpc1ZhbGlkUG9zaXRpb24pIHtcbiAgICAgICAgYm9hcmRbc3RhcnRpbmdSb3ddW3N0YXJ0aW5nQ29sICsgaV0gPSBzaGlwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgY2hlY2tJZlZhbGlkID0gKHN0YXJ0aW5nUm93LCBzdGFydGluZ0NvbCwgc2hpcExlbmd0aCwgaXNWZXJ0aWNhbCkgPT4ge1xuICAgIGxldCB2YWxpZDtcbiAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgdmFsaWQgPSBzdGFydGluZ1JvdyArIHNoaXBMZW5ndGggPD0gMTAgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuICAgIGlmICghaXNWZXJ0aWNhbCkge1xuICAgICAgdmFsaWQgPSBzdGFydGluZ0NvbCArIHNoaXBMZW5ndGggPD0gMTAgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2wsIGJvYXJkLCBzaGlwcykgPT4ge1xuICAgIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IFwid2F0ZXJcIikge1xuICAgICAgYm9hcmRbcm93XVtjb2xdID0gXCJNSVNTXCI7XG4gICAgICByZXR1cm4gXCJNSVNTXCI7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYm9hcmRbcm93XVtjb2xdLmhpdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBjb25zdCBzaGlwID0gYm9hcmRbcm93XVtjb2xdO1xuICAgICAgc2hpcC5oaXQoc2hpcCk7XG5cbiAgICAgIGlmIChzaGlwLmlzU3VuayhzaGlwKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoc2hpcC5pc1ZlcnRpY2FsKSB7XG4gICAgICAgICAgICBib2FyZFtzaGlwLnN0YXJ0aW5nUm93ICsgaV1bc2hpcC5zdGFydGluZ0NvbF0gPSBcIlNVTktcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9hcmRbc2hpcC5zdGFydGluZ1Jvd11bc2hpcC5zdGFydGluZ0NvbCArIGldID0gXCJTVU5LXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNoZWNrRm9yV2luKHNoaXBzKTtcbiAgICAgICAgcmV0dXJuIFwiU1VOS1wiO1xuICAgICAgfVxuICAgICAgYm9hcmRbcm93XVtjb2xdID0gXCJISVRcIjtcbiAgICAgIGNoZWNrRm9yV2luKHNoaXBzKTtcblxuICAgICAgcmV0dXJuIFwiSElUXCI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNoZWNrRm9yV2luID0gKHNoaXBzKSA9PiB7XG4gICAgLy9sb2dpYyB0byByZXBvcnQgd2hldGhlciBhbGwgc2hpcHMgaGF2ZSBiZWVuIHN1bmssIGNhbGwgYWZ0ZXIgZWFjaCB0dXJuXG4gICAgY29uc3QgYWxsU2hpcHNTdW5rID0gc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuc2lua1N0YXR1cyk7XG5cbiAgICBpZiAoYWxsU2hpcHNTdW5rKSB7XG4gICAgICBjb25zdCBtZXNzYWdlQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlXCIpO1xuICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IFwiWU9VIFdJTlwiO1xuICAgICAgY29uc29sZS5sb2coXCJZT1UgV0lOXCIpOyAvL2VuZCBnYW1lIGxvb3AgYW5kIHVwZGF0ZSBVSVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBjcmVhdGVCb2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBjaGVja0ZvcldpbiwgY2hlY2tJZlZhbGlkIH07XG59O1xuXG5jb25zdCBwbGF5ZXIgPSAobmFtZSwgYm9hcmQsIHR5cGUsIHNoaXBzLCBnYW1lQm9hcmRJbnN0YW5jZSkgPT4ge1xuICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTsgLy9jaGFuZ2UgdG8gaW5wdXQgYWZ0ZXIgVUkgY3JlYXRlZFxuXG4gIGNvbnN0IGdldFR5cGUgPSAoKSA9PiB0eXBlOyAvL0h1bWFuIG9yIEFJXG5cbiAgY29uc3QgZ2V0QWlDaG9pY2UgPSAoKSA9PiB7XG4gICAgLy9USElTIElTIFZFUlkgU0xPVyAtIFVQREFURSEgaW5pdGlhbGlzZSBvdXRzaWRlIG9mIGZhY3Rvcnk/XG4gICAgY29uc3QgYXZhaWxhYmxlU3BvdHMgPSBbXTtcblxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgYm9hcmQubGVuZ3RoOyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgYm9hcmRbeF0ubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGJvYXJkW3hdW3ldICE9PSBcIk1JU1NcIiAmJlxuICAgICAgICAgIGJvYXJkW3hdW3ldICE9PSBcIkhJVFwiICYmXG4gICAgICAgICAgYm9hcmRbeF1beV0gIT09IFwiU1VOS1wiXG4gICAgICAgICkge1xuICAgICAgICAgIGF2YWlsYWJsZVNwb3RzLnB1c2goeyB4LCB5IH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlU3BvdHMubGVuZ3RoKTtcbiAgICBjb25zdCBhaUNob2ljZSA9IGF2YWlsYWJsZVNwb3RzW3JhbmRvbUluZGV4XTtcbiAgICByZXR1cm4gYWlDaG9pY2U7XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrID0gKGVuZW15LCB4LCB5KSA9PiB7XG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT09IFwiSHVtYW5cIikge1xuICAgICAgY29uc29sZS5sb2coYCR7Y3VycmVudFBsYXllcn0gaXMgdGFraW5nIGFpbSFgKTtcbiAgICAgIGNvbnN0IGVuZW15Qm9hcmQgPSBwMUJvYXJkSW5zdGFuY2U7XG4gICAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIGVuZW15LmJvYXJkLFxuICAgICAgICBlbmVteS5zaGlwc1xuICAgICAgKTtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgJHtjdXJyZW50UGxheWVyfSBoYXMgYXR0YWNrZWQgJHtwbGF5ZXIyLmdldE5hbWUoKX0gYW5kIGl0IGlzIGEgJHthdHRhY2tSZXN1bHR9YFxuICAgICAgKTtcbiAgICAgIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIyQm9hcmQsIHAyZ2FtZUJvYXJkKTtcblxuICAgICAgLy9jb21wdXRlcnMgdHVyblxuICAgICAgY3VycmVudFBsYXllciA9IFwiQ29tcHV0ZXJcIjtcbiAgICAgIGNvbnNvbGUubG9nKGAke2N1cnJlbnRQbGF5ZXJ9IGlzIHRha2luZyBhaW0hYCk7XG4gICAgICBmdW5jdGlvbiBtYWtlQWlNb3ZlKCkge1xuICAgICAgICBjb25zdCBhaUNob2ljZSA9IGdldEFpQ2hvaWNlKCk7XG4gICAgICAgIGNvbnN0IGFpQXR0YWNrUmVzdWx0ID0gcDFCb2FyZEluc3RhbmNlLnJlY2VpdmVBdHRhY2soXG4gICAgICAgICAgYWlDaG9pY2UueCxcbiAgICAgICAgICBhaUNob2ljZS55LFxuICAgICAgICAgIHBsYXllcjEuYm9hcmQsXG4gICAgICAgICAgcGxheWVyMS5zaGlwc1xuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBgJHtjdXJyZW50UGxheWVyfSBoYXMgYXR0YWNrZWQgJHtwbGF5ZXIxLmdldE5hbWUoKX0gYW5kIGl0IGlzIGEgJHthaUF0dGFja1Jlc3VsdH1gXG4gICAgICAgICk7XG4gICAgICAgIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIxQm9hcmQsIHAxZ2FtZUJvYXJkKTtcbiAgICAgICAgY3VycmVudFBsYXllciA9IFwiSHVtYW5cIjtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQobWFrZUFpTW92ZSwgNDAwKTsgLy8wLjRzIGRlbGF5IGJldHdlZW4gdHVybnNcbiAgICB9XG5cbiAgICAvL3VwZGF0ZVR1cm5NZXNzYWdlKCk7XG4gICAgcmV0dXJuIHJlbmRlckdhbWVCb2FyZDtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgYm9hcmQsXG4gICAgdHlwZSxcbiAgICBnZXROYW1lLFxuICAgIGdldFR5cGUsXG4gICAgYXR0YWNrLFxuICAgIGdldEFpQ2hvaWNlLFxuICAgIHNoaXBzLFxuICB9O1xufTtcblxuZXhwb3J0IHsgc2hpcCwgZ2FtZUJvYXJkLCBwbGF5ZXIgfTtcbiIsIi8qKiBAZm9ybWF0ICovXG5yZXF1aXJlKFwiLi9zdHlsZXMuY3NzXCIpO1xuXG5pbXBvcnQgeyBzaGlwLCBnYW1lQm9hcmQsIHBsYXllciB9IGZyb20gXCIuL2dhbWUuanNcIjtcbmltcG9ydCB7IHJlbmRlckdhbWVCb2FyZCwgcmVzZXRHYW1lQm9hcmQgfSBmcm9tIFwiLi9yZW5kZXIuanNcIjtcblxuY29uc3QgcDFnYW1lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjEtYm9hcmRcIik7XG5jb25zdCBwMmdhbWVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMi1ib2FyZFwiKTtcbmNvbnN0IG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lc3NhZ2VcIik7XG5cbmxldCBnYW1lQWN0aXZlID0gZmFsc2U7IC8vdXBkYXRlIGJhc2VkIG9uIHN0YXR1c1xuXG4vL1NFVFVQXG5jb25zdCBncmlkU2l6ZSA9IDEwO1xubGV0IHAxQm9hcmRJbnN0YW5jZSA9IGdhbWVCb2FyZChncmlkU2l6ZSk7XG5sZXQgcGxheWVyMUJvYXJkID0gcDFCb2FyZEluc3RhbmNlLmNyZWF0ZUJvYXJkKCk7XG5sZXQgcDJCb2FyZEluc3RhbmNlID0gZ2FtZUJvYXJkKGdyaWRTaXplKTtcbmxldCBwbGF5ZXIyQm9hcmQgPSBwMkJvYXJkSW5zdGFuY2UuY3JlYXRlQm9hcmQoKTtcblxuLy9NYWtlIFBsYXllciAxIHNoaXBzXG5jb25zdCBwMWNhcnJpZXIgPSBzaGlwKFwiY2FycmllclwiLCA1LCAwLCBmYWxzZSwgdHJ1ZSk7XG5jb25zdCBwMWJhdHRsZXNoaXAgPSBzaGlwKFwiYmF0dGxlc2hpcFwiLCA0LCAwLCBmYWxzZSwgZmFsc2UpO1xuY29uc3QgcDFkZXN0cm95ZXIgPSBzaGlwKFwiZGVzdHJveWVyXCIsIDMsIDAsIGZhbHNlLCBmYWxzZSk7XG5jb25zdCBwMXN1Ym1hcmluZSA9IHNoaXAoXCJzdWJtYXJpbmVcIiwgMywgMCwgZmFsc2UsIGZhbHNlKTtcbmNvbnN0IHAxcGF0cm9sQm9hdCA9IHNoaXAoXCJwYXRyb2xCb2F0XCIsIDIsIDAsIGZhbHNlLCBmYWxzZSk7XG5cbmNvbnN0IHAxQWxsU2hpcHMgPSBbXG4gIHAxY2FycmllcixcbiAgcDFiYXR0bGVzaGlwLFxuICBwMWRlc3Ryb3llcixcbiAgcDFzdWJtYXJpbmUsXG4gIHAxcGF0cm9sQm9hdCxcbl07XG5cbi8vS2VlcCB0cmFjayBvZiBwMSBkcm9wcGVkIHNoaXBzXG5sZXQgZHJvcHBlZEFycmF5ID0gW107XG5sZXQgbm90RHJvcHBlZDtcblxuLy9NYWtlIEFJIHNoaXBzXG5jb25zdCBwMmNhcnJpZXIgPSBzaGlwKFwiY2FycmllclwiLCA1LCAwLCBmYWxzZSwgZmFsc2UpO1xuY29uc3QgcDJiYXR0bGVzaGlwID0gc2hpcChcImJhdHRsZXNoaXBcIiwgNCwgMCwgZmFsc2UsIGZhbHNlKTtcbmNvbnN0IHAyZGVzdHJveWVyID0gc2hpcChcImRlc3Ryb3llclwiLCAzLCAwLCBmYWxzZSwgZmFsc2UpO1xuY29uc3QgcDJzdWJtYXJpbmUgPSBzaGlwKFwic3VibWFyaW5lXCIsIDMsIDAsIGZhbHNlLCBmYWxzZSk7XG5jb25zdCBwMnBhdHJvbEJvYXQgPSBzaGlwKFwicGF0cm9sQm9hdFwiLCAyLCAwLCBmYWxzZSwgZmFsc2UpO1xuXG5jb25zdCBwMkFsbFNoaXBzID0gW1xuICBwMmNhcnJpZXIsXG4gIHAyZGVzdHJveWVyLFxuICBwMmJhdHRsZXNoaXAsXG4gIHAyc3VibWFyaW5lLFxuICBwMnBhdHJvbEJvYXQsXG5dO1xuXG4vL01ha2UgUGxheWVyc1xuY29uc3QgcGxheWVyMSA9IHBsYXllcihcbiAgXCJUb21cIixcbiAgcGxheWVyMUJvYXJkLFxuICBcIkh1bWFuXCIsXG4gIHAxQWxsU2hpcHMsXG4gIHAxQm9hcmRJbnN0YW5jZVxuKTtcblxuY29uc3QgcGxheWVyMiA9IHBsYXllcihcbiAgXCJDb21wdXRlclwiLFxuICBwbGF5ZXIyQm9hcmQsXG4gIFwiQUlcIixcbiAgcDJBbGxTaGlwcyxcbiAgcDJCb2FyZEluc3RhbmNlXG4pO1xuXG4vL1JlbmRlciBJbml0aWFsIEJvYXJkXG5yZW5kZXJHYW1lQm9hcmQocGxheWVyMUJvYXJkLCBwMWdhbWVCb2FyZCk7XG5yZW5kZXJHYW1lQm9hcmQocGxheWVyMkJvYXJkLCBwMmdhbWVCb2FyZCk7XG5cbi8vR2FtZSBsb29wXG5cbmNvbnN0IHN0YXJ0R2FtZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RhcnQtYnV0dG9uXCIpO1xuc3RhcnRHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGFydEdhbWUpO1xuXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gIGlmIChkcm9wcGVkQXJyYXkubGVuZ3RoID49IDEpIHtcbiAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJTdGFydGluZywgdGhlIGVuZW15IGlzIHBsYWNpbmcgdGhlaXIgc2hpcHMuLi4uXCI7XG4gICAgY29uc29sZS5sb2coXCJzdGFydGluZyBnYW1lIVwiKTtcbiAgICBnYW1lQWN0aXZlID0gdHJ1ZTtcbiAgICBwbGFjZVAyU2hpcHMoKTtcbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJQbGFjZSBhbGwgc2hpcHMhXCI7XG4gICAgY29uc29sZS5sb2coXCJQbGFjZSBhbGwgc2hpcHMhXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBsYWNlUDJTaGlwcygpIHtcbiAgcDJCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIyQm9hcmQsIHAyY2FycmllciwgOSwgMSk7XG4gIHAyQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMkJvYXJkLCBwMmRlc3Ryb3llciwgMywgMyk7XG4gIHAyQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMkJvYXJkLCBwMmJhdHRsZXNoaXAsIDUsIDIpO1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJzdWJtYXJpbmUsIDIsIDEpO1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJwYXRyb2xCb2F0LCA2LCAwKTtcbiAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjJCb2FyZCwgcDJnYW1lQm9hcmQpO1xufVxuXG4vKiBEcmFnIHBsYXllciBzaGlwcyAqL1xuXG5sZXQgZHJhZ2dlZFNoaXA7XG5jb25zdCBkcmFnZ2FibGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kcmFnZ2FibGVcIik7XG5jb25zdCBvcHRpb25TaGlwcyA9IEFycmF5LmZyb20oZHJhZ2dhYmxlcyk7XG5cbi8vZXZlbnQgbGlzdGVuZXJzXG5vcHRpb25TaGlwcy5mb3JFYWNoKChkcmFnZ2FibGUpID0+IHtcbiAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZ1N0YXJ0KTtcbiAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIGRyYWdFbmQpO1xufSk7XG5cbmNvbnN0IHBsYXllcjFCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMS1ib2FyZFwiKTtcbnBsYXllcjFCb2FyZENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZHJhZ092ZXIpO1xucGxheWVyMUJvYXJkQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGRyb3BTaGlwKTtcblxuZnVuY3Rpb24gZHJhZ1N0YXJ0KGUpIHtcbiAgZHJhZ2dlZFNoaXAgPSBlLnRhcmdldDtcbiAgZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LmFkZChcImRyYWdnaW5nXCIpO1xuICBub3REcm9wcGVkID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGRyYWdPdmVyKGUpIHtcbiAgbm90RHJvcHBlZCA9IGZhbHNlO1xuXG4gIGUucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gZHJhZ0VuZChlKSB7XG4gIGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJkcmFnZ2luZ1wiKTtcbn1cblxuZnVuY3Rpb24gZHJvcFNoaXAoZSkge1xuICBjb25zdCBzdGFydENvbCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sLCAxMCk7XG4gIGNvbnN0IHN0YXJ0Um93ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3csIDEwKTtcbiAgY29uc3QgdGhpc1NoaXAgPSBwMUFsbFNoaXBzW2RyYWdnZWRTaGlwLmlkXTsgLy9nZXQgdGhlIGlkIG9mIHRoZSBzaGlwIGZyb20gdGhlIHAxIHNoaXAgYXJyYXkgdG8gcGxhY2VcblxuICBjb25zdCBpc1ZhbGlkUG9zaXRpb24gPSBwMUJvYXJkSW5zdGFuY2UuY2hlY2tJZlZhbGlkKFxuICAgIHN0YXJ0Um93LFxuICAgIHN0YXJ0Q29sLFxuICAgIHRoaXNTaGlwLmxlbmd0aCxcbiAgICB0aGlzU2hpcC5pc1ZlcnRpY2FsXG4gICk7XG5cbiAgaWYgKGlzVmFsaWRQb3NpdGlvbikge1xuICAgIGRyb3BwZWRBcnJheS5wdXNoKHRoaXNTaGlwKTtcbiAgICBwMUJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjFCb2FyZCwgdGhpc1NoaXAsIHN0YXJ0Um93LCBzdGFydENvbCk7XG4gICAgZHJhZ2dlZFNoaXAucmVtb3ZlKCk7XG4gIH0gZWxzZSB7XG4gICAgbm90RHJvcHBlZCA9IHRydWU7XG4gIH1cblxuICByZW5kZXJHYW1lQm9hcmQocGxheWVyMUJvYXJkLCBwMWdhbWVCb2FyZCk7XG4gIGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJkcmFnZ2luZ1wiKTtcbn1cbmNvbnN0IHBsYXllcjJCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMi1ib2FyZFwiKTtcbnBsYXllcjJCb2FyZENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VsZWN0VGFyZ2V0KTtcbnBsYXllcjJCb2FyZENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGhvdmVyKTtcbnBsYXllcjJCb2FyZENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgaG92ZXIpO1xuXG5mdW5jdGlvbiBzZWxlY3RUYXJnZXQoZSkge1xuICBpZiAoZ2FtZUFjdGl2ZSkge1xuICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sLCAxMCk7XG4gICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3csIDEwKTtcbiAgICBwbGF5ZXIxLmF0dGFjayhwbGF5ZXIyLCByb3csIGNvbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaG92ZXIoZSkge1xuICBsZXQgaGlnaGxpZ2h0ZWRDZWxsID0gZS50YXJnZXQ7XG4gIGhpZ2hsaWdodGVkQ2VsbC5jbGFzc0xpc3QudG9nZ2xlKFwiaGlnaGxpZ2h0ZWRcIik7XG59XG5cbi8vQ2xpY2sgbmV3IGdhbWVcbi8vQWRkIGFiaWxpdHkgdG8gcm90YXRlIHNoaXBzXG4vL0RyYWcgc2hpcHMgdG8gcG9zaXRpb24gLSBET05FXG4vL0NoZWNrIGFsbCBzaGlwcyBhcmUgcGxhY2VkIC0gRE9ORVxuLy9BZGQgbG9naWMgZm9yIGNoZWNraW5nIGlmIHZhbGlkIHBvc2l0aW9uIC0gRE9ORSAoTmVlZCB0byBjaGVjayBub3QgYWxyZWFkeSBvY2N1cGllZCEpXG4vL2FsbG93IHN0YXJ0IGdhbWUgaWYgdHJ1ZSAtIERPTkVcbi8vIGNsaWNrIG9uIGVuZW15IGJvYXJkIGFuZCByZWdpc3RlciByZXN1bHQgLSBET05FXG4vL0FkZCBsb2dpYyB0byBjaGVjayBpZiBhdHRhY2sgaXMgdmFsaWQgLSBub3Qgc2VsZWN0ZWQgYmVmb3JlIGV0Yy5cbi8vc3dhcCB0dXJuIHRvIGNvbXB1dGVyIC0gZ2VuZXJhdGUgcmFuZG9tIHR1cm5cbi8vIHN3YXAgdHVybiB0byBwbGF5ZXIgYW5kIHJlcGVhdCB1bnRpbCB3aW4gKGNoZWNrRm9yV2luIGJldHdlZW4gdHVybnMpXG4vL0lmIHdvbiwgZGlzcGxheSBtZXNzYWdlLCBkaXNhYmxlIGV2ZW50IGxpc3RlbmVycyBhbmQgZW5hYmxlIHJlc3RhcnQgZ2FtZVxuLy9yZXBlYXRcblxuY29uc29sZS5sb2cocDFCb2FyZEluc3RhbmNlKTtcblxuZXhwb3J0IHtcbiAgcGxheWVyMUJvYXJkLFxuICBwbGF5ZXIyQm9hcmQsXG4gIHAxZ2FtZUJvYXJkLFxuICBwbGF5ZXIxLFxuICBwbGF5ZXIyLFxuICBwMUJvYXJkSW5zdGFuY2UsXG4gIHAyQm9hcmRJbnN0YW5jZSxcbn07XG4iLCIvKiogQGZvcm1hdCAqL1xuXG5pbXBvcnQgeyBwMWdhbWVCb2FyZCB9IGZyb20gXCIuL21haW4uanNcIjtcblxuY29uc3QgcmVuZGVyR2FtZUJvYXJkID0gKGJvYXJkLCBjb250YWluZXIpID0+IHtcbiAgY29uc3QgZ3JpZFNpemUgPSAxMDtcbiAgY29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgY29uc3QgYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBib2FyZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtY29udGFpbmVyXCIpO1xuICBib2FyZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFxuICAgIGNvbnRhaW5lciA9PT0gcDFnYW1lQm9hcmQgPyBcInBsYXllcjFcIiA6IFwicGxheWVyMlwiXG4gICk7XG4gIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IGdyaWRTaXplOyByb3crKykge1xuICAgIGNvbnN0IHJvd0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvd0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkLXJvd1wiKTtcblxuICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGdyaWRTaXplOyBjb2wrKykge1xuICAgICAgY29uc3QgY2VsbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkLWNlbGxcIik7XG4gICAgICBjZWxsRWxlbWVudC5kYXRhc2V0LnJvdyA9IHJvdztcbiAgICAgIGNlbGxFbGVtZW50LmRhdGFzZXQuY29sID0gY29sO1xuXG4gICAgICAvL3NldCBzdHlsaW5nIGJhc2VkIG9uIGNlbGwgY29udGVudCBpLmUuIHdhdGVyLCBoaXQsIHNoaXAsIG1pc3NcbiAgICAgIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IFwid2F0ZXJcIikge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwid2F0ZXJcIik7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2FyZFtyb3ddW2NvbF0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICB9IGVsc2UgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gXCJISVRcIikge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgfSBlbHNlIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IFwiTUlTU1wiKSB7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgfSBlbHNlIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IFwiU1VOS1wiKSB7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzdW5rXCIpO1xuICAgICAgfVxuICAgICAgcm93RWxlbWVudC5hcHBlbmRDaGlsZChjZWxsRWxlbWVudCk7XG4gICAgfVxuICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHJvd0VsZW1lbnQpO1xuICB9XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZENvbnRhaW5lcik7XG59O1xuXG5leHBvcnQgeyByZW5kZXJHYW1lQm9hcmQgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKiogQGZvcm1hdCAqL1xuXG4ubWVzc2FnZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICB3aWR0aDogMjByZW07XG4gIGhlaWdodDogNHJlbTtcbn1cblxuLmdhbWUtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgbWFyZ2luOiAzNXB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xufVxuXG4uYm9hcmQtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG4gIHdpZHRoOiA0MHZ3O1xufVxuXG4uc2hpcHlhcmQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xuICB3aWR0aDogNTB2dztcbiAgaGVpZ2h0OiA0MHZ3O1xuICBtYXJnaW46IDEwcHg7XG59XG5cbi5ib2FyZC1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBib3JkZXI6IDAuMXB4IHNvbGlkICNjY2M7XG59XG5cbi5ib2FyZC1jZWxsIHtcbiAgZmxleDogMTtcbiAgd2lkdGg6IDFyZW07XG4gIGhlaWdodDogMXJlbTtcbiAgYm9yZGVyOiAwLjFweCBzb2xpZCAjY2NjO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWI5NWUwO1xufVxuXG4uc2hpcCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xuICBoZWlnaHQ6IDFyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xufVxuXG4uZHJhZ2dhYmxlIHtcbiAgY3Vyc29yOiBtb3ZlO1xufVxuXG4uZHJhZ2dpbmcge1xuICBvcGFjaXR5OiAwLjU7XG59XG5cbi5oaWdobGlnaHRlZCB7XG4gIG9wYWNpdHk6IDAuNTtcbn1cblxuLmNhcnJpZXIge1xuICB3aWR0aDogMTJyZW07XG59XG5cbi5iYXR0bGVzaGlwIHtcbiAgd2lkdGg6IDlyZW07XG59XG5cbi5kZXN0cm95ZXIge1xuICB3aWR0aDogN3JlbTtcbn1cblxuLnN1Ym1hcmluZSB7XG4gIHdpZHRoOiA3cmVtO1xufVxuXG4ucGF0cm9sQm9hdCB7XG4gIHdpZHRoOiA0LjVyZW07XG59XG5cbi5oaXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5zdW5rIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuXG4ubWlzcyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuXG4ucGxheWVyMSB7XG4gIG1hcmdpbi1ib3R0b206IDUwcHg7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLGFBQWE7O0FBRWI7RUFDRSx1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsU0FBUztBQUNYOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1DQUFtQztFQUNuQyxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsV0FBVztFQUNYLFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsT0FBTztFQUNQLFdBQVc7RUFDWCxZQUFZO0VBQ1osd0JBQXdCO0VBQ3hCLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qKiBAZm9ybWF0ICovXFxuXFxuLm1lc3NhZ2Uge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICB3aWR0aDogMjByZW07XFxuICBoZWlnaHQ6IDRyZW07XFxufVxcblxcbi5nYW1lLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIG1hcmdpbjogMzVweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMTBweDtcXG59XFxuXFxuLmJvYXJkLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICB3aWR0aDogNDB2dztcXG59XFxuXFxuLnNoaXB5YXJkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxuICB3aWR0aDogNTB2dztcXG4gIGhlaWdodDogNDB2dztcXG4gIG1hcmdpbjogMTBweDtcXG59XFxuXFxuLmJvYXJkLXJvdyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYm9yZGVyOiAwLjFweCBzb2xpZCAjY2NjO1xcbn1cXG5cXG4uYm9hcmQtY2VsbCB7XFxuICBmbGV4OiAxO1xcbiAgd2lkdGg6IDFyZW07XFxuICBoZWlnaHQ6IDFyZW07XFxuICBib3JkZXI6IDAuMXB4IHNvbGlkICNjY2M7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWI5NWUwO1xcbn1cXG5cXG4uc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcXG4gIGhlaWdodDogMXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcbn1cXG5cXG4uZHJhZ2dhYmxlIHtcXG4gIGN1cnNvcjogbW92ZTtcXG59XFxuXFxuLmRyYWdnaW5nIHtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XFxuXFxuLmhpZ2hsaWdodGVkIHtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XFxuXFxuLmNhcnJpZXIge1xcbiAgd2lkdGg6IDEycmVtO1xcbn1cXG5cXG4uYmF0dGxlc2hpcCB7XFxuICB3aWR0aDogOXJlbTtcXG59XFxuXFxuLmRlc3Ryb3llciB7XFxuICB3aWR0aDogN3JlbTtcXG59XFxuXFxuLnN1Ym1hcmluZSB7XFxuICB3aWR0aDogN3JlbTtcXG59XFxuXFxuLnBhdHJvbEJvYXQge1xcbiAgd2lkdGg6IDQuNXJlbTtcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVxcblxcbi5zdW5rIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLm1pc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVxcblxcbi5wbGF5ZXIxIHtcXG4gIG1hcmdpbi1ib3R0b206IDUwcHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4uanNcIik7XG4iLCIiXSwibmFtZXMiOlsicGxheWVyMSIsInBsYXllcjIiLCJwbGF5ZXIxQm9hcmQiLCJwbGF5ZXIyQm9hcmQiLCJwMUJvYXJkSW5zdGFuY2UiLCJwMkJvYXJkSW5zdGFuY2UiLCJyZW5kZXJHYW1lQm9hcmQiLCJwMWdhbWVCb2FyZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInAyZ2FtZUJvYXJkIiwiY3VycmVudFBsYXllciIsInNoaXAiLCJ0eXBlIiwibGVuZ3RoIiwiaGl0Q291bnQiLCJzaW5rU3RhdHVzIiwiaXNWZXJ0aWNhbCIsImhpdCIsImlzU3VuayIsImdhbWVCb2FyZCIsImdyaWRTaXplIiwiY3JlYXRlQm9hcmQiLCJib2FyZCIsIkFycmF5IiwiZmlsbCIsIm1hcCIsInBsYWNlU2hpcCIsInN0YXJ0aW5nUm93Iiwic3RhcnRpbmdDb2wiLCJzaGlwTGVuZ3RoIiwiaXNWYWxpZFBvc2l0aW9uIiwiY2hlY2tJZlZhbGlkIiwiaSIsInZhbGlkIiwicmVjZWl2ZUF0dGFjayIsInJvdyIsImNvbCIsInNoaXBzIiwiY2hlY2tGb3JXaW4iLCJhbGxTaGlwc1N1bmsiLCJldmVyeSIsIm1lc3NhZ2VCb3giLCJ0ZXh0Q29udGVudCIsImNvbnNvbGUiLCJsb2ciLCJwbGF5ZXIiLCJuYW1lIiwiZ2FtZUJvYXJkSW5zdGFuY2UiLCJnZXROYW1lIiwiZ2V0VHlwZSIsImdldEFpQ2hvaWNlIiwiYXZhaWxhYmxlU3BvdHMiLCJ4IiwieSIsInB1c2giLCJyYW5kb21JbmRleCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImFpQ2hvaWNlIiwiYXR0YWNrIiwiZW5lbXkiLCJlbmVteUJvYXJkIiwiYXR0YWNrUmVzdWx0IiwibWFrZUFpTW92ZSIsImFpQXR0YWNrUmVzdWx0Iiwic2V0VGltZW91dCIsInJlcXVpcmUiLCJyZXNldEdhbWVCb2FyZCIsImdhbWVBY3RpdmUiLCJwMWNhcnJpZXIiLCJwMWJhdHRsZXNoaXAiLCJwMWRlc3Ryb3llciIsInAxc3VibWFyaW5lIiwicDFwYXRyb2xCb2F0IiwicDFBbGxTaGlwcyIsImRyb3BwZWRBcnJheSIsIm5vdERyb3BwZWQiLCJwMmNhcnJpZXIiLCJwMmJhdHRsZXNoaXAiLCJwMmRlc3Ryb3llciIsInAyc3VibWFyaW5lIiwicDJwYXRyb2xCb2F0IiwicDJBbGxTaGlwcyIsInN0YXJ0R2FtZUJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdGFydEdhbWUiLCJwbGFjZVAyU2hpcHMiLCJkcmFnZ2VkU2hpcCIsImRyYWdnYWJsZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwib3B0aW9uU2hpcHMiLCJmcm9tIiwiZm9yRWFjaCIsImRyYWdnYWJsZSIsImRyYWdTdGFydCIsImRyYWdFbmQiLCJwbGF5ZXIxQm9hcmRDb250YWluZXIiLCJkcmFnT3ZlciIsImRyb3BTaGlwIiwiZSIsInRhcmdldCIsImNsYXNzTGlzdCIsImFkZCIsInByZXZlbnREZWZhdWx0IiwicmVtb3ZlIiwic3RhcnRDb2wiLCJwYXJzZUludCIsImRhdGFzZXQiLCJzdGFydFJvdyIsInRoaXNTaGlwIiwiaWQiLCJwbGF5ZXIyQm9hcmRDb250YWluZXIiLCJzZWxlY3RUYXJnZXQiLCJob3ZlciIsImhpZ2hsaWdodGVkQ2VsbCIsInRvZ2dsZSIsImNvbnRhaW5lciIsImJvYXJkQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsInJvd0VsZW1lbnQiLCJjZWxsRWxlbWVudCIsImFwcGVuZENoaWxkIl0sInNvdXJjZVJvb3QiOiIifQ==