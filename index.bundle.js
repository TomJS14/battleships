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
/* harmony import */ var _shotSound_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shotSound.mp3 */ "./src/shotSound.mp3");
/** @format */
__webpack_require__(/*! ./styles.css */ "./src/styles.css");




const main = document.querySelector(".main");
let playerName;
const theShot = new Audio(_shotSound_mp3__WEBPACK_IMPORTED_MODULE_3__);
theShot.addEventListener("canplaythrough", () => {
  theShot.play().then(() => {}).catch(error => {
    console.log(error);
  });
});
console.log(theShot);

//

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
  theShot.play().then(() => {
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
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA,aAAa;;AAEb;EACE,qCAAqC;EACrC,eAAe;EACf,YAAY;EACZ,oBAAoB;EACpB,gBAAgB;EAChB,2BAA2B;AAC7B;;AAEA;EACE,gBAAgB;EAChB,yBAAyB;EACzB,YAAY;AACd;;AAEA;EACE,cAAc;EACd,YAAY;AACd;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,uBAAuB;EACvB,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,kCAAkC;EAClC,eAAe;EACf,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,SAAS;EACT,aAAa;EACb,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,QAAQ;EACR,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,uBAAuB;EACvB,SAAS;AACX;;AAEA;;EAEE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;EACZ,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,QAAQ;EACR,yCAAyC;EACzC,aAAa;EACb,WAAW;EACX,gBAAgB;EAChB,wBAAwB;EACxB,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,mBAAmB;EACnB,qCAAqC;EACrC,sBAAsB;EACtB,cAAc;EACd,eAAe;EACf;;;2BAGyB;EACzB,gBAAgB;EAChB,iBAAiB;EACjB,iBAAiB;EACjB,iBAAiB;EACjB,yBAAyB;EACzB,0BAA0B;EAC1B,kBAAkB;EAClB,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,UAAU;EACV,YAAY;AACd;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,iBAAiB;EACjB,gBAAgB;EAChB,kBAAkB;EAClB,uBAAuB;EACvB,kBAAkB;EAClB,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,OAAO;EACP,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,kBAAkB;EAClB,yBAAyB;EACzB,gEAA6C;AAC/C;;AAEA;EACE,sBAAsB;EACtB,YAAY;EACZ,yBAAyB;;EAEzB,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,YAAY;EACZ,yBAAyB;AAC3B;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;;;;GAIG;;AAEH;;;;;;;;;;;;;;;;;;;GAmBG;;AAEH;;;;GAIG;;AAEH;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,sBAAsB;EACtB,mBAAmB;EACnB,kBAAkB;EAClB,WAAW;EACX,SAAS;AACX;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,mBAAmB;AACrB","sourcesContent":["/** @format */\n\n:root {\n  font-family: \"Ysabeau SC\", sans-serif;\n  font-size: 24px;\n  color: white;\n  --dark-cyan: #0e9594;\n  --wheat: #f5dfbb;\n  --mountbatten-pink: #95818d;\n}\n\nhtml {\n  overflow: hidden;\n  overscroll-behavior: none;\n  height: 100%;\n}\n\nbody {\n  overflow: auto;\n  height: 100%;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n\n.background-img {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n  opacity: 0.7;\n  z-index: -1;\n}\n\n.container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.title {\n  color: black;\n  font-family: \"Notable\", sans-serif;\n  font-size: 2rem;\n  font-weight: 300;\n  margin-bottom: 20px;\n}\n\ninput {\n  font-size: 1rem;\n  text-align: center;\n  margin: 0;\n  outline: none;\n  border: none;\n  margin-bottom: 20px;\n}\n\n.draggable {\n  text-align: center;\n}\n\n.info {\n  display: flex;\n  gap: 5px;\n  flex-direction: column;\n  align-items: center;\n}\n\n.game-container {\n  display: flex;\n  margin: 35px;\n  justify-content: center;\n  gap: 50px;\n}\n\n.player1-board,\n.player2-board {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  color: black;\n}\n\n.board-container {\n  display: flex;\n  flex-direction: column;\n}\n\n.shipyardContainer {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  color: black;\n  font-weight: 700;\n}\n\n.shipyard {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n  background-color: rgba(56, 118, 217, 0.4);\n  padding: 10px;\n  width: 38vw;\n  min-height: 15vw;\n  border: 1px dashed black;\n  border-radius: 8px;\n}\n\n.start {\n  background: #5e5df0;\n  border-radius: 99px;\n  box-shadow: #5e5df0 0 10px 20px -10px;\n  box-sizing: border-box;\n  color: #ffffff;\n  cursor: pointer;\n  font-family: Inter, Helvetica, \"Apple Color Emoji\", \"Segoe UI Emoji\",\n    NotoColorEmoji, \"Noto Color Emoji\", \"Segoe UI Symbol\", \"Android Emoji\",\n    EmojiSymbols, -apple-system, system-ui, \"Segoe UI\", Roboto, \"Helvetica Neue\",\n    \"Noto Sans\", sans-serif;\n  font-weight: 700;\n  line-height: 24px;\n  padding: 8px 18px;\n  user-select: none;\n  -webkit-user-select: none;\n  touch-action: manipulation;\n  width: fit-content;\n  word-break: break-word;\n  border: 0;\n}\n\n.start:disabled {\n  opacity: 0;\n  cursor: auto;\n}\n\n.message {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.2rem;\n  font-weight: 500;\n  text-align: center;\n  border: 1px solid black;\n  border-radius: 5px;\n  width: 20rem;\n  height: 4rem;\n}\n\n.board-row {\n  display: flex;\n}\n\n.board-cell {\n  opacity: 0.9;\n  flex: 1;\n  width: 1rem;\n  height: 1rem;\n  border: 0.1px dotted #ccc;\n  border-radius: 3px;\n  background-color: #1b95e0;\n  cursor: url(\"crosshair.png\") 12 12, crosshair;\n}\n\n.ship {\n  background-color: grey;\n  height: 1rem;\n  border: 1px solid #1b95e0;\n\n  border-radius: 1px;\n}\n\n.enemy-ship {\n  background-color: #1b95e0;\n  height: 1rem;\n  border: 0.1px dotted #ccc;\n}\n\n.draggable {\n  cursor: move;\n}\n\n.dragging {\n  opacity: 0.5;\n}\n\n.highlighted {\n  opacity: 0.5;\n}\n\n/* [data-ship-type=\"carrier\"] {\n  background-color: #222 !important;\n  border-radius: 6px;\n  position: relative;\n} */\n\n/* [data-ship-type=\"carrier\"]::before {\n  content: \"\";\n  width: 80%;\n  height: 60%;\n  background: #ccc;\n  position: absolute;\n  top: 10%;\n  left: 10%;\n}\n\n[data-ship-type=\"carrier\"]::after {\n  content: \"\";\n  width: 20px;\n  height: 10px;\n  background: #555;\n  position: absolute;\n  top: 10%;\n  left: 50%;\n  transform: translateX(-50%);\n} */\n\n/* [data-ship-type=\"destroyer\"] {\n  background-color: #222 !important;\n  border-radius: 10px;\n  position: absolute;\n} */\n\n.carrier {\n  width: 12rem;\n}\n\n.destroyer {\n  width: 12rem;\n}\n\n.battleship {\n  width: 9rem;\n}\n\n.destroyer {\n  width: 7rem;\n}\n\n.submarine {\n  width: 7rem;\n}\n\n.patrolBoat {\n  width: 4.5rem;\n}\n\n.hit,\n.sunk {\n  background-color: red;\n  border-radius: 100%;\n}\n\n.sunk::before {\n  content: \"X\";\n  color: rgb(211, 9, 50);\n  border-radius: 10px;\n  position: relative;\n  bottom: 20%;\n  left: 20%;\n}\n\n.miss {\n  background-color: white;\n}\n\n.player1 {\n  margin-bottom: 50px;\n}\n"],"sourceRoot":""}]);
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

/***/ "./src/shotSound.mp3":
/*!***************************!*\
  !*** ./src/shotSound.mp3 ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d9de6e79cbf14593db3d.mp3";

/***/ }),

/***/ "./src/wallpaper.jpg":
/*!***************************!*\
  !*** ./src/wallpaper.jpg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6a9a57321b205f19508c.jpg";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixtQ0FBbUM7QUFDbkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLHVGQUF1RixLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxNQUFNLE1BQU0sVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxPQUFPLE9BQU8sYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLFFBQVEsTUFB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QTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDbEJBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7V0NyQkE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlcy5jc3M/NDRiMiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKiBAZm9ybWF0ICovXG5cbmltcG9ydCB7XG4gIHBsYXllcjEsXG4gIHBsYXllcjIsXG4gIHBsYXllcjFCb2FyZCxcbiAgcGxheWVyMkJvYXJkLFxuICBwMUJvYXJkSW5zdGFuY2UsXG4gIHAxZ2FtZUJvYXJkLFxuICBwMmdhbWVCb2FyZCxcbiAgbWVzc2FnZUJveCxcbn0gZnJvbSBcIi4vbWFpblwiO1xuaW1wb3J0IHsgcmVuZGVyR2FtZUJvYXJkIH0gZnJvbSBcIi4vcmVuZGVyXCI7XG5cbmxldCBjdXJyZW50UGxheWVyID0gXCJIdW1hblwiO1xuXG5jb25zdCBzaGlwID0gKHR5cGUsIGxlbmd0aCwgaGl0Q291bnQsIHNpbmtTdGF0dXMsIGlzVmVydGljYWwpID0+IHtcbiAgY29uc3QgaGl0ID0gKHNoaXApID0+IHtcbiAgICBzaGlwLmhpdENvdW50Kys7XG4gICAgcmV0dXJuIHNoaXAuaGl0Q291bnQ7XG4gIH07XG4gIGNvbnN0IGlzU3VuayA9IChzaGlwKSA9PiB7XG4gICAgaWYgKHNoaXAuaGl0Q291bnQgPT09IHNoaXAubGVuZ3RoKSB7XG4gICAgICBzaGlwLnNpbmtTdGF0dXMgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gc2hpcC5zaW5rU3RhdHVzO1xuICB9O1xuXG4gIHJldHVybiB7IHR5cGUsIGxlbmd0aCwgaGl0Q291bnQsIHNpbmtTdGF0dXMsIGhpdCwgaXNTdW5rLCBpc1ZlcnRpY2FsIH07XG59O1xuXG5jb25zdCBnYW1lQm9hcmQgPSAoZ3JpZFNpemUpID0+IHtcbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgYm9hcmQgPSBuZXcgQXJyYXkoZ3JpZFNpemUpXG4gICAgICAuZmlsbChudWxsKVxuICAgICAgLm1hcCgoKSA9PiBuZXcgQXJyYXkoZ3JpZFNpemUpLmZpbGwoXCJ3YXRlclwiKSk7XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9O1xuXG4gIGNvbnN0IHJlc2V0Qm9hcmQgPSAoKSA9PiB7XG4gICAgLy9Ob3QgYmVpbmcgdXNlZCBjdXJyZW50bHlcbiAgICB0aGlzLmJvYXJkID0gW107XG4gICAgdGhpcy5ib2FyZCA9IHRoaXMuY3JlYXRlQm9hcmQoKTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoYm9hcmQsIHNoaXAsIHN0YXJ0aW5nUm93LCBzdGFydGluZ0NvbCkgPT4ge1xuICAgIGNvbnN0IGlzVmVydGljYWwgPSBzaGlwLmlzVmVydGljYWw7XG4gICAgY29uc3Qgc2hpcExlbmd0aCA9IHNoaXAubGVuZ3RoO1xuICAgIHNoaXAuc3RhcnRpbmdSb3cgPSBzdGFydGluZ1JvdztcbiAgICBzaGlwLnN0YXJ0aW5nQ29sID0gc3RhcnRpbmdDb2w7XG4gICAgLy9DaGVjayBpZiBzaGlwIHBsYWNlbWVudCBpcyBpbiBib3VuZHNcbiAgICBpZiAoXG4gICAgICAoaXNWZXJ0aWNhbCAmJiBzdGFydGluZ1JvdyArIHNoaXBMZW5ndGggPiBncmlkU2l6ZSkgfHxcbiAgICAgICghaXNWZXJ0aWNhbCAmJiBzdGFydGluZ0NvbCArIHNoaXBMZW5ndGggPiBncmlkU2l6ZSlcbiAgICApIHtcbiAgICAgIHJldHVybiBudWxsOyAvLyBJbnZhbGlkIHBsYWNlbWVudFxuICAgIH1cblxuICAgIC8vQ2hlY2sgaWYgY2VsbHMgYXJlIGFscmVhZHkgb2NjdXBpZWRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgICAgaWYgKGJvYXJkW3N0YXJ0aW5nUm93ICsgaV1bc3RhcnRpbmdDb2xdICE9PSBcIndhdGVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGJvYXJkW3N0YXJ0aW5nUm93XVtzdGFydGluZ0NvbCArIGldICE9PSBcIndhdGVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vb3RoZXJ3aXNlIHZhbGlkLCBzbyBwbGFjZSBzaGlwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICAgIGJvYXJkW3N0YXJ0aW5nUm93ICsgaV1bc3RhcnRpbmdDb2xdID0gc2hpcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvYXJkW3N0YXJ0aW5nUm93XVtzdGFydGluZ0NvbCArIGldID0gc2hpcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbCwgYm9hcmQsIHNoaXBzKSA9PiB7XG4gICAgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gXCJ3YXRlclwiKSB7XG4gICAgICBib2FyZFtyb3ddW2NvbF0gPSBcIk1JU1NcIjtcbiAgICAgIHJldHVybiBcIk1JU1NcIjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2FyZFtyb3ddW2NvbF0uaGl0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBib2FyZFtyb3ddW2NvbF07XG4gICAgICBzaGlwLmhpdChzaGlwKTtcblxuICAgICAgaWYgKHNoaXAuaXNTdW5rKHNoaXApKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChzaGlwLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgIGJvYXJkW3NoaXAuc3RhcnRpbmdSb3cgKyBpXVtzaGlwLnN0YXJ0aW5nQ29sXSA9IFwiU1VOS1wiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2FyZFtzaGlwLnN0YXJ0aW5nUm93XVtzaGlwLnN0YXJ0aW5nQ29sICsgaV0gPSBcIlNVTktcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2hlY2tGb3JXaW4oc2hpcHMpO1xuICAgICAgICByZXR1cm4gXCJTVU5LXCI7XG4gICAgICB9XG4gICAgICBib2FyZFtyb3ddW2NvbF0gPSBcIkhJVFwiO1xuICAgICAgY2hlY2tGb3JXaW4oc2hpcHMpO1xuXG4gICAgICByZXR1cm4gXCJISVRcIjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2hlY2tGb3JXaW4gPSAoc2hpcHMpID0+IHtcbiAgICAvL2NhbGxlZCBhZnRlciBlYWNoIHR1cm5cbiAgICBjb25zdCBhbGxTaGlwc1N1bmsgPSBzaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5zaW5rU3RhdHVzKTtcblxuICAgIGlmIChhbGxTaGlwc1N1bmspIHtcbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAvL2VuZCBnYW1lIGxvb3AgYW5kIHVwZGF0ZSBVSVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgcmV0dXJuIHsgY3JlYXRlQm9hcmQsIHJlc2V0Qm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgY2hlY2tGb3JXaW4gfTtcbn07XG5cbmNvbnN0IHBsYXllciA9IChuYW1lLCBib2FyZCwgdHlwZSwgc2hpcHMpID0+IHtcbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7IC8vY2hhbmdlIHRvIGlucHV0IGFmdGVyIFVJIGNyZWF0ZWRcblxuICBjb25zdCBnZXRUeXBlID0gKCkgPT4gdHlwZTsgLy9IdW1hbiBvciBBSVxuXG4gIGNvbnN0IGdldEFpQ2hvaWNlID0gKCkgPT4ge1xuICAgIC8vVEhJUyBJUyBWRVJZIFNMT1cgLSBVUERBVEUhIGluaXRpYWxpc2Ugb3V0c2lkZSBvZiBmYWN0b3J5P1xuICAgIGNvbnN0IGF2YWlsYWJsZVNwb3RzID0gW107XG5cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGJvYXJkLmxlbmd0aDsgeCsrKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGJvYXJkW3hdLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBib2FyZFt4XVt5XSAhPT0gXCJNSVNTXCIgJiZcbiAgICAgICAgICBib2FyZFt4XVt5XSAhPT0gXCJISVRcIiAmJlxuICAgICAgICAgIGJvYXJkW3hdW3ldICE9PSBcIlNVTktcIlxuICAgICAgICApIHtcbiAgICAgICAgICBhdmFpbGFibGVTcG90cy5wdXNoKHsgeCwgeSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGF2YWlsYWJsZVNwb3RzLmxlbmd0aCk7XG4gICAgY29uc3QgYWlDaG9pY2UgPSBhdmFpbGFibGVTcG90c1tyYW5kb21JbmRleF07XG4gICAgcmV0dXJuIGFpQ2hvaWNlO1xuICB9O1xuXG4gIGNvbnN0IGF0dGFjayA9IChlbmVteSwgeCwgeSkgPT4ge1xuICAgIGlmIChjdXJyZW50UGxheWVyID09PSBcIkh1bWFuXCIpIHtcbiAgICAgIGNvbnN0IGVuZW15Qm9hcmQgPSBwMUJvYXJkSW5zdGFuY2U7XG4gICAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIGVuZW15LmJvYXJkLFxuICAgICAgICBlbmVteS5zaGlwc1xuICAgICAgKTtcblxuICAgICAgLy9UbyBVcGRhdGUgbWVzc2FnZXMgdG8gZGlzcGxheSB3aGljaCBzaGlwIGlzIHN1bmtcbiAgICAgIGlmIChhdHRhY2tSZXN1bHQgPT0gXCJISVRcIikge1xuICAgICAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gYFlvdSd2ZSBnb3QgYSAke2F0dGFja1Jlc3VsdH0hYDtcbiAgICAgIH1cbiAgICAgIGlmIChhdHRhY2tSZXN1bHQgPT0gXCJNSVNTXCIpIHtcbiAgICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IGBZb3UgTWlzc2VkYDtcbiAgICAgIH1cbiAgICAgIGlmIChhdHRhY2tSZXN1bHQgPT0gXCJTVU5LXCIpIHtcbiAgICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IGBCT09NISBZb3Ugc3VuayBjb21wdXRlcnMgc2hpcGA7XG4gICAgICB9XG5cbiAgICAgIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIyQm9hcmQsIHAyZ2FtZUJvYXJkKTtcbiAgICAgIGNvbnN0IGFsbFAyc2hpcHNTdW5rID0gZW5lbXkuc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuc2lua1N0YXR1cyk7XG5cbiAgICAgIC8vY29tcHV0ZXJzIHR1cm4gaWYgbm90IGFsbCBzdW5rXG4gICAgICBpZiAoIWFsbFAyc2hpcHNTdW5rKSB7XG4gICAgICAgIGN1cnJlbnRQbGF5ZXIgPSBcIkNvbXB1dGVyXCI7XG4gICAgICAgIGZ1bmN0aW9uIG1ha2VBaU1vdmUoKSB7XG4gICAgICAgICAgY29uc3QgYWlDaG9pY2UgPSBnZXRBaUNob2ljZSgpO1xuICAgICAgICAgIGNvbnN0IGFpQXR0YWNrUmVzdWx0ID0gcDFCb2FyZEluc3RhbmNlLnJlY2VpdmVBdHRhY2soXG4gICAgICAgICAgICBhaUNob2ljZS54LFxuICAgICAgICAgICAgYWlDaG9pY2UueSxcbiAgICAgICAgICAgIHBsYXllcjEuYm9hcmQsXG4gICAgICAgICAgICBwbGF5ZXIxLnNoaXBzXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIC8vVG8gVXBkYXRlIG1lc3NhZ2VzIHRvIGRpc3BsYXkgd2hpY2ggc2hpcCBpcyBzdW5rXG4gICAgICAgICAgaWYgKGFpQXR0YWNrUmVzdWx0ID09IFwiSElUXCIpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBgVGhleSd2ZSBnb3QgYSAke2FpQXR0YWNrUmVzdWx0fSFgO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYWlBdHRhY2tSZXN1bHQgPT0gXCJNSVNTXCIpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBgVGhleSBNaXNzZWQhYDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFpQXR0YWNrUmVzdWx0ID09IFwiU1VOS1wiKSB7XG4gICAgICAgICAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gYEJPT00hIENvbXB1dGVyIHN1bmsgeW91ciBzaGlwIWA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjFCb2FyZCwgcDFnYW1lQm9hcmQpO1xuICAgICAgICAgIGN1cnJlbnRQbGF5ZXIgPSBcIkh1bWFuXCI7XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dChtYWtlQWlNb3ZlLCA3MDApOyAvLzAuOHMgZGVsYXkgYmV0d2VlbiB0dXJuc1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vdXBkYXRlVHVybk1lc3NhZ2UoKTtcbiAgICByZXR1cm4gcmVuZGVyR2FtZUJvYXJkO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBib2FyZCxcbiAgICB0eXBlLFxuICAgIGdldE5hbWUsXG4gICAgZ2V0VHlwZSxcbiAgICBhdHRhY2ssXG4gICAgZ2V0QWlDaG9pY2UsXG4gICAgc2hpcHMsXG4gIH07XG59O1xuXG5leHBvcnQgeyBzaGlwLCBnYW1lQm9hcmQsIHBsYXllciB9O1xuIiwiLyoqIEBmb3JtYXQgKi9cbnJlcXVpcmUoXCIuL3N0eWxlcy5jc3NcIik7XG5cbmltcG9ydCB7IHNoaXAsIGdhbWVCb2FyZCwgcGxheWVyIH0gZnJvbSBcIi4vZ2FtZS5qc1wiO1xuaW1wb3J0IHsgcmVuZGVyR2FtZUJvYXJkIH0gZnJvbSBcIi4vcmVuZGVyLmpzXCI7XG5pbXBvcnQgYmFja2dyb3VuZEltYWdlIGZyb20gXCIuL3dhbGxwYXBlci5qcGdcIjtcbmltcG9ydCBzaG90U291bmQgZnJvbSBcIi4vc2hvdFNvdW5kLm1wM1wiO1xuXG5jb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluXCIpO1xubGV0IHBsYXllck5hbWU7XG5cbmNvbnN0IHRoZVNob3QgPSBuZXcgQXVkaW8oc2hvdFNvdW5kKTtcbnRoZVNob3QuYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsICgpID0+IHtcbiAgdGhlU2hvdFxuICAgIC5wbGF5KClcbiAgICAudGhlbigoKSA9PiB7fSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfSk7XG59KTtcbmNvbnNvbGUubG9nKHRoZVNob3QpO1xuXG4vL1xuXG4vL1NwbGFzaCBTY3JlZW5cbmZ1bmN0aW9uIHNwbGFzaFNjcmVlbigpIHtcbiAgbWFpbi5jbGFzc0xpc3QuYWRkKFwibG9hZFwiKTtcblxuICAvL2NvbnRhaW5lclxuICBjb25zdCBzcGxhc2hTY3JlZW5Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzcGxhc2hTY3JlZW5Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbnRhaW5lclwiKTtcblxuICAvL1RpdGxlXG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGl0bGUuY2xhc3NMaXN0LmFkZChcInRpdGxlXCIpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9IFwiQkFUVExFU0hJUFNcIjtcblxuICAvL05hbWUgSW5wdXRcbiAgY29uc3QgbmFtZVByb21wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgbmFtZVByb21wdC5jbGFzc0xpc3QuYWRkKFwibmFtZUlucHV0XCIpO1xuICBuYW1lUHJvbXB0LnBsYWNlaG9sZGVyID0gXCJFbnRlciBZb3VyIE5hbWVcIjtcbiAgbmFtZVByb21wdC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdXBkYXRlTmFtZSk7XG5cbiAgLy9HYW1lQnV0dG9uXG4gIGNvbnN0IG1haW5CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBtYWluQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJzdGFydFwiKTtcbiAgbWFpbkJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU1RBUlQgR0FNRVwiO1xuICBtYWluQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBsb2FkR2FtZSk7XG5cbiAgLy9BcHBlbmQgRWxlbWVudHNcbiAgc3BsYXNoU2NyZWVuQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgc3BsYXNoU2NyZWVuQ29udGFpbmVyLmFwcGVuZENoaWxkKG5hbWVQcm9tcHQpO1xuICBzcGxhc2hTY3JlZW5Db250YWluZXIuYXBwZW5kQ2hpbGQobWFpbkJ1dHRvbik7XG4gIG1haW4uYXBwZW5kQ2hpbGQoc3BsYXNoU2NyZWVuQ29udGFpbmVyKTtcblxuICAvL3NvdW5kRWxlbWVudHNcbn1cblxuc3BsYXNoU2NyZWVuKCk7XG5cbmZ1bmN0aW9uIHVwZGF0ZU5hbWUoZSkge1xuICBwbGF5ZXJOYW1lID0gZS50YXJnZXQudmFsdWU7XG4gIGNvbnNvbGUubG9nKHBsYXllck5hbWUpO1xufVxuXG5mdW5jdGlvbiBsb2FkR2FtZSgpIHtcbiAgbWFpbi50ZXh0Q29udGVudCA9IFwiXCI7XG4gIHRoZVNob3RcbiAgICAucGxheSgpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJBdWRpbyBwbGF5ZWRcIik7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfSk7XG4gIHNldFVwRG9tKCk7XG4gIGluaXRpYWxpc2UoKTtcbn1cblxuY29uc3QgYmFja2dyb3VuZEltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmFja2dyb3VuZC1pbWdcIik7XG5iYWNrZ3JvdW5kSW1nLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtiYWNrZ3JvdW5kSW1hZ2V9KWA7XG5cbi8vR2xvYmFsIEdhbWUgc3RhdGUgdmFyaWFibGVzIC0tIFRvIHJlZmFjdG9yICYgRW5jYXBzdWxhdGVcbmxldCBnYW1lQWN0aXZlID0gZmFsc2U7XG5sZXQgcmVzdGFydGFibGUgPSBmYWxzZTtcbmxldCBkcm9wcGVkQXJyYXkgPSBbXTtcbmxldCBub3REcm9wcGVkO1xubGV0IHAxY2FycmllciwgcDFiYXR0bGVzaGlwLCBwMWRlc3Ryb3llciwgcDFzdWJtYXJpbmUsIHAxcGF0cm9sQm9hdDtcbmxldCBwMmNhcnJpZXIsIHAyYmF0dGxlc2hpcCwgcDJkZXN0cm95ZXIsIHAyc3VibWFyaW5lLCBwMnBhdHJvbEJvYXQ7XG5sZXQgcDFBbGxTaGlwcywgcDJBbGxTaGlwcztcbmxldCBkcmFnZ2VkU2hpcDtcbmxldCBncmlkU2l6ZSA9IDEwO1xubGV0IHAxQm9hcmRJbnN0YW5jZSA9IGdhbWVCb2FyZChncmlkU2l6ZSk7XG5sZXQgcGxheWVyMUJvYXJkID0gcDFCb2FyZEluc3RhbmNlLmNyZWF0ZUJvYXJkKCk7XG5sZXQgcDJCb2FyZEluc3RhbmNlID0gZ2FtZUJvYXJkKGdyaWRTaXplKTtcbmxldCBwbGF5ZXIyQm9hcmQgPSBwMkJvYXJkSW5zdGFuY2UuY3JlYXRlQm9hcmQoKTtcbmxldCBwbGF5ZXIxO1xubGV0IHBsYXllcjI7XG5sZXQgcDFnYW1lQm9hcmQsIHAyZ2FtZUJvYXJkO1xubGV0IHNoaXB5YXJkU2hpcHM7XG5sZXQgc3RhcnRHYW1lQnV0dG9uO1xubGV0IG1lc3NhZ2VCb3g7XG5cbmZ1bmN0aW9uIHNldFVwRG9tKCkge1xuICAvL2dhbWVDb250YWluZXJcbiAgY29uc3QgZ2FtZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGdhbWVDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJnYW1lLWNvbnRhaW5lclwiKTtcblxuICAvL0luZm8gc2VjdGlvblxuICBjb25zdCBpbmZvU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGluZm9TZWN0aW9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaW5mb1wiKTtcblxuICAvL1N0YXJ0IGJ1dHRvblxuICBzdGFydEdhbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBzdGFydEdhbWVCdXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzdGFydC1idXR0b25cIik7XG4gIHN0YXJ0R2FtZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0YXJ0XCIpO1xuICBzdGFydEdhbWVCdXR0b24udGV4dENvbnRlbnQgPSBcIlByZXNzIHRvIFN0YXJ0XCI7XG4gIGluZm9TZWN0aW9uLmFwcGVuZENoaWxkKHN0YXJ0R2FtZUJ1dHRvbik7XG5cbiAgLy9NZXNzYWdlIGJveFxuICBtZXNzYWdlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IFwiVGltZSBmb3Igd2FyLCBwbGFjZSB5b3VyIHNoaXBzIVwiO1xuICBtZXNzYWdlQm94LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWVzc2FnZVwiKTtcbiAgaW5mb1NlY3Rpb24uYXBwZW5kQ2hpbGQobWVzc2FnZUJveCk7XG5cbiAgLy9HYW1lYm9hcmRzXG4gIGNvbnN0IHBsYXllcjFMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXG4gIHAxZ2FtZUJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcDFnYW1lQm9hcmQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwbGF5ZXIxLWJvYXJkXCIpO1xuICBwMWdhbWVCb2FyZC5hcHBlbmRDaGlsZChwbGF5ZXIxTGFiZWwpO1xuICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHAxZ2FtZUJvYXJkKTtcbiAgY29uc3QgcGxheWVyMkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cbiAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXIyTGFiZWwpO1xuICBwMmdhbWVCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHAyZ2FtZUJvYXJkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicGxheWVyMi1ib2FyZFwiKTtcbiAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwMmdhbWVCb2FyZCk7XG5cbiAgLy9zaGlweWFyZCBjb250YWluZXJcbiAgY29uc3Qgc2hpcHlhcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlweWFyZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXB5YXJkQ29udGFpbmVyXCIpO1xuXG4gIC8vc2hpcHlhcmQgbGFiZWxcbiAgY29uc3Qgc2hpcHlhcmRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXB5YXJkTGFiZWwudGV4dENvbnRlbnQgPSBcIllvdXIgU2hpcHlhcmRcIjtcbiAgc2hpcHlhcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoc2hpcHlhcmRMYWJlbCk7XG5cbiAgLy9TaGlweWFyZFxuICBjb25zdCBzaGlweWFyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXB5YXJkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcHlhcmRcIik7XG4gIHNoaXB5YXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHNoaXB5YXJkKTtcbiAgc2hpcHlhcmQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gIC8vMVxuICBjb25zdCBzaGlwMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgc2hpcDEuc2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwLXR5cGVcIiwgXCJjYXJyaWVyXCIpO1xuICBzaGlwMS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIjBcIik7XG4gIHNoaXAxLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZHJhZ2dhYmxlIHNoaXAgY2FycmllclwiKTtcbiAgc2hpcDEuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcbiAgc2hpcHlhcmQuYXBwZW5kQ2hpbGQoc2hpcDEpO1xuXG4gIC8vMlxuICBjb25zdCBzaGlwMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXAyLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcC10eXBlXCIsIFwiZGVzdHJveWVyXCIpO1xuICBzaGlwMi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIjFcIik7XG4gIHNoaXAyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZHJhZ2dhYmxlIHNoaXAgZGVzdHJveWVyXCIpO1xuICBzaGlwMi5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJ0cnVlXCIpO1xuICBzaGlweWFyZC5hcHBlbmRDaGlsZChzaGlwMik7XG5cbiAgLy8zXG4gIGNvbnN0IHNoaXAzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2hpcDMuc2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwLXR5cGVcIiwgXCJiYXR0bGVzaGlwXCIpO1xuICBzaGlwMy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIjJcIik7XG4gIHNoaXAzLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZHJhZ2dhYmxlIHNoaXAgYmF0dGxlc2hpcFwiKTtcbiAgc2hpcDMuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcbiAgc2hpcHlhcmQuYXBwZW5kQ2hpbGQoc2hpcDMpO1xuXG4gIC8vNFxuICBjb25zdCBzaGlwNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXA0LnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcC10eXBlXCIsIFwic3VibWFyaW5lXCIpO1xuICBzaGlwNC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIjNcIik7XG4gIHNoaXA0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZHJhZ2dhYmxlIHNoaXAgc3VibWFyaW5lXCIpO1xuICBzaGlwNC5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJ0cnVlXCIpO1xuICBzaGlweWFyZC5hcHBlbmRDaGlsZChzaGlwNCk7XG5cbiAgLy81XG4gIGNvbnN0IHNoaXA1ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2hpcDUuc2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwLXR5cGVcIiwgXCJwYXRyb2xCb2F0XCIpO1xuICBzaGlwNS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIjRcIik7XG4gIHNoaXA1LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZHJhZ2dhYmxlIHNoaXAgcGF0cm9sQm9hdFwiKTtcbiAgc2hpcDUuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcbiAgc2hpcHlhcmQuYXBwZW5kQ2hpbGQoc2hpcDUpO1xuXG4gIHNoaXB5YXJkU2hpcHMgPSBbc2hpcDEsIHNoaXAyLCBzaGlwMywgc2hpcDQsIHNoaXA1XTtcblxuICBtYWluLmFwcGVuZENoaWxkKGluZm9TZWN0aW9uKTtcbiAgbWFpbi5hcHBlbmRDaGlsZChnYW1lQ29udGFpbmVyKTtcbiAgbWFpbi5hcHBlbmRDaGlsZChzaGlweWFyZENvbnRhaW5lcik7XG5cbiAgcmV0dXJuIHtcbiAgICBnYW1lQ29udGFpbmVyLFxuICAgIHAxZ2FtZUJvYXJkLFxuICAgIHAyZ2FtZUJvYXJkLFxuICAgIHN0YXJ0R2FtZUJ1dHRvbixcbiAgICBzaGlweWFyZCxcbiAgICBzaGlweWFyZFNoaXBzLFxuICAgIG1lc3NhZ2VCb3gsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpc2UoKSB7XG4gIHAxY2FycmllciA9IHNoaXAoXCJjYXJyaWVyXCIsIDUsIDAsIGZhbHNlLCB0cnVlKTtcbiAgcDFiYXR0bGVzaGlwID0gc2hpcChcImJhdHRsZXNoaXBcIiwgNCwgMCwgZmFsc2UsIGZhbHNlKTtcbiAgcDFkZXN0cm95ZXIgPSBzaGlwKFwiZGVzdHJveWVyXCIsIDMsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAxc3VibWFyaW5lID0gc2hpcChcInN1Ym1hcmluZVwiLCAzLCAwLCBmYWxzZSwgZmFsc2UpO1xuICBwMXBhdHJvbEJvYXQgPSBzaGlwKFwicGF0cm9sQm9hdFwiLCAyLCAwLCBmYWxzZSwgZmFsc2UpO1xuXG4gIHAxQWxsU2hpcHMgPSBbXG4gICAgcDFjYXJyaWVyLFxuICAgIHAxYmF0dGxlc2hpcCxcbiAgICBwMWRlc3Ryb3llcixcbiAgICBwMXN1Ym1hcmluZSxcbiAgICBwMXBhdHJvbEJvYXQsXG4gIF07XG5cbiAgcDJjYXJyaWVyID0gc2hpcChcImNhcnJpZXJcIiwgNSwgMCwgZmFsc2UsIGZhbHNlKTtcbiAgcDJiYXR0bGVzaGlwID0gc2hpcChcImJhdHRsZXNoaXBcIiwgNCwgMCwgZmFsc2UsIGZhbHNlKTtcbiAgcDJkZXN0cm95ZXIgPSBzaGlwKFwiZGVzdHJveWVyXCIsIDMsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAyc3VibWFyaW5lID0gc2hpcChcInN1Ym1hcmluZVwiLCAzLCAwLCBmYWxzZSwgZmFsc2UpO1xuICBwMnBhdHJvbEJvYXQgPSBzaGlwKFwicGF0cm9sQm9hdFwiLCAyLCAwLCBmYWxzZSwgZmFsc2UpO1xuXG4gIHAyQWxsU2hpcHMgPSBbXG4gICAgcDJjYXJyaWVyLFxuICAgIHAyZGVzdHJveWVyLFxuICAgIHAyYmF0dGxlc2hpcCxcbiAgICBwMnN1Ym1hcmluZSxcbiAgICBwMnBhdHJvbEJvYXQsXG4gIF07XG5cbiAgLy9NYWtlIFBsYXllcnNcbiAgcGxheWVyMSA9IHBsYXllcihcbiAgICBcIlBsYXllciAxXCIsXG4gICAgcGxheWVyMUJvYXJkLFxuICAgIFwiSHVtYW5cIixcbiAgICBwMUFsbFNoaXBzLFxuICAgIHAxQm9hcmRJbnN0YW5jZVxuICApO1xuXG4gIHBsYXllcjIgPSBwbGF5ZXIoXCJDb21wdXRlclwiLCBwbGF5ZXIyQm9hcmQsIFwiQUlcIiwgcDJBbGxTaGlwcywgcDJCb2FyZEluc3RhbmNlKTtcblxuICByZW5kZXJHYW1lQm9hcmQocGxheWVyMUJvYXJkLCBwMWdhbWVCb2FyZCk7XG4gIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIyQm9hcmQsIHAyZ2FtZUJvYXJkKTtcblxuICAvL2V2ZW50IGxpc3RlbmVyc1xuICBzZXR1cEV2ZW50TGlzdGVuZXJzKHAxZ2FtZUJvYXJkLCBwMmdhbWVCb2FyZCk7XG5cbiAgcmV0dXJuIHtcbiAgICBwbGF5ZXIxLFxuICAgIHBsYXllcjFCb2FyZCxcbiAgICBwMUFsbFNoaXBzLFxuICAgIHBsYXllcjIsXG4gICAgcGxheWVyMkJvYXJkLFxuICAgIHAyQWxsU2hpcHMsXG4gIH07XG59XG5cbmZ1bmN0aW9uIHNldHVwRXZlbnRMaXN0ZW5lcnMocDFnYW1lQm9hcmQsIHAyZ2FtZUJvYXJkKSB7XG4gIHNoaXB5YXJkU2hpcHMuZm9yRWFjaCgoZHJhZ2dhYmxlKSA9PiB7XG4gICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZ1N0YXJ0KTtcbiAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZHJhZ0VuZCk7XG4gIH0pO1xuXG4gIHAxZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBkcmFnT3Zlcik7XG4gIHAxZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGRyb3BTaGlwKTtcblxuICBwMmdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VsZWN0VGFyZ2V0KTtcbiAgcDJnYW1lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBob3Zlcik7XG4gIHAyZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBob3Zlcik7XG4gIHN0YXJ0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhcnRHYW1lKTtcbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lKHNoaXB5YXJkKSB7XG4gIGlmIChcbiAgICBkcm9wcGVkQXJyYXkubGVuZ3RoID49IHAxQWxsU2hpcHMubGVuZ3RoICYmXG4gICAgZ2FtZUFjdGl2ZSA9PSBmYWxzZSAmJlxuICAgIHJlc3RhcnRhYmxlID09IGZhbHNlXG4gICkge1xuICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBcIlN0YXJ0aW5nLCB0YWtlIHlvdXIgc2hvdCFcIjtcbiAgICBnYW1lQWN0aXZlID0gdHJ1ZTtcbiAgICByZXN0YXJ0YWJsZSA9IGZhbHNlO1xuICAgIHN0YXJ0R2FtZUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgc2hpcHlhcmQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgcGxhY2VQMlNoaXBzKCk7XG4gIH0gZWxzZSBpZiAoZ2FtZUFjdGl2ZSA9PSBmYWxzZSAmJiByZXN0YXJ0YWJsZSA9PSB0cnVlKSB7XG4gICAgcmVzZXRHYW1lKCk7XG4gIH0gZWxzZSB7XG4gICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IFwiUGxhY2UgYWxsIG9mIHlvdXIgc2hpcHMgZmlyc3RcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNldEdhbWUoKSB7XG4gIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBcIlJlc3RhcnRpbmcsIFBsYWNlIHlvdXIgc2hpcHMhXCI7XG4gIHN0YXJ0R2FtZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU3RhcnQgZ2FtZVwiO1xuICAvL1VwZGF0ZSBnbG9iYWwgdmFyaWFibGVzXG4gIHJlc3RhcnRhYmxlID0gZmFsc2U7XG4gIGdhbWVBY3RpdmUgPSBmYWxzZTtcbiAgZHJvcHBlZEFycmF5ID0gW107XG4gIHAxQm9hcmRJbnN0YW5jZSA9IGdhbWVCb2FyZChncmlkU2l6ZSk7XG4gIHBsYXllcjFCb2FyZCA9IHAxQm9hcmRJbnN0YW5jZS5jcmVhdGVCb2FyZCgpO1xuICBwMkJvYXJkSW5zdGFuY2UgPSBnYW1lQm9hcmQoZ3JpZFNpemUpO1xuICBwbGF5ZXIyQm9hcmQgPSBwMkJvYXJkSW5zdGFuY2UuY3JlYXRlQm9hcmQoKTtcbiAgaW5pdGlhbGlzZSgpO1xuXG4gIC8vY2xlYXIgdGhlIGRvbVxuICBtYWluLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAvL1NldCB1cCBldmVudCBsaXN0ZW5lcnMgJiByZW5kZXJcbiAgY29uc3QgeyBwMWdhbWVCb2FyZCwgcDJnYW1lQm9hcmQgfSA9IHNldFVwRG9tKCk7XG5cbiAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjFCb2FyZCwgcDFnYW1lQm9hcmQpO1xuICByZW5kZXJHYW1lQm9hcmQocGxheWVyMkJvYXJkLCBwMmdhbWVCb2FyZCk7XG4gIHNldHVwRXZlbnRMaXN0ZW5lcnMocDFnYW1lQm9hcmQsIHAyZ2FtZUJvYXJkKTtcbn1cblxuZnVuY3Rpb24gcGxhY2VQMlNoaXBzKCkge1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJjYXJyaWVyLCA5LCAxKTtcbiAgcDJCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIyQm9hcmQsIHAyZGVzdHJveWVyLCAzLCAzKTtcbiAgcDJCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIyQm9hcmQsIHAyYmF0dGxlc2hpcCwgNSwgMik7XG4gIHAyQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMkJvYXJkLCBwMnN1Ym1hcmluZSwgMiwgMSk7XG4gIHAyQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMkJvYXJkLCBwMnBhdHJvbEJvYXQsIDYsIDApO1xuICByZW5kZXJHYW1lQm9hcmQocGxheWVyMkJvYXJkLCBwMmdhbWVCb2FyZCk7XG59XG5cbmZ1bmN0aW9uIGRyYWdTdGFydChlKSB7XG4gIGRyYWdnZWRTaGlwID0gZS50YXJnZXQ7XG4gIGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5hZGQoXCJkcmFnZ2luZ1wiKTtcbiAgbm90RHJvcHBlZCA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBkcmFnT3ZlcihlKSB7XG4gIG5vdERyb3BwZWQgPSBmYWxzZTtcblxuICBlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIGRyYWdFbmQoZSkge1xuICBkcmFnZ2VkU2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZ2dpbmdcIik7XG59XG5cbmZ1bmN0aW9uIGRyb3BTaGlwKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBzdGFydENvbCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sLCAxMCk7XG4gIGNvbnN0IHN0YXJ0Um93ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3csIDEwKTtcblxuICBjb25zdCB0aGlzU2hpcCA9IHAxQWxsU2hpcHNbZHJhZ2dlZFNoaXAuaWRdO1xuICBjb25zdCBzaGlwTmFtZSA9IGRyYWdnZWRTaGlwLmRhdGFzZXQuc2hpcFR5cGU7XG4gIGNvbnN0IHBsYWNlbWVudFJlc3VsdCA9IHAxQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAoXG4gICAgcGxheWVyMUJvYXJkLFxuICAgIHRoaXNTaGlwLFxuICAgIHN0YXJ0Um93LFxuICAgIHN0YXJ0Q29sXG4gICk7XG5cbiAgaWYgKHBsYWNlbWVudFJlc3VsdCkge1xuICAgIGRyb3BwZWRBcnJheS5wdXNoKHRoaXNTaGlwKTtcbiAgICBwMUJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjFCb2FyZCwgdGhpc1NoaXAsIHN0YXJ0Um93LCBzdGFydENvbCk7XG4gICAgZHJhZ2dlZFNoaXAucmVtb3ZlKCk7XG4gICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IGBZb3UndmUgcGxhY2VkIHlvdXIgJHtzaGlwTmFtZX1gO1xuICB9IGVsc2Uge1xuICAgIG5vdERyb3BwZWQgPSB0cnVlO1xuICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBcIkNhbid0IGdvIHRoZXJlLCB0cnkgYWdhaW4hXCI7XG4gIH1cbiAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjFCb2FyZCwgcDFnYW1lQm9hcmQpO1xuICBkcmFnZ2VkU2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZ2dpbmdcIik7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdFRhcmdldChlKSB7XG4gIGlmIChnYW1lQWN0aXZlKSB7XG4gICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcbiAgICBpZiAoY2VsbCAmJiAhY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJkaXNhYmxlZFwiKSkge1xuICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoY2VsbC5kYXRhc2V0LmNvbCwgMTApO1xuICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoY2VsbC5kYXRhc2V0LnJvdywgMTApO1xuICAgICAgcGxheWVyMS5hdHRhY2socGxheWVyMiwgcm93LCBjb2wpO1xuICAgICAgc2V0VGltZW91dChoYW5kbGVSZXN1bHRWYWxpZGF0aW9uLCA4MDApOyAvL1NldCB0aGlzIGxvbmdlciB0aGFuIHRoZSBtb3ZlIGRlbGF5XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGhvdmVyKGUpIHtcbiAgbGV0IGhpZ2hsaWdodGVkQ2VsbCA9IGUudGFyZ2V0O1xuICBoaWdobGlnaHRlZENlbGwuY2xhc3NMaXN0LnRvZ2dsZShcImhpZ2hsaWdodGVkXCIpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVSZXN1bHRWYWxpZGF0aW9uKCkge1xuICBjb25zdCBpc0dhbWVXb24gPSBwMkJvYXJkSW5zdGFuY2UuY2hlY2tGb3JXaW4ocGxheWVyMi5zaGlwcyk7XG4gIGNvbnN0IGlzR2FtZUxvc3QgPSBwMUJvYXJkSW5zdGFuY2UuY2hlY2tGb3JXaW4ocGxheWVyMS5zaGlwcyk7XG5cbiAgaWYgKGlzR2FtZVdvbiB8fCBpc0dhbWVMb3N0KSB7XG4gICAgZ2FtZUFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgc3RhcnRHYW1lQnV0dG9uLnRleHRDb250ZW50ID0gXCJSZXN0YXJ0XCI7XG4gICAgc3RhcnRHYW1lQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgcmVzdGFydGFibGUgPSB0cnVlO1xuICAgIHAyZ2FtZUJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzZWxlY3RUYXJnZXQpO1xuXG4gICAgaWYgKGlzR2FtZVdvbikge1xuICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IFwiR2FtZSBvdmVyLCB5b3Ugd2luIVwiO1xuICAgIH1cbiAgICBpZiAoaXNHYW1lTG9zdCkge1xuICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IFwiR2FtZSBvdmVyLCB5b3UgTG9zZSFcIjtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgcGxheWVyMUJvYXJkLFxuICBwbGF5ZXIyQm9hcmQsXG4gIHAxZ2FtZUJvYXJkLFxuICBwMmdhbWVCb2FyZCxcbiAgcGxheWVyMSxcbiAgcGxheWVyMixcbiAgcDFCb2FyZEluc3RhbmNlLFxuICBwMkJvYXJkSW5zdGFuY2UsXG4gIG1lc3NhZ2VCb3gsXG4gIHBsYXllck5hbWUsXG59O1xuIiwiLyoqIEBmb3JtYXQgKi9cblxuaW1wb3J0IHsgcDFnYW1lQm9hcmQsIHBsYXllck5hbWUgfSBmcm9tIFwiLi9tYWluLmpzXCI7XG5cbmNvbnN0IHJlbmRlckdhbWVCb2FyZCA9IChib2FyZCwgY29udGFpbmVyKSA9PiB7XG4gIGNvbnN0IGdyaWRTaXplID0gMTA7XG4gIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGNvbnN0IGJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImJvYXJkLWNvbnRhaW5lclwiKTtcbiAgYm9hcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcbiAgICBjb250YWluZXIgPT09IHAxZ2FtZUJvYXJkID8gXCJwbGF5ZXIxXCIgOiBcInBsYXllcjJcIlxuICApO1xuICBjb25zdCBwbGF5ZXIxbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgcGxheWVyMWxhYmVsLnRleHRDb250ZW50ID0gcGxheWVyTmFtZSA/IHBsYXllck5hbWUgOiBcIllvdVwiO1xuICBjb25zdCBwbGF5ZXIybGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgcGxheWVyMmxhYmVsLnRleHRDb250ZW50ID0gXCJDb21wdXRlclwiO1xuXG4gIGlmIChjb250YWluZXIgPT09IHAxZ2FtZUJvYXJkKSB7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllcjFsYWJlbCk7XG4gIH0gZWxzZSB7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllcjJsYWJlbCk7XG4gIH1cblxuICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBncmlkU2l6ZTsgcm93KyspIHtcbiAgICBjb25zdCByb3dFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3dFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJib2FyZC1yb3dcIik7XG5cbiAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBncmlkU2l6ZTsgY29sKyspIHtcbiAgICAgIGNvbnN0IGNlbGxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJib2FyZC1jZWxsXCIpO1xuICAgICAgY2VsbEVsZW1lbnQuZGF0YXNldC5yb3cgPSByb3c7XG4gICAgICBjZWxsRWxlbWVudC5kYXRhc2V0LmNvbCA9IGNvbDtcblxuICAgICAgLy9zZXQgc3R5bGluZyBiYXNlZCBvbiBjZWxsIGNvbnRlbnQgaS5lLiB3YXRlciwgaGl0LCBzaGlwLCBtaXNzXG4gICAgICBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIndhdGVyXCIpIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIndhdGVyXCIpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9hcmRbcm93XVtjb2xdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGlmIChjb250YWluZXIgPT0gcDFnYW1lQm9hcmQpIHtcbiAgICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZW5lbXktc2hpcFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjZWxsRWxlbWVudC5kYXRhc2V0LnNoaXBUeXBlID0gYCR7Ym9hcmRbcm93XVtjb2xdLnR5cGV9YDtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIkhJVFwiKSB7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbcm93XVtjb2xdID09PSBcIk1JU1NcIikge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xuICAgICAgfSBlbHNlIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IFwiU1VOS1wiKSB7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzdW5rXCIpO1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG4gICAgICByb3dFbGVtZW50LmFwcGVuZENoaWxkKGNlbGxFbGVtZW50KTtcbiAgICB9XG4gICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQocm93RWxlbWVudCk7XG4gIH1cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkQ29udGFpbmVyKTtcbn07XG5cbmV4cG9ydCB7IHJlbmRlckdhbWVCb2FyZCB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcImNyb3NzaGFpci5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qKiBAZm9ybWF0ICovXG5cbjpyb290IHtcbiAgZm9udC1mYW1pbHk6IFwiWXNhYmVhdSBTQ1wiLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDI0cHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgLS1kYXJrLWN5YW46ICMwZTk1OTQ7XG4gIC0td2hlYXQ6ICNmNWRmYmI7XG4gIC0tbW91bnRiYXR0ZW4tcGluazogIzk1ODE4ZDtcbn1cblxuaHRtbCB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG92ZXJzY3JvbGwtYmVoYXZpb3I6IG5vbmU7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuYm9keSB7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbm1haW4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgaGVpZ2h0OiAxMDB2aDtcbn1cblxuLmJhY2tncm91bmQtaW1nIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBvYmplY3QtcG9zaXRpb246IGNlbnRlcjtcbiAgb3BhY2l0eTogMC43O1xuICB6LWluZGV4OiAtMTtcbn1cblxuLmNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi50aXRsZSB7XG4gIGNvbG9yOiBibGFjaztcbiAgZm9udC1mYW1pbHk6IFwiTm90YWJsZVwiLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDJyZW07XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbmlucHV0IHtcbiAgZm9udC1zaXplOiAxcmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbjogMDtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4uZHJhZ2dhYmxlIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uaW5mbyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogNXB4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uZ2FtZS1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBtYXJnaW46IDM1cHg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDUwcHg7XG59XG5cbi5wbGF5ZXIxLWJvYXJkLFxuLnBsYXllcjItYm9hcmQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2xvcjogYmxhY2s7XG59XG5cbi5ib2FyZC1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4uc2hpcHlhcmRDb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2xvcjogYmxhY2s7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG5cbi5zaGlweWFyZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiA1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNTYsIDExOCwgMjE3LCAwLjQpO1xuICBwYWRkaW5nOiAxMHB4O1xuICB3aWR0aDogMzh2dztcbiAgbWluLWhlaWdodDogMTV2dztcbiAgYm9yZGVyOiAxcHggZGFzaGVkIGJsYWNrO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG59XG5cbi5zdGFydCB7XG4gIGJhY2tncm91bmQ6ICM1ZTVkZjA7XG4gIGJvcmRlci1yYWRpdXM6IDk5cHg7XG4gIGJveC1zaGFkb3c6ICM1ZTVkZjAgMCAxMHB4IDIwcHggLTEwcHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtZmFtaWx5OiBJbnRlciwgSGVsdmV0aWNhLCBcIkFwcGxlIENvbG9yIEVtb2ppXCIsIFwiU2Vnb2UgVUkgRW1vamlcIixcbiAgICBOb3RvQ29sb3JFbW9qaSwgXCJOb3RvIENvbG9yIEVtb2ppXCIsIFwiU2Vnb2UgVUkgU3ltYm9sXCIsIFwiQW5kcm9pZCBFbW9qaVwiLFxuICAgIEVtb2ppU3ltYm9scywgLWFwcGxlLXN5c3RlbSwgc3lzdGVtLXVpLCBcIlNlZ29lIFVJXCIsIFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLFxuICAgIFwiTm90byBTYW5zXCIsIHNhbnMtc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xuICBwYWRkaW5nOiA4cHggMThweDtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHRvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uO1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XG4gIGJvcmRlcjogMDtcbn1cblxuLnN0YXJ0OmRpc2FibGVkIHtcbiAgb3BhY2l0eTogMDtcbiAgY3Vyc29yOiBhdXRvO1xufVxuXG4ubWVzc2FnZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICB3aWR0aDogMjByZW07XG4gIGhlaWdodDogNHJlbTtcbn1cblxuLmJvYXJkLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5ib2FyZC1jZWxsIHtcbiAgb3BhY2l0eTogMC45O1xuICBmbGV4OiAxO1xuICB3aWR0aDogMXJlbTtcbiAgaGVpZ2h0OiAxcmVtO1xuICBib3JkZXI6IDAuMXB4IGRvdHRlZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxYjk1ZTA7XG4gIGN1cnNvcjogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pIDEyIDEyLCBjcm9zc2hhaXI7XG59XG5cbi5zaGlwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbiAgaGVpZ2h0OiAxcmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjMWI5NWUwO1xuXG4gIGJvcmRlci1yYWRpdXM6IDFweDtcbn1cblxuLmVuZW15LXNoaXAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWI5NWUwO1xuICBoZWlnaHQ6IDFyZW07XG4gIGJvcmRlcjogMC4xcHggZG90dGVkICNjY2M7XG59XG5cbi5kcmFnZ2FibGUge1xuICBjdXJzb3I6IG1vdmU7XG59XG5cbi5kcmFnZ2luZyB7XG4gIG9wYWNpdHk6IDAuNTtcbn1cblxuLmhpZ2hsaWdodGVkIHtcbiAgb3BhY2l0eTogMC41O1xufVxuXG4vKiBbZGF0YS1zaGlwLXR5cGU9XCJjYXJyaWVyXCJdIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIyMiAhaW1wb3J0YW50O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn0gKi9cblxuLyogW2RhdGEtc2hpcC10eXBlPVwiY2FycmllclwiXTo6YmVmb3JlIHtcbiAgY29udGVudDogXCJcIjtcbiAgd2lkdGg6IDgwJTtcbiAgaGVpZ2h0OiA2MCU7XG4gIGJhY2tncm91bmQ6ICNjY2M7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxMCU7XG4gIGxlZnQ6IDEwJTtcbn1cblxuW2RhdGEtc2hpcC10eXBlPVwiY2FycmllclwiXTo6YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiAxMHB4O1xuICBiYWNrZ3JvdW5kOiAjNTU1O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbn0gKi9cblxuLyogW2RhdGEtc2hpcC10eXBlPVwiZGVzdHJveWVyXCJdIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIyMiAhaW1wb3J0YW50O1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59ICovXG5cbi5jYXJyaWVyIHtcbiAgd2lkdGg6IDEycmVtO1xufVxuXG4uZGVzdHJveWVyIHtcbiAgd2lkdGg6IDEycmVtO1xufVxuXG4uYmF0dGxlc2hpcCB7XG4gIHdpZHRoOiA5cmVtO1xufVxuXG4uZGVzdHJveWVyIHtcbiAgd2lkdGg6IDdyZW07XG59XG5cbi5zdWJtYXJpbmUge1xuICB3aWR0aDogN3JlbTtcbn1cblxuLnBhdHJvbEJvYXQge1xuICB3aWR0aDogNC41cmVtO1xufVxuXG4uaGl0LFxuLnN1bmsge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gIGJvcmRlci1yYWRpdXM6IDEwMCU7XG59XG5cbi5zdW5rOjpiZWZvcmUge1xuICBjb250ZW50OiBcIlhcIjtcbiAgY29sb3I6IHJnYigyMTEsIDksIDUwKTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3R0b206IDIwJTtcbiAgbGVmdDogMjAlO1xufVxuXG4ubWlzcyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuXG4ucGxheWVyMSB7XG4gIG1hcmdpbi1ib3R0b206IDUwcHg7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLGFBQWE7O0FBRWI7RUFDRSxxQ0FBcUM7RUFDckMsZUFBZTtFQUNmLFlBQVk7RUFDWixvQkFBb0I7RUFDcEIsZ0JBQWdCO0VBQ2hCLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQix5QkFBeUI7RUFDekIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsY0FBYztFQUNkLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsTUFBTTtFQUNOLE9BQU87RUFDUCxXQUFXO0VBQ1gsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQix1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGtDQUFrQztFQUNsQyxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsU0FBUztFQUNULGFBQWE7RUFDYixZQUFZO0VBQ1osbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFFBQVE7RUFDUixzQkFBc0I7RUFDdEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFlBQVk7RUFDWix1QkFBdUI7RUFDdkIsU0FBUztBQUNYOztBQUVBOztFQUVFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZixRQUFRO0VBQ1IseUNBQXlDO0VBQ3pDLGFBQWE7RUFDYixXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLHdCQUF3QjtFQUN4QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLHFDQUFxQztFQUNyQyxzQkFBc0I7RUFDdEIsY0FBYztFQUNkLGVBQWU7RUFDZjs7OzJCQUd5QjtFQUN6QixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIseUJBQXlCO0VBQ3pCLDBCQUEwQjtFQUMxQixrQkFBa0I7RUFDbEIsc0JBQXNCO0VBQ3RCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFVBQVU7RUFDVixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQix1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxZQUFZO0VBQ1osT0FBTztFQUNQLFdBQVc7RUFDWCxZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGtCQUFrQjtFQUNsQix5QkFBeUI7RUFDekIsZ0VBQTZDO0FBQy9DOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWix5QkFBeUI7O0VBRXpCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1oseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBOzs7O0dBSUc7O0FBRUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7O0FBRUg7Ozs7R0FJRzs7QUFFSDtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTs7RUFFRSxxQkFBcUI7RUFDckIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxTQUFTO0FBQ1g7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqIEBmb3JtYXQgKi9cXG5cXG46cm9vdCB7XFxuICBmb250LWZhbWlseTogXFxcIllzYWJlYXUgU0NcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgLS1kYXJrLWN5YW46ICMwZTk1OTQ7XFxuICAtLXdoZWF0OiAjZjVkZmJiO1xcbiAgLS1tb3VudGJhdHRlbi1waW5rOiAjOTU4MThkO1xcbn1cXG5cXG5odG1sIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBvdmVyc2Nyb2xsLWJlaGF2aW9yOiBub25lO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5ib2R5IHtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLmJhY2tncm91bmQtaW1nIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcbiAgb2JqZWN0LXBvc2l0aW9uOiBjZW50ZXI7XFxuICBvcGFjaXR5OiAwLjc7XFxuICB6LWluZGV4OiAtMTtcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi50aXRsZSB7XFxuICBjb2xvcjogYmxhY2s7XFxuICBmb250LWZhbWlseTogXFxcIk5vdGFibGVcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxufVxcblxcbmlucHV0IHtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1hcmdpbjogMDtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3JkZXI6IG5vbmU7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbn1cXG5cXG4uZHJhZ2dhYmxlIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmluZm8ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogNXB4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5nYW1lLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgbWFyZ2luOiAzNXB4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDUwcHg7XFxufVxcblxcbi5wbGF5ZXIxLWJvYXJkLFxcbi5wbGF5ZXIyLWJvYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuXFxuLmJvYXJkLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLnNoaXB5YXJkQ29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbG9yOiBibGFjaztcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcblxcbi5zaGlweWFyZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgZ2FwOiA1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDU2LCAxMTgsIDIxNywgMC40KTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB3aWR0aDogMzh2dztcXG4gIG1pbi1oZWlnaHQ6IDE1dnc7XFxuICBib3JkZXI6IDFweCBkYXNoZWQgYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxufVxcblxcbi5zdGFydCB7XFxuICBiYWNrZ3JvdW5kOiAjNWU1ZGYwO1xcbiAgYm9yZGVyLXJhZGl1czogOTlweDtcXG4gIGJveC1zaGFkb3c6ICM1ZTVkZjAgMCAxMHB4IDIwcHggLTEwcHg7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBmb250LWZhbWlseTogSW50ZXIsIEhlbHZldGljYSwgXFxcIkFwcGxlIENvbG9yIEVtb2ppXFxcIiwgXFxcIlNlZ29lIFVJIEVtb2ppXFxcIixcXG4gICAgTm90b0NvbG9yRW1vamksIFxcXCJOb3RvIENvbG9yIEVtb2ppXFxcIiwgXFxcIlNlZ29lIFVJIFN5bWJvbFxcXCIsIFxcXCJBbmRyb2lkIEVtb2ppXFxcIixcXG4gICAgRW1vamlTeW1ib2xzLCAtYXBwbGUtc3lzdGVtLCBzeXN0ZW0tdWksIFxcXCJTZWdvZSBVSVxcXCIsIFJvYm90bywgXFxcIkhlbHZldGljYSBOZXVlXFxcIixcXG4gICAgXFxcIk5vdG8gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBwYWRkaW5nOiA4cHggMThweDtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHRvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uO1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcXG4gIGJvcmRlcjogMDtcXG59XFxuXFxuLnN0YXJ0OmRpc2FibGVkIHtcXG4gIG9wYWNpdHk6IDA7XFxuICBjdXJzb3I6IGF1dG87XFxufVxcblxcbi5tZXNzYWdlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIHdpZHRoOiAyMHJlbTtcXG4gIGhlaWdodDogNHJlbTtcXG59XFxuXFxuLmJvYXJkLXJvdyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uYm9hcmQtY2VsbCB7XFxuICBvcGFjaXR5OiAwLjk7XFxuICBmbGV4OiAxO1xcbiAgd2lkdGg6IDFyZW07XFxuICBoZWlnaHQ6IDFyZW07XFxuICBib3JkZXI6IDAuMXB4IGRvdHRlZCAjY2NjO1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFiOTVlMDtcXG4gIGN1cnNvcjogdXJsKFxcXCJjcm9zc2hhaXIucG5nXFxcIikgMTIgMTIsIGNyb3NzaGFpcjtcXG59XFxuXFxuLnNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gIGhlaWdodDogMXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxYjk1ZTA7XFxuXFxuICBib3JkZXItcmFkaXVzOiAxcHg7XFxufVxcblxcbi5lbmVteS1zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxYjk1ZTA7XFxuICBoZWlnaHQ6IDFyZW07XFxuICBib3JkZXI6IDAuMXB4IGRvdHRlZCAjY2NjO1xcbn1cXG5cXG4uZHJhZ2dhYmxlIHtcXG4gIGN1cnNvcjogbW92ZTtcXG59XFxuXFxuLmRyYWdnaW5nIHtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XFxuXFxuLmhpZ2hsaWdodGVkIHtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XFxuXFxuLyogW2RhdGEtc2hpcC10eXBlPVxcXCJjYXJyaWVyXFxcIl0ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIyMiAhaW1wb3J0YW50O1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn0gKi9cXG5cXG4vKiBbZGF0YS1zaGlwLXR5cGU9XFxcImNhcnJpZXJcXFwiXTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgd2lkdGg6IDgwJTtcXG4gIGhlaWdodDogNjAlO1xcbiAgYmFja2dyb3VuZDogI2NjYztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMTAlO1xcbiAgbGVmdDogMTAlO1xcbn1cXG5cXG5bZGF0YS1zaGlwLXR5cGU9XFxcImNhcnJpZXJcXFwiXTo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICB3aWR0aDogMjBweDtcXG4gIGhlaWdodDogMTBweDtcXG4gIGJhY2tncm91bmQ6ICM1NTU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDEwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG59ICovXFxuXFxuLyogW2RhdGEtc2hpcC10eXBlPVxcXCJkZXN0cm95ZXJcXFwiXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyICFpbXBvcnRhbnQ7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbn0gKi9cXG5cXG4uY2FycmllciB7XFxuICB3aWR0aDogMTJyZW07XFxufVxcblxcbi5kZXN0cm95ZXIge1xcbiAgd2lkdGg6IDEycmVtO1xcbn1cXG5cXG4uYmF0dGxlc2hpcCB7XFxuICB3aWR0aDogOXJlbTtcXG59XFxuXFxuLmRlc3Ryb3llciB7XFxuICB3aWR0aDogN3JlbTtcXG59XFxuXFxuLnN1Ym1hcmluZSB7XFxuICB3aWR0aDogN3JlbTtcXG59XFxuXFxuLnBhdHJvbEJvYXQge1xcbiAgd2lkdGg6IDQuNXJlbTtcXG59XFxuXFxuLmhpdCxcXG4uc3VuayB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxuICBib3JkZXItcmFkaXVzOiAxMDAlO1xcbn1cXG5cXG4uc3Vuazo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJYXFxcIjtcXG4gIGNvbG9yOiByZ2IoMjExLCA5LCA1MCk7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYm90dG9tOiAyMCU7XFxuICBsZWZ0OiAyMCU7XFxufVxcblxcbi5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4ucGxheWVyMSB7XFxuICBtYXJnaW4tYm90dG9tOiA1MHB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiaW5kZXhcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJwbGF5ZXIxIiwicGxheWVyMiIsInBsYXllcjFCb2FyZCIsInBsYXllcjJCb2FyZCIsInAxQm9hcmRJbnN0YW5jZSIsInAxZ2FtZUJvYXJkIiwicDJnYW1lQm9hcmQiLCJtZXNzYWdlQm94IiwicmVuZGVyR2FtZUJvYXJkIiwiY3VycmVudFBsYXllciIsInNoaXAiLCJ0eXBlIiwibGVuZ3RoIiwiaGl0Q291bnQiLCJzaW5rU3RhdHVzIiwiaXNWZXJ0aWNhbCIsImhpdCIsImlzU3VuayIsImdhbWVCb2FyZCIsImdyaWRTaXplIiwiY3JlYXRlQm9hcmQiLCJib2FyZCIsIkFycmF5IiwiZmlsbCIsIm1hcCIsInJlc2V0Qm9hcmQiLCJwbGFjZVNoaXAiLCJzdGFydGluZ1JvdyIsInN0YXJ0aW5nQ29sIiwic2hpcExlbmd0aCIsImkiLCJyZWNlaXZlQXR0YWNrIiwicm93IiwiY29sIiwic2hpcHMiLCJjaGVja0ZvcldpbiIsImFsbFNoaXBzU3VuayIsImV2ZXJ5IiwicGxheWVyIiwibmFtZSIsImdldE5hbWUiLCJnZXRUeXBlIiwiZ2V0QWlDaG9pY2UiLCJhdmFpbGFibGVTcG90cyIsIngiLCJ5IiwicHVzaCIsInJhbmRvbUluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiYWlDaG9pY2UiLCJhdHRhY2siLCJlbmVteSIsImVuZW15Qm9hcmQiLCJhdHRhY2tSZXN1bHQiLCJ0ZXh0Q29udGVudCIsImFsbFAyc2hpcHNTdW5rIiwibWFrZUFpTW92ZSIsImFpQXR0YWNrUmVzdWx0Iiwic2V0VGltZW91dCIsInJlcXVpcmUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJzaG90U291bmQiLCJtYWluIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicGxheWVyTmFtZSIsInRoZVNob3QiLCJBdWRpbyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwbGF5IiwidGhlbiIsImNhdGNoIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwic3BsYXNoU2NyZWVuIiwiY2xhc3NMaXN0IiwiYWRkIiwic3BsYXNoU2NyZWVuQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsInRpdGxlIiwibmFtZVByb21wdCIsInBsYWNlaG9sZGVyIiwidXBkYXRlTmFtZSIsIm1haW5CdXR0b24iLCJsb2FkR2FtZSIsImFwcGVuZENoaWxkIiwiZSIsInRhcmdldCIsInZhbHVlIiwic2V0VXBEb20iLCJpbml0aWFsaXNlIiwiYmFja2dyb3VuZEltZyIsInN0eWxlIiwiZ2FtZUFjdGl2ZSIsInJlc3RhcnRhYmxlIiwiZHJvcHBlZEFycmF5Iiwibm90RHJvcHBlZCIsInAxY2FycmllciIsInAxYmF0dGxlc2hpcCIsInAxZGVzdHJveWVyIiwicDFzdWJtYXJpbmUiLCJwMXBhdHJvbEJvYXQiLCJwMmNhcnJpZXIiLCJwMmJhdHRsZXNoaXAiLCJwMmRlc3Ryb3llciIsInAyc3VibWFyaW5lIiwicDJwYXRyb2xCb2F0IiwicDFBbGxTaGlwcyIsInAyQWxsU2hpcHMiLCJkcmFnZ2VkU2hpcCIsInAyQm9hcmRJbnN0YW5jZSIsInNoaXB5YXJkU2hpcHMiLCJzdGFydEdhbWVCdXR0b24iLCJnYW1lQ29udGFpbmVyIiwic2V0QXR0cmlidXRlIiwiaW5mb1NlY3Rpb24iLCJwbGF5ZXIxTGFiZWwiLCJwbGF5ZXIyTGFiZWwiLCJzaGlweWFyZENvbnRhaW5lciIsInNoaXB5YXJkTGFiZWwiLCJzaGlweWFyZCIsInNoaXAxIiwic2hpcDIiLCJzaGlwMyIsInNoaXA0Iiwic2hpcDUiLCJzZXR1cEV2ZW50TGlzdGVuZXJzIiwiZm9yRWFjaCIsImRyYWdnYWJsZSIsImRyYWdTdGFydCIsImRyYWdFbmQiLCJkcmFnT3ZlciIsImRyb3BTaGlwIiwic2VsZWN0VGFyZ2V0IiwiaG92ZXIiLCJzdGFydEdhbWUiLCJkaXNhYmxlZCIsInBsYWNlUDJTaGlwcyIsInJlc2V0R2FtZSIsInByZXZlbnREZWZhdWx0IiwicmVtb3ZlIiwic3RhcnRDb2wiLCJwYXJzZUludCIsImRhdGFzZXQiLCJzdGFydFJvdyIsInRoaXNTaGlwIiwiaWQiLCJzaGlwTmFtZSIsInNoaXBUeXBlIiwicGxhY2VtZW50UmVzdWx0IiwiY2VsbCIsImNvbnRhaW5zIiwiaGFuZGxlUmVzdWx0VmFsaWRhdGlvbiIsImhpZ2hsaWdodGVkQ2VsbCIsInRvZ2dsZSIsImlzR2FtZVdvbiIsImlzR2FtZUxvc3QiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY29udGFpbmVyIiwiYm9hcmRDb250YWluZXIiLCJwbGF5ZXIxbGFiZWwiLCJwbGF5ZXIybGFiZWwiLCJyb3dFbGVtZW50IiwiY2VsbEVsZW1lbnQiXSwic291cmNlUm9vdCI6IiJ9