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
    //logic to report whether all ships have been sunk, call after each turn
    const allShipsSunk = ships.every(ship => ship.sinkStatus);
    if (allShipsSunk) {
      const messageBox = document.querySelector(".message");
      messageBox.textContent = "YOU WIN";
      console.log("YOU WIN"); //end game loop and update UI
      return true;
    }
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
//Add logic to check if attack is valid - not selected before etc. DONE
//swap turn to computer - generate random turn DONE
// swap turn to player and repeat until win (checkForWin between turns) DONE
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc3R5bGVzLmNzcz80NGIyIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKiBAZm9ybWF0ICovXG5cbmltcG9ydCB7XG4gIHBsYXllcjEsXG4gIHBsYXllcjIsXG4gIHBsYXllcjFCb2FyZCxcbiAgcGxheWVyMkJvYXJkLFxuICBwMUJvYXJkSW5zdGFuY2UsXG4gIHAyQm9hcmRJbnN0YW5jZSxcbn0gZnJvbSBcIi4vbWFpblwiO1xuaW1wb3J0IHsgcmVuZGVyR2FtZUJvYXJkIH0gZnJvbSBcIi4vcmVuZGVyXCI7XG5cbmNvbnN0IHAxZ2FtZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXIxLWJvYXJkXCIpO1xuY29uc3QgcDJnYW1lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjItYm9hcmRcIik7XG5sZXQgY3VycmVudFBsYXllciA9IFwiSHVtYW5cIjtcblxuY29uc3Qgc2hpcCA9ICh0eXBlLCBsZW5ndGgsIGhpdENvdW50LCBzaW5rU3RhdHVzLCBpc1ZlcnRpY2FsKSA9PiB7XG4gIGNvbnN0IGhpdCA9IChzaGlwKSA9PiB7XG4gICAgc2hpcC5oaXRDb3VudCsrO1xuICAgIHJldHVybiBzaGlwLmhpdENvdW50O1xuICB9O1xuICBjb25zdCBpc1N1bmsgPSAoc2hpcCkgPT4ge1xuICAgIGlmIChzaGlwLmhpdENvdW50ID09PSBzaGlwLmxlbmd0aCkge1xuICAgICAgc2hpcC5zaW5rU3RhdHVzID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHNoaXAuc2lua1N0YXR1cztcbiAgfTtcblxuICByZXR1cm4geyB0eXBlLCBsZW5ndGgsIGhpdENvdW50LCBzaW5rU3RhdHVzLCBoaXQsIGlzU3VuaywgaXNWZXJ0aWNhbCB9O1xufTtcblxuY29uc3QgZ2FtZUJvYXJkID0gKGdyaWRTaXplKSA9PiB7XG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xuICAgIGNvbnN0IGJvYXJkID0gbmV3IEFycmF5KGdyaWRTaXplKVxuICAgICAgLmZpbGwobnVsbClcbiAgICAgIC5tYXAoKCkgPT4gbmV3IEFycmF5KGdyaWRTaXplKS5maWxsKFwid2F0ZXJcIikpO1xuICAgIHJldHVybiBib2FyZDtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoYm9hcmQsIHNoaXAsIHN0YXJ0aW5nUm93LCBzdGFydGluZ0NvbCkgPT4ge1xuICAgIGNvbnN0IGlzVmVydGljYWwgPSBzaGlwLmlzVmVydGljYWw7XG4gICAgY29uc3Qgc2hpcExlbmd0aCA9IHNoaXAubGVuZ3RoO1xuICAgIHNoaXAuc3RhcnRpbmdSb3cgPSBzdGFydGluZ1JvdztcbiAgICBzaGlwLnN0YXJ0aW5nQ29sID0gc3RhcnRpbmdDb2w7XG4gICAgLy9DaGVjayBpZiBzaGlwIHBsYWNlbWVudCBpcyBpbiBib3VuZHNcbiAgICBpZiAoXG4gICAgICAoaXNWZXJ0aWNhbCAmJiBzdGFydGluZ1JvdyArIHNoaXBMZW5ndGggPiBncmlkU2l6ZSkgfHxcbiAgICAgICghaXNWZXJ0aWNhbCAmJiBzdGFydGluZ0NvbCArIHNoaXBMZW5ndGggPiBncmlkU2l6ZSlcbiAgICApIHtcbiAgICAgIHJldHVybiBudWxsOyAvLyBJbnZhbGlkIHBsYWNlbWVudFxuICAgIH1cblxuICAgIC8vQ2hlY2sgaWYgY2VsbHMgYXJlIGFscmVhZHkgb2NjdXBpZWRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgICAgaWYgKGJvYXJkW3N0YXJ0aW5nUm93ICsgaV1bc3RhcnRpbmdDb2xdICE9PSBcIndhdGVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGJvYXJkW3N0YXJ0aW5nUm93XVtzdGFydGluZ0NvbCArIGldICE9PSBcIndhdGVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vb3RoZXJ3aXNlIHZhbGlkLCBzbyBwbGFjZSBzaGlwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICAgIGJvYXJkW3N0YXJ0aW5nUm93ICsgaV1bc3RhcnRpbmdDb2xdID0gc2hpcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvYXJkW3N0YXJ0aW5nUm93XVtzdGFydGluZ0NvbCArIGldID0gc2hpcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbCwgYm9hcmQsIHNoaXBzKSA9PiB7XG4gICAgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gXCJ3YXRlclwiKSB7XG4gICAgICBib2FyZFtyb3ddW2NvbF0gPSBcIk1JU1NcIjtcbiAgICAgIHJldHVybiBcIk1JU1NcIjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2FyZFtyb3ddW2NvbF0uaGl0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBib2FyZFtyb3ddW2NvbF07XG4gICAgICBzaGlwLmhpdChzaGlwKTtcblxuICAgICAgaWYgKHNoaXAuaXNTdW5rKHNoaXApKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChzaGlwLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgIGJvYXJkW3NoaXAuc3RhcnRpbmdSb3cgKyBpXVtzaGlwLnN0YXJ0aW5nQ29sXSA9IFwiU1VOS1wiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2FyZFtzaGlwLnN0YXJ0aW5nUm93XVtzaGlwLnN0YXJ0aW5nQ29sICsgaV0gPSBcIlNVTktcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2hlY2tGb3JXaW4oc2hpcHMpO1xuICAgICAgICByZXR1cm4gXCJTVU5LXCI7XG4gICAgICB9XG4gICAgICBib2FyZFtyb3ddW2NvbF0gPSBcIkhJVFwiO1xuICAgICAgY2hlY2tGb3JXaW4oc2hpcHMpO1xuXG4gICAgICByZXR1cm4gXCJISVRcIjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2hlY2tGb3JXaW4gPSAoc2hpcHMpID0+IHtcbiAgICAvL2xvZ2ljIHRvIHJlcG9ydCB3aGV0aGVyIGFsbCBzaGlwcyBoYXZlIGJlZW4gc3VuaywgY2FsbCBhZnRlciBlYWNoIHR1cm5cbiAgICBjb25zdCBhbGxTaGlwc1N1bmsgPSBzaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5zaW5rU3RhdHVzKTtcblxuICAgIGlmIChhbGxTaGlwc1N1bmspIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lc3NhZ2VcIik7XG4gICAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJZT1UgV0lOXCI7XG4gICAgICBjb25zb2xlLmxvZyhcIllPVSBXSU5cIik7IC8vZW5kIGdhbWUgbG9vcCBhbmQgdXBkYXRlIFVJXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgY3JlYXRlQm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgY2hlY2tGb3JXaW4gfTtcbn07XG5cbmNvbnN0IHBsYXllciA9IChuYW1lLCBib2FyZCwgdHlwZSwgc2hpcHMsIGdhbWVCb2FyZEluc3RhbmNlKSA9PiB7XG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBuYW1lOyAvL2NoYW5nZSB0byBpbnB1dCBhZnRlciBVSSBjcmVhdGVkXG5cbiAgY29uc3QgZ2V0VHlwZSA9ICgpID0+IHR5cGU7IC8vSHVtYW4gb3IgQUlcblxuICBjb25zdCBnZXRBaUNob2ljZSA9ICgpID0+IHtcbiAgICAvL1RISVMgSVMgVkVSWSBTTE9XIC0gVVBEQVRFISBpbml0aWFsaXNlIG91dHNpZGUgb2YgZmFjdG9yeT9cbiAgICBjb25zdCBhdmFpbGFibGVTcG90cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBib2FyZC5sZW5ndGg7IHgrKykge1xuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBib2FyZFt4XS5sZW5ndGg7IHkrKykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgYm9hcmRbeF1beV0gIT09IFwiTUlTU1wiICYmXG4gICAgICAgICAgYm9hcmRbeF1beV0gIT09IFwiSElUXCIgJiZcbiAgICAgICAgICBib2FyZFt4XVt5XSAhPT0gXCJTVU5LXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgYXZhaWxhYmxlU3BvdHMucHVzaCh7IHgsIHkgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhdmFpbGFibGVTcG90cy5sZW5ndGgpO1xuICAgIGNvbnN0IGFpQ2hvaWNlID0gYXZhaWxhYmxlU3BvdHNbcmFuZG9tSW5kZXhdO1xuICAgIHJldHVybiBhaUNob2ljZTtcbiAgfTtcblxuICBjb25zdCBhdHRhY2sgPSAoZW5lbXksIHgsIHkpID0+IHtcbiAgICBpZiAoY3VycmVudFBsYXllciA9PT0gXCJIdW1hblwiKSB7XG4gICAgICBjb25zb2xlLmxvZyhgJHtjdXJyZW50UGxheWVyfSBpcyB0YWtpbmcgYWltIWApO1xuICAgICAgY29uc3QgZW5lbXlCb2FyZCA9IHAxQm9hcmRJbnN0YW5jZTtcbiAgICAgIGNvbnN0IGF0dGFja1Jlc3VsdCA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgZW5lbXkuYm9hcmQsXG4gICAgICAgIGVuZW15LnNoaXBzXG4gICAgICApO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAke2N1cnJlbnRQbGF5ZXJ9IGhhcyBhdHRhY2tlZCAke3BsYXllcjIuZ2V0TmFtZSgpfSBhbmQgaXQgaXMgYSAke2F0dGFja1Jlc3VsdH1gXG4gICAgICApO1xuICAgICAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjJCb2FyZCwgcDJnYW1lQm9hcmQpO1xuXG4gICAgICAvL2NvbXB1dGVycyB0dXJuXG4gICAgICBjdXJyZW50UGxheWVyID0gXCJDb21wdXRlclwiO1xuICAgICAgY29uc29sZS5sb2coYCR7Y3VycmVudFBsYXllcn0gaXMgdGFraW5nIGFpbSFgKTtcbiAgICAgIGZ1bmN0aW9uIG1ha2VBaU1vdmUoKSB7XG4gICAgICAgIGNvbnN0IGFpQ2hvaWNlID0gZ2V0QWlDaG9pY2UoKTtcbiAgICAgICAgY29uc3QgYWlBdHRhY2tSZXN1bHQgPSBwMUJvYXJkSW5zdGFuY2UucmVjZWl2ZUF0dGFjayhcbiAgICAgICAgICBhaUNob2ljZS54LFxuICAgICAgICAgIGFpQ2hvaWNlLnksXG4gICAgICAgICAgcGxheWVyMS5ib2FyZCxcbiAgICAgICAgICBwbGF5ZXIxLnNoaXBzXG4gICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIGAke2N1cnJlbnRQbGF5ZXJ9IGhhcyBhdHRhY2tlZCAke3BsYXllcjEuZ2V0TmFtZSgpfSBhbmQgaXQgaXMgYSAke2FpQXR0YWNrUmVzdWx0fWBcbiAgICAgICAgKTtcbiAgICAgICAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjFCb2FyZCwgcDFnYW1lQm9hcmQpO1xuICAgICAgICBjdXJyZW50UGxheWVyID0gXCJIdW1hblwiO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dChtYWtlQWlNb3ZlLCA0MDApOyAvLzAuNHMgZGVsYXkgYmV0d2VlbiB0dXJuc1xuICAgIH1cblxuICAgIC8vdXBkYXRlVHVybk1lc3NhZ2UoKTtcbiAgICByZXR1cm4gcmVuZGVyR2FtZUJvYXJkO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBib2FyZCxcbiAgICB0eXBlLFxuICAgIGdldE5hbWUsXG4gICAgZ2V0VHlwZSxcbiAgICBhdHRhY2ssXG4gICAgZ2V0QWlDaG9pY2UsXG4gICAgc2hpcHMsXG4gIH07XG59O1xuXG5leHBvcnQgeyBzaGlwLCBnYW1lQm9hcmQsIHBsYXllciB9O1xuIiwiLyoqIEBmb3JtYXQgKi9cbnJlcXVpcmUoXCIuL3N0eWxlcy5jc3NcIik7XG5cbmltcG9ydCB7IHNoaXAsIGdhbWVCb2FyZCwgcGxheWVyIH0gZnJvbSBcIi4vZ2FtZS5qc1wiO1xuaW1wb3J0IHsgcmVuZGVyR2FtZUJvYXJkLCByZXNldEdhbWVCb2FyZCB9IGZyb20gXCIuL3JlbmRlci5qc1wiO1xuXG5jb25zdCBwMWdhbWVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMS1ib2FyZFwiKTtcbmNvbnN0IHAyZ2FtZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXIyLWJvYXJkXCIpO1xuY29uc3QgbWVzc2FnZUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVzc2FnZVwiKTtcblxubGV0IGdhbWVBY3RpdmUgPSBmYWxzZTsgLy91cGRhdGUgYmFzZWQgb24gc3RhdHVzXG5cbi8vU0VUVVBcbmNvbnN0IGdyaWRTaXplID0gMTA7XG5sZXQgcDFCb2FyZEluc3RhbmNlID0gZ2FtZUJvYXJkKGdyaWRTaXplKTtcbmxldCBwbGF5ZXIxQm9hcmQgPSBwMUJvYXJkSW5zdGFuY2UuY3JlYXRlQm9hcmQoKTtcbmxldCBwMkJvYXJkSW5zdGFuY2UgPSBnYW1lQm9hcmQoZ3JpZFNpemUpO1xubGV0IHBsYXllcjJCb2FyZCA9IHAyQm9hcmRJbnN0YW5jZS5jcmVhdGVCb2FyZCgpO1xuXG4vL01ha2UgUGxheWVyIDEgc2hpcHNcbmNvbnN0IHAxY2FycmllciA9IHNoaXAoXCJjYXJyaWVyXCIsIDUsIDAsIGZhbHNlLCB0cnVlKTtcbmNvbnN0IHAxYmF0dGxlc2hpcCA9IHNoaXAoXCJiYXR0bGVzaGlwXCIsIDQsIDAsIGZhbHNlLCBmYWxzZSk7XG5jb25zdCBwMWRlc3Ryb3llciA9IHNoaXAoXCJkZXN0cm95ZXJcIiwgMywgMCwgZmFsc2UsIGZhbHNlKTtcbmNvbnN0IHAxc3VibWFyaW5lID0gc2hpcChcInN1Ym1hcmluZVwiLCAzLCAwLCBmYWxzZSwgZmFsc2UpO1xuY29uc3QgcDFwYXRyb2xCb2F0ID0gc2hpcChcInBhdHJvbEJvYXRcIiwgMiwgMCwgZmFsc2UsIGZhbHNlKTtcblxuY29uc3QgcDFBbGxTaGlwcyA9IFtcbiAgcDFjYXJyaWVyLFxuICBwMWJhdHRsZXNoaXAsXG4gIHAxZGVzdHJveWVyLFxuICBwMXN1Ym1hcmluZSxcbiAgcDFwYXRyb2xCb2F0LFxuXTtcblxuLy9LZWVwIHRyYWNrIG9mIHAxIGRyb3BwZWQgc2hpcHNcbmxldCBkcm9wcGVkQXJyYXkgPSBbXTtcbmxldCBub3REcm9wcGVkO1xuXG4vL01ha2UgQUkgc2hpcHNcbmNvbnN0IHAyY2FycmllciA9IHNoaXAoXCJjYXJyaWVyXCIsIDUsIDAsIGZhbHNlLCBmYWxzZSk7XG5jb25zdCBwMmJhdHRsZXNoaXAgPSBzaGlwKFwiYmF0dGxlc2hpcFwiLCA0LCAwLCBmYWxzZSwgZmFsc2UpO1xuY29uc3QgcDJkZXN0cm95ZXIgPSBzaGlwKFwiZGVzdHJveWVyXCIsIDMsIDAsIGZhbHNlLCBmYWxzZSk7XG5jb25zdCBwMnN1Ym1hcmluZSA9IHNoaXAoXCJzdWJtYXJpbmVcIiwgMywgMCwgZmFsc2UsIGZhbHNlKTtcbmNvbnN0IHAycGF0cm9sQm9hdCA9IHNoaXAoXCJwYXRyb2xCb2F0XCIsIDIsIDAsIGZhbHNlLCBmYWxzZSk7XG5cbmNvbnN0IHAyQWxsU2hpcHMgPSBbXG4gIHAyY2FycmllcixcbiAgcDJkZXN0cm95ZXIsXG4gIHAyYmF0dGxlc2hpcCxcbiAgcDJzdWJtYXJpbmUsXG4gIHAycGF0cm9sQm9hdCxcbl07XG5cbi8vTWFrZSBQbGF5ZXJzXG5jb25zdCBwbGF5ZXIxID0gcGxheWVyKFxuICBcIlRvbVwiLFxuICBwbGF5ZXIxQm9hcmQsXG4gIFwiSHVtYW5cIixcbiAgcDFBbGxTaGlwcyxcbiAgcDFCb2FyZEluc3RhbmNlXG4pO1xuXG5jb25zdCBwbGF5ZXIyID0gcGxheWVyKFxuICBcIkNvbXB1dGVyXCIsXG4gIHBsYXllcjJCb2FyZCxcbiAgXCJBSVwiLFxuICBwMkFsbFNoaXBzLFxuICBwMkJvYXJkSW5zdGFuY2Vcbik7XG5cbi8vUmVuZGVyIEluaXRpYWwgQm9hcmRcbnJlbmRlckdhbWVCb2FyZChwbGF5ZXIxQm9hcmQsIHAxZ2FtZUJvYXJkKTtcbnJlbmRlckdhbWVCb2FyZChwbGF5ZXIyQm9hcmQsIHAyZ2FtZUJvYXJkKTtcblxuLy9HYW1lIGxvb3BcblxuY29uc3Qgc3RhcnRHYW1lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdGFydC1idXR0b25cIik7XG5zdGFydEdhbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXJ0R2FtZSk7XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgaWYgKGRyb3BwZWRBcnJheS5sZW5ndGggPj0gMSkge1xuICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBcIlN0YXJ0aW5nLCB0aGUgZW5lbXkgaXMgcGxhY2luZyB0aGVpciBzaGlwcy4uLi5cIjtcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIGdhbWUhXCIpO1xuICAgIGdhbWVBY3RpdmUgPSB0cnVlO1xuICAgIHBsYWNlUDJTaGlwcygpO1xuICB9IGVsc2Uge1xuICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBcIlBsYWNlIGFsbCBzaGlwcyFcIjtcbiAgICBjb25zb2xlLmxvZyhcIlBsYWNlIGFsbCBzaGlwcyFcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGxhY2VQMlNoaXBzKCkge1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJjYXJyaWVyLCA5LCAxKTtcbiAgcDJCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIyQm9hcmQsIHAyZGVzdHJveWVyLCAzLCAzKTtcbiAgcDJCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIyQm9hcmQsIHAyYmF0dGxlc2hpcCwgNSwgMik7XG4gIHAyQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMkJvYXJkLCBwMnN1Ym1hcmluZSwgMiwgMSk7XG4gIHAyQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMkJvYXJkLCBwMnBhdHJvbEJvYXQsIDYsIDApO1xuICByZW5kZXJHYW1lQm9hcmQocGxheWVyMkJvYXJkLCBwMmdhbWVCb2FyZCk7XG59XG5cbi8qIERyYWcgcGxheWVyIHNoaXBzICovXG5cbmxldCBkcmFnZ2VkU2hpcDtcbmNvbnN0IGRyYWdnYWJsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRyYWdnYWJsZVwiKTtcbmNvbnN0IG9wdGlvblNoaXBzID0gQXJyYXkuZnJvbShkcmFnZ2FibGVzKTtcblxuLy9ldmVudCBsaXN0ZW5lcnNcbm9wdGlvblNoaXBzLmZvckVhY2goKGRyYWdnYWJsZSkgPT4ge1xuICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnU3RhcnQpO1xuICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZHJhZ0VuZCk7XG59KTtcblxuY29uc3QgcGxheWVyMUJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXIxLWJvYXJkXCIpO1xucGxheWVyMUJvYXJkQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBkcmFnT3Zlcik7XG5wbGF5ZXIxQm9hcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZHJvcFNoaXApO1xuXG5mdW5jdGlvbiBkcmFnU3RhcnQoZSkge1xuICBkcmFnZ2VkU2hpcCA9IGUudGFyZ2V0O1xuICBkcmFnZ2VkU2hpcC5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dpbmdcIik7XG4gIG5vdERyb3BwZWQgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZHJhZ092ZXIoZSkge1xuICBub3REcm9wcGVkID0gZmFsc2U7XG5cbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBkcmFnRW5kKGUpIHtcbiAgZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LnJlbW92ZShcImRyYWdnaW5nXCIpO1xufVxuXG5mdW5jdGlvbiBkcm9wU2hpcChlKSB7XG4gIGNvbnN0IHN0YXJ0Q29sID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2wsIDEwKTtcbiAgY29uc3Qgc3RhcnRSb3cgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApO1xuICBjb25zdCB0aGlzU2hpcCA9IHAxQWxsU2hpcHNbZHJhZ2dlZFNoaXAuaWRdOyAvL2dldCB0aGUgaWQgb2YgdGhlIHNoaXAgZnJvbSB0aGUgcDEgc2hpcCBhcnJheSB0byBwbGFjZVxuICBjb25zdCBwbGFjZW1lbnRSZXN1bHQgPSBwMUJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKFxuICAgIHBsYXllcjFCb2FyZCxcbiAgICB0aGlzU2hpcCxcbiAgICBzdGFydFJvdyxcbiAgICBzdGFydENvbFxuICApO1xuXG4gIGlmIChwbGFjZW1lbnRSZXN1bHQpIHtcbiAgICBkcm9wcGVkQXJyYXkucHVzaCh0aGlzU2hpcCk7XG4gICAgcDFCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIxQm9hcmQsIHRoaXNTaGlwLCBzdGFydFJvdywgc3RhcnRDb2wpO1xuICAgIGRyYWdnZWRTaGlwLnJlbW92ZSgpO1xuICB9IGVsc2Uge1xuICAgIG5vdERyb3BwZWQgPSB0cnVlO1xuICB9XG5cbiAgY29uc29sZS5sb2coZHJvcHBlZEFycmF5KTtcbiAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjFCb2FyZCwgcDFnYW1lQm9hcmQpO1xuICBkcmFnZ2VkU2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZ2dpbmdcIik7XG59XG5jb25zdCBwbGF5ZXIyQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjItYm9hcmRcIik7XG5wbGF5ZXIyQm9hcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbGVjdFRhcmdldCk7XG5wbGF5ZXIyQm9hcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBob3Zlcik7XG5wbGF5ZXIyQm9hcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIGhvdmVyKTtcblxuZnVuY3Rpb24gc2VsZWN0VGFyZ2V0KGUpIHtcbiAgaWYgKGdhbWVBY3RpdmUpIHtcbiAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCk7XG4gICAgcGxheWVyMS5hdHRhY2socGxheWVyMiwgcm93LCBjb2wpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhvdmVyKGUpIHtcbiAgbGV0IGhpZ2hsaWdodGVkQ2VsbCA9IGUudGFyZ2V0O1xuICBoaWdobGlnaHRlZENlbGwuY2xhc3NMaXN0LnRvZ2dsZShcImhpZ2hsaWdodGVkXCIpO1xufVxuXG4vL0NsaWNrIG5ldyBnYW1lXG4vL0FkZCBhYmlsaXR5IHRvIHJvdGF0ZSBzaGlwc1xuLy9EcmFnIHNoaXBzIHRvIHBvc2l0aW9uIC0gRE9ORVxuLy9DaGVjayBhbGwgc2hpcHMgYXJlIHBsYWNlZCAtIERPTkVcbi8vQWRkIGxvZ2ljIGZvciBjaGVja2luZyBpZiB2YWxpZCBwb3NpdGlvbiAtIERPTkUgKE5lZWQgdG8gY2hlY2sgbm90IGFscmVhZHkgb2NjdXBpZWQhKVxuLy9hbGxvdyBzdGFydCBnYW1lIGlmIHRydWUgLSBET05FXG4vLyBjbGljayBvbiBlbmVteSBib2FyZCBhbmQgcmVnaXN0ZXIgcmVzdWx0IC0gRE9ORVxuLy9BZGQgbG9naWMgdG8gY2hlY2sgaWYgYXR0YWNrIGlzIHZhbGlkIC0gbm90IHNlbGVjdGVkIGJlZm9yZSBldGMuIERPTkVcbi8vc3dhcCB0dXJuIHRvIGNvbXB1dGVyIC0gZ2VuZXJhdGUgcmFuZG9tIHR1cm4gRE9ORVxuLy8gc3dhcCB0dXJuIHRvIHBsYXllciBhbmQgcmVwZWF0IHVudGlsIHdpbiAoY2hlY2tGb3JXaW4gYmV0d2VlbiB0dXJucykgRE9ORVxuLy9JZiB3b24sIGRpc3BsYXkgbWVzc2FnZSwgZGlzYWJsZSBldmVudCBsaXN0ZW5lcnMgYW5kIGVuYWJsZSByZXN0YXJ0IGdhbWVcbi8vcmVwZWF0XG5cbmNvbnNvbGUubG9nKHAxQm9hcmRJbnN0YW5jZSk7XG5cbmV4cG9ydCB7XG4gIHBsYXllcjFCb2FyZCxcbiAgcGxheWVyMkJvYXJkLFxuICBwMWdhbWVCb2FyZCxcbiAgcGxheWVyMSxcbiAgcGxheWVyMixcbiAgcDFCb2FyZEluc3RhbmNlLFxuICBwMkJvYXJkSW5zdGFuY2UsXG59O1xuIiwiLyoqIEBmb3JtYXQgKi9cblxuaW1wb3J0IHsgcDFnYW1lQm9hcmQgfSBmcm9tIFwiLi9tYWluLmpzXCI7XG5cbmNvbnN0IHJlbmRlckdhbWVCb2FyZCA9IChib2FyZCwgY29udGFpbmVyKSA9PiB7XG4gIGNvbnN0IGdyaWRTaXplID0gMTA7XG4gIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGNvbnN0IGJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImJvYXJkLWNvbnRhaW5lclwiKTtcbiAgYm9hcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcbiAgICBjb250YWluZXIgPT09IHAxZ2FtZUJvYXJkID8gXCJwbGF5ZXIxXCIgOiBcInBsYXllcjJcIlxuICApO1xuICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBncmlkU2l6ZTsgcm93KyspIHtcbiAgICBjb25zdCByb3dFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3dFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJib2FyZC1yb3dcIik7XG5cbiAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBncmlkU2l6ZTsgY29sKyspIHtcbiAgICAgIGNvbnN0IGNlbGxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJib2FyZC1jZWxsXCIpO1xuICAgICAgY2VsbEVsZW1lbnQuZGF0YXNldC5yb3cgPSByb3c7XG4gICAgICBjZWxsRWxlbWVudC5kYXRhc2V0LmNvbCA9IGNvbDtcblxuICAgICAgLy9zZXQgc3R5bGluZyBiYXNlZCBvbiBjZWxsIGNvbnRlbnQgaS5lLiB3YXRlciwgaGl0LCBzaGlwLCBtaXNzXG4gICAgICBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIndhdGVyXCIpIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIndhdGVyXCIpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9hcmRbcm93XVtjb2xdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgfSBlbHNlIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IFwiSElUXCIpIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIk1JU1NcIikge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIlNVTktcIikge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic3Vua1wiKTtcbiAgICAgIH1cbiAgICAgIHJvd0VsZW1lbnQuYXBwZW5kQ2hpbGQoY2VsbEVsZW1lbnQpO1xuICAgIH1cbiAgICBib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChyb3dFbGVtZW50KTtcbiAgfVxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb250YWluZXIpO1xufTtcblxuZXhwb3J0IHsgcmVuZGVyR2FtZUJvYXJkIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyoqIEBmb3JtYXQgKi9cblxuLm1lc3NhZ2Uge1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgd2lkdGg6IDIwcmVtO1xuICBoZWlnaHQ6IDRyZW07XG59XG5cbi5nYW1lLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1hcmdpbjogMzVweDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbn1cblxuLmJvYXJkLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xuICB3aWR0aDogNDB2dztcbn1cblxuLnNoaXB5YXJkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbiAgd2lkdGg6IDUwdnc7XG4gIGhlaWdodDogNDB2dztcbiAgbWFyZ2luOiAxMHB4O1xufVxuXG4uYm9hcmQtcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYm9yZGVyOiAwLjFweCBzb2xpZCAjY2NjO1xufVxuXG4uYm9hcmQtY2VsbCB7XG4gIGZsZXg6IDE7XG4gIHdpZHRoOiAxcmVtO1xuICBoZWlnaHQ6IDFyZW07XG4gIGJvcmRlcjogMC4xcHggc29saWQgI2NjYztcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFiOTVlMDtcbn1cblxuLnNoaXAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcbiAgaGVpZ2h0OiAxcmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcbn1cblxuLmRyYWdnYWJsZSB7XG4gIGN1cnNvcjogbW92ZTtcbn1cblxuLmRyYWdnaW5nIHtcbiAgb3BhY2l0eTogMC41O1xufVxuXG4uaGlnaGxpZ2h0ZWQge1xuICBvcGFjaXR5OiAwLjU7XG59XG5cbi5jYXJyaWVyIHtcbiAgd2lkdGg6IDEycmVtO1xufVxuXG4uYmF0dGxlc2hpcCB7XG4gIHdpZHRoOiA5cmVtO1xufVxuXG4uZGVzdHJveWVyIHtcbiAgd2lkdGg6IDdyZW07XG59XG5cbi5zdWJtYXJpbmUge1xuICB3aWR0aDogN3JlbTtcbn1cblxuLnBhdHJvbEJvYXQge1xuICB3aWR0aDogNC41cmVtO1xufVxuXG4uaGl0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuXG4uc3VuayB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuLm1pc3Mge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuLnBsYXllcjEge1xuICBtYXJnaW4tYm90dG9tOiA1MHB4O1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSxhQUFhOztBQUViO0VBQ0UsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQ0FBbUM7RUFDbkMsV0FBVztBQUNiOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLFdBQVc7RUFDWCxZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLE9BQU87RUFDUCxXQUFXO0VBQ1gsWUFBWTtFQUNaLHdCQUF3QjtFQUN4Qix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiogQGZvcm1hdCAqL1xcblxcbi5tZXNzYWdlIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgd2lkdGg6IDIwcmVtO1xcbiAgaGVpZ2h0OiA0cmVtO1xcbn1cXG5cXG4uZ2FtZS1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBtYXJnaW46IDM1cHg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDEwcHg7XFxufVxcblxcbi5ib2FyZC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgd2lkdGg6IDQwdnc7XFxufVxcblxcbi5zaGlweWFyZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgd2lkdGg6IDUwdnc7XFxuICBoZWlnaHQ6IDQwdnc7XFxuICBtYXJnaW46IDEwcHg7XFxufVxcblxcbi5ib2FyZC1yb3cge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGJvcmRlcjogMC4xcHggc29saWQgI2NjYztcXG59XFxuXFxuLmJvYXJkLWNlbGwge1xcbiAgZmxleDogMTtcXG4gIHdpZHRoOiAxcmVtO1xcbiAgaGVpZ2h0OiAxcmVtO1xcbiAgYm9yZGVyOiAwLjFweCBzb2xpZCAjY2NjO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFiOTVlMDtcXG59XFxuXFxuLnNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XFxuICBoZWlnaHQ6IDFyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXG59XFxuXFxuLmRyYWdnYWJsZSB7XFxuICBjdXJzb3I6IG1vdmU7XFxufVxcblxcbi5kcmFnZ2luZyB7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcblxcbi5oaWdobGlnaHRlZCB7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcblxcbi5jYXJyaWVyIHtcXG4gIHdpZHRoOiAxMnJlbTtcXG59XFxuXFxuLmJhdHRsZXNoaXAge1xcbiAgd2lkdGg6IDlyZW07XFxufVxcblxcbi5kZXN0cm95ZXIge1xcbiAgd2lkdGg6IDdyZW07XFxufVxcblxcbi5zdWJtYXJpbmUge1xcbiAgd2lkdGg6IDdyZW07XFxufVxcblxcbi5wYXRyb2xCb2F0IHtcXG4gIHdpZHRoOiA0LjVyZW07XFxufVxcblxcbi5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG4uc3VuayB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVxcblxcbi5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4ucGxheWVyMSB7XFxuICBtYXJnaW4tYm90dG9tOiA1MHB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluLmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbInBsYXllcjEiLCJwbGF5ZXIyIiwicGxheWVyMUJvYXJkIiwicGxheWVyMkJvYXJkIiwicDFCb2FyZEluc3RhbmNlIiwicDJCb2FyZEluc3RhbmNlIiwicmVuZGVyR2FtZUJvYXJkIiwicDFnYW1lQm9hcmQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJwMmdhbWVCb2FyZCIsImN1cnJlbnRQbGF5ZXIiLCJzaGlwIiwidHlwZSIsImxlbmd0aCIsImhpdENvdW50Iiwic2lua1N0YXR1cyIsImlzVmVydGljYWwiLCJoaXQiLCJpc1N1bmsiLCJnYW1lQm9hcmQiLCJncmlkU2l6ZSIsImNyZWF0ZUJvYXJkIiwiYm9hcmQiLCJBcnJheSIsImZpbGwiLCJtYXAiLCJwbGFjZVNoaXAiLCJzdGFydGluZ1JvdyIsInN0YXJ0aW5nQ29sIiwic2hpcExlbmd0aCIsImkiLCJyZWNlaXZlQXR0YWNrIiwicm93IiwiY29sIiwic2hpcHMiLCJjaGVja0ZvcldpbiIsImFsbFNoaXBzU3VuayIsImV2ZXJ5IiwibWVzc2FnZUJveCIsInRleHRDb250ZW50IiwiY29uc29sZSIsImxvZyIsInBsYXllciIsIm5hbWUiLCJnYW1lQm9hcmRJbnN0YW5jZSIsImdldE5hbWUiLCJnZXRUeXBlIiwiZ2V0QWlDaG9pY2UiLCJhdmFpbGFibGVTcG90cyIsIngiLCJ5IiwicHVzaCIsInJhbmRvbUluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiYWlDaG9pY2UiLCJhdHRhY2siLCJlbmVteSIsImVuZW15Qm9hcmQiLCJhdHRhY2tSZXN1bHQiLCJtYWtlQWlNb3ZlIiwiYWlBdHRhY2tSZXN1bHQiLCJzZXRUaW1lb3V0IiwicmVxdWlyZSIsInJlc2V0R2FtZUJvYXJkIiwiZ2FtZUFjdGl2ZSIsInAxY2FycmllciIsInAxYmF0dGxlc2hpcCIsInAxZGVzdHJveWVyIiwicDFzdWJtYXJpbmUiLCJwMXBhdHJvbEJvYXQiLCJwMUFsbFNoaXBzIiwiZHJvcHBlZEFycmF5Iiwibm90RHJvcHBlZCIsInAyY2FycmllciIsInAyYmF0dGxlc2hpcCIsInAyZGVzdHJveWVyIiwicDJzdWJtYXJpbmUiLCJwMnBhdHJvbEJvYXQiLCJwMkFsbFNoaXBzIiwic3RhcnRHYW1lQnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0YXJ0R2FtZSIsInBsYWNlUDJTaGlwcyIsImRyYWdnZWRTaGlwIiwiZHJhZ2dhYmxlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJvcHRpb25TaGlwcyIsImZyb20iLCJmb3JFYWNoIiwiZHJhZ2dhYmxlIiwiZHJhZ1N0YXJ0IiwiZHJhZ0VuZCIsInBsYXllcjFCb2FyZENvbnRhaW5lciIsImRyYWdPdmVyIiwiZHJvcFNoaXAiLCJlIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwicHJldmVudERlZmF1bHQiLCJyZW1vdmUiLCJzdGFydENvbCIsInBhcnNlSW50IiwiZGF0YXNldCIsInN0YXJ0Um93IiwidGhpc1NoaXAiLCJpZCIsInBsYWNlbWVudFJlc3VsdCIsInBsYXllcjJCb2FyZENvbnRhaW5lciIsInNlbGVjdFRhcmdldCIsImhvdmVyIiwiaGlnaGxpZ2h0ZWRDZWxsIiwidG9nZ2xlIiwiY29udGFpbmVyIiwiYm9hcmRDb250YWluZXIiLCJjcmVhdGVFbGVtZW50Iiwicm93RWxlbWVudCIsImNlbGxFbGVtZW50IiwiYXBwZW5kQ2hpbGQiXSwic291cmNlUm9vdCI6IiJ9