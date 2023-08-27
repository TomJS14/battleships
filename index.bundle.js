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
        if (board[x][y] === "water") {
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
    const enemyBoard = gameBoardInstance;
    if (enemy.getType() === "Human") {
      const aiChoice = getAiChoice();
      const attackResult = enemyBoard.receiveAttack(aiChoice.x, aiChoice.y, enemy.board, enemy.ships);
      console.log(attackResult);
      console.log(`${name} has attacked ${enemy.getName()} at ${aiChoice.x} x & ${aiChoice.y} Y and it is a ${attackResult}`);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(_main__WEBPACK_IMPORTED_MODULE_0__.player1Board, p1gameBoard);
    } else {
      const attackResult = enemyBoard.receiveAttack(x, y, enemy.board, enemy.ships);
      console.log(`${name} has attacked ${enemy.getName()} at ${x} X & ${y} Y and it is a ${attackResult}`);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderGameBoard)(_main__WEBPACK_IMPORTED_MODULE_0__.player2Board, p2gameBoard);
    }
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
/* harmony export */   p1gameBoard: () => (/* binding */ p1gameBoard),
/* harmony export */   player1Board: () => (/* binding */ player1Board),
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
  if (droppedArray.length === 5) {
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
//Add logic for checking if valid position - DONE
//allow start game if true - DONE
// click on enemy board and register result - DONE
//Add logic to check if attack is valid - not selected before etc.
//swap turn to computer - generate random turn
// swap turn to player and repeat until win (checkForWin between turns)
//If won, display message, disable event listeners and enable restart game
//repeat



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9tYWluLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3JlbmRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zdHlsZXMuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlcy5jc3M/NDRiMiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGZvcm1hdCAqL1xuXG5pbXBvcnQgeyBwbGF5ZXIxQm9hcmQsIHBsYXllcjJCb2FyZCB9IGZyb20gXCIuL21haW5cIjtcbmltcG9ydCB7IHJlbmRlckdhbWVCb2FyZCB9IGZyb20gXCIuL3JlbmRlclwiO1xuXG5jb25zdCBwMWdhbWVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMS1ib2FyZFwiKTtcbmNvbnN0IHAyZ2FtZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXIyLWJvYXJkXCIpO1xuXG5jb25zdCBzaGlwID0gKHR5cGUsIGxlbmd0aCwgaGl0Q291bnQsIHNpbmtTdGF0dXMsIGlzVmVydGljYWwpID0+IHtcbiAgY29uc3QgaGl0ID0gKHNoaXApID0+IHtcbiAgICBzaGlwLmhpdENvdW50Kys7XG4gICAgcmV0dXJuIHNoaXAuaGl0Q291bnQ7XG4gIH07XG4gIGNvbnN0IGlzU3VuayA9IChzaGlwKSA9PiB7XG4gICAgaWYgKHNoaXAuaGl0Q291bnQgPT09IHNoaXAubGVuZ3RoKSB7XG4gICAgICBzaGlwLnNpbmtTdGF0dXMgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gc2hpcC5zaW5rU3RhdHVzO1xuICB9O1xuXG4gIHJldHVybiB7IHR5cGUsIGxlbmd0aCwgaGl0Q291bnQsIHNpbmtTdGF0dXMsIGhpdCwgaXNTdW5rLCBpc1ZlcnRpY2FsIH07XG59O1xuXG5jb25zdCBnYW1lQm9hcmQgPSAoZ3JpZFNpemUpID0+IHtcbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgYm9hcmQgPSBuZXcgQXJyYXkoZ3JpZFNpemUpXG4gICAgICAuZmlsbChudWxsKVxuICAgICAgLm1hcCgoKSA9PiBuZXcgQXJyYXkoZ3JpZFNpemUpLmZpbGwoXCJ3YXRlclwiKSk7XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChib2FyZCwgc2hpcCwgc3RhcnRpbmdSb3csIHN0YXJ0aW5nQ29sKSA9PiB7XG4gICAgY29uc3QgaXNWZXJ0aWNhbCA9IHNoaXAuaXNWZXJ0aWNhbDtcbiAgICBjb25zdCBzaGlwTGVuZ3RoID0gc2hpcC5sZW5ndGg7XG4gICAgc2hpcC5zdGFydGluZ1JvdyA9IHN0YXJ0aW5nUm93O1xuICAgIHNoaXAuc3RhcnRpbmdDb2wgPSBzdGFydGluZ0NvbDtcbiAgICBsZXQgaXNWYWxpZFBvc2l0aW9uID0gY2hlY2tJZlZhbGlkKFxuICAgICAgc3RhcnRpbmdSb3csXG4gICAgICBzdGFydGluZ0NvbCxcbiAgICAgIHNoaXBMZW5ndGgsXG4gICAgICBpc1ZlcnRpY2FsXG4gICAgKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXNWZXJ0aWNhbCAmJiBpc1ZhbGlkUG9zaXRpb24pIHtcbiAgICAgICAgYm9hcmRbc3RhcnRpbmdSb3cgKyBpXVtzdGFydGluZ0NvbF0gPSBzaGlwO1xuICAgICAgfSBlbHNlIGlmIChpc1ZhbGlkUG9zaXRpb24pIHtcbiAgICAgICAgYm9hcmRbc3RhcnRpbmdSb3ddW3N0YXJ0aW5nQ29sICsgaV0gPSBzaGlwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgY2hlY2tJZlZhbGlkID0gKHN0YXJ0aW5nUm93LCBzdGFydGluZ0NvbCwgc2hpcExlbmd0aCwgaXNWZXJ0aWNhbCkgPT4ge1xuICAgIGxldCB2YWxpZDtcbiAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgdmFsaWQgPSBzdGFydGluZ1JvdyArIHNoaXBMZW5ndGggPD0gMTAgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuICAgIGlmICghaXNWZXJ0aWNhbCkge1xuICAgICAgdmFsaWQgPSBzdGFydGluZ0NvbCArIHNoaXBMZW5ndGggPD0gMTAgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2wsIGJvYXJkLCBzaGlwcykgPT4ge1xuICAgIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IFwid2F0ZXJcIikge1xuICAgICAgYm9hcmRbcm93XVtjb2xdID0gXCJNSVNTXCI7XG4gICAgICByZXR1cm4gXCJNSVNTXCI7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYm9hcmRbcm93XVtjb2xdLmhpdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBjb25zdCBzaGlwID0gYm9hcmRbcm93XVtjb2xdO1xuICAgICAgc2hpcC5oaXQoc2hpcCk7XG5cbiAgICAgIGlmIChzaGlwLmlzU3VuayhzaGlwKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoc2hpcC5pc1ZlcnRpY2FsKSB7XG4gICAgICAgICAgICBib2FyZFtzaGlwLnN0YXJ0aW5nUm93ICsgaV1bc2hpcC5zdGFydGluZ0NvbF0gPSBcIlNVTktcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9hcmRbc2hpcC5zdGFydGluZ1Jvd11bc2hpcC5zdGFydGluZ0NvbCArIGldID0gXCJTVU5LXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNoZWNrRm9yV2luKHNoaXBzKTtcbiAgICAgICAgcmV0dXJuIFwiU1VOS1wiO1xuICAgICAgfVxuICAgICAgYm9hcmRbcm93XVtjb2xdID0gXCJISVRcIjtcbiAgICAgIGNoZWNrRm9yV2luKHNoaXBzKTtcblxuICAgICAgcmV0dXJuIFwiSElUXCI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNoZWNrRm9yV2luID0gKHNoaXBzKSA9PiB7XG4gICAgLy9sb2dpYyB0byByZXBvcnQgd2hldGhlciBhbGwgc2hpcHMgaGF2ZSBiZWVuIHN1bmssIGNhbGwgYWZ0ZXIgZWFjaCB0dXJuXG4gICAgY29uc3QgYWxsU2hpcHNTdW5rID0gc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuc2lua1N0YXR1cyk7XG5cbiAgICBpZiAoYWxsU2hpcHNTdW5rKSB7XG4gICAgICBjb25zdCBtZXNzYWdlQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlXCIpO1xuICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IFwiWU9VIFdJTlwiO1xuICAgICAgY29uc29sZS5sb2coXCJZT1UgV0lOXCIpOyAvL2VuZCBnYW1lIGxvb3AgYW5kIHVwZGF0ZSBVSVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBjcmVhdGVCb2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBjaGVja0ZvcldpbiwgY2hlY2tJZlZhbGlkIH07XG59O1xuXG5jb25zdCBwbGF5ZXIgPSAobmFtZSwgYm9hcmQsIHR5cGUsIHNoaXBzLCBnYW1lQm9hcmRJbnN0YW5jZSkgPT4ge1xuICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTsgLy9jaGFuZ2UgdG8gaW5wdXQgYWZ0ZXIgVUkgY3JlYXRlZFxuXG4gIGNvbnN0IGdldFR5cGUgPSAoKSA9PiB0eXBlOyAvL0h1bWFuIG9yIEFJXG5cbiAgY29uc3QgZ2V0QWlDaG9pY2UgPSAoKSA9PiB7XG4gICAgLy9USElTIElTIFZFUlkgU0xPVyAtIFVQREFURSEgaW5pdGlhbGlzZSBvdXRzaWRlIG9mIGZhY3Rvcnk/XG4gICAgY29uc3QgYXZhaWxhYmxlU3BvdHMgPSBbXTtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGJvYXJkLmxlbmd0aDsgeCsrKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGJvYXJkW3hdLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgIGlmIChib2FyZFt4XVt5XSA9PT0gXCJ3YXRlclwiKSB7XG4gICAgICAgICAgYXZhaWxhYmxlU3BvdHMucHVzaCh7IHgsIHkgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhdmFpbGFibGVTcG90cy5sZW5ndGgpO1xuICAgIGNvbnN0IGFpQ2hvaWNlID0gYXZhaWxhYmxlU3BvdHNbcmFuZG9tSW5kZXhdO1xuXG4gICAgcmV0dXJuIGFpQ2hvaWNlO1xuICB9O1xuXG4gIGNvbnN0IGF0dGFjayA9IChlbmVteSwgeCwgeSkgPT4ge1xuICAgIGNvbnN0IGVuZW15Qm9hcmQgPSBnYW1lQm9hcmRJbnN0YW5jZTtcbiAgICBpZiAoZW5lbXkuZ2V0VHlwZSgpID09PSBcIkh1bWFuXCIpIHtcbiAgICAgIGNvbnN0IGFpQ2hvaWNlID0gZ2V0QWlDaG9pY2UoKTtcbiAgICAgIGNvbnN0IGF0dGFja1Jlc3VsdCA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhcbiAgICAgICAgYWlDaG9pY2UueCxcbiAgICAgICAgYWlDaG9pY2UueSxcbiAgICAgICAgZW5lbXkuYm9hcmQsXG4gICAgICAgIGVuZW15LnNoaXBzXG4gICAgICApO1xuICAgICAgY29uc29sZS5sb2coYXR0YWNrUmVzdWx0KTtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgJHtuYW1lfSBoYXMgYXR0YWNrZWQgJHtlbmVteS5nZXROYW1lKCl9IGF0ICR7YWlDaG9pY2UueH0geCAmICR7XG4gICAgICAgICAgYWlDaG9pY2UueVxuICAgICAgICB9IFkgYW5kIGl0IGlzIGEgJHthdHRhY2tSZXN1bHR9YFxuICAgICAgKTtcbiAgICAgIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIxQm9hcmQsIHAxZ2FtZUJvYXJkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYXR0YWNrUmVzdWx0ID0gZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICBlbmVteS5ib2FyZCxcbiAgICAgICAgZW5lbXkuc2hpcHNcbiAgICAgICk7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCR7bmFtZX0gaGFzIGF0dGFja2VkICR7ZW5lbXkuZ2V0TmFtZSgpfSBhdCAke3h9IFggJiAke3l9IFkgYW5kIGl0IGlzIGEgJHthdHRhY2tSZXN1bHR9YFxuICAgICAgKTtcbiAgICAgIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIyQm9hcmQsIHAyZ2FtZUJvYXJkKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlbmRlckdhbWVCb2FyZDtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgYm9hcmQsXG4gICAgdHlwZSxcbiAgICBnZXROYW1lLFxuICAgIGdldFR5cGUsXG4gICAgYXR0YWNrLFxuICAgIGdldEFpQ2hvaWNlLFxuICAgIHNoaXBzLFxuICB9O1xufTtcblxuZXhwb3J0IHsgc2hpcCwgZ2FtZUJvYXJkLCBwbGF5ZXIgfTtcbiIsIi8qKiBAZm9ybWF0ICovXG5yZXF1aXJlKFwiLi9zdHlsZXMuY3NzXCIpO1xuXG5pbXBvcnQgeyBzaGlwLCBnYW1lQm9hcmQsIHBsYXllciB9IGZyb20gXCIuL2dhbWUuanNcIjtcbmltcG9ydCB7IHJlbmRlckdhbWVCb2FyZCwgcmVzZXRHYW1lQm9hcmQgfSBmcm9tIFwiLi9yZW5kZXIuanNcIjtcblxuY29uc3QgcDFnYW1lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjEtYm9hcmRcIik7XG5jb25zdCBwMmdhbWVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMi1ib2FyZFwiKTtcbmNvbnN0IG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lc3NhZ2VcIik7XG5cbmxldCBnYW1lQWN0aXZlID0gZmFsc2U7IC8vdXBkYXRlIGJhc2VkIG9uIHN0YXR1c1xuXG4vL1NFVFVQXG5jb25zdCBncmlkU2l6ZSA9IDEwO1xubGV0IHAxQm9hcmRJbnN0YW5jZSA9IGdhbWVCb2FyZChncmlkU2l6ZSk7XG5sZXQgcGxheWVyMUJvYXJkID0gcDFCb2FyZEluc3RhbmNlLmNyZWF0ZUJvYXJkKCk7XG5sZXQgcDJCb2FyZEluc3RhbmNlID0gZ2FtZUJvYXJkKGdyaWRTaXplKTtcbmxldCBwbGF5ZXIyQm9hcmQgPSBwMkJvYXJkSW5zdGFuY2UuY3JlYXRlQm9hcmQoKTtcblxuLy9NYWtlIFBsYXllciAxIHNoaXBzXG5jb25zdCBwMWNhcnJpZXIgPSBzaGlwKFwiY2FycmllclwiLCA1LCAwLCBmYWxzZSwgdHJ1ZSk7XG5jb25zdCBwMWJhdHRsZXNoaXAgPSBzaGlwKFwiYmF0dGxlc2hpcFwiLCA0LCAwLCBmYWxzZSwgZmFsc2UpO1xuY29uc3QgcDFkZXN0cm95ZXIgPSBzaGlwKFwiZGVzdHJveWVyXCIsIDMsIDAsIGZhbHNlLCBmYWxzZSk7XG5jb25zdCBwMXN1Ym1hcmluZSA9IHNoaXAoXCJzdWJtYXJpbmVcIiwgMywgMCwgZmFsc2UsIGZhbHNlKTtcbmNvbnN0IHAxcGF0cm9sQm9hdCA9IHNoaXAoXCJwYXRyb2xCb2F0XCIsIDIsIDAsIGZhbHNlLCBmYWxzZSk7XG5cbmNvbnN0IHAxQWxsU2hpcHMgPSBbXG4gIHAxY2FycmllcixcbiAgcDFiYXR0bGVzaGlwLFxuICBwMWRlc3Ryb3llcixcbiAgcDFzdWJtYXJpbmUsXG4gIHAxcGF0cm9sQm9hdCxcbl07XG5cbi8vS2VlcCB0cmFjayBvZiBwMSBkcm9wcGVkIHNoaXBzXG5sZXQgZHJvcHBlZEFycmF5ID0gW107XG5sZXQgbm90RHJvcHBlZDtcblxuLy9NYWtlIEFJIHNoaXBzXG5jb25zdCBwMmNhcnJpZXIgPSBzaGlwKFwiY2FycmllclwiLCA1LCAwLCBmYWxzZSwgZmFsc2UpO1xuY29uc3QgcDJiYXR0bGVzaGlwID0gc2hpcChcImJhdHRsZXNoaXBcIiwgNCwgMCwgZmFsc2UsIGZhbHNlKTtcbmNvbnN0IHAyZGVzdHJveWVyID0gc2hpcChcImRlc3Ryb3llclwiLCAzLCAwLCBmYWxzZSwgZmFsc2UpO1xuY29uc3QgcDJzdWJtYXJpbmUgPSBzaGlwKFwic3VibWFyaW5lXCIsIDMsIDAsIGZhbHNlLCBmYWxzZSk7XG5jb25zdCBwMnBhdHJvbEJvYXQgPSBzaGlwKFwicGF0cm9sQm9hdFwiLCAyLCAwLCBmYWxzZSwgZmFsc2UpO1xuXG5jb25zdCBwMkFsbFNoaXBzID0gW1xuICBwMmNhcnJpZXIsXG4gIHAyZGVzdHJveWVyLFxuICBwMmJhdHRsZXNoaXAsXG4gIHAyc3VibWFyaW5lLFxuICBwMnBhdHJvbEJvYXQsXG5dO1xuXG4vL01ha2UgUGxheWVyc1xuY29uc3QgcGxheWVyMSA9IHBsYXllcihcbiAgXCJUb21cIixcbiAgcGxheWVyMUJvYXJkLFxuICBcIkh1bWFuXCIsXG4gIHAxQWxsU2hpcHMsXG4gIHAxQm9hcmRJbnN0YW5jZVxuKTtcblxuY29uc3QgcGxheWVyMiA9IHBsYXllcihcbiAgXCJDb21wdXRlclwiLFxuICBwbGF5ZXIyQm9hcmQsXG4gIFwiQUlcIixcbiAgcDJBbGxTaGlwcyxcbiAgcDJCb2FyZEluc3RhbmNlXG4pO1xuXG4vL1JlbmRlciBJbml0aWFsIEJvYXJkXG5yZW5kZXJHYW1lQm9hcmQocGxheWVyMUJvYXJkLCBwMWdhbWVCb2FyZCk7XG5yZW5kZXJHYW1lQm9hcmQocGxheWVyMkJvYXJkLCBwMmdhbWVCb2FyZCk7XG5cbi8vR2FtZSBsb29wXG5cbmNvbnN0IHN0YXJ0R2FtZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RhcnQtYnV0dG9uXCIpO1xuc3RhcnRHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGFydEdhbWUpO1xuXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gIGlmIChkcm9wcGVkQXJyYXkubGVuZ3RoID09PSA1KSB7XG4gICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IFwiU3RhcnRpbmcsIHRoZSBlbmVteSBpcyBwbGFjaW5nIHRoZWlyIHNoaXBzLi4uLlwiO1xuICAgIGNvbnNvbGUubG9nKFwic3RhcnRpbmcgZ2FtZSFcIik7XG4gICAgZ2FtZUFjdGl2ZSA9IHRydWU7XG4gICAgcGxhY2VQMlNoaXBzKCk7XG4gIH0gZWxzZSB7XG4gICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IFwiUGxhY2UgYWxsIHNoaXBzIVwiO1xuICAgIGNvbnNvbGUubG9nKFwiUGxhY2UgYWxsIHNoaXBzIVwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwbGFjZVAyU2hpcHMoKSB7XG4gIHAyQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMkJvYXJkLCBwMmNhcnJpZXIsIDksIDEpO1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJkZXN0cm95ZXIsIDMsIDMpO1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJiYXR0bGVzaGlwLCA1LCAyKTtcbiAgcDJCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIyQm9hcmQsIHAyc3VibWFyaW5lLCAyLCAxKTtcbiAgcDJCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIyQm9hcmQsIHAycGF0cm9sQm9hdCwgNiwgMCk7XG4gIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIyQm9hcmQsIHAyZ2FtZUJvYXJkKTtcbn1cblxuLyogRHJhZyBwbGF5ZXIgc2hpcHMgKi9cblxubGV0IGRyYWdnZWRTaGlwO1xuY29uc3QgZHJhZ2dhYmxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZHJhZ2dhYmxlXCIpO1xuY29uc3Qgb3B0aW9uU2hpcHMgPSBBcnJheS5mcm9tKGRyYWdnYWJsZXMpO1xuXG4vL2V2ZW50IGxpc3RlbmVyc1xub3B0aW9uU2hpcHMuZm9yRWFjaCgoZHJhZ2dhYmxlKSA9PiB7XG4gIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWdTdGFydCk7XG4gIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBkcmFnRW5kKTtcbn0pO1xuXG5jb25zdCBwbGF5ZXIxQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjEtYm9hcmRcIik7XG5wbGF5ZXIxQm9hcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGRyYWdPdmVyKTtcbnBsYXllcjFCb2FyZENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBkcm9wU2hpcCk7XG5cbmZ1bmN0aW9uIGRyYWdTdGFydChlKSB7XG4gIGRyYWdnZWRTaGlwID0gZS50YXJnZXQ7XG4gIGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5hZGQoXCJkcmFnZ2luZ1wiKTtcbiAgbm90RHJvcHBlZCA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBkcmFnT3ZlcihlKSB7XG4gIG5vdERyb3BwZWQgPSBmYWxzZTtcblxuICBlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIGRyYWdFbmQoZSkge1xuICBkcmFnZ2VkU2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZ2dpbmdcIik7XG59XG5cbmZ1bmN0aW9uIGRyb3BTaGlwKGUpIHtcbiAgY29uc3Qgc3RhcnRDb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuICBjb25zdCBzdGFydFJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCk7XG4gIGNvbnN0IHRoaXNTaGlwID0gcDFBbGxTaGlwc1tkcmFnZ2VkU2hpcC5pZF07IC8vZ2V0IHRoZSBpZCBvZiB0aGUgc2hpcCBmcm9tIHRoZSBwMSBzaGlwIGFycmF5IHRvIHBsYWNlXG5cbiAgY29uc3QgaXNWYWxpZFBvc2l0aW9uID0gcDFCb2FyZEluc3RhbmNlLmNoZWNrSWZWYWxpZChcbiAgICBzdGFydFJvdyxcbiAgICBzdGFydENvbCxcbiAgICB0aGlzU2hpcC5sZW5ndGgsXG4gICAgdGhpc1NoaXAuaXNWZXJ0aWNhbFxuICApO1xuXG4gIGlmIChpc1ZhbGlkUG9zaXRpb24pIHtcbiAgICBkcm9wcGVkQXJyYXkucHVzaCh0aGlzU2hpcCk7XG4gICAgcDFCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIxQm9hcmQsIHRoaXNTaGlwLCBzdGFydFJvdywgc3RhcnRDb2wpO1xuICAgIGRyYWdnZWRTaGlwLnJlbW92ZSgpO1xuICB9IGVsc2Uge1xuICAgIG5vdERyb3BwZWQgPSB0cnVlO1xuICB9XG5cbiAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjFCb2FyZCwgcDFnYW1lQm9hcmQpO1xuICBkcmFnZ2VkU2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZ2dpbmdcIik7XG59XG5jb25zdCBwbGF5ZXIyQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjItYm9hcmRcIik7XG5wbGF5ZXIyQm9hcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbGVjdFRhcmdldCk7XG5wbGF5ZXIyQm9hcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBob3Zlcik7XG5wbGF5ZXIyQm9hcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIGhvdmVyKTtcblxuZnVuY3Rpb24gc2VsZWN0VGFyZ2V0KGUpIHtcbiAgaWYgKGdhbWVBY3RpdmUpIHtcbiAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCk7XG4gICAgcGxheWVyMS5hdHRhY2socGxheWVyMiwgcm93LCBjb2wpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhvdmVyKGUpIHtcbiAgbGV0IGhpZ2hsaWdodGVkQ2VsbCA9IGUudGFyZ2V0O1xuICBoaWdobGlnaHRlZENlbGwuY2xhc3NMaXN0LnRvZ2dsZShcImhpZ2hsaWdodGVkXCIpO1xufVxuXG4vL0NsaWNrIG5ldyBnYW1lXG4vL0FkZCBhYmlsaXR5IHRvIHJvdGF0ZSBzaGlwc1xuLy9EcmFnIHNoaXBzIHRvIHBvc2l0aW9uIC0gRE9ORVxuLy9DaGVjayBhbGwgc2hpcHMgYXJlIHBsYWNlZCAtIERPTkVcbi8vQWRkIGxvZ2ljIGZvciBjaGVja2luZyBpZiB2YWxpZCBwb3NpdGlvbiAtIERPTkVcbi8vYWxsb3cgc3RhcnQgZ2FtZSBpZiB0cnVlIC0gRE9ORVxuLy8gY2xpY2sgb24gZW5lbXkgYm9hcmQgYW5kIHJlZ2lzdGVyIHJlc3VsdCAtIERPTkVcbi8vQWRkIGxvZ2ljIHRvIGNoZWNrIGlmIGF0dGFjayBpcyB2YWxpZCAtIG5vdCBzZWxlY3RlZCBiZWZvcmUgZXRjLlxuLy9zd2FwIHR1cm4gdG8gY29tcHV0ZXIgLSBnZW5lcmF0ZSByYW5kb20gdHVyblxuLy8gc3dhcCB0dXJuIHRvIHBsYXllciBhbmQgcmVwZWF0IHVudGlsIHdpbiAoY2hlY2tGb3JXaW4gYmV0d2VlbiB0dXJucylcbi8vSWYgd29uLCBkaXNwbGF5IG1lc3NhZ2UsIGRpc2FibGUgZXZlbnQgbGlzdGVuZXJzIGFuZCBlbmFibGUgcmVzdGFydCBnYW1lXG4vL3JlcGVhdFxuXG5leHBvcnQgeyBwbGF5ZXIxQm9hcmQsIHBsYXllcjJCb2FyZCwgcDFnYW1lQm9hcmQgfTtcbiIsIi8qKiBAZm9ybWF0ICovXG5cbmltcG9ydCB7IHAxZ2FtZUJvYXJkIH0gZnJvbSBcIi4vbWFpbi5qc1wiO1xuXG5jb25zdCByZW5kZXJHYW1lQm9hcmQgPSAoYm9hcmQsIGNvbnRhaW5lcikgPT4ge1xuICBjb25zdCBncmlkU2l6ZSA9IDEwO1xuICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICBjb25zdCBib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJvYXJkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1jb250YWluZXJcIik7XG4gIGJvYXJkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXG4gICAgY29udGFpbmVyID09PSBwMWdhbWVCb2FyZCA/IFwicGxheWVyMVwiIDogXCJwbGF5ZXIyXCJcbiAgKTtcbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgZ3JpZFNpemU7IHJvdysrKSB7XG4gICAgY29uc3Qgcm93RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtcm93XCIpO1xuXG4gICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgZ3JpZFNpemU7IGNvbCsrKSB7XG4gICAgICBjb25zdCBjZWxsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtY2VsbFwiKTtcbiAgICAgIGNlbGxFbGVtZW50LmRhdGFzZXQucm93ID0gcm93O1xuICAgICAgY2VsbEVsZW1lbnQuZGF0YXNldC5jb2wgPSBjb2w7XG5cbiAgICAgIC8vc2V0IHN0eWxpbmcgYmFzZWQgb24gY2VsbCBjb250ZW50IGkuZS4gd2F0ZXIsIGhpdCwgc2hpcCwgbWlzc1xuICAgICAgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gXCJ3YXRlclwiKSB7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ3YXRlclwiKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvYXJkW3Jvd11bY29sXSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIkhJVFwiKSB7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICB9IGVsc2UgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gXCJNSVNTXCIpIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XG4gICAgICB9IGVsc2UgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gXCJTVU5LXCIpIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInN1bmtcIik7XG4gICAgICB9XG4gICAgICByb3dFbGVtZW50LmFwcGVuZENoaWxkKGNlbGxFbGVtZW50KTtcbiAgICB9XG4gICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQocm93RWxlbWVudCk7XG4gIH1cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkQ29udGFpbmVyKTtcbn07XG5cbmV4cG9ydCB7IHJlbmRlckdhbWVCb2FyZCB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qKiBAZm9ybWF0ICovXG5cbi5tZXNzYWdlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gIHdpZHRoOiAyMHJlbTtcbiAgaGVpZ2h0OiA0cmVtO1xufVxuXG4uZ2FtZS1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBtYXJnaW46IDM1cHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDEwcHg7XG59XG5cbi5ib2FyZC1jb250YWluZXIge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcbiAgd2lkdGg6IDQwdnc7XG59XG5cbi5zaGlweWFyZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG4gIHdpZHRoOiA1MHZ3O1xuICBoZWlnaHQ6IDQwdnc7XG4gIG1hcmdpbjogMTBweDtcbn1cblxuLmJvYXJkLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGJvcmRlcjogMC4xcHggc29saWQgI2NjYztcbn1cblxuLmJvYXJkLWNlbGwge1xuICBmbGV4OiAxO1xuICB3aWR0aDogMXJlbTtcbiAgaGVpZ2h0OiAxcmVtO1xuICBib3JkZXI6IDAuMXB4IHNvbGlkICNjY2M7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxYjk1ZTA7XG59XG5cbi5zaGlwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XG4gIGhlaWdodDogMXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XG59XG5cbi5kcmFnZ2FibGUge1xuICBjdXJzb3I6IG1vdmU7XG59XG5cbi5kcmFnZ2luZyB7XG4gIG9wYWNpdHk6IDAuNTtcbn1cblxuLmhpZ2hsaWdodGVkIHtcbiAgb3BhY2l0eTogMC41O1xufVxuXG4uY2FycmllciB7XG4gIHdpZHRoOiAxMnJlbTtcbn1cblxuLmJhdHRsZXNoaXAge1xuICB3aWR0aDogOXJlbTtcbn1cblxuLmRlc3Ryb3llciB7XG4gIHdpZHRoOiA3cmVtO1xufVxuXG4uc3VibWFyaW5lIHtcbiAgd2lkdGg6IDdyZW07XG59XG5cbi5wYXRyb2xCb2F0IHtcbiAgd2lkdGg6IDQuNXJlbTtcbn1cblxuLmhpdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuLnN1bmsge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5taXNzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbi5wbGF5ZXIxIHtcbiAgbWFyZ2luLWJvdHRvbTogNTBweDtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsYUFBYTs7QUFFYjtFQUNFLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUNBQW1DO0VBQ25DLFdBQVc7QUFDYjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixXQUFXO0VBQ1gsWUFBWTtFQUNaLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxPQUFPO0VBQ1AsV0FBVztFQUNYLFlBQVk7RUFDWix3QkFBd0I7RUFDeEIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqIEBmb3JtYXQgKi9cXG5cXG4ubWVzc2FnZSB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIHdpZHRoOiAyMHJlbTtcXG4gIGhlaWdodDogNHJlbTtcXG59XFxuXFxuLmdhbWUtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgbWFyZ2luOiAzNXB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAxMHB4O1xcbn1cXG5cXG4uYm9hcmQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIHdpZHRoOiA0MHZ3O1xcbn1cXG5cXG4uc2hpcHlhcmQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gIHdpZHRoOiA1MHZ3O1xcbiAgaGVpZ2h0OiA0MHZ3O1xcbiAgbWFyZ2luOiAxMHB4O1xcbn1cXG5cXG4uYm9hcmQtcm93IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBib3JkZXI6IDAuMXB4IHNvbGlkICNjY2M7XFxufVxcblxcbi5ib2FyZC1jZWxsIHtcXG4gIGZsZXg6IDE7XFxuICB3aWR0aDogMXJlbTtcXG4gIGhlaWdodDogMXJlbTtcXG4gIGJvcmRlcjogMC4xcHggc29saWQgI2NjYztcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxYjk1ZTA7XFxufVxcblxcbi5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xcbiAgaGVpZ2h0OiAxcmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxufVxcblxcbi5kcmFnZ2FibGUge1xcbiAgY3Vyc29yOiBtb3ZlO1xcbn1cXG5cXG4uZHJhZ2dpbmcge1xcbiAgb3BhY2l0eTogMC41O1xcbn1cXG5cXG4uaGlnaGxpZ2h0ZWQge1xcbiAgb3BhY2l0eTogMC41O1xcbn1cXG5cXG4uY2FycmllciB7XFxuICB3aWR0aDogMTJyZW07XFxufVxcblxcbi5iYXR0bGVzaGlwIHtcXG4gIHdpZHRoOiA5cmVtO1xcbn1cXG5cXG4uZGVzdHJveWVyIHtcXG4gIHdpZHRoOiA3cmVtO1xcbn1cXG5cXG4uc3VibWFyaW5lIHtcXG4gIHdpZHRoOiA3cmVtO1xcbn1cXG5cXG4ucGF0cm9sQm9hdCB7XFxuICB3aWR0aDogNC41cmVtO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLnN1bmsge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG4ubWlzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLnBsYXllcjEge1xcbiAgbWFyZ2luLWJvdHRvbTogNTBweDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJwbGF5ZXIxQm9hcmQiLCJwbGF5ZXIyQm9hcmQiLCJyZW5kZXJHYW1lQm9hcmQiLCJwMWdhbWVCb2FyZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInAyZ2FtZUJvYXJkIiwic2hpcCIsInR5cGUiLCJsZW5ndGgiLCJoaXRDb3VudCIsInNpbmtTdGF0dXMiLCJpc1ZlcnRpY2FsIiwiaGl0IiwiaXNTdW5rIiwiZ2FtZUJvYXJkIiwiZ3JpZFNpemUiLCJjcmVhdGVCb2FyZCIsImJvYXJkIiwiQXJyYXkiLCJmaWxsIiwibWFwIiwicGxhY2VTaGlwIiwic3RhcnRpbmdSb3ciLCJzdGFydGluZ0NvbCIsInNoaXBMZW5ndGgiLCJpc1ZhbGlkUG9zaXRpb24iLCJjaGVja0lmVmFsaWQiLCJpIiwidmFsaWQiLCJyZWNlaXZlQXR0YWNrIiwicm93IiwiY29sIiwic2hpcHMiLCJjaGVja0ZvcldpbiIsImFsbFNoaXBzU3VuayIsImV2ZXJ5IiwibWVzc2FnZUJveCIsInRleHRDb250ZW50IiwiY29uc29sZSIsImxvZyIsInBsYXllciIsIm5hbWUiLCJnYW1lQm9hcmRJbnN0YW5jZSIsImdldE5hbWUiLCJnZXRUeXBlIiwiZ2V0QWlDaG9pY2UiLCJhdmFpbGFibGVTcG90cyIsIngiLCJ5IiwicHVzaCIsInJhbmRvbUluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiYWlDaG9pY2UiLCJhdHRhY2siLCJlbmVteSIsImVuZW15Qm9hcmQiLCJhdHRhY2tSZXN1bHQiLCJyZXF1aXJlIiwicmVzZXRHYW1lQm9hcmQiLCJnYW1lQWN0aXZlIiwicDFCb2FyZEluc3RhbmNlIiwicDJCb2FyZEluc3RhbmNlIiwicDFjYXJyaWVyIiwicDFiYXR0bGVzaGlwIiwicDFkZXN0cm95ZXIiLCJwMXN1Ym1hcmluZSIsInAxcGF0cm9sQm9hdCIsInAxQWxsU2hpcHMiLCJkcm9wcGVkQXJyYXkiLCJub3REcm9wcGVkIiwicDJjYXJyaWVyIiwicDJiYXR0bGVzaGlwIiwicDJkZXN0cm95ZXIiLCJwMnN1Ym1hcmluZSIsInAycGF0cm9sQm9hdCIsInAyQWxsU2hpcHMiLCJwbGF5ZXIxIiwicGxheWVyMiIsInN0YXJ0R2FtZUJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdGFydEdhbWUiLCJwbGFjZVAyU2hpcHMiLCJkcmFnZ2VkU2hpcCIsImRyYWdnYWJsZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwib3B0aW9uU2hpcHMiLCJmcm9tIiwiZm9yRWFjaCIsImRyYWdnYWJsZSIsImRyYWdTdGFydCIsImRyYWdFbmQiLCJwbGF5ZXIxQm9hcmRDb250YWluZXIiLCJkcmFnT3ZlciIsImRyb3BTaGlwIiwiZSIsInRhcmdldCIsImNsYXNzTGlzdCIsImFkZCIsInByZXZlbnREZWZhdWx0IiwicmVtb3ZlIiwic3RhcnRDb2wiLCJwYXJzZUludCIsImRhdGFzZXQiLCJzdGFydFJvdyIsInRoaXNTaGlwIiwiaWQiLCJwbGF5ZXIyQm9hcmRDb250YWluZXIiLCJzZWxlY3RUYXJnZXQiLCJob3ZlciIsImhpZ2hsaWdodGVkQ2VsbCIsInRvZ2dsZSIsImNvbnRhaW5lciIsImJvYXJkQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsInJvd0VsZW1lbnQiLCJjZWxsRWxlbWVudCIsImFwcGVuZENoaWxkIl0sInNvdXJjZVJvb3QiOiIifQ==