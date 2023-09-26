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
/* harmony export */   player2Board: () => (/* binding */ player2Board),
/* harmony export */   playerName: () => (/* binding */ playerName)
/* harmony export */ });
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/game.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ "./src/render.js");
/* harmony import */ var _wallpaper_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wallpaper.jpg */ "./src/wallpaper.jpg");
/** @format */
__webpack_require__(/*! ./styles.css */ "./src/styles.css");



const main = document.querySelector(".main");
let playerName;

//Splash Screen
(function splashScreen() {
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
})();
function updateName(e) {
  playerName = e.target.value;
  console.log(playerName);
}
function loadGame() {
  main.textContent = "";
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

:root {
  font-family: "Ysabeau SC", sans-serif;
  font-size: 24px;
  color: white;
  --dark-cyan: #0e9594;
  --wheat: #f5dfbb;
  --mountbatten-pink: #95818d;
}

html {
  overflow: hidden;
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
  gap: 5px;
  flex-direction: column;
  align-items: center;
}

.game-container {
  display: flex;
  margin: 35px;
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
  gap: 5px;
  background-color: rgba(56, 118, 217, 0.4);
  padding: 10px;
  width: 38vw;
  min-height: 15vw;
  border: 1px dashed black;
  border-radius: 8px;
}

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
  border: 0.1px dotted #ccc;
  border-radius: 3px;
  background-color: #1b95e0;
  cursor: url(${___CSS_LOADER_URL_REPLACEMENT_0___}) 12 12, crosshair;
}

.ship {
  background-color: grey;
  height: 1rem;
  border: 1px solid #1b95e0;

  border-radius: 1px;
}

.enemy-ship {
  background-color: #1b95e0;
  height: 1rem;
  border: 0.1px dotted #ccc;
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

.hit,
.sunk {
  background-color: red;
  border-radius: 100%;
}

.sunk::before {
  content: "X";
  color: rgb(211, 9, 50);
  border-radius: 10px;
  position: relative;
  bottom: 20%;
  left: 20%;
}

.miss {
  background-color: white;
}

.player1 {
  margin-bottom: 50px;
}
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA,aAAa;;AAEb;EACE,qCAAqC;EACrC,eAAe;EACf,YAAY;EACZ,oBAAoB;EACpB,gBAAgB;EAChB,2BAA2B;AAC7B;;AAEA;EACE,gBAAgB;EAChB,yBAAyB;EACzB,YAAY;AACd;;AAEA;EACE,cAAc;EACd,YAAY;AACd;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,uBAAuB;EACvB,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,kCAAkC;EAClC,eAAe;EACf,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,SAAS;EACT,aAAa;EACb,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,QAAQ;EACR,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,uBAAuB;EACvB,SAAS;AACX;;AAEA;;EAEE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;EACZ,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,QAAQ;EACR,yCAAyC;EACzC,aAAa;EACb,WAAW;EACX,gBAAgB;EAChB,wBAAwB;EACxB,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,mBAAmB;EACnB,qCAAqC;EACrC,sBAAsB;EACtB,cAAc;EACd,eAAe;EACf;;;2BAGyB;EACzB,gBAAgB;EAChB,iBAAiB;EACjB,iBAAiB;EACjB,iBAAiB;EACjB,yBAAyB;EACzB,0BAA0B;EAC1B,kBAAkB;EAClB,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,UAAU;EACV,YAAY;AACd;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,iBAAiB;EACjB,gBAAgB;EAChB,kBAAkB;EAClB,uBAAuB;EACvB,kBAAkB;EAClB,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,OAAO;EACP,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,kBAAkB;EAClB,yBAAyB;EACzB,gEAA6C;AAC/C;;AAEA;EACE,sBAAsB;EACtB,YAAY;EACZ,yBAAyB;;EAEzB,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,YAAY;EACZ,yBAAyB;AAC3B;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;;;;GAIG;;AAEH;;;;;;;;;;;;;;;;;;;GAmBG;;AAEH;;;;GAIG;;AAEH;EACE,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,sBAAsB;EACtB,mBAAmB;EACnB,kBAAkB;EAClB,WAAW;EACX,SAAS;AACX;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,mBAAmB;AACrB","sourcesContent":["/** @format */\n\n:root {\n  font-family: \"Ysabeau SC\", sans-serif;\n  font-size: 24px;\n  color: white;\n  --dark-cyan: #0e9594;\n  --wheat: #f5dfbb;\n  --mountbatten-pink: #95818d;\n}\n\nhtml {\n  overflow: hidden;\n  overscroll-behavior: none;\n  height: 100%;\n}\n\nbody {\n  overflow: auto;\n  height: 100%;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n\n.background-img {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n  opacity: 0.7;\n  z-index: -1;\n}\n\n.container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.title {\n  color: black;\n  font-family: \"Notable\", sans-serif;\n  font-size: 2rem;\n  font-weight: 300;\n  margin-bottom: 20px;\n}\n\ninput {\n  font-size: 1rem;\n  text-align: center;\n  margin: 0;\n  outline: none;\n  border: none;\n  margin-bottom: 20px;\n}\n\n.draggable {\n  text-align: center;\n}\n\n.info {\n  display: flex;\n  gap: 5px;\n  flex-direction: column;\n  align-items: center;\n}\n\n.game-container {\n  display: flex;\n  margin: 35px;\n  justify-content: center;\n  gap: 50px;\n}\n\n.player1-board,\n.player2-board {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  color: black;\n}\n\n.board-container {\n  display: flex;\n  flex-direction: column;\n}\n\n.shipyardContainer {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  color: black;\n  font-weight: 700;\n}\n\n.shipyard {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n  background-color: rgba(56, 118, 217, 0.4);\n  padding: 10px;\n  width: 38vw;\n  min-height: 15vw;\n  border: 1px dashed black;\n  border-radius: 8px;\n}\n\n.start {\n  background: #5e5df0;\n  border-radius: 99px;\n  box-shadow: #5e5df0 0 10px 20px -10px;\n  box-sizing: border-box;\n  color: #ffffff;\n  cursor: pointer;\n  font-family: Inter, Helvetica, \"Apple Color Emoji\", \"Segoe UI Emoji\",\n    NotoColorEmoji, \"Noto Color Emoji\", \"Segoe UI Symbol\", \"Android Emoji\",\n    EmojiSymbols, -apple-system, system-ui, \"Segoe UI\", Roboto, \"Helvetica Neue\",\n    \"Noto Sans\", sans-serif;\n  font-weight: 700;\n  line-height: 24px;\n  padding: 8px 18px;\n  user-select: none;\n  -webkit-user-select: none;\n  touch-action: manipulation;\n  width: fit-content;\n  word-break: break-word;\n  border: 0;\n}\n\n.start:disabled {\n  opacity: 0;\n  cursor: auto;\n}\n\n.message {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.2rem;\n  font-weight: 500;\n  text-align: center;\n  border: 1px solid black;\n  border-radius: 5px;\n  width: 20rem;\n  height: 4rem;\n}\n\n.board-row {\n  display: flex;\n}\n\n.board-cell {\n  opacity: 0.9;\n  flex: 1;\n  width: 1rem;\n  height: 1rem;\n  border: 0.1px dotted #ccc;\n  border-radius: 3px;\n  background-color: #1b95e0;\n  cursor: url(\"crosshair.png\") 12 12, crosshair;\n}\n\n.ship {\n  background-color: grey;\n  height: 1rem;\n  border: 1px solid #1b95e0;\n\n  border-radius: 1px;\n}\n\n.enemy-ship {\n  background-color: #1b95e0;\n  height: 1rem;\n  border: 0.1px dotted #ccc;\n}\n\n.draggable {\n  cursor: move;\n}\n\n.dragging {\n  opacity: 0.5;\n}\n\n.highlighted {\n  opacity: 0.5;\n}\n\n/* [data-ship-type=\"carrier\"] {\n  background-color: #222 !important;\n  border-radius: 6px;\n  position: relative;\n} */\n\n/* [data-ship-type=\"carrier\"]::before {\n  content: \"\";\n  width: 80%;\n  height: 60%;\n  background: #ccc;\n  position: absolute;\n  top: 10%;\n  left: 10%;\n}\n\n[data-ship-type=\"carrier\"]::after {\n  content: \"\";\n  width: 20px;\n  height: 10px;\n  background: #555;\n  position: absolute;\n  top: 10%;\n  left: 50%;\n  transform: translateX(-50%);\n} */\n\n/* [data-ship-type=\"destroyer\"] {\n  background-color: #222 !important;\n  border-radius: 10px;\n  position: absolute;\n} */\n\n.carrier {\n  width: 12rem;\n}\n\n.battleship {\n  width: 9rem;\n}\n\n.destroyer {\n  width: 7rem;\n}\n\n.submarine {\n  width: 7rem;\n}\n\n.patrolBoat {\n  width: 4.5rem;\n}\n\n.hit,\n.sunk {\n  background-color: red;\n  border-radius: 100%;\n}\n\n.sunk::before {\n  content: \"X\";\n  color: rgb(211, 9, 50);\n  border-radius: 10px;\n  position: relative;\n  bottom: 20%;\n  left: 20%;\n}\n\n.miss {\n  background-color: white;\n}\n\n.player1 {\n  margin-bottom: 50px;\n}\n"],"sourceRoot":""}]);
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

module.exports = __webpack_require__.p + "ace94197c76a584559ce.png";

/***/ }),

/***/ "./src/wallpaper.jpg":
/*!***************************!*\
  !*** ./src/wallpaper.jpg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7f368c4054e95139dcde.jpg";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GLHlDQUF5QyxzRkFBK0I7QUFDeEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG1DQUFtQztBQUNuRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyx1RkFBdUYsS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsTUFBTSxNQUFNLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFB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VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOzs7OztXQ3JCQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc3R5bGVzLmNzcz80NGIyIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBmb3JtYXQgKi9cblxuaW1wb3J0IHtcbiAgcGxheWVyMSxcbiAgcGxheWVyMixcbiAgcGxheWVyMUJvYXJkLFxuICBwbGF5ZXIyQm9hcmQsXG4gIHAxQm9hcmRJbnN0YW5jZSxcbiAgcDFnYW1lQm9hcmQsXG4gIHAyZ2FtZUJvYXJkLFxuICBtZXNzYWdlQm94LFxufSBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyByZW5kZXJHYW1lQm9hcmQgfSBmcm9tIFwiLi9yZW5kZXJcIjtcblxubGV0IGN1cnJlbnRQbGF5ZXIgPSBcIkh1bWFuXCI7XG5cbmNvbnN0IHNoaXAgPSAodHlwZSwgbGVuZ3RoLCBoaXRDb3VudCwgc2lua1N0YXR1cywgaXNWZXJ0aWNhbCkgPT4ge1xuICBjb25zdCBoaXQgPSAoc2hpcCkgPT4ge1xuICAgIHNoaXAuaGl0Q291bnQrKztcbiAgICByZXR1cm4gc2hpcC5oaXRDb3VudDtcbiAgfTtcbiAgY29uc3QgaXNTdW5rID0gKHNoaXApID0+IHtcbiAgICBpZiAoc2hpcC5oaXRDb3VudCA9PT0gc2hpcC5sZW5ndGgpIHtcbiAgICAgIHNoaXAuc2lua1N0YXR1cyA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzaGlwLnNpbmtTdGF0dXM7XG4gIH07XG5cbiAgcmV0dXJuIHsgdHlwZSwgbGVuZ3RoLCBoaXRDb3VudCwgc2lua1N0YXR1cywgaGl0LCBpc1N1bmssIGlzVmVydGljYWwgfTtcbn07XG5cbmNvbnN0IGdhbWVCb2FyZCA9IChncmlkU2l6ZSkgPT4ge1xuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBib2FyZCA9IG5ldyBBcnJheShncmlkU2l6ZSlcbiAgICAgIC5maWxsKG51bGwpXG4gICAgICAubWFwKCgpID0+IG5ldyBBcnJheShncmlkU2l6ZSkuZmlsbChcIndhdGVyXCIpKTtcbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgcmVzZXRCb2FyZCA9ICgpID0+IHtcbiAgICAvL05vdCBiZWluZyB1c2VkIGN1cnJlbnRseVxuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICB0aGlzLmJvYXJkID0gdGhpcy5jcmVhdGVCb2FyZCgpO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChib2FyZCwgc2hpcCwgc3RhcnRpbmdSb3csIHN0YXJ0aW5nQ29sKSA9PiB7XG4gICAgY29uc3QgaXNWZXJ0aWNhbCA9IHNoaXAuaXNWZXJ0aWNhbDtcbiAgICBjb25zdCBzaGlwTGVuZ3RoID0gc2hpcC5sZW5ndGg7XG4gICAgc2hpcC5zdGFydGluZ1JvdyA9IHN0YXJ0aW5nUm93O1xuICAgIHNoaXAuc3RhcnRpbmdDb2wgPSBzdGFydGluZ0NvbDtcbiAgICAvL0NoZWNrIGlmIHNoaXAgcGxhY2VtZW50IGlzIGluIGJvdW5kc1xuICAgIGlmIChcbiAgICAgIChpc1ZlcnRpY2FsICYmIHN0YXJ0aW5nUm93ICsgc2hpcExlbmd0aCA+IGdyaWRTaXplKSB8fFxuICAgICAgKCFpc1ZlcnRpY2FsICYmIHN0YXJ0aW5nQ29sICsgc2hpcExlbmd0aCA+IGdyaWRTaXplKVxuICAgICkge1xuICAgICAgcmV0dXJuIG51bGw7IC8vIEludmFsaWQgcGxhY2VtZW50XG4gICAgfVxuXG4gICAgLy9DaGVjayBpZiBjZWxscyBhcmUgYWxyZWFkeSBvY2N1cGllZFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgICBpZiAoYm9hcmRbc3RhcnRpbmdSb3cgKyBpXVtzdGFydGluZ0NvbF0gIT09IFwid2F0ZXJcIikge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYm9hcmRbc3RhcnRpbmdSb3ddW3N0YXJ0aW5nQ29sICsgaV0gIT09IFwid2F0ZXJcIikge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9vdGhlcndpc2UgdmFsaWQsIHNvIHBsYWNlIHNoaXBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgICAgYm9hcmRbc3RhcnRpbmdSb3cgKyBpXVtzdGFydGluZ0NvbF0gPSBzaGlwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmRbc3RhcnRpbmdSb3ddW3N0YXJ0aW5nQ29sICsgaV0gPSBzaGlwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBib2FyZDtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sLCBib2FyZCwgc2hpcHMpID0+IHtcbiAgICBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIndhdGVyXCIpIHtcbiAgICAgIGJvYXJkW3Jvd11bY29sXSA9IFwiTUlTU1wiO1xuICAgICAgcmV0dXJuIFwiTUlTU1wiO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvYXJkW3Jvd11bY29sXS5oaXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY29uc3Qgc2hpcCA9IGJvYXJkW3Jvd11bY29sXTtcbiAgICAgIHNoaXAuaGl0KHNoaXApO1xuXG4gICAgICBpZiAoc2hpcC5pc1N1bmsoc2hpcCkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHNoaXAuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgYm9hcmRbc2hpcC5zdGFydGluZ1JvdyArIGldW3NoaXAuc3RhcnRpbmdDb2xdID0gXCJTVU5LXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvYXJkW3NoaXAuc3RhcnRpbmdSb3ddW3NoaXAuc3RhcnRpbmdDb2wgKyBpXSA9IFwiU1VOS1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaGVja0ZvcldpbihzaGlwcyk7XG4gICAgICAgIHJldHVybiBcIlNVTktcIjtcbiAgICAgIH1cbiAgICAgIGJvYXJkW3Jvd11bY29sXSA9IFwiSElUXCI7XG4gICAgICBjaGVja0ZvcldpbihzaGlwcyk7XG5cbiAgICAgIHJldHVybiBcIkhJVFwiO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja0ZvcldpbiA9IChzaGlwcykgPT4ge1xuICAgIC8vY2FsbGVkIGFmdGVyIGVhY2ggdHVyblxuICAgIGNvbnN0IGFsbFNoaXBzU3VuayA9IHNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLnNpbmtTdGF0dXMpO1xuXG4gICAgaWYgKGFsbFNoaXBzU3Vuaykge1xuICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgIC8vZW5kIGdhbWUgbG9vcCBhbmQgdXBkYXRlIFVJXG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4geyBjcmVhdGVCb2FyZCwgcmVzZXRCb2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBjaGVja0ZvcldpbiB9O1xufTtcblxuY29uc3QgcGxheWVyID0gKG5hbWUsIGJvYXJkLCB0eXBlLCBzaGlwcykgPT4ge1xuICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTsgLy9jaGFuZ2UgdG8gaW5wdXQgYWZ0ZXIgVUkgY3JlYXRlZFxuXG4gIGNvbnN0IGdldFR5cGUgPSAoKSA9PiB0eXBlOyAvL0h1bWFuIG9yIEFJXG5cbiAgY29uc3QgZ2V0QWlDaG9pY2UgPSAoKSA9PiB7XG4gICAgLy9USElTIElTIFZFUlkgU0xPVyAtIFVQREFURSEgaW5pdGlhbGlzZSBvdXRzaWRlIG9mIGZhY3Rvcnk/XG4gICAgY29uc3QgYXZhaWxhYmxlU3BvdHMgPSBbXTtcblxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgYm9hcmQubGVuZ3RoOyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgYm9hcmRbeF0ubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGJvYXJkW3hdW3ldICE9PSBcIk1JU1NcIiAmJlxuICAgICAgICAgIGJvYXJkW3hdW3ldICE9PSBcIkhJVFwiICYmXG4gICAgICAgICAgYm9hcmRbeF1beV0gIT09IFwiU1VOS1wiXG4gICAgICAgICkge1xuICAgICAgICAgIGF2YWlsYWJsZVNwb3RzLnB1c2goeyB4LCB5IH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlU3BvdHMubGVuZ3RoKTtcbiAgICBjb25zdCBhaUNob2ljZSA9IGF2YWlsYWJsZVNwb3RzW3JhbmRvbUluZGV4XTtcbiAgICByZXR1cm4gYWlDaG9pY2U7XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrID0gKGVuZW15LCB4LCB5KSA9PiB7XG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT09IFwiSHVtYW5cIikge1xuICAgICAgY29uc3QgZW5lbXlCb2FyZCA9IHAxQm9hcmRJbnN0YW5jZTtcbiAgICAgIGNvbnN0IGF0dGFja1Jlc3VsdCA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgZW5lbXkuYm9hcmQsXG4gICAgICAgIGVuZW15LnNoaXBzXG4gICAgICApO1xuXG4gICAgICAvL1RvIFVwZGF0ZSBtZXNzYWdlcyB0byBkaXNwbGF5IHdoaWNoIHNoaXAgaXMgc3Vua1xuICAgICAgaWYgKGF0dGFja1Jlc3VsdCA9PSBcIkhJVFwiKSB7XG4gICAgICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBgWW91J3ZlIGdvdCBhICR7YXR0YWNrUmVzdWx0fSFgO1xuICAgICAgfVxuICAgICAgaWYgKGF0dGFja1Jlc3VsdCA9PSBcIk1JU1NcIikge1xuICAgICAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gYFlvdSBNaXNzZWRgO1xuICAgICAgfVxuICAgICAgaWYgKGF0dGFja1Jlc3VsdCA9PSBcIlNVTktcIikge1xuICAgICAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gYEJPT00hIFlvdSBzdW5rIGNvbXB1dGVycyBzaGlwYDtcbiAgICAgIH1cblxuICAgICAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjJCb2FyZCwgcDJnYW1lQm9hcmQpO1xuICAgICAgY29uc3QgYWxsUDJzaGlwc1N1bmsgPSBlbmVteS5zaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5zaW5rU3RhdHVzKTtcblxuICAgICAgLy9jb21wdXRlcnMgdHVybiBpZiBub3QgYWxsIHN1bmtcbiAgICAgIGlmICghYWxsUDJzaGlwc1N1bmspIHtcbiAgICAgICAgY3VycmVudFBsYXllciA9IFwiQ29tcHV0ZXJcIjtcbiAgICAgICAgZnVuY3Rpb24gbWFrZUFpTW92ZSgpIHtcbiAgICAgICAgICBjb25zdCBhaUNob2ljZSA9IGdldEFpQ2hvaWNlKCk7XG4gICAgICAgICAgY29uc3QgYWlBdHRhY2tSZXN1bHQgPSBwMUJvYXJkSW5zdGFuY2UucmVjZWl2ZUF0dGFjayhcbiAgICAgICAgICAgIGFpQ2hvaWNlLngsXG4gICAgICAgICAgICBhaUNob2ljZS55LFxuICAgICAgICAgICAgcGxheWVyMS5ib2FyZCxcbiAgICAgICAgICAgIHBsYXllcjEuc2hpcHNcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy9UbyBVcGRhdGUgbWVzc2FnZXMgdG8gZGlzcGxheSB3aGljaCBzaGlwIGlzIHN1bmtcbiAgICAgICAgICBpZiAoYWlBdHRhY2tSZXN1bHQgPT0gXCJISVRcIikge1xuICAgICAgICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IGBUaGV5J3ZlIGdvdCBhICR7YWlBdHRhY2tSZXN1bHR9IWA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhaUF0dGFja1Jlc3VsdCA9PSBcIk1JU1NcIikge1xuICAgICAgICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IGBUaGV5IE1pc3NlZCFgO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYWlBdHRhY2tSZXN1bHQgPT0gXCJTVU5LXCIpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBgQk9PTSEgQ29tcHV0ZXIgc3VuayB5b3VyIHNoaXAhYDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZW5kZXJHYW1lQm9hcmQocGxheWVyMUJvYXJkLCBwMWdhbWVCb2FyZCk7XG4gICAgICAgICAgY3VycmVudFBsYXllciA9IFwiSHVtYW5cIjtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KG1ha2VBaU1vdmUsIDcwMCk7IC8vMC44cyBkZWxheSBiZXR3ZWVuIHR1cm5zXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy91cGRhdGVUdXJuTWVzc2FnZSgpO1xuICAgIHJldHVybiByZW5kZXJHYW1lQm9hcmQ7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIGJvYXJkLFxuICAgIHR5cGUsXG4gICAgZ2V0TmFtZSxcbiAgICBnZXRUeXBlLFxuICAgIGF0dGFjayxcbiAgICBnZXRBaUNob2ljZSxcbiAgICBzaGlwcyxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IHNoaXAsIGdhbWVCb2FyZCwgcGxheWVyIH07XG4iLCIvKiogQGZvcm1hdCAqL1xucmVxdWlyZShcIi4vc3R5bGVzLmNzc1wiKTtcblxuaW1wb3J0IHsgc2hpcCwgZ2FtZUJvYXJkLCBwbGF5ZXIgfSBmcm9tIFwiLi9nYW1lLmpzXCI7XG5pbXBvcnQgeyByZW5kZXJHYW1lQm9hcmQgfSBmcm9tIFwiLi9yZW5kZXIuanNcIjtcbmltcG9ydCBiYWNrZ3JvdW5kSW1hZ2UgZnJvbSBcIi4vd2FsbHBhcGVyLmpwZ1wiO1xuY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpblwiKTtcbmxldCBwbGF5ZXJOYW1lO1xuXG4vL1NwbGFzaCBTY3JlZW5cbihmdW5jdGlvbiBzcGxhc2hTY3JlZW4oKSB7XG4gIG1haW4uY2xhc3NMaXN0LmFkZChcImxvYWRcIik7XG5cbiAgLy9jb250YWluZXJcbiAgY29uc3Qgc3BsYXNoU2NyZWVuQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc3BsYXNoU2NyZWVuQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb250YWluZXJcIik7XG5cbiAgLy9UaXRsZVxuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0aXRsZVwiKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkJBVFRMRVNISVBTXCI7XG5cbiAgLy9OYW1lIElucHV0XG4gIGNvbnN0IG5hbWVQcm9tcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIG5hbWVQcm9tcHQuY2xhc3NMaXN0LmFkZChcIm5hbWVJbnB1dFwiKTtcbiAgbmFtZVByb21wdC5wbGFjZWhvbGRlciA9IFwiRW50ZXIgWW91ciBOYW1lXCI7XG4gIG5hbWVQcm9tcHQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHVwZGF0ZU5hbWUpO1xuXG4gIC8vR2FtZUJ1dHRvblxuICBjb25zdCBtYWluQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgbWFpbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwic3RhcnRcIik7XG4gIG1haW5CdXR0b24udGV4dENvbnRlbnQgPSBcIlNUQVJUIEdBTUVcIjtcbiAgbWFpbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbG9hZEdhbWUpO1xuXG4gIC8vQXBwZW5kIEVsZW1lbnRzXG4gIHNwbGFzaFNjcmVlbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIHNwbGFzaFNjcmVlbkNvbnRhaW5lci5hcHBlbmRDaGlsZChuYW1lUHJvbXB0KTtcbiAgc3BsYXNoU2NyZWVuQ29udGFpbmVyLmFwcGVuZENoaWxkKG1haW5CdXR0b24pO1xuICBtYWluLmFwcGVuZENoaWxkKHNwbGFzaFNjcmVlbkNvbnRhaW5lcik7XG59KSgpO1xuXG5mdW5jdGlvbiB1cGRhdGVOYW1lKGUpIHtcbiAgcGxheWVyTmFtZSA9IGUudGFyZ2V0LnZhbHVlO1xuICBjb25zb2xlLmxvZyhwbGF5ZXJOYW1lKTtcbn1cblxuZnVuY3Rpb24gbG9hZEdhbWUoKSB7XG4gIG1haW4udGV4dENvbnRlbnQgPSBcIlwiO1xuICBzZXRVcERvbSgpO1xuICBpbml0aWFsaXNlKCk7XG59XG5cbmNvbnN0IGJhY2tncm91bmRJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhY2tncm91bmQtaW1nXCIpO1xuYmFja2dyb3VuZEltZy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7YmFja2dyb3VuZEltYWdlfSlgO1xuXG4vL0dsb2JhbCBHYW1lIHN0YXRlIHZhcmlhYmxlcyAtLSBUbyByZWZhY3RvciAmIEVuY2Fwc3VsYXRlXG5sZXQgZ2FtZUFjdGl2ZSA9IGZhbHNlO1xubGV0IHJlc3RhcnRhYmxlID0gZmFsc2U7XG5sZXQgZHJvcHBlZEFycmF5ID0gW107XG5sZXQgbm90RHJvcHBlZDtcbmxldCBwMWNhcnJpZXIsIHAxYmF0dGxlc2hpcCwgcDFkZXN0cm95ZXIsIHAxc3VibWFyaW5lLCBwMXBhdHJvbEJvYXQ7XG5sZXQgcDJjYXJyaWVyLCBwMmJhdHRsZXNoaXAsIHAyZGVzdHJveWVyLCBwMnN1Ym1hcmluZSwgcDJwYXRyb2xCb2F0O1xubGV0IHAxQWxsU2hpcHMsIHAyQWxsU2hpcHM7XG5sZXQgZHJhZ2dlZFNoaXA7XG5sZXQgZ3JpZFNpemUgPSAxMDtcbmxldCBwMUJvYXJkSW5zdGFuY2UgPSBnYW1lQm9hcmQoZ3JpZFNpemUpO1xubGV0IHBsYXllcjFCb2FyZCA9IHAxQm9hcmRJbnN0YW5jZS5jcmVhdGVCb2FyZCgpO1xubGV0IHAyQm9hcmRJbnN0YW5jZSA9IGdhbWVCb2FyZChncmlkU2l6ZSk7XG5sZXQgcGxheWVyMkJvYXJkID0gcDJCb2FyZEluc3RhbmNlLmNyZWF0ZUJvYXJkKCk7XG5sZXQgcGxheWVyMTtcbmxldCBwbGF5ZXIyO1xubGV0IHAxZ2FtZUJvYXJkLCBwMmdhbWVCb2FyZDtcbmxldCBzaGlweWFyZFNoaXBzO1xubGV0IHN0YXJ0R2FtZUJ1dHRvbjtcbmxldCBtZXNzYWdlQm94O1xuXG5mdW5jdGlvbiBzZXRVcERvbSgpIHtcbiAgLy9nYW1lQ29udGFpbmVyXG4gIGNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBnYW1lQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZ2FtZS1jb250YWluZXJcIik7XG5cbiAgLy9JbmZvIHNlY3Rpb25cbiAgY29uc3QgaW5mb1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBpbmZvU2VjdGlvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImluZm9cIik7XG5cbiAgLy9TdGFydCBidXR0b25cbiAgc3RhcnRHYW1lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgc3RhcnRHYW1lQnV0dG9uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic3RhcnQtYnV0dG9uXCIpO1xuICBzdGFydEdhbWVCdXR0b24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzdGFydFwiKTtcbiAgc3RhcnRHYW1lQnV0dG9uLnRleHRDb250ZW50ID0gXCJQcmVzcyB0byBTdGFydFwiO1xuICBpbmZvU2VjdGlvbi5hcHBlbmRDaGlsZChzdGFydEdhbWVCdXR0b24pO1xuXG4gIC8vTWVzc2FnZSBib3hcbiAgbWVzc2FnZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBcIlRpbWUgZm9yIHdhciwgcGxhY2UgeW91ciBzaGlwcyFcIjtcbiAgbWVzc2FnZUJveC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1lc3NhZ2VcIik7XG4gIGluZm9TZWN0aW9uLmFwcGVuZENoaWxkKG1lc3NhZ2VCb3gpO1xuXG4gIC8vR2FtZWJvYXJkc1xuICBjb25zdCBwbGF5ZXIxTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblxuICBwMWdhbWVCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHAxZ2FtZUJvYXJkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicGxheWVyMS1ib2FyZFwiKTtcbiAgcDFnYW1lQm9hcmQuYXBwZW5kQ2hpbGQocGxheWVyMUxhYmVsKTtcbiAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwMWdhbWVCb2FyZCk7XG4gIGNvbnN0IHBsYXllcjJMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXG4gIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVyMkxhYmVsKTtcbiAgcDJnYW1lQm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwMmdhbWVCb2FyZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInBsYXllcjItYm9hcmRcIik7XG4gIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQocDJnYW1lQm9hcmQpO1xuXG4gIC8vc2hpcHlhcmQgY29udGFpbmVyXG4gIGNvbnN0IHNoaXB5YXJkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2hpcHlhcmRDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlweWFyZENvbnRhaW5lclwiKTtcblxuICAvL3NoaXB5YXJkIGxhYmVsXG4gIGNvbnN0IHNoaXB5YXJkTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlweWFyZExhYmVsLnRleHRDb250ZW50ID0gXCJZb3VyIFNoaXB5YXJkXCI7XG4gIHNoaXB5YXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHNoaXB5YXJkTGFiZWwpO1xuXG4gIC8vU2hpcHlhcmRcbiAgY29uc3Qgc2hpcHlhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlweWFyZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXB5YXJkXCIpO1xuICBzaGlweWFyZENvbnRhaW5lci5hcHBlbmRDaGlsZChzaGlweWFyZCk7XG4gIHNoaXB5YXJkLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAvLzFcbiAgY29uc3Qgc2hpcDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gIHNoaXAxLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcC10eXBlXCIsIFwiY2FycmllclwiKTtcbiAgc2hpcDEuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCIwXCIpO1xuICBzaGlwMS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIGNhcnJpZXJcIik7XG4gIHNoaXAxLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gIHNoaXB5YXJkLmFwcGVuZENoaWxkKHNoaXAxKTtcblxuICAvLzJcbiAgY29uc3Qgc2hpcDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwMi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXAtdHlwZVwiLCBcImRlc3Ryb3llclwiKTtcbiAgc2hpcDIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCIxXCIpO1xuICBzaGlwMi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIGRlc3Ryb3llclwiKTtcbiAgc2hpcDIuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcbiAgc2hpcHlhcmQuYXBwZW5kQ2hpbGQoc2hpcDIpO1xuXG4gIC8vM1xuICBjb25zdCBzaGlwMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXAzLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcC10eXBlXCIsIFwiYmF0dGxlc2hpcFwiKTtcbiAgc2hpcDMuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCIyXCIpO1xuICBzaGlwMy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIGJhdHRsZXNoaXBcIik7XG4gIHNoaXAzLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gIHNoaXB5YXJkLmFwcGVuZENoaWxkKHNoaXAzKTtcblxuICAvLzRcbiAgY29uc3Qgc2hpcDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwNC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXAtdHlwZVwiLCBcInN1Ym1hcmluZVwiKTtcbiAgc2hpcDQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCIzXCIpO1xuICBzaGlwNC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIHN1Ym1hcmluZVwiKTtcbiAgc2hpcDQuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcbiAgc2hpcHlhcmQuYXBwZW5kQ2hpbGQoc2hpcDQpO1xuXG4gIC8vNVxuICBjb25zdCBzaGlwNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXA1LnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcC10eXBlXCIsIFwicGF0cm9sQm9hdFwiKTtcbiAgc2hpcDUuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCI0XCIpO1xuICBzaGlwNS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyYWdnYWJsZSBzaGlwIHBhdHJvbEJvYXRcIik7XG4gIHNoaXA1LnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gIHNoaXB5YXJkLmFwcGVuZENoaWxkKHNoaXA1KTtcblxuICBzaGlweWFyZFNoaXBzID0gW3NoaXAxLCBzaGlwMiwgc2hpcDMsIHNoaXA0LCBzaGlwNV07XG5cbiAgbWFpbi5hcHBlbmRDaGlsZChpbmZvU2VjdGlvbik7XG4gIG1haW4uYXBwZW5kQ2hpbGQoZ2FtZUNvbnRhaW5lcik7XG4gIG1haW4uYXBwZW5kQ2hpbGQoc2hpcHlhcmRDb250YWluZXIpO1xuXG4gIHJldHVybiB7XG4gICAgZ2FtZUNvbnRhaW5lcixcbiAgICBwMWdhbWVCb2FyZCxcbiAgICBwMmdhbWVCb2FyZCxcbiAgICBzdGFydEdhbWVCdXR0b24sXG4gICAgc2hpcHlhcmQsXG4gICAgc2hpcHlhcmRTaGlwcyxcbiAgICBtZXNzYWdlQm94LFxuICB9O1xufVxuXG5mdW5jdGlvbiBpbml0aWFsaXNlKCkge1xuICBwMWNhcnJpZXIgPSBzaGlwKFwiY2FycmllclwiLCA1LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gIHAxYmF0dGxlc2hpcCA9IHNoaXAoXCJiYXR0bGVzaGlwXCIsIDQsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAxZGVzdHJveWVyID0gc2hpcChcImRlc3Ryb3llclwiLCAzLCAwLCBmYWxzZSwgZmFsc2UpO1xuICBwMXN1Ym1hcmluZSA9IHNoaXAoXCJzdWJtYXJpbmVcIiwgMywgMCwgZmFsc2UsIGZhbHNlKTtcbiAgcDFwYXRyb2xCb2F0ID0gc2hpcChcInBhdHJvbEJvYXRcIiwgMiwgMCwgZmFsc2UsIGZhbHNlKTtcblxuICBwMUFsbFNoaXBzID0gW1xuICAgIHAxY2FycmllcixcbiAgICBwMWJhdHRsZXNoaXAsXG4gICAgcDFkZXN0cm95ZXIsXG4gICAgcDFzdWJtYXJpbmUsXG4gICAgcDFwYXRyb2xCb2F0LFxuICBdO1xuXG4gIHAyY2FycmllciA9IHNoaXAoXCJjYXJyaWVyXCIsIDUsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAyYmF0dGxlc2hpcCA9IHNoaXAoXCJiYXR0bGVzaGlwXCIsIDQsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAyZGVzdHJveWVyID0gc2hpcChcImRlc3Ryb3llclwiLCAzLCAwLCBmYWxzZSwgZmFsc2UpO1xuICBwMnN1Ym1hcmluZSA9IHNoaXAoXCJzdWJtYXJpbmVcIiwgMywgMCwgZmFsc2UsIGZhbHNlKTtcbiAgcDJwYXRyb2xCb2F0ID0gc2hpcChcInBhdHJvbEJvYXRcIiwgMiwgMCwgZmFsc2UsIGZhbHNlKTtcblxuICBwMkFsbFNoaXBzID0gW1xuICAgIHAyY2FycmllcixcbiAgICBwMmRlc3Ryb3llcixcbiAgICBwMmJhdHRsZXNoaXAsXG4gICAgcDJzdWJtYXJpbmUsXG4gICAgcDJwYXRyb2xCb2F0LFxuICBdO1xuXG4gIC8vTWFrZSBQbGF5ZXJzXG4gIHBsYXllcjEgPSBwbGF5ZXIoXG4gICAgXCJQbGF5ZXIgMVwiLFxuICAgIHBsYXllcjFCb2FyZCxcbiAgICBcIkh1bWFuXCIsXG4gICAgcDFBbGxTaGlwcyxcbiAgICBwMUJvYXJkSW5zdGFuY2VcbiAgKTtcblxuICBwbGF5ZXIyID0gcGxheWVyKFwiQ29tcHV0ZXJcIiwgcGxheWVyMkJvYXJkLCBcIkFJXCIsIHAyQWxsU2hpcHMsIHAyQm9hcmRJbnN0YW5jZSk7XG5cbiAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjFCb2FyZCwgcDFnYW1lQm9hcmQpO1xuICByZW5kZXJHYW1lQm9hcmQocGxheWVyMkJvYXJkLCBwMmdhbWVCb2FyZCk7XG5cbiAgLy9ldmVudCBsaXN0ZW5lcnNcbiAgc2V0dXBFdmVudExpc3RlbmVycyhwMWdhbWVCb2FyZCwgcDJnYW1lQm9hcmQpO1xuXG4gIHJldHVybiB7XG4gICAgcGxheWVyMSxcbiAgICBwbGF5ZXIxQm9hcmQsXG4gICAgcDFBbGxTaGlwcyxcbiAgICBwbGF5ZXIyLFxuICAgIHBsYXllcjJCb2FyZCxcbiAgICBwMkFsbFNoaXBzLFxuICB9O1xufVxuXG5mdW5jdGlvbiBzZXR1cEV2ZW50TGlzdGVuZXJzKHAxZ2FtZUJvYXJkLCBwMmdhbWVCb2FyZCkge1xuICBzaGlweWFyZFNoaXBzLmZvckVhY2goKGRyYWdnYWJsZSkgPT4ge1xuICAgIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWdTdGFydCk7XG4gICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIGRyYWdFbmQpO1xuICB9KTtcblxuICBwMWdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZHJhZ092ZXIpO1xuICBwMWdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBkcm9wU2hpcCk7XG5cbiAgcDJnYW1lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbGVjdFRhcmdldCk7XG4gIHAyZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgaG92ZXIpO1xuICBwMmdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgaG92ZXIpO1xuICBzdGFydEdhbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXJ0R2FtZSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZShzaGlweWFyZCkge1xuICBpZiAoXG4gICAgZHJvcHBlZEFycmF5Lmxlbmd0aCA+PSBwMUFsbFNoaXBzLmxlbmd0aCAmJlxuICAgIGdhbWVBY3RpdmUgPT0gZmFsc2UgJiZcbiAgICByZXN0YXJ0YWJsZSA9PSBmYWxzZVxuICApIHtcbiAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJTdGFydGluZywgdGFrZSB5b3VyIHNob3QhXCI7XG4gICAgZ2FtZUFjdGl2ZSA9IHRydWU7XG4gICAgcmVzdGFydGFibGUgPSBmYWxzZTtcbiAgICBzdGFydEdhbWVCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIHNoaXB5YXJkLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIHBsYWNlUDJTaGlwcygpO1xuICB9IGVsc2UgaWYgKGdhbWVBY3RpdmUgPT0gZmFsc2UgJiYgcmVzdGFydGFibGUgPT0gdHJ1ZSkge1xuICAgIHJlc2V0R2FtZSgpO1xuICB9IGVsc2Uge1xuICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBcIlBsYWNlIGFsbCBvZiB5b3VyIHNoaXBzIGZpcnN0XCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzZXRHYW1lKCkge1xuICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJSZXN0YXJ0aW5nLCBQbGFjZSB5b3VyIHNoaXBzIVwiO1xuICBzdGFydEdhbWVCdXR0b24udGV4dENvbnRlbnQgPSBcIlN0YXJ0IGdhbWVcIjtcbiAgLy9VcGRhdGUgZ2xvYmFsIHZhcmlhYmxlc1xuICByZXN0YXJ0YWJsZSA9IGZhbHNlO1xuICBnYW1lQWN0aXZlID0gZmFsc2U7XG4gIGRyb3BwZWRBcnJheSA9IFtdO1xuICBwMUJvYXJkSW5zdGFuY2UgPSBnYW1lQm9hcmQoZ3JpZFNpemUpO1xuICBwbGF5ZXIxQm9hcmQgPSBwMUJvYXJkSW5zdGFuY2UuY3JlYXRlQm9hcmQoKTtcbiAgcDJCb2FyZEluc3RhbmNlID0gZ2FtZUJvYXJkKGdyaWRTaXplKTtcbiAgcGxheWVyMkJvYXJkID0gcDJCb2FyZEluc3RhbmNlLmNyZWF0ZUJvYXJkKCk7XG4gIGluaXRpYWxpc2UoKTtcblxuICAvL2NsZWFyIHRoZSBkb21cbiAgbWFpbi50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgLy9TZXQgdXAgZXZlbnQgbGlzdGVuZXJzICYgcmVuZGVyXG4gIGNvbnN0IHsgcDFnYW1lQm9hcmQsIHAyZ2FtZUJvYXJkIH0gPSBzZXRVcERvbSgpO1xuXG4gIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIxQm9hcmQsIHAxZ2FtZUJvYXJkKTtcbiAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjJCb2FyZCwgcDJnYW1lQm9hcmQpO1xuICBzZXR1cEV2ZW50TGlzdGVuZXJzKHAxZ2FtZUJvYXJkLCBwMmdhbWVCb2FyZCk7XG59XG5cbmZ1bmN0aW9uIHBsYWNlUDJTaGlwcygpIHtcbiAgcDJCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIyQm9hcmQsIHAyY2FycmllciwgOSwgMSk7XG4gIHAyQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMkJvYXJkLCBwMmRlc3Ryb3llciwgMywgMyk7XG4gIHAyQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMkJvYXJkLCBwMmJhdHRsZXNoaXAsIDUsIDIpO1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJzdWJtYXJpbmUsIDIsIDEpO1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJwYXRyb2xCb2F0LCA2LCAwKTtcbiAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjJCb2FyZCwgcDJnYW1lQm9hcmQpO1xufVxuXG5mdW5jdGlvbiBkcmFnU3RhcnQoZSkge1xuICBkcmFnZ2VkU2hpcCA9IGUudGFyZ2V0O1xuICBkcmFnZ2VkU2hpcC5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dpbmdcIik7XG4gIG5vdERyb3BwZWQgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZHJhZ092ZXIoZSkge1xuICBub3REcm9wcGVkID0gZmFsc2U7XG5cbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBkcmFnRW5kKGUpIHtcbiAgZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LnJlbW92ZShcImRyYWdnaW5nXCIpO1xufVxuXG5mdW5jdGlvbiBkcm9wU2hpcChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3Qgc3RhcnRDb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuICBjb25zdCBzdGFydFJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCk7XG5cbiAgY29uc3QgdGhpc1NoaXAgPSBwMUFsbFNoaXBzW2RyYWdnZWRTaGlwLmlkXTtcbiAgY29uc3Qgc2hpcE5hbWUgPSBkcmFnZ2VkU2hpcC5kYXRhc2V0LnNoaXBUeXBlO1xuICBjb25zdCBwbGFjZW1lbnRSZXN1bHQgPSBwMUJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKFxuICAgIHBsYXllcjFCb2FyZCxcbiAgICB0aGlzU2hpcCxcbiAgICBzdGFydFJvdyxcbiAgICBzdGFydENvbFxuICApO1xuXG4gIGlmIChwbGFjZW1lbnRSZXN1bHQpIHtcbiAgICBkcm9wcGVkQXJyYXkucHVzaCh0aGlzU2hpcCk7XG4gICAgcDFCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIxQm9hcmQsIHRoaXNTaGlwLCBzdGFydFJvdywgc3RhcnRDb2wpO1xuICAgIGRyYWdnZWRTaGlwLnJlbW92ZSgpO1xuICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBgWW91J3ZlIHBsYWNlZCB5b3VyICR7c2hpcE5hbWV9YDtcbiAgfSBlbHNlIHtcbiAgICBub3REcm9wcGVkID0gdHJ1ZTtcbiAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJDYW4ndCBnbyB0aGVyZSwgdHJ5IGFnYWluIVwiO1xuICB9XG4gIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIxQm9hcmQsIHAxZ2FtZUJvYXJkKTtcbiAgZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LnJlbW92ZShcImRyYWdnaW5nXCIpO1xufVxuXG5mdW5jdGlvbiBzZWxlY3RUYXJnZXQoZSkge1xuICBpZiAoZ2FtZUFjdGl2ZSkge1xuICAgIGxldCBjZWxsID0gZS50YXJnZXQ7XG4gICAgaWYgKGNlbGwgJiYgIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGlzYWJsZWRcIikpIHtcbiAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGNlbGwuZGF0YXNldC5jb2wsIDEwKTtcbiAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGNlbGwuZGF0YXNldC5yb3csIDEwKTtcbiAgICAgIHBsYXllcjEuYXR0YWNrKHBsYXllcjIsIHJvdywgY29sKTtcbiAgICAgIHNldFRpbWVvdXQoaGFuZGxlUmVzdWx0VmFsaWRhdGlvbiwgODAwKTsgLy9TZXQgdGhpcyBsb25nZXIgdGhhbiB0aGUgbW92ZSBkZWxheVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBob3ZlcihlKSB7XG4gIGxldCBoaWdobGlnaHRlZENlbGwgPSBlLnRhcmdldDtcbiAgaGlnaGxpZ2h0ZWRDZWxsLmNsYXNzTGlzdC50b2dnbGUoXCJoaWdobGlnaHRlZFwiKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlUmVzdWx0VmFsaWRhdGlvbigpIHtcbiAgY29uc3QgaXNHYW1lV29uID0gcDJCb2FyZEluc3RhbmNlLmNoZWNrRm9yV2luKHBsYXllcjIuc2hpcHMpO1xuICBjb25zdCBpc0dhbWVMb3N0ID0gcDFCb2FyZEluc3RhbmNlLmNoZWNrRm9yV2luKHBsYXllcjEuc2hpcHMpO1xuXG4gIGlmIChpc0dhbWVXb24gfHwgaXNHYW1lTG9zdCkge1xuICAgIGdhbWVBY3RpdmUgPSBmYWxzZTtcblxuICAgIHN0YXJ0R2FtZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUmVzdGFydFwiO1xuICAgIHN0YXJ0R2FtZUJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHJlc3RhcnRhYmxlID0gdHJ1ZTtcbiAgICBwMmdhbWVCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VsZWN0VGFyZ2V0KTtcblxuICAgIGlmIChpc0dhbWVXb24pIHtcbiAgICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBcIkdhbWUgb3ZlciwgeW91IHdpbiFcIjtcbiAgICB9XG4gICAgaWYgKGlzR2FtZUxvc3QpIHtcbiAgICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBcIkdhbWUgb3ZlciwgeW91IExvc2UhXCI7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7XG4gIHBsYXllcjFCb2FyZCxcbiAgcGxheWVyMkJvYXJkLFxuICBwMWdhbWVCb2FyZCxcbiAgcDJnYW1lQm9hcmQsXG4gIHBsYXllcjEsXG4gIHBsYXllcjIsXG4gIHAxQm9hcmRJbnN0YW5jZSxcbiAgcDJCb2FyZEluc3RhbmNlLFxuICBtZXNzYWdlQm94LFxuICBwbGF5ZXJOYW1lLFxufTtcbiIsIi8qKiBAZm9ybWF0ICovXG5cbmltcG9ydCB7IHAxZ2FtZUJvYXJkLCBwbGF5ZXJOYW1lIH0gZnJvbSBcIi4vbWFpbi5qc1wiO1xuXG5jb25zdCByZW5kZXJHYW1lQm9hcmQgPSAoYm9hcmQsIGNvbnRhaW5lcikgPT4ge1xuICBjb25zdCBncmlkU2l6ZSA9IDEwO1xuICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICBjb25zdCBib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJvYXJkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1jb250YWluZXJcIik7XG4gIGJvYXJkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXG4gICAgY29udGFpbmVyID09PSBwMWdhbWVCb2FyZCA/IFwicGxheWVyMVwiIDogXCJwbGF5ZXIyXCJcbiAgKTtcbiAgY29uc3QgcGxheWVyMWxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIHBsYXllcjFsYWJlbC50ZXh0Q29udGVudCA9IHBsYXllck5hbWUgPyBwbGF5ZXJOYW1lIDogXCJZb3VcIjtcbiAgY29uc3QgcGxheWVyMmxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIHBsYXllcjJsYWJlbC50ZXh0Q29udGVudCA9IFwiQ29tcHV0ZXJcIjtcblxuICBpZiAoY29udGFpbmVyID09PSBwMWdhbWVCb2FyZCkge1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXIxbGFiZWwpO1xuICB9IGVsc2Uge1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXIybGFiZWwpO1xuICB9XG5cbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgZ3JpZFNpemU7IHJvdysrKSB7XG4gICAgY29uc3Qgcm93RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtcm93XCIpO1xuXG4gICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgZ3JpZFNpemU7IGNvbCsrKSB7XG4gICAgICBjb25zdCBjZWxsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtY2VsbFwiKTtcbiAgICAgIGNlbGxFbGVtZW50LmRhdGFzZXQucm93ID0gcm93O1xuICAgICAgY2VsbEVsZW1lbnQuZGF0YXNldC5jb2wgPSBjb2w7XG5cbiAgICAgIC8vc2V0IHN0eWxpbmcgYmFzZWQgb24gY2VsbCBjb250ZW50IGkuZS4gd2F0ZXIsIGhpdCwgc2hpcCwgbWlzc1xuICAgICAgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gXCJ3YXRlclwiKSB7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ3YXRlclwiKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvYXJkW3Jvd11bY29sXSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBpZiAoY29udGFpbmVyID09IHAxZ2FtZUJvYXJkKSB7XG4gICAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImVuZW15LXNoaXBcIik7XG4gICAgICAgIH1cbiAgICAgICAgY2VsbEVsZW1lbnQuZGF0YXNldC5zaGlwVHlwZSA9IGAke2JvYXJkW3Jvd11bY29sXS50eXBlfWA7XG4gICAgICB9IGVsc2UgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gXCJISVRcIikge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XG4gICAgICB9IGVsc2UgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gXCJNSVNTXCIpIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIlNVTktcIikge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic3Vua1wiKTtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xuICAgICAgfVxuICAgICAgcm93RWxlbWVudC5hcHBlbmRDaGlsZChjZWxsRWxlbWVudCk7XG4gICAgfVxuICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHJvd0VsZW1lbnQpO1xuICB9XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZENvbnRhaW5lcik7XG59O1xuXG5leHBvcnQgeyByZW5kZXJHYW1lQm9hcmQgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCJjcm9zc2hhaXIucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKiogQGZvcm1hdCAqL1xuXG46cm9vdCB7XG4gIGZvbnQtZmFtaWx5OiBcIllzYWJlYXUgU0NcIiwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBjb2xvcjogd2hpdGU7XG4gIC0tZGFyay1jeWFuOiAjMGU5NTk0O1xuICAtLXdoZWF0OiAjZjVkZmJiO1xuICAtLW1vdW50YmF0dGVuLXBpbms6ICM5NTgxOGQ7XG59XG5cbmh0bWwge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBvdmVyc2Nyb2xsLWJlaGF2aW9yOiBub25lO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbmJvZHkge1xuICBvdmVyZmxvdzogYXV0bztcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG5tYWluIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGhlaWdodDogMTAwdmg7XG59XG5cbi5iYWNrZ3JvdW5kLWltZyB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgb2JqZWN0LXBvc2l0aW9uOiBjZW50ZXI7XG4gIG9wYWNpdHk6IDAuNztcbiAgei1pbmRleDogLTE7XG59XG5cbi5jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4udGl0bGUge1xuICBjb2xvcjogYmxhY2s7XG4gIGZvbnQtZmFtaWx5OiBcIk5vdGFibGVcIiwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAycmVtO1xuICBmb250LXdlaWdodDogMzAwO1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG5pbnB1dCB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW46IDA7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLmRyYWdnYWJsZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmluZm8ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDVweDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmdhbWUtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgbWFyZ2luOiAzNXB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiA1MHB4O1xufVxuXG4ucGxheWVyMS1ib2FyZCxcbi5wbGF5ZXIyLWJvYXJkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY29sb3I6IGJsYWNrO1xufVxuXG4uYm9hcmQtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLnNoaXB5YXJkQ29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY29sb3I6IGJsYWNrO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uc2hpcHlhcmQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogNXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDU2LCAxMTgsIDIxNywgMC40KTtcbiAgcGFkZGluZzogMTBweDtcbiAgd2lkdGg6IDM4dnc7XG4gIG1pbi1oZWlnaHQ6IDE1dnc7XG4gIGJvcmRlcjogMXB4IGRhc2hlZCBibGFjaztcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xufVxuXG4uc3RhcnQge1xuICBiYWNrZ3JvdW5kOiAjNWU1ZGYwO1xuICBib3JkZXItcmFkaXVzOiA5OXB4O1xuICBib3gtc2hhZG93OiAjNWU1ZGYwIDAgMTBweCAyMHB4IC0xMHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LWZhbWlseTogSW50ZXIsIEhlbHZldGljYSwgXCJBcHBsZSBDb2xvciBFbW9qaVwiLCBcIlNlZ29lIFVJIEVtb2ppXCIsXG4gICAgTm90b0NvbG9yRW1vamksIFwiTm90byBDb2xvciBFbW9qaVwiLCBcIlNlZ29lIFVJIFN5bWJvbFwiLCBcIkFuZHJvaWQgRW1vamlcIixcbiAgICBFbW9qaVN5bWJvbHMsIC1hcHBsZS1zeXN0ZW0sIHN5c3RlbS11aSwgXCJTZWdvZSBVSVwiLCBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIixcbiAgICBcIk5vdG8gU2Fuc1wiLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogNzAwO1xuICBsaW5lLWhlaWdodDogMjRweDtcbiAgcGFkZGluZzogOHB4IDE4cHg7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuICB3b3JkLWJyZWFrOiBicmVhay13b3JkO1xuICBib3JkZXI6IDA7XG59XG5cbi5zdGFydDpkaXNhYmxlZCB7XG4gIG9wYWNpdHk6IDA7XG4gIGN1cnNvcjogYXV0bztcbn1cblxuLm1lc3NhZ2Uge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgd2lkdGg6IDIwcmVtO1xuICBoZWlnaHQ6IDRyZW07XG59XG5cbi5ib2FyZC1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4uYm9hcmQtY2VsbCB7XG4gIG9wYWNpdHk6IDAuOTtcbiAgZmxleDogMTtcbiAgd2lkdGg6IDFyZW07XG4gIGhlaWdodDogMXJlbTtcbiAgYm9yZGVyOiAwLjFweCBkb3R0ZWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWI5NWUwO1xuICBjdXJzb3I6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KSAxMiAxMiwgY3Jvc3NoYWlyO1xufVxuXG4uc2hpcCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG4gIGhlaWdodDogMXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzFiOTVlMDtcblxuICBib3JkZXItcmFkaXVzOiAxcHg7XG59XG5cbi5lbmVteS1zaGlwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFiOTVlMDtcbiAgaGVpZ2h0OiAxcmVtO1xuICBib3JkZXI6IDAuMXB4IGRvdHRlZCAjY2NjO1xufVxuXG4uZHJhZ2dhYmxlIHtcbiAgY3Vyc29yOiBtb3ZlO1xufVxuXG4uZHJhZ2dpbmcge1xuICBvcGFjaXR5OiAwLjU7XG59XG5cbi5oaWdobGlnaHRlZCB7XG4gIG9wYWNpdHk6IDAuNTtcbn1cblxuLyogW2RhdGEtc2hpcC10eXBlPVwiY2FycmllclwiXSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjIgIWltcG9ydGFudDtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59ICovXG5cbi8qIFtkYXRhLXNoaXAtdHlwZT1cImNhcnJpZXJcIl06OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHdpZHRoOiA4MCU7XG4gIGhlaWdodDogNjAlO1xuICBiYWNrZ3JvdW5kOiAjY2NjO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTAlO1xuICBsZWZ0OiAxMCU7XG59XG5cbltkYXRhLXNoaXAtdHlwZT1cImNhcnJpZXJcIl06OmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMTBweDtcbiAgYmFja2dyb3VuZDogIzU1NTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDEwJTtcbiAgbGVmdDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG59ICovXG5cbi8qIFtkYXRhLXNoaXAtdHlwZT1cImRlc3Ryb3llclwiXSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjIgIWltcG9ydGFudDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xufSAqL1xuXG4uY2FycmllciB7XG4gIHdpZHRoOiAxMnJlbTtcbn1cblxuLmJhdHRsZXNoaXAge1xuICB3aWR0aDogOXJlbTtcbn1cblxuLmRlc3Ryb3llciB7XG4gIHdpZHRoOiA3cmVtO1xufVxuXG4uc3VibWFyaW5lIHtcbiAgd2lkdGg6IDdyZW07XG59XG5cbi5wYXRyb2xCb2F0IHtcbiAgd2lkdGg6IDQuNXJlbTtcbn1cblxuLmhpdCxcbi5zdW5rIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xuICBib3JkZXItcmFkaXVzOiAxMDAlO1xufVxuXG4uc3Vuazo6YmVmb3JlIHtcbiAgY29udGVudDogXCJYXCI7XG4gIGNvbG9yOiByZ2IoMjExLCA5LCA1MCk7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm90dG9tOiAyMCU7XG4gIGxlZnQ6IDIwJTtcbn1cblxuLm1pc3Mge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuLnBsYXllcjEge1xuICBtYXJnaW4tYm90dG9tOiA1MHB4O1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSxhQUFhOztBQUViO0VBQ0UscUNBQXFDO0VBQ3JDLGVBQWU7RUFDZixZQUFZO0VBQ1osb0JBQW9CO0VBQ3BCLGdCQUFnQjtFQUNoQiwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIseUJBQXlCO0VBQ3pCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGNBQWM7RUFDZCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZUFBZTtFQUNmLE1BQU07RUFDTixPQUFPO0VBQ1AsV0FBVztFQUNYLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixrQ0FBa0M7RUFDbEMsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxhQUFhO0VBQ2IsWUFBWTtFQUNaLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixRQUFRO0VBQ1Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixZQUFZO0VBQ1osdUJBQXVCO0VBQ3ZCLFNBQVM7QUFDWDs7QUFFQTs7RUFFRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixlQUFlO0VBQ2YsUUFBUTtFQUNSLHlDQUF5QztFQUN6QyxhQUFhO0VBQ2IsV0FBVztFQUNYLGdCQUFnQjtFQUNoQix3QkFBd0I7RUFDeEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixxQ0FBcUM7RUFDckMsc0JBQXNCO0VBQ3RCLGNBQWM7RUFDZCxlQUFlO0VBQ2Y7OzsyQkFHeUI7RUFDekIsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLHlCQUF5QjtFQUN6QiwwQkFBMEI7RUFDMUIsa0JBQWtCO0VBQ2xCLHNCQUFzQjtFQUN0QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsWUFBWTtFQUNaLE9BQU87RUFDUCxXQUFXO0VBQ1gsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QixrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLGdFQUE2QztBQUMvQzs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1oseUJBQXlCOztFQUV6QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsWUFBWTtFQUNaLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTs7OztHQUlHOztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHOztBQUVIOzs7O0dBSUc7O0FBRUg7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7O0VBRUUscUJBQXFCO0VBQ3JCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsU0FBUztBQUNYOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qKiBAZm9ybWF0ICovXFxuXFxuOnJvb3Qge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJZc2FiZWF1IFNDXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIC0tZGFyay1jeWFuOiAjMGU5NTk0O1xcbiAgLS13aGVhdDogI2Y1ZGZiYjtcXG4gIC0tbW91bnRiYXR0ZW4tcGluazogIzk1ODE4ZDtcXG59XFxuXFxuaHRtbCB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgb3ZlcnNjcm9sbC1iZWhhdmlvcjogbm9uZTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuYm9keSB7XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxubWFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi5iYWNrZ3JvdW5kLWltZyB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXG4gIG9iamVjdC1wb3NpdGlvbjogY2VudGVyO1xcbiAgb3BhY2l0eTogMC43O1xcbiAgei1pbmRleDogLTE7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4udGl0bGUge1xcbiAgY29sb3I6IGJsYWNrO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJOb3RhYmxlXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbn1cXG5cXG5pbnB1dCB7XFxuICBmb250LXNpemU6IDFyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW46IDA7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG59XFxuXFxuLmRyYWdnYWJsZSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5pbmZvIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDVweDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uZ2FtZS1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIG1hcmdpbjogMzVweDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiA1MHB4O1xcbn1cXG5cXG4ucGxheWVyMS1ib2FyZCxcXG4ucGxheWVyMi1ib2FyZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcblxcbi5ib2FyZC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5zaGlweWFyZENvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogYmxhY2s7XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG5cXG4uc2hpcHlhcmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGdhcDogNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg1NiwgMTE4LCAyMTcsIDAuNCk7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgd2lkdGg6IDM4dnc7XFxuICBtaW4taGVpZ2h0OiAxNXZ3O1xcbiAgYm9yZGVyOiAxcHggZGFzaGVkIGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbn1cXG5cXG4uc3RhcnQge1xcbiAgYmFja2dyb3VuZDogIzVlNWRmMDtcXG4gIGJvcmRlci1yYWRpdXM6IDk5cHg7XFxuICBib3gtc2hhZG93OiAjNWU1ZGYwIDAgMTBweCAyMHB4IC0xMHB4O1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZm9udC1mYW1pbHk6IEludGVyLCBIZWx2ZXRpY2EsIFxcXCJBcHBsZSBDb2xvciBFbW9qaVxcXCIsIFxcXCJTZWdvZSBVSSBFbW9qaVxcXCIsXFxuICAgIE5vdG9Db2xvckVtb2ppLCBcXFwiTm90byBDb2xvciBFbW9qaVxcXCIsIFxcXCJTZWdvZSBVSSBTeW1ib2xcXFwiLCBcXFwiQW5kcm9pZCBFbW9qaVxcXCIsXFxuICAgIEVtb2ppU3ltYm9scywgLWFwcGxlLXN5c3RlbSwgc3lzdGVtLXVpLCBcXFwiU2Vnb2UgVUlcXFwiLCBSb2JvdG8sIFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsXFxuICAgIFxcXCJOb3RvIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgcGFkZGluZzogOHB4IDE4cHg7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XFxuICBib3JkZXI6IDA7XFxufVxcblxcbi5zdGFydDpkaXNhYmxlZCB7XFxuICBvcGFjaXR5OiAwO1xcbiAgY3Vyc29yOiBhdXRvO1xcbn1cXG5cXG4ubWVzc2FnZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICB3aWR0aDogMjByZW07XFxuICBoZWlnaHQ6IDRyZW07XFxufVxcblxcbi5ib2FyZC1yb3cge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLmJvYXJkLWNlbGwge1xcbiAgb3BhY2l0eTogMC45O1xcbiAgZmxleDogMTtcXG4gIHdpZHRoOiAxcmVtO1xcbiAgaGVpZ2h0OiAxcmVtO1xcbiAgYm9yZGVyOiAwLjFweCBkb3R0ZWQgI2NjYztcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxYjk1ZTA7XFxuICBjdXJzb3I6IHVybChcXFwiY3Jvc3NoYWlyLnBuZ1xcXCIpIDEyIDEyLCBjcm9zc2hhaXI7XFxufVxcblxcbi5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxuICBoZWlnaHQ6IDFyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWI5NWUwO1xcblxcbiAgYm9yZGVyLXJhZGl1czogMXB4O1xcbn1cXG5cXG4uZW5lbXktc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWI5NWUwO1xcbiAgaGVpZ2h0OiAxcmVtO1xcbiAgYm9yZGVyOiAwLjFweCBkb3R0ZWQgI2NjYztcXG59XFxuXFxuLmRyYWdnYWJsZSB7XFxuICBjdXJzb3I6IG1vdmU7XFxufVxcblxcbi5kcmFnZ2luZyB7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcblxcbi5oaWdobGlnaHRlZCB7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcblxcbi8qIFtkYXRhLXNoaXAtdHlwZT1cXFwiY2FycmllclxcXCJdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjIgIWltcG9ydGFudDtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59ICovXFxuXFxuLyogW2RhdGEtc2hpcC10eXBlPVxcXCJjYXJyaWVyXFxcIl06OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHdpZHRoOiA4MCU7XFxuICBoZWlnaHQ6IDYwJTtcXG4gIGJhY2tncm91bmQ6ICNjY2M7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDEwJTtcXG4gIGxlZnQ6IDEwJTtcXG59XFxuXFxuW2RhdGEtc2hpcC10eXBlPVxcXCJjYXJyaWVyXFxcIl06OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgd2lkdGg6IDIwcHg7XFxuICBoZWlnaHQ6IDEwcHg7XFxuICBiYWNrZ3JvdW5kOiAjNTU1O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAxMCU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XFxufSAqL1xcblxcbi8qIFtkYXRhLXNoaXAtdHlwZT1cXFwiZGVzdHJveWVyXFxcIl0ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIyMiAhaW1wb3J0YW50O1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG59ICovXFxuXFxuLmNhcnJpZXIge1xcbiAgd2lkdGg6IDEycmVtO1xcbn1cXG5cXG4uYmF0dGxlc2hpcCB7XFxuICB3aWR0aDogOXJlbTtcXG59XFxuXFxuLmRlc3Ryb3llciB7XFxuICB3aWR0aDogN3JlbTtcXG59XFxuXFxuLnN1Ym1hcmluZSB7XFxuICB3aWR0aDogN3JlbTtcXG59XFxuXFxuLnBhdHJvbEJvYXQge1xcbiAgd2lkdGg6IDQuNXJlbTtcXG59XFxuXFxuLmhpdCxcXG4uc3VuayB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxuICBib3JkZXItcmFkaXVzOiAxMDAlO1xcbn1cXG5cXG4uc3Vuazo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJYXFxcIjtcXG4gIGNvbG9yOiByZ2IoMjExLCA5LCA1MCk7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYm90dG9tOiAyMCU7XFxuICBsZWZ0OiAyMCU7XFxufVxcblxcbi5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4ucGxheWVyMSB7XFxuICBtYXJnaW4tYm90dG9tOiA1MHB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiaW5kZXhcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJwbGF5ZXIxIiwicGxheWVyMiIsInBsYXllcjFCb2FyZCIsInBsYXllcjJCb2FyZCIsInAxQm9hcmRJbnN0YW5jZSIsInAxZ2FtZUJvYXJkIiwicDJnYW1lQm9hcmQiLCJtZXNzYWdlQm94IiwicmVuZGVyR2FtZUJvYXJkIiwiY3VycmVudFBsYXllciIsInNoaXAiLCJ0eXBlIiwibGVuZ3RoIiwiaGl0Q291bnQiLCJzaW5rU3RhdHVzIiwiaXNWZXJ0aWNhbCIsImhpdCIsImlzU3VuayIsImdhbWVCb2FyZCIsImdyaWRTaXplIiwiY3JlYXRlQm9hcmQiLCJib2FyZCIsIkFycmF5IiwiZmlsbCIsIm1hcCIsInJlc2V0Qm9hcmQiLCJwbGFjZVNoaXAiLCJzdGFydGluZ1JvdyIsInN0YXJ0aW5nQ29sIiwic2hpcExlbmd0aCIsImkiLCJyZWNlaXZlQXR0YWNrIiwicm93IiwiY29sIiwic2hpcHMiLCJjaGVja0ZvcldpbiIsImFsbFNoaXBzU3VuayIsImV2ZXJ5IiwicGxheWVyIiwibmFtZSIsImdldE5hbWUiLCJnZXRUeXBlIiwiZ2V0QWlDaG9pY2UiLCJhdmFpbGFibGVTcG90cyIsIngiLCJ5IiwicHVzaCIsInJhbmRvbUluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiYWlDaG9pY2UiLCJhdHRhY2siLCJlbmVteSIsImVuZW15Qm9hcmQiLCJhdHRhY2tSZXN1bHQiLCJ0ZXh0Q29udGVudCIsImFsbFAyc2hpcHNTdW5rIiwibWFrZUFpTW92ZSIsImFpQXR0YWNrUmVzdWx0Iiwic2V0VGltZW91dCIsInJlcXVpcmUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJtYWluIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicGxheWVyTmFtZSIsInNwbGFzaFNjcmVlbiIsImNsYXNzTGlzdCIsImFkZCIsInNwbGFzaFNjcmVlbkNvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJ0aXRsZSIsIm5hbWVQcm9tcHQiLCJwbGFjZWhvbGRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1cGRhdGVOYW1lIiwibWFpbkJ1dHRvbiIsImxvYWRHYW1lIiwiYXBwZW5kQ2hpbGQiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwic2V0VXBEb20iLCJpbml0aWFsaXNlIiwiYmFja2dyb3VuZEltZyIsInN0eWxlIiwiZ2FtZUFjdGl2ZSIsInJlc3RhcnRhYmxlIiwiZHJvcHBlZEFycmF5Iiwibm90RHJvcHBlZCIsInAxY2FycmllciIsInAxYmF0dGxlc2hpcCIsInAxZGVzdHJveWVyIiwicDFzdWJtYXJpbmUiLCJwMXBhdHJvbEJvYXQiLCJwMmNhcnJpZXIiLCJwMmJhdHRsZXNoaXAiLCJwMmRlc3Ryb3llciIsInAyc3VibWFyaW5lIiwicDJwYXRyb2xCb2F0IiwicDFBbGxTaGlwcyIsInAyQWxsU2hpcHMiLCJkcmFnZ2VkU2hpcCIsInAyQm9hcmRJbnN0YW5jZSIsInNoaXB5YXJkU2hpcHMiLCJzdGFydEdhbWVCdXR0b24iLCJnYW1lQ29udGFpbmVyIiwic2V0QXR0cmlidXRlIiwiaW5mb1NlY3Rpb24iLCJwbGF5ZXIxTGFiZWwiLCJwbGF5ZXIyTGFiZWwiLCJzaGlweWFyZENvbnRhaW5lciIsInNoaXB5YXJkTGFiZWwiLCJzaGlweWFyZCIsInNoaXAxIiwic2hpcDIiLCJzaGlwMyIsInNoaXA0Iiwic2hpcDUiLCJzZXR1cEV2ZW50TGlzdGVuZXJzIiwiZm9yRWFjaCIsImRyYWdnYWJsZSIsImRyYWdTdGFydCIsImRyYWdFbmQiLCJkcmFnT3ZlciIsImRyb3BTaGlwIiwic2VsZWN0VGFyZ2V0IiwiaG92ZXIiLCJzdGFydEdhbWUiLCJkaXNhYmxlZCIsInBsYWNlUDJTaGlwcyIsInJlc2V0R2FtZSIsInByZXZlbnREZWZhdWx0IiwicmVtb3ZlIiwic3RhcnRDb2wiLCJwYXJzZUludCIsImRhdGFzZXQiLCJzdGFydFJvdyIsInRoaXNTaGlwIiwiaWQiLCJzaGlwTmFtZSIsInNoaXBUeXBlIiwicGxhY2VtZW50UmVzdWx0IiwiY2VsbCIsImNvbnRhaW5zIiwiaGFuZGxlUmVzdWx0VmFsaWRhdGlvbiIsImhpZ2hsaWdodGVkQ2VsbCIsInRvZ2dsZSIsImlzR2FtZVdvbiIsImlzR2FtZUxvc3QiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY29udGFpbmVyIiwiYm9hcmRDb250YWluZXIiLCJwbGF5ZXIxbGFiZWwiLCJwbGF5ZXIybGFiZWwiLCJyb3dFbGVtZW50IiwiY2VsbEVsZW1lbnQiXSwic291cmNlUm9vdCI6IiJ9