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
  /* border: 0.1px dotted #ccc; */
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
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"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","sourcesContent":["/** @format */\n\n:root {\n  font-family: \"Ysabeau SC\", sans-serif;\n  font-size: 24px;\n  color: white;\n  --dark-cyan: #0e9594;\n  --wheat: #f5dfbb;\n  --mountbatten-pink: #95818d;\n}\n\nhtml {\n  overflow: hidden;\n  overscroll-behavior: none;\n  height: 100%;\n}\n\nbody {\n  overflow: auto;\n  height: 100%;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n\n.background-img {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n  opacity: 0.7;\n  z-index: -1;\n}\n\n.container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.title {\n  color: black;\n  font-family: \"Notable\", sans-serif;\n  font-size: 2rem;\n  font-weight: 300;\n  margin-bottom: 20px;\n}\n\ninput {\n  font-size: 1rem;\n  text-align: center;\n  margin: 0;\n  outline: none;\n  border: none;\n  margin-bottom: 20px;\n}\n\n.draggable {\n  text-align: center;\n}\n\n.info {\n  display: flex;\n  gap: 5px;\n  flex-direction: column;\n  align-items: center;\n}\n\n.game-container {\n  display: flex;\n  margin: 35px;\n  justify-content: center;\n  gap: 50px;\n}\n\n.player1-board,\n.player2-board {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  color: black;\n}\n\n.board-container {\n  display: flex;\n  flex-direction: column;\n}\n\n.shipyardContainer {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  color: black;\n  font-weight: 700;\n}\n\n.shipyard {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n  background-color: rgba(56, 118, 217, 0.4);\n  padding: 10px;\n  width: 38vw;\n  min-height: 15vw;\n  border: 1px dashed black;\n  border-radius: 8px;\n}\n\n.start {\n  background: #5e5df0;\n  border-radius: 99px;\n  box-shadow: #5e5df0 0 10px 20px -10px;\n  box-sizing: border-box;\n  color: #ffffff;\n  cursor: pointer;\n  font-family: Inter, Helvetica, \"Apple Color Emoji\", \"Segoe UI Emoji\",\n    NotoColorEmoji, \"Noto Color Emoji\", \"Segoe UI Symbol\", \"Android Emoji\",\n    EmojiSymbols, -apple-system, system-ui, \"Segoe UI\", Roboto, \"Helvetica Neue\",\n    \"Noto Sans\", sans-serif;\n  font-weight: 700;\n  line-height: 24px;\n  padding: 8px 18px;\n  user-select: none;\n  -webkit-user-select: none;\n  touch-action: manipulation;\n  width: fit-content;\n  word-break: break-word;\n  border: 0;\n}\n\n.start:disabled {\n  opacity: 0;\n  cursor: auto;\n}\n\n.message {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.2rem;\n  font-weight: 500;\n  text-align: center;\n  border: 1px solid black;\n  border-radius: 5px;\n  width: 20rem;\n  height: 4rem;\n}\n\n.board-row {\n  display: flex;\n}\n\n.board-cell {\n  opacity: 0.9;\n  flex: 1;\n  width: 1rem;\n  height: 1rem;\n  border: 0.1px dotted rgba(255, 255, 255, 0.6);\n  border-radius: 3px;\n  background-color: #1b95e0;\n  cursor: url(\"crosshair.png\") 12 12, crosshair;\n}\n\n.ship {\n  position: relative;\n  background-color: grey;\n  height: 1rem;\n}\n\n.hitShip {\n  background-color: grey;\n}\n\n.ship::before {\n  content: \"\";\n  position: absolute;\n  border: 0.3vmin solid rgba(255, 255, 255, 0.6);\n  top: -1px;\n  bottom: -1px;\n  left: -1px;\n  right: -1px;\n}\n\n[data-orientation=\"vertical\"]::before {\n  animation: ripplesY 3s linear infinite;\n  border-top: none;\n  border-bottom: none;\n}\n\n[data-orientation=\"horizontal\"]::before {\n  animation: ripplesX 3s linear infinite;\n  border-left: none;\n  border-right: none;\n}\n\n@keyframes ripplesX {\n  0% {\n    opacity: 1;\n    transform: scaleX(1);\n  }\n\n  100% {\n    opacity: 0;\n    transform: scaleX(1.6);\n  }\n}\n\n@keyframes ripplesY {\n  0% {\n    opacity: 1;\n    transform: scaleY(1);\n  }\n\n  100% {\n    opacity: 0;\n    transform: scaleY(1.6);\n  }\n}\n\n.enemy-ship {\n  background-color: #1b95e0;\n  height: 1rem;\n  /* border: 0.1px dotted #ccc; */\n}\n\n.draggable {\n  cursor: move;\n}\n\n.dragging {\n  opacity: 0.5;\n}\n\n.highlighted {\n  opacity: 0.5;\n}\n\n.carrier {\n  width: 12rem;\n}\n\n.destroyer {\n  width: 12rem;\n}\n\n.battleship {\n  width: 9rem;\n}\n\n.destroyer {\n  width: 7rem;\n}\n\n.submarine {\n  width: 7rem;\n}\n\n.patrolBoat {\n  width: 4.5rem;\n}\n\n.hit,\n.miss,\n.sunk {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.hit::after,\n.miss::after {\n  content: \"\";\n  position: absolute;\n  border-radius: 100%;\n  width: 2vmin;\n  height: 2vmin;\n}\n\n.sunk {\n  background-color: grey;\n}\n\n.miss::after {\n  background-color: white;\n}\n\n.hit::after {\n  background-color: red;\n}\n\n.miss::before {\n  content: \"\";\n  position: absolute;\n  animation: miss 0.2s ease-out forwards;\n  border: 0.1vmin solid white;\n  border-radius: 100%;\n  width: 2vmin;\n  height: 2vmin;\n}\n\n/* @keyframes miss {\n  0% {\n    opacity: 1;\n    transform: scale(0);\n  }\n\n  100% {\n    opacity: 0;\n    transform: scale(4);\n  }\n} */\n\n.sunk::before {\n  content: \"X\";\n  color: rgb(211, 9, 50);\n  border-radius: 10px;\n  position: relative;\n}\n\n.player1 {\n  margin-bottom: 50px;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbUNBQW1DO0FBQ25EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sdUZBQXVGLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLE1BQU0sTUFBTSxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLE9BQU8sT0FBTyxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksTUFBTSxNQUFNLEtBQUssS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxNQUFNLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDbEJBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7V0NyQkE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlcy5jc3M/NDRiMiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKiBAZm9ybWF0ICovXG5cbmltcG9ydCB7XG4gIHBsYXllcjEsXG4gIHBsYXllcjIsXG4gIHBsYXllcjFCb2FyZCxcbiAgcGxheWVyMkJvYXJkLFxuICBwMUJvYXJkSW5zdGFuY2UsXG4gIHAxZ2FtZUJvYXJkLFxuICBwMmdhbWVCb2FyZCxcbiAgbWVzc2FnZUJveCxcbn0gZnJvbSBcIi4vbWFpblwiO1xuaW1wb3J0IHsgcmVuZGVyR2FtZUJvYXJkIH0gZnJvbSBcIi4vcmVuZGVyXCI7XG5cbmxldCBjdXJyZW50UGxheWVyID0gXCJIdW1hblwiO1xuY29uc3QgdGhlSGl0ID0gbmV3IEF1ZGlvKCk7XG50aGVIaXQuc3JjID0gXCIuL3Nob3RTb3VuZC5tcDNcIjtcblxuY29uc3QgdGhlTWlzcyA9IG5ldyBBdWRpbygpO1xudGhlTWlzcy5zcmMgPSBcIi4vc3BsYXNoLm1wM1wiO1xuXG5jb25zdCB0aGVTdW5rID0gbmV3IEF1ZGlvKCk7XG50aGVTdW5rLnNyYyA9IFwiLi9zdW5rLm1wM1wiO1xuXG5jb25zdCBzaGlwID0gKHR5cGUsIGxlbmd0aCwgaGl0Q291bnQsIHNpbmtTdGF0dXMsIGlzVmVydGljYWwpID0+IHtcbiAgY29uc3QgaGl0ID0gKHNoaXApID0+IHtcbiAgICBzaGlwLmhpdENvdW50Kys7XG4gICAgcmV0dXJuIHNoaXAuaGl0Q291bnQ7XG4gIH07XG4gIGNvbnN0IGlzU3VuayA9IChzaGlwKSA9PiB7XG4gICAgaWYgKHNoaXAuaGl0Q291bnQgPT09IHNoaXAubGVuZ3RoKSB7XG4gICAgICBzaGlwLnNpbmtTdGF0dXMgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gc2hpcC5zaW5rU3RhdHVzO1xuICB9O1xuXG4gIHJldHVybiB7IHR5cGUsIGxlbmd0aCwgaGl0Q291bnQsIHNpbmtTdGF0dXMsIGhpdCwgaXNTdW5rLCBpc1ZlcnRpY2FsIH07XG59O1xuXG5jb25zdCBnYW1lQm9hcmQgPSAoZ3JpZFNpemUpID0+IHtcbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgYm9hcmQgPSBuZXcgQXJyYXkoZ3JpZFNpemUpXG4gICAgICAuZmlsbChudWxsKVxuICAgICAgLm1hcCgoKSA9PiBuZXcgQXJyYXkoZ3JpZFNpemUpLmZpbGwoXCJ3YXRlclwiKSk7XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9O1xuXG4gIGNvbnN0IHJlc2V0Qm9hcmQgPSAoKSA9PiB7XG4gICAgLy9Ob3QgYmVpbmcgdXNlZCBjdXJyZW50bHlcbiAgICB0aGlzLmJvYXJkID0gW107XG4gICAgdGhpcy5ib2FyZCA9IHRoaXMuY3JlYXRlQm9hcmQoKTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoYm9hcmQsIHNoaXAsIHN0YXJ0aW5nUm93LCBzdGFydGluZ0NvbCkgPT4ge1xuICAgIGNvbnN0IGlzVmVydGljYWwgPSBzaGlwLmlzVmVydGljYWw7XG4gICAgY29uc3Qgc2hpcExlbmd0aCA9IHNoaXAubGVuZ3RoO1xuICAgIHNoaXAuc3RhcnRpbmdSb3cgPSBzdGFydGluZ1JvdztcbiAgICBzaGlwLnN0YXJ0aW5nQ29sID0gc3RhcnRpbmdDb2w7XG4gICAgLy9DaGVjayBpZiBzaGlwIHBsYWNlbWVudCBpcyBpbiBib3VuZHNcbiAgICBpZiAoXG4gICAgICAoaXNWZXJ0aWNhbCAmJiBzdGFydGluZ1JvdyArIHNoaXBMZW5ndGggPiBncmlkU2l6ZSkgfHxcbiAgICAgICghaXNWZXJ0aWNhbCAmJiBzdGFydGluZ0NvbCArIHNoaXBMZW5ndGggPiBncmlkU2l6ZSlcbiAgICApIHtcbiAgICAgIHJldHVybiBudWxsOyAvLyBJbnZhbGlkIHBsYWNlbWVudFxuICAgIH1cblxuICAgIC8vQ2hlY2sgaWYgY2VsbHMgYXJlIGFscmVhZHkgb2NjdXBpZWRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgICAgaWYgKGJvYXJkW3N0YXJ0aW5nUm93ICsgaV1bc3RhcnRpbmdDb2xdICE9PSBcIndhdGVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGJvYXJkW3N0YXJ0aW5nUm93XVtzdGFydGluZ0NvbCArIGldICE9PSBcIndhdGVyXCIpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vb3RoZXJ3aXNlIHZhbGlkLCBzbyBwbGFjZSBzaGlwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICAgIGJvYXJkW3N0YXJ0aW5nUm93ICsgaV1bc3RhcnRpbmdDb2xdID0gc2hpcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvYXJkW3N0YXJ0aW5nUm93XVtzdGFydGluZ0NvbCArIGldID0gc2hpcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbCwgYm9hcmQsIHNoaXBzKSA9PiB7XG4gICAgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gXCJ3YXRlclwiKSB7XG4gICAgICBib2FyZFtyb3ddW2NvbF0gPSBcIk1JU1NcIjtcbiAgICAgIHJldHVybiBcIk1JU1NcIjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2FyZFtyb3ddW2NvbF0uaGl0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBib2FyZFtyb3ddW2NvbF07XG4gICAgICBzaGlwLmhpdChzaGlwKTtcblxuICAgICAgaWYgKHNoaXAuaXNTdW5rKHNoaXApKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChzaGlwLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgIGJvYXJkW3NoaXAuc3RhcnRpbmdSb3cgKyBpXVtzaGlwLnN0YXJ0aW5nQ29sXSA9IFwiU1VOS1wiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2FyZFtzaGlwLnN0YXJ0aW5nUm93XVtzaGlwLnN0YXJ0aW5nQ29sICsgaV0gPSBcIlNVTktcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2hlY2tGb3JXaW4oc2hpcHMpO1xuICAgICAgICByZXR1cm4gXCJTVU5LXCI7XG4gICAgICB9XG4gICAgICBib2FyZFtyb3ddW2NvbF0gPSBcIkhJVFwiO1xuICAgICAgY2hlY2tGb3JXaW4oc2hpcHMpO1xuXG4gICAgICByZXR1cm4gXCJISVRcIjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2hlY2tGb3JXaW4gPSAoc2hpcHMpID0+IHtcbiAgICAvL2NhbGxlZCBhZnRlciBlYWNoIHR1cm5cbiAgICBjb25zdCBhbGxTaGlwc1N1bmsgPSBzaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5zaW5rU3RhdHVzKTtcblxuICAgIGlmIChhbGxTaGlwc1N1bmspIHtcbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAvL2VuZCBnYW1lIGxvb3AgYW5kIHVwZGF0ZSBVSVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgcmV0dXJuIHsgY3JlYXRlQm9hcmQsIHJlc2V0Qm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgY2hlY2tGb3JXaW4gfTtcbn07XG5cbmNvbnN0IHBsYXllciA9IChuYW1lLCBib2FyZCwgdHlwZSwgc2hpcHMpID0+IHtcbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7IC8vY2hhbmdlIHRvIGlucHV0IGFmdGVyIFVJIGNyZWF0ZWRcblxuICBjb25zdCBnZXRUeXBlID0gKCkgPT4gdHlwZTsgLy9IdW1hbiBvciBBSVxuXG4gIGNvbnN0IGdldEFpQ2hvaWNlID0gKCkgPT4ge1xuICAgIC8vVEhJUyBJUyBWRVJZIFNMT1cgLSBVUERBVEUhIGluaXRpYWxpc2Ugb3V0c2lkZSBvZiBmYWN0b3J5P1xuICAgIGNvbnN0IGF2YWlsYWJsZVNwb3RzID0gW107XG5cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGJvYXJkLmxlbmd0aDsgeCsrKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGJvYXJkW3hdLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBib2FyZFt4XVt5XSAhPT0gXCJNSVNTXCIgJiZcbiAgICAgICAgICBib2FyZFt4XVt5XSAhPT0gXCJISVRcIiAmJlxuICAgICAgICAgIGJvYXJkW3hdW3ldICE9PSBcIlNVTktcIlxuICAgICAgICApIHtcbiAgICAgICAgICBhdmFpbGFibGVTcG90cy5wdXNoKHsgeCwgeSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGF2YWlsYWJsZVNwb3RzLmxlbmd0aCk7XG4gICAgY29uc3QgYWlDaG9pY2UgPSBhdmFpbGFibGVTcG90c1tyYW5kb21JbmRleF07XG4gICAgcmV0dXJuIGFpQ2hvaWNlO1xuICB9O1xuXG4gIGNvbnN0IGF0dGFjayA9IChlbmVteSwgeCwgeSkgPT4ge1xuICAgIGlmIChjdXJyZW50UGxheWVyID09PSBcIkh1bWFuXCIpIHtcbiAgICAgIGNvbnN0IGVuZW15Qm9hcmQgPSBwMUJvYXJkSW5zdGFuY2U7XG4gICAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIGVuZW15LmJvYXJkLFxuICAgICAgICBlbmVteS5zaGlwc1xuICAgICAgKTtcblxuICAgICAgLy9UbyBVcGRhdGUgbWVzc2FnZXMgdG8gZGlzcGxheSB3aGljaCBzaGlwIGlzIHN1bmtcbiAgICAgIGlmIChhdHRhY2tSZXN1bHQgPT0gXCJISVRcIikge1xuICAgICAgICB0aGVIaXQuY3VycmVudFRpbWUgPSAxOyAvL3Jld2luZFxuICAgICAgICB0aGVIaXRcbiAgICAgICAgICAucGxheSgpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBdWRpbyBwbGF5ZWRcIik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBgWW91J3ZlIGdvdCBhICR7YXR0YWNrUmVzdWx0fSFgO1xuICAgICAgfVxuICAgICAgaWYgKGF0dGFja1Jlc3VsdCA9PSBcIk1JU1NcIikge1xuICAgICAgICB0aGVNaXNzLmN1cnJlbnRUaW1lID0gMTtcbiAgICAgICAgdGhlTWlzc1xuICAgICAgICAgIC5wbGF5KClcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkF1ZGlvIHBsYXllZFwiKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IGBZb3UgTWlzc2VkYDtcbiAgICAgIH1cbiAgICAgIGlmIChhdHRhY2tSZXN1bHQgPT0gXCJTVU5LXCIpIHtcbiAgICAgICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IGBCT09NISBZb3Ugc3VuayBjb21wdXRlcnMgc2hpcGA7XG4gICAgICAgIHRoZVN1bmsuY3VycmVudFRpbWUgPSAxO1xuICAgICAgICB0aGVTdW5rXG4gICAgICAgICAgLnBsYXkoKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXVkaW8gcGxheWVkXCIpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZW5kZXJHYW1lQm9hcmQocGxheWVyMkJvYXJkLCBwMmdhbWVCb2FyZCk7XG4gICAgICBjb25zdCBhbGxQMnNoaXBzU3VuayA9IGVuZW15LnNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLnNpbmtTdGF0dXMpO1xuXG4gICAgICAvL2NvbXB1dGVycyB0dXJuIGlmIG5vdCBhbGwgc3Vua1xuICAgICAgaWYgKCFhbGxQMnNoaXBzU3Vuaykge1xuICAgICAgICBjdXJyZW50UGxheWVyID0gXCJDb21wdXRlclwiO1xuICAgICAgICBmdW5jdGlvbiBtYWtlQWlNb3ZlKCkge1xuICAgICAgICAgIGNvbnN0IGFpQ2hvaWNlID0gZ2V0QWlDaG9pY2UoKTtcbiAgICAgICAgICBjb25zdCBhaUF0dGFja1Jlc3VsdCA9IHAxQm9hcmRJbnN0YW5jZS5yZWNlaXZlQXR0YWNrKFxuICAgICAgICAgICAgYWlDaG9pY2UueCxcbiAgICAgICAgICAgIGFpQ2hvaWNlLnksXG4gICAgICAgICAgICBwbGF5ZXIxLmJvYXJkLFxuICAgICAgICAgICAgcGxheWVyMS5zaGlwc1xuICAgICAgICAgICk7XG5cbiAgICAgICAgICAvL1RvIFVwZGF0ZSBtZXNzYWdlcyB0byBkaXNwbGF5IHdoaWNoIHNoaXAgaXMgc3Vua1xuICAgICAgICAgIGlmIChhaUF0dGFja1Jlc3VsdCA9PSBcIkhJVFwiKSB7XG4gICAgICAgICAgICB0aGVIaXQuY3VycmVudFRpbWUgPSAxOyAvL3Jld2luZFxuICAgICAgICAgICAgdGhlSGl0XG4gICAgICAgICAgICAgIC5wbGF5KClcbiAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXVkaW8gcGxheWVkXCIpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBgVGhleSd2ZSBnb3QgYSAke2FpQXR0YWNrUmVzdWx0fSFgO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYWlBdHRhY2tSZXN1bHQgPT0gXCJNSVNTXCIpIHtcbiAgICAgICAgICAgIHRoZU1pc3MuY3VycmVudFRpbWUgPSAxO1xuICAgICAgICAgICAgdGhlTWlzc1xuICAgICAgICAgICAgICAucGxheSgpXG4gICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkF1ZGlvIHBsYXllZFwiKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gYFRoZXkgTWlzc2VkIWA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhaUF0dGFja1Jlc3VsdCA9PSBcIlNVTktcIikge1xuICAgICAgICAgICAgdGhlU3Vuay5jdXJyZW50VGltZSA9IDE7XG4gICAgICAgICAgICB0aGVTdW5rXG4gICAgICAgICAgICAgIC5wbGF5KClcbiAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXVkaW8gcGxheWVkXCIpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBgQk9PTSEgQ29tcHV0ZXIgc3VuayB5b3VyIHNoaXAhYDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZW5kZXJHYW1lQm9hcmQocGxheWVyMUJvYXJkLCBwMWdhbWVCb2FyZCk7XG4gICAgICAgICAgY3VycmVudFBsYXllciA9IFwiSHVtYW5cIjtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KG1ha2VBaU1vdmUsIDcwMCk7IC8vMC44cyBkZWxheSBiZXR3ZWVuIHR1cm5zXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy91cGRhdGVUdXJuTWVzc2FnZSgpO1xuICAgIHJldHVybiByZW5kZXJHYW1lQm9hcmQ7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIGJvYXJkLFxuICAgIHR5cGUsXG4gICAgZ2V0TmFtZSxcbiAgICBnZXRUeXBlLFxuICAgIGF0dGFjayxcbiAgICBnZXRBaUNob2ljZSxcbiAgICBzaGlwcyxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IHNoaXAsIGdhbWVCb2FyZCwgcGxheWVyIH07XG4iLCIvKiogQGZvcm1hdCAqL1xucmVxdWlyZShcIi4vc3R5bGVzLmNzc1wiKTtcblxuaW1wb3J0IHsgc2hpcCwgZ2FtZUJvYXJkLCBwbGF5ZXIgfSBmcm9tIFwiLi9nYW1lLmpzXCI7XG5pbXBvcnQgeyByZW5kZXJHYW1lQm9hcmQgfSBmcm9tIFwiLi9yZW5kZXIuanNcIjtcbmltcG9ydCBiYWNrZ3JvdW5kSW1hZ2UgZnJvbSBcIi4vd2FsbHBhcGVyLmpwZ1wiO1xuaW1wb3J0IHNob3RTb3VuZCBmcm9tIFwiLi9zaG90U291bmQubXAzXCI7XG5pbXBvcnQgc3BsYXNoIGZyb20gXCIuL3NwbGFzaC5tcDNcIjtcbmltcG9ydCBzdW5rU291bmQgZnJvbSBcIi4vc3Vuay5tcDNcIjtcbmltcG9ydCBzdGFydE11c2ljIGZyb20gXCIuL2RyYW1hdGljU3RhcnQubXAzXCI7XG5pbXBvcnQgd2luTXVzaWMgZnJvbSBcIi4vd2luRmFuZmFyZS5tcDNcIjtcblxuY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpblwiKTtcbmxldCBwbGF5ZXJOYW1lO1xuXG5jb25zdCB0aGVTaG90ID0gbmV3IEF1ZGlvKCk7XG50aGVTaG90LnNyYyA9IFwiLi9zaG90U291bmQubXAzXCI7XG5cbmNvbnN0IHN0YXJ0U291bmQgPSBuZXcgQXVkaW8oKTtcbnN0YXJ0U291bmQuc3JjID0gXCIuL2RyYW1hdGljU3RhcnQubXAzXCI7XG5cbmNvbnN0IHRoZVdpbiA9IG5ldyBBdWRpbygpO1xudGhlV2luLnNyYyA9IFwiLi93aW5GYW5mYXJlLm1wM1wiO1xuXG5jb25zdCB0aGVEZWZlYXQgPSBuZXcgQXVkaW8oKTtcbnRoZURlZmVhdC5zcmMgPSBcIi4vZGVmZWF0ZWQubXAzXCI7XG5cbi8vU3BsYXNoIFNjcmVlblxuZnVuY3Rpb24gc3BsYXNoU2NyZWVuKCkge1xuICBtYWluLmNsYXNzTGlzdC5hZGQoXCJsb2FkXCIpO1xuXG4gIC8vY29udGFpbmVyXG4gIGNvbnN0IHNwbGFzaFNjcmVlbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNwbGFzaFNjcmVlbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyXCIpO1xuXG4gIC8vVGl0bGVcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwidGl0bGVcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gXCJCQVRUTEVTSElQU1wiO1xuXG4gIC8vTmFtZSBJbnB1dFxuICBjb25zdCBuYW1lUHJvbXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBuYW1lUHJvbXB0LmNsYXNzTGlzdC5hZGQoXCJuYW1lSW5wdXRcIik7XG4gIG5hbWVQcm9tcHQucGxhY2Vob2xkZXIgPSBcIkVudGVyIFlvdXIgTmFtZVwiO1xuICBuYW1lUHJvbXB0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGRhdGVOYW1lKTtcblxuICAvL0dhbWVCdXR0b25cbiAgY29uc3QgbWFpbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIG1haW5CdXR0b24uY2xhc3NMaXN0LmFkZChcInN0YXJ0XCIpO1xuICBtYWluQnV0dG9uLnRleHRDb250ZW50ID0gXCJTVEFSVCBHQU1FXCI7XG4gIG1haW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGxvYWRHYW1lKTtcblxuICAvL0FwcGVuZCBFbGVtZW50c1xuICBzcGxhc2hTY3JlZW5Db250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICBzcGxhc2hTY3JlZW5Db250YWluZXIuYXBwZW5kQ2hpbGQobmFtZVByb21wdCk7XG4gIHNwbGFzaFNjcmVlbkNvbnRhaW5lci5hcHBlbmRDaGlsZChtYWluQnV0dG9uKTtcbiAgbWFpbi5hcHBlbmRDaGlsZChzcGxhc2hTY3JlZW5Db250YWluZXIpO1xuXG4gIC8vc291bmRFbGVtZW50c1xufVxuXG5zcGxhc2hTY3JlZW4oKTtcblxuZnVuY3Rpb24gdXBkYXRlTmFtZShlKSB7XG4gIHBsYXllck5hbWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgY29uc29sZS5sb2cocGxheWVyTmFtZSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRHYW1lKCkge1xuICBtYWluLnRleHRDb250ZW50ID0gXCJcIjtcbiAgLy9QbGF5IHNvdW5kIC0gdGVzdGluZ1xuICBzdGFydFNvdW5kLmN1cnJlbnRUaW1lID0gMTsgLy9yZXdpbmRcbiAgc3RhcnRTb3VuZFxuICAgIC5wbGF5KClcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIkF1ZGlvIHBsYXllZFwiKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9KTtcbiAgc2V0VXBEb20oKTtcbiAgaW5pdGlhbGlzZSgpO1xufVxuXG5jb25zdCBiYWNrZ3JvdW5kSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5iYWNrZ3JvdW5kLWltZ1wiKTtcbmJhY2tncm91bmRJbWcuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2JhY2tncm91bmRJbWFnZX0pYDtcblxuLy9HbG9iYWwgR2FtZSBzdGF0ZSB2YXJpYWJsZXMgLS0gVG8gcmVmYWN0b3IgJiBFbmNhcHN1bGF0ZVxubGV0IGdhbWVBY3RpdmUgPSBmYWxzZTtcbmxldCByZXN0YXJ0YWJsZSA9IGZhbHNlO1xubGV0IGRyb3BwZWRBcnJheSA9IFtdO1xubGV0IG5vdERyb3BwZWQ7XG5sZXQgcDFjYXJyaWVyLCBwMWJhdHRsZXNoaXAsIHAxZGVzdHJveWVyLCBwMXN1Ym1hcmluZSwgcDFwYXRyb2xCb2F0O1xubGV0IHAyY2FycmllciwgcDJiYXR0bGVzaGlwLCBwMmRlc3Ryb3llciwgcDJzdWJtYXJpbmUsIHAycGF0cm9sQm9hdDtcbmxldCBwMUFsbFNoaXBzLCBwMkFsbFNoaXBzO1xubGV0IGRyYWdnZWRTaGlwO1xubGV0IGdyaWRTaXplID0gMTA7XG5sZXQgcDFCb2FyZEluc3RhbmNlID0gZ2FtZUJvYXJkKGdyaWRTaXplKTtcbmxldCBwbGF5ZXIxQm9hcmQgPSBwMUJvYXJkSW5zdGFuY2UuY3JlYXRlQm9hcmQoKTtcbmxldCBwMkJvYXJkSW5zdGFuY2UgPSBnYW1lQm9hcmQoZ3JpZFNpemUpO1xubGV0IHBsYXllcjJCb2FyZCA9IHAyQm9hcmRJbnN0YW5jZS5jcmVhdGVCb2FyZCgpO1xubGV0IHBsYXllcjE7XG5sZXQgcGxheWVyMjtcbmxldCBwMWdhbWVCb2FyZCwgcDJnYW1lQm9hcmQ7XG5sZXQgc2hpcHlhcmRTaGlwcztcbmxldCBzdGFydEdhbWVCdXR0b247XG5sZXQgbWVzc2FnZUJveDtcblxuZnVuY3Rpb24gc2V0VXBEb20oKSB7XG4gIC8vZ2FtZUNvbnRhaW5lclxuICBjb25zdCBnYW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZ2FtZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImdhbWUtY29udGFpbmVyXCIpO1xuXG4gIC8vSW5mbyBzZWN0aW9uXG4gIGNvbnN0IGluZm9TZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaW5mb1NlY3Rpb24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJpbmZvXCIpO1xuXG4gIC8vU3RhcnQgYnV0dG9uXG4gIHN0YXJ0R2FtZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHN0YXJ0R2FtZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInN0YXJ0LWJ1dHRvblwiKTtcbiAgc3RhcnRHYW1lQnV0dG9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RhcnRcIik7XG4gIHN0YXJ0R2FtZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUHJlc3MgdG8gU3RhcnRcIjtcbiAgaW5mb1NlY3Rpb24uYXBwZW5kQ2hpbGQoc3RhcnRHYW1lQnV0dG9uKTtcblxuICAvL01lc3NhZ2UgYm94XG4gIG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJUaW1lIGZvciB3YXIsIHBsYWNlIHlvdXIgc2hpcHMhXCI7XG4gIG1lc3NhZ2VCb3guc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtZXNzYWdlXCIpO1xuICBpbmZvU2VjdGlvbi5hcHBlbmRDaGlsZChtZXNzYWdlQm94KTtcblxuICAvL0dhbWVib2FyZHNcbiAgY29uc3QgcGxheWVyMUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cbiAgcDFnYW1lQm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwMWdhbWVCb2FyZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInBsYXllcjEtYm9hcmRcIik7XG4gIHAxZ2FtZUJvYXJkLmFwcGVuZENoaWxkKHBsYXllcjFMYWJlbCk7XG4gIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQocDFnYW1lQm9hcmQpO1xuICBjb25zdCBwbGF5ZXIyTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblxuICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllcjJMYWJlbCk7XG4gIHAyZ2FtZUJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcDJnYW1lQm9hcmQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwbGF5ZXIyLWJvYXJkXCIpO1xuICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHAyZ2FtZUJvYXJkKTtcblxuICAvL3NoaXB5YXJkIGNvbnRhaW5lclxuICBjb25zdCBzaGlweWFyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXB5YXJkQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcHlhcmRDb250YWluZXJcIik7XG5cbiAgLy9zaGlweWFyZCBsYWJlbFxuICBjb25zdCBzaGlweWFyZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2hpcHlhcmRMYWJlbC50ZXh0Q29udGVudCA9IFwiWW91ciBTaGlweWFyZFwiO1xuICBzaGlweWFyZENvbnRhaW5lci5hcHBlbmRDaGlsZChzaGlweWFyZExhYmVsKTtcblxuICAvL1NoaXB5YXJkXG4gIGNvbnN0IHNoaXB5YXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2hpcHlhcmQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlweWFyZFwiKTtcbiAgc2hpcHlhcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoc2hpcHlhcmQpO1xuICBzaGlweWFyZC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgLy8xXG4gIGNvbnN0IHNoaXAxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICBzaGlwMS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXAtdHlwZVwiLCBcImNhcnJpZXJcIik7XG4gIHNoaXAxLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiMFwiKTtcbiAgc2hpcDEuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkcmFnZ2FibGUgc2hpcCBjYXJyaWVyXCIpO1xuICBzaGlwMS5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJ0cnVlXCIpO1xuICBzaGlweWFyZC5hcHBlbmRDaGlsZChzaGlwMSk7XG5cbiAgLy8yXG4gIGNvbnN0IHNoaXAyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2hpcDIuc2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwLXR5cGVcIiwgXCJkZXN0cm95ZXJcIik7XG4gIHNoaXAyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiMVwiKTtcbiAgc2hpcDIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkcmFnZ2FibGUgc2hpcCBkZXN0cm95ZXJcIik7XG4gIHNoaXAyLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gIHNoaXB5YXJkLmFwcGVuZENoaWxkKHNoaXAyKTtcblxuICAvLzNcbiAgY29uc3Qgc2hpcDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwMy5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXAtdHlwZVwiLCBcImJhdHRsZXNoaXBcIik7XG4gIHNoaXAzLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiMlwiKTtcbiAgc2hpcDMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkcmFnZ2FibGUgc2hpcCBiYXR0bGVzaGlwXCIpO1xuICBzaGlwMy5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJ0cnVlXCIpO1xuICBzaGlweWFyZC5hcHBlbmRDaGlsZChzaGlwMyk7XG5cbiAgLy80XG4gIGNvbnN0IHNoaXA0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2hpcDQuc2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwLXR5cGVcIiwgXCJzdWJtYXJpbmVcIik7XG4gIHNoaXA0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiM1wiKTtcbiAgc2hpcDQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkcmFnZ2FibGUgc2hpcCBzdWJtYXJpbmVcIik7XG4gIHNoaXA0LnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gIHNoaXB5YXJkLmFwcGVuZENoaWxkKHNoaXA0KTtcblxuICAvLzVcbiAgY29uc3Qgc2hpcDUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwNS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXAtdHlwZVwiLCBcInBhdHJvbEJvYXRcIik7XG4gIHNoaXA1LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiNFwiKTtcbiAgc2hpcDUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkcmFnZ2FibGUgc2hpcCBwYXRyb2xCb2F0XCIpO1xuICBzaGlwNS5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJ0cnVlXCIpO1xuICBzaGlweWFyZC5hcHBlbmRDaGlsZChzaGlwNSk7XG5cbiAgc2hpcHlhcmRTaGlwcyA9IFtzaGlwMSwgc2hpcDIsIHNoaXAzLCBzaGlwNCwgc2hpcDVdO1xuXG4gIG1haW4uYXBwZW5kQ2hpbGQoaW5mb1NlY3Rpb24pO1xuICBtYWluLmFwcGVuZENoaWxkKGdhbWVDb250YWluZXIpO1xuICBtYWluLmFwcGVuZENoaWxkKHNoaXB5YXJkQ29udGFpbmVyKTtcblxuICByZXR1cm4ge1xuICAgIGdhbWVDb250YWluZXIsXG4gICAgcDFnYW1lQm9hcmQsXG4gICAgcDJnYW1lQm9hcmQsXG4gICAgc3RhcnRHYW1lQnV0dG9uLFxuICAgIHNoaXB5YXJkLFxuICAgIHNoaXB5YXJkU2hpcHMsXG4gICAgbWVzc2FnZUJveCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gaW5pdGlhbGlzZSgpIHtcbiAgcDFjYXJyaWVyID0gc2hpcChcImNhcnJpZXJcIiwgNSwgMCwgZmFsc2UsIHRydWUpO1xuICBwMWJhdHRsZXNoaXAgPSBzaGlwKFwiYmF0dGxlc2hpcFwiLCA0LCAwLCBmYWxzZSwgZmFsc2UpO1xuICBwMWRlc3Ryb3llciA9IHNoaXAoXCJkZXN0cm95ZXJcIiwgMywgMCwgZmFsc2UsIGZhbHNlKTtcbiAgcDFzdWJtYXJpbmUgPSBzaGlwKFwic3VibWFyaW5lXCIsIDMsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAxcGF0cm9sQm9hdCA9IHNoaXAoXCJwYXRyb2xCb2F0XCIsIDIsIDAsIGZhbHNlLCBmYWxzZSk7XG5cbiAgcDFBbGxTaGlwcyA9IFtcbiAgICBwMWNhcnJpZXIsXG4gICAgcDFiYXR0bGVzaGlwLFxuICAgIHAxZGVzdHJveWVyLFxuICAgIHAxc3VibWFyaW5lLFxuICAgIHAxcGF0cm9sQm9hdCxcbiAgXTtcblxuICBwMmNhcnJpZXIgPSBzaGlwKFwiY2FycmllclwiLCA1LCAwLCBmYWxzZSwgZmFsc2UpO1xuICBwMmJhdHRsZXNoaXAgPSBzaGlwKFwiYmF0dGxlc2hpcFwiLCA0LCAwLCBmYWxzZSwgZmFsc2UpO1xuICBwMmRlc3Ryb3llciA9IHNoaXAoXCJkZXN0cm95ZXJcIiwgMywgMCwgZmFsc2UsIGZhbHNlKTtcbiAgcDJzdWJtYXJpbmUgPSBzaGlwKFwic3VibWFyaW5lXCIsIDMsIDAsIGZhbHNlLCBmYWxzZSk7XG4gIHAycGF0cm9sQm9hdCA9IHNoaXAoXCJwYXRyb2xCb2F0XCIsIDIsIDAsIGZhbHNlLCBmYWxzZSk7XG5cbiAgcDJBbGxTaGlwcyA9IFtcbiAgICBwMmNhcnJpZXIsXG4gICAgcDJkZXN0cm95ZXIsXG4gICAgcDJiYXR0bGVzaGlwLFxuICAgIHAyc3VibWFyaW5lLFxuICAgIHAycGF0cm9sQm9hdCxcbiAgXTtcblxuICAvL01ha2UgUGxheWVyc1xuICBwbGF5ZXIxID0gcGxheWVyKFxuICAgIFwiUGxheWVyIDFcIixcbiAgICBwbGF5ZXIxQm9hcmQsXG4gICAgXCJIdW1hblwiLFxuICAgIHAxQWxsU2hpcHMsXG4gICAgcDFCb2FyZEluc3RhbmNlXG4gICk7XG5cbiAgcGxheWVyMiA9IHBsYXllcihcIkNvbXB1dGVyXCIsIHBsYXllcjJCb2FyZCwgXCJBSVwiLCBwMkFsbFNoaXBzLCBwMkJvYXJkSW5zdGFuY2UpO1xuXG4gIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIxQm9hcmQsIHAxZ2FtZUJvYXJkKTtcbiAgcmVuZGVyR2FtZUJvYXJkKHBsYXllcjJCb2FyZCwgcDJnYW1lQm9hcmQpO1xuXG4gIC8vZXZlbnQgbGlzdGVuZXJzXG4gIHNldHVwRXZlbnRMaXN0ZW5lcnMocDFnYW1lQm9hcmQsIHAyZ2FtZUJvYXJkKTtcblxuICByZXR1cm4ge1xuICAgIHBsYXllcjEsXG4gICAgcGxheWVyMUJvYXJkLFxuICAgIHAxQWxsU2hpcHMsXG4gICAgcGxheWVyMixcbiAgICBwbGF5ZXIyQm9hcmQsXG4gICAgcDJBbGxTaGlwcyxcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2V0dXBFdmVudExpc3RlbmVycyhwMWdhbWVCb2FyZCwgcDJnYW1lQm9hcmQpIHtcbiAgc2hpcHlhcmRTaGlwcy5mb3JFYWNoKChkcmFnZ2FibGUpID0+IHtcbiAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnU3RhcnQpO1xuICAgIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBkcmFnRW5kKTtcbiAgfSk7XG5cbiAgcDFnYW1lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGRyYWdPdmVyKTtcbiAgcDFnYW1lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZHJvcFNoaXApO1xuXG4gIHAyZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzZWxlY3RUYXJnZXQpO1xuICBwMmdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGhvdmVyKTtcbiAgcDJnYW1lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIGhvdmVyKTtcbiAgc3RhcnRHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGFydEdhbWUpO1xufVxuXG5mdW5jdGlvbiBzdGFydEdhbWUoc2hpcHlhcmQpIHtcbiAgaWYgKFxuICAgIGRyb3BwZWRBcnJheS5sZW5ndGggPj0gcDFBbGxTaGlwcy5sZW5ndGggJiZcbiAgICBnYW1lQWN0aXZlID09IGZhbHNlICYmXG4gICAgcmVzdGFydGFibGUgPT0gZmFsc2VcbiAgKSB7XG4gICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IFwiU3RhcnRpbmcsIHRha2UgeW91ciBzaG90IVwiO1xuICAgIGdhbWVBY3RpdmUgPSB0cnVlO1xuICAgIHJlc3RhcnRhYmxlID0gZmFsc2U7XG4gICAgc3RhcnRHYW1lQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBzaGlweWFyZC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICBwbGFjZVAyU2hpcHMoKTtcbiAgfSBlbHNlIGlmIChnYW1lQWN0aXZlID09IGZhbHNlICYmIHJlc3RhcnRhYmxlID09IHRydWUpIHtcbiAgICByZXNldEdhbWUoKTtcbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJQbGFjZSBhbGwgb2YgeW91ciBzaGlwcyBmaXJzdFwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc2V0R2FtZSgpIHtcbiAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IFwiUmVzdGFydGluZywgUGxhY2UgeW91ciBzaGlwcyFcIjtcbiAgc3RhcnRHYW1lQnV0dG9uLnRleHRDb250ZW50ID0gXCJTdGFydCBnYW1lXCI7XG4gIC8vVXBkYXRlIGdsb2JhbCB2YXJpYWJsZXNcbiAgcmVzdGFydGFibGUgPSBmYWxzZTtcbiAgZ2FtZUFjdGl2ZSA9IGZhbHNlO1xuICBkcm9wcGVkQXJyYXkgPSBbXTtcbiAgcDFCb2FyZEluc3RhbmNlID0gZ2FtZUJvYXJkKGdyaWRTaXplKTtcbiAgcGxheWVyMUJvYXJkID0gcDFCb2FyZEluc3RhbmNlLmNyZWF0ZUJvYXJkKCk7XG4gIHAyQm9hcmRJbnN0YW5jZSA9IGdhbWVCb2FyZChncmlkU2l6ZSk7XG4gIHBsYXllcjJCb2FyZCA9IHAyQm9hcmRJbnN0YW5jZS5jcmVhdGVCb2FyZCgpO1xuICBpbml0aWFsaXNlKCk7XG5cbiAgLy9jbGVhciB0aGUgZG9tXG4gIG1haW4udGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gIC8vU2V0IHVwIGV2ZW50IGxpc3RlbmVycyAmIHJlbmRlclxuICBjb25zdCB7IHAxZ2FtZUJvYXJkLCBwMmdhbWVCb2FyZCB9ID0gc2V0VXBEb20oKTtcblxuICByZW5kZXJHYW1lQm9hcmQocGxheWVyMUJvYXJkLCBwMWdhbWVCb2FyZCk7XG4gIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIyQm9hcmQsIHAyZ2FtZUJvYXJkKTtcbiAgc2V0dXBFdmVudExpc3RlbmVycyhwMWdhbWVCb2FyZCwgcDJnYW1lQm9hcmQpO1xufVxuXG5mdW5jdGlvbiBwbGFjZVAyU2hpcHMoKSB7XG4gIHAyQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMkJvYXJkLCBwMmNhcnJpZXIsIDksIDEpO1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJkZXN0cm95ZXIsIDMsIDMpO1xuICBwMkJvYXJkSW5zdGFuY2UucGxhY2VTaGlwKHBsYXllcjJCb2FyZCwgcDJiYXR0bGVzaGlwLCA1LCAyKTtcbiAgcDJCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIyQm9hcmQsIHAyc3VibWFyaW5lLCAyLCAxKTtcbiAgcDJCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChwbGF5ZXIyQm9hcmQsIHAycGF0cm9sQm9hdCwgNiwgMCk7XG4gIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIyQm9hcmQsIHAyZ2FtZUJvYXJkKTtcbn1cblxuZnVuY3Rpb24gZHJhZ1N0YXJ0KGUpIHtcbiAgZHJhZ2dlZFNoaXAgPSBlLnRhcmdldDtcbiAgZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LmFkZChcImRyYWdnaW5nXCIpO1xuICBub3REcm9wcGVkID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGRyYWdPdmVyKGUpIHtcbiAgbm90RHJvcHBlZCA9IGZhbHNlO1xuXG4gIGUucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gZHJhZ0VuZChlKSB7XG4gIGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJkcmFnZ2luZ1wiKTtcbn1cblxuZnVuY3Rpb24gZHJvcFNoaXAoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IHN0YXJ0Q29sID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2wsIDEwKTtcbiAgY29uc3Qgc3RhcnRSb3cgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApO1xuXG4gIGNvbnN0IHRoaXNTaGlwID0gcDFBbGxTaGlwc1tkcmFnZ2VkU2hpcC5pZF07XG4gIGNvbnN0IHNoaXBOYW1lID0gZHJhZ2dlZFNoaXAuZGF0YXNldC5zaGlwVHlwZTtcbiAgY29uc3QgcGxhY2VtZW50UmVzdWx0ID0gcDFCb2FyZEluc3RhbmNlLnBsYWNlU2hpcChcbiAgICBwbGF5ZXIxQm9hcmQsXG4gICAgdGhpc1NoaXAsXG4gICAgc3RhcnRSb3csXG4gICAgc3RhcnRDb2xcbiAgKTtcblxuICBpZiAocGxhY2VtZW50UmVzdWx0KSB7XG4gICAgZHJvcHBlZEFycmF5LnB1c2godGhpc1NoaXApO1xuICAgIHAxQm9hcmRJbnN0YW5jZS5wbGFjZVNoaXAocGxheWVyMUJvYXJkLCB0aGlzU2hpcCwgc3RhcnRSb3csIHN0YXJ0Q29sKTtcbiAgICBkcmFnZ2VkU2hpcC5yZW1vdmUoKTtcbiAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gYFlvdSd2ZSBwbGFjZWQgeW91ciAke3NoaXBOYW1lfWA7XG4gIH0gZWxzZSB7XG4gICAgbm90RHJvcHBlZCA9IHRydWU7XG4gICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IFwiQ2FuJ3QgZ28gdGhlcmUsIHRyeSBhZ2FpbiFcIjtcbiAgfVxuXG4gIHJlbmRlckdhbWVCb2FyZChwbGF5ZXIxQm9hcmQsIHAxZ2FtZUJvYXJkKTtcbiAgZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LnJlbW92ZShcImRyYWdnaW5nXCIpO1xufVxuXG5mdW5jdGlvbiBzZWxlY3RUYXJnZXQoZSkge1xuICBpZiAoZ2FtZUFjdGl2ZSkge1xuICAgIGxldCBjZWxsID0gZS50YXJnZXQ7XG4gICAgaWYgKGNlbGwgJiYgIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGlzYWJsZWRcIikpIHtcbiAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGNlbGwuZGF0YXNldC5jb2wsIDEwKTtcbiAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGNlbGwuZGF0YXNldC5yb3csIDEwKTtcbiAgICAgIHBsYXllcjEuYXR0YWNrKHBsYXllcjIsIHJvdywgY29sKTtcbiAgICAgIHNldFRpbWVvdXQoaGFuZGxlUmVzdWx0VmFsaWRhdGlvbiwgODAwKTsgLy9TZXQgdGhpcyBsb25nZXIgdGhhbiB0aGUgbW92ZSBkZWxheVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBob3ZlcihlKSB7XG4gIGxldCBoaWdobGlnaHRlZENlbGwgPSBlLnRhcmdldDtcbiAgaGlnaGxpZ2h0ZWRDZWxsLmNsYXNzTGlzdC50b2dnbGUoXCJoaWdobGlnaHRlZFwiKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlUmVzdWx0VmFsaWRhdGlvbigpIHtcbiAgY29uc3QgaXNHYW1lV29uID0gcDJCb2FyZEluc3RhbmNlLmNoZWNrRm9yV2luKHBsYXllcjIuc2hpcHMpO1xuICBjb25zdCBpc0dhbWVMb3N0ID0gcDFCb2FyZEluc3RhbmNlLmNoZWNrRm9yV2luKHBsYXllcjEuc2hpcHMpO1xuXG4gIGlmIChpc0dhbWVXb24gfHwgaXNHYW1lTG9zdCkge1xuICAgIGdhbWVBY3RpdmUgPSBmYWxzZTtcblxuICAgIHN0YXJ0R2FtZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUmVzdGFydFwiO1xuICAgIHN0YXJ0R2FtZUJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHJlc3RhcnRhYmxlID0gdHJ1ZTtcbiAgICBwMmdhbWVCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VsZWN0VGFyZ2V0KTtcblxuICAgIGlmIChpc0dhbWVXb24pIHtcbiAgICAgIHRoZVdpblxuICAgICAgICAucGxheSgpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkF1ZGlvIHBsYXllZFwiKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBcIkdhbWUgb3ZlciwgeW91IHdpbiFcIjtcbiAgICB9XG4gICAgaWYgKGlzR2FtZUxvc3QpIHtcbiAgICAgIHRoZURlZmVhdFxuICAgICAgICAucGxheSgpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkF1ZGlvIHBsYXllZFwiKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gXCJHYW1lIG92ZXIsIHlvdSBMb3NlIVwiO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQge1xuICBwbGF5ZXIxQm9hcmQsXG4gIHBsYXllcjJCb2FyZCxcbiAgcDFnYW1lQm9hcmQsXG4gIHAyZ2FtZUJvYXJkLFxuICBwbGF5ZXIxLFxuICBwbGF5ZXIyLFxuICBwMUJvYXJkSW5zdGFuY2UsXG4gIHAyQm9hcmRJbnN0YW5jZSxcbiAgbWVzc2FnZUJveCxcbiAgcGxheWVyTmFtZSxcbn07XG4iLCIvKiogQGZvcm1hdCAqL1xuXG5pbXBvcnQgeyBwMWdhbWVCb2FyZCwgcGxheWVyTmFtZSB9IGZyb20gXCIuL21haW4uanNcIjtcblxuY29uc3QgcmVuZGVyR2FtZUJvYXJkID0gKGJvYXJkLCBjb250YWluZXIpID0+IHtcbiAgY29uc3QgZ3JpZFNpemUgPSAxMDtcbiAgY29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgY29uc3QgYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBib2FyZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtY29udGFpbmVyXCIpO1xuICBib2FyZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFxuICAgIGNvbnRhaW5lciA9PT0gcDFnYW1lQm9hcmQgPyBcInBsYXllcjFcIiA6IFwicGxheWVyMlwiXG4gICk7XG4gIGNvbnN0IHBsYXllcjFsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBwbGF5ZXIxbGFiZWwudGV4dENvbnRlbnQgPSBwbGF5ZXJOYW1lID8gcGxheWVyTmFtZSA6IFwiWW91XCI7XG4gIGNvbnN0IHBsYXllcjJsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBwbGF5ZXIybGFiZWwudGV4dENvbnRlbnQgPSBcIkNvbXB1dGVyXCI7XG5cbiAgaWYgKGNvbnRhaW5lciA9PT0gcDFnYW1lQm9hcmQpIHtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVyMWxhYmVsKTtcbiAgfSBlbHNlIHtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVyMmxhYmVsKTtcbiAgfVxuXG4gIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IGdyaWRTaXplOyByb3crKykge1xuICAgIGNvbnN0IHJvd0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvd0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkLXJvd1wiKTtcblxuICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGdyaWRTaXplOyBjb2wrKykge1xuICAgICAgY29uc3QgY2VsbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkLWNlbGxcIik7XG4gICAgICBjZWxsRWxlbWVudC5kYXRhc2V0LnJvdyA9IHJvdztcbiAgICAgIGNlbGxFbGVtZW50LmRhdGFzZXQuY29sID0gY29sO1xuXG4gICAgICAvL3NldCBzdHlsaW5nIGJhc2VkIG9uIGNlbGwgY29udGVudCBpLmUuIHdhdGVyLCBoaXQsIHNoaXAsIG1pc3NcbiAgICAgIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IFwid2F0ZXJcIikge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwid2F0ZXJcIik7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2FyZFtyb3ddW2NvbF0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaWYgKGNvbnRhaW5lciA9PSBwMWdhbWVCb2FyZCkge1xuICAgICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJlbmVteS1zaGlwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNlbGxFbGVtZW50LmRhdGFzZXQuc2hpcFR5cGUgPSBgJHtib2FyZFtyb3ddW2NvbF0udHlwZX1gO1xuICAgICAgICBjZWxsRWxlbWVudC5kYXRhc2V0Lm9yaWVudGF0aW9uID0gYm9hcmRbcm93XVtjb2xdLmlzVmVydGljYWxcbiAgICAgICAgICA/IFwidmVydGljYWxcIlxuICAgICAgICAgIDogXCJob3Jpem9udGFsXCI7XG4gICAgICB9IGVsc2UgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gXCJISVRcIikge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaXRTaGlwXCIpO1xuICAgICAgfSBlbHNlIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IFwiTUlTU1wiKSB7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XG4gICAgICB9IGVsc2UgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gXCJTVU5LXCIpIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInN1bmtcIik7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhpdFNoaXBcIik7XG4gICAgICB9XG5cbiAgICAgIHJvd0VsZW1lbnQuYXBwZW5kQ2hpbGQoY2VsbEVsZW1lbnQpO1xuICAgIH1cbiAgICBib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChyb3dFbGVtZW50KTtcbiAgfVxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb250YWluZXIpO1xufTtcblxuZXhwb3J0IHsgcmVuZGVyR2FtZUJvYXJkIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiY3Jvc3NoYWlyLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyoqIEBmb3JtYXQgKi9cblxuOnJvb3Qge1xuICBmb250LWZhbWlseTogXCJZc2FiZWF1IFNDXCIsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgY29sb3I6IHdoaXRlO1xuICAtLWRhcmstY3lhbjogIzBlOTU5NDtcbiAgLS13aGVhdDogI2Y1ZGZiYjtcbiAgLS1tb3VudGJhdHRlbi1waW5rOiAjOTU4MThkO1xufVxuXG5odG1sIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgb3ZlcnNjcm9sbC1iZWhhdmlvcjogbm9uZTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG5ib2R5IHtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIGhlaWdodDogMTAwJTtcbn1cblxubWFpbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBoZWlnaHQ6IDEwMHZoO1xufVxuXG4uYmFja2dyb3VuZC1pbWcge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIG9iamVjdC1wb3NpdGlvbjogY2VudGVyO1xuICBvcGFjaXR5OiAwLjc7XG4gIHotaW5kZXg6IC0xO1xufVxuXG4uY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnRpdGxlIHtcbiAgY29sb3I6IGJsYWNrO1xuICBmb250LWZhbWlseTogXCJOb3RhYmxlXCIsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuaW5wdXQge1xuICBmb250LXNpemU6IDFyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbi5kcmFnZ2FibGUge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5pbmZvIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA1cHg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5nYW1lLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1hcmdpbjogMzVweDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogNTBweDtcbn1cblxuLnBsYXllcjEtYm9hcmQsXG4ucGxheWVyMi1ib2FyZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGNvbG9yOiBibGFjaztcbn1cblxuLmJvYXJkLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5zaGlweWFyZENvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGNvbG9yOiBibGFjaztcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLnNoaXB5YXJkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IDVweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg1NiwgMTE4LCAyMTcsIDAuNCk7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIHdpZHRoOiAzOHZ3O1xuICBtaW4taGVpZ2h0OiAxNXZ3O1xuICBib3JkZXI6IDFweCBkYXNoZWQgYmxhY2s7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbn1cblxuLnN0YXJ0IHtcbiAgYmFja2dyb3VuZDogIzVlNWRmMDtcbiAgYm9yZGVyLXJhZGl1czogOTlweDtcbiAgYm94LXNoYWRvdzogIzVlNWRmMCAwIDEwcHggMjBweCAtMTBweDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1mYW1pbHk6IEludGVyLCBIZWx2ZXRpY2EsIFwiQXBwbGUgQ29sb3IgRW1vamlcIiwgXCJTZWdvZSBVSSBFbW9qaVwiLFxuICAgIE5vdG9Db2xvckVtb2ppLCBcIk5vdG8gQ29sb3IgRW1vamlcIiwgXCJTZWdvZSBVSSBTeW1ib2xcIiwgXCJBbmRyb2lkIEVtb2ppXCIsXG4gICAgRW1vamlTeW1ib2xzLCAtYXBwbGUtc3lzdGVtLCBzeXN0ZW0tdWksIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsXG4gICAgXCJOb3RvIFNhbnNcIiwgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gIHBhZGRpbmc6IDhweCAxOHB4O1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgdG91Y2gtYWN0aW9uOiBtYW5pcHVsYXRpb247XG4gIHdpZHRoOiBmaXQtY29udGVudDtcbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcbiAgYm9yZGVyOiAwO1xufVxuXG4uc3RhcnQ6ZGlzYWJsZWQge1xuICBvcGFjaXR5OiAwO1xuICBjdXJzb3I6IGF1dG87XG59XG5cbi5tZXNzYWdlIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBmb250LXdlaWdodDogNTAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHdpZHRoOiAyMHJlbTtcbiAgaGVpZ2h0OiA0cmVtO1xufVxuXG4uYm9hcmQtcm93IHtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLmJvYXJkLWNlbGwge1xuICBvcGFjaXR5OiAwLjk7XG4gIGZsZXg6IDE7XG4gIHdpZHRoOiAxcmVtO1xuICBoZWlnaHQ6IDFyZW07XG4gIGJvcmRlcjogMC4xcHggZG90dGVkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWI5NWUwO1xuICBjdXJzb3I6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KSAxMiAxMiwgY3Jvc3NoYWlyO1xufVxuXG4uc2hpcCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbiAgaGVpZ2h0OiAxcmVtO1xufVxuXG4uaGl0U2hpcCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG59XG5cbi5zaGlwOjpiZWZvcmUge1xuICBjb250ZW50OiBcIlwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvcmRlcjogMC4zdm1pbiBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XG4gIHRvcDogLTFweDtcbiAgYm90dG9tOiAtMXB4O1xuICBsZWZ0OiAtMXB4O1xuICByaWdodDogLTFweDtcbn1cblxuW2RhdGEtb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiXTo6YmVmb3JlIHtcbiAgYW5pbWF0aW9uOiByaXBwbGVzWSAzcyBsaW5lYXIgaW5maW5pdGU7XG4gIGJvcmRlci10b3A6IG5vbmU7XG4gIGJvcmRlci1ib3R0b206IG5vbmU7XG59XG5cbltkYXRhLW9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiXTo6YmVmb3JlIHtcbiAgYW5pbWF0aW9uOiByaXBwbGVzWCAzcyBsaW5lYXIgaW5maW5pdGU7XG4gIGJvcmRlci1sZWZ0OiBub25lO1xuICBib3JkZXItcmlnaHQ6IG5vbmU7XG59XG5cbkBrZXlmcmFtZXMgcmlwcGxlc1gge1xuICAwJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHNjYWxlWCgxKTtcbiAgfVxuXG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiBzY2FsZVgoMS42KTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHJpcHBsZXNZIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMSk7XG4gIH1cblxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogc2NhbGVZKDEuNik7XG4gIH1cbn1cblxuLmVuZW15LXNoaXAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWI5NWUwO1xuICBoZWlnaHQ6IDFyZW07XG4gIC8qIGJvcmRlcjogMC4xcHggZG90dGVkICNjY2M7ICovXG59XG5cbi5kcmFnZ2FibGUge1xuICBjdXJzb3I6IG1vdmU7XG59XG5cbi5kcmFnZ2luZyB7XG4gIG9wYWNpdHk6IDAuNTtcbn1cblxuLmhpZ2hsaWdodGVkIHtcbiAgb3BhY2l0eTogMC41O1xufVxuXG4uY2FycmllciB7XG4gIHdpZHRoOiAxMnJlbTtcbn1cblxuLmRlc3Ryb3llciB7XG4gIHdpZHRoOiAxMnJlbTtcbn1cblxuLmJhdHRsZXNoaXAge1xuICB3aWR0aDogOXJlbTtcbn1cblxuLmRlc3Ryb3llciB7XG4gIHdpZHRoOiA3cmVtO1xufVxuXG4uc3VibWFyaW5lIHtcbiAgd2lkdGg6IDdyZW07XG59XG5cbi5wYXRyb2xCb2F0IHtcbiAgd2lkdGg6IDQuNXJlbTtcbn1cblxuLmhpdCxcbi5taXNzLFxuLnN1bmsge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmhpdDo6YWZ0ZXIsXG4ubWlzczo6YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gIHdpZHRoOiAydm1pbjtcbiAgaGVpZ2h0OiAydm1pbjtcbn1cblxuLnN1bmsge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xufVxuXG4ubWlzczo6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuLmhpdDo6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5taXNzOjpiZWZvcmUge1xuICBjb250ZW50OiBcIlwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGFuaW1hdGlvbjogbWlzcyAwLjJzIGVhc2Utb3V0IGZvcndhcmRzO1xuICBib3JkZXI6IDAuMXZtaW4gc29saWQgd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gIHdpZHRoOiAydm1pbjtcbiAgaGVpZ2h0OiAydm1pbjtcbn1cblxuLyogQGtleWZyYW1lcyBtaXNzIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgfVxuXG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSg0KTtcbiAgfVxufSAqL1xuXG4uc3Vuazo6YmVmb3JlIHtcbiAgY29udGVudDogXCJYXCI7XG4gIGNvbG9yOiByZ2IoMjExLCA5LCA1MCk7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnBsYXllcjEge1xuICBtYXJnaW4tYm90dG9tOiA1MHB4O1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSxhQUFhOztBQUViO0VBQ0UscUNBQXFDO0VBQ3JDLGVBQWU7RUFDZixZQUFZO0VBQ1osb0JBQW9CO0VBQ3BCLGdCQUFnQjtFQUNoQiwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIseUJBQXlCO0VBQ3pCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGNBQWM7RUFDZCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZUFBZTtFQUNmLE1BQU07RUFDTixPQUFPO0VBQ1AsV0FBVztFQUNYLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixrQ0FBa0M7RUFDbEMsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxhQUFhO0VBQ2IsWUFBWTtFQUNaLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixRQUFRO0VBQ1Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixZQUFZO0VBQ1osdUJBQXVCO0VBQ3ZCLFNBQVM7QUFDWDs7QUFFQTs7RUFFRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixlQUFlO0VBQ2YsUUFBUTtFQUNSLHlDQUF5QztFQUN6QyxhQUFhO0VBQ2IsV0FBVztFQUNYLGdCQUFnQjtFQUNoQix3QkFBd0I7RUFDeEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixxQ0FBcUM7RUFDckMsc0JBQXNCO0VBQ3RCLGNBQWM7RUFDZCxlQUFlO0VBQ2Y7OzsyQkFHeUI7RUFDekIsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLHlCQUF5QjtFQUN6QiwwQkFBMEI7RUFDMUIsa0JBQWtCO0VBQ2xCLHNCQUFzQjtFQUN0QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsWUFBWTtFQUNaLE9BQU87RUFDUCxXQUFXO0VBQ1gsWUFBWTtFQUNaLDZDQUE2QztFQUM3QyxrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLGdFQUE2QztBQUMvQzs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsWUFBWTtBQUNkOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQiw4Q0FBOEM7RUFDOUMsU0FBUztFQUNULFlBQVk7RUFDWixVQUFVO0VBQ1YsV0FBVztBQUNiOztBQUVBO0VBQ0Usc0NBQXNDO0VBQ3RDLGdCQUFnQjtFQUNoQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxzQ0FBc0M7RUFDdEMsaUJBQWlCO0VBQ2pCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFO0lBQ0UsVUFBVTtJQUNWLG9CQUFvQjtFQUN0Qjs7RUFFQTtJQUNFLFVBQVU7SUFDVixzQkFBc0I7RUFDeEI7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsVUFBVTtJQUNWLG9CQUFvQjtFQUN0Qjs7RUFFQTtJQUNFLFVBQVU7SUFDVixzQkFBc0I7RUFDeEI7QUFDRjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osK0JBQStCO0FBQ2pDOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBOzs7RUFHRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTs7RUFFRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osYUFBYTtBQUNmOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixzQ0FBc0M7RUFDdEMsMkJBQTJCO0VBQzNCLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osYUFBYTtBQUNmOztBQUVBOzs7Ozs7Ozs7O0dBVUc7O0FBRUg7RUFDRSxZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqIEBmb3JtYXQgKi9cXG5cXG46cm9vdCB7XFxuICBmb250LWZhbWlseTogXFxcIllzYWJlYXUgU0NcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgLS1kYXJrLWN5YW46ICMwZTk1OTQ7XFxuICAtLXdoZWF0OiAjZjVkZmJiO1xcbiAgLS1tb3VudGJhdHRlbi1waW5rOiAjOTU4MThkO1xcbn1cXG5cXG5odG1sIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBvdmVyc2Nyb2xsLWJlaGF2aW9yOiBub25lO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5ib2R5IHtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLmJhY2tncm91bmQtaW1nIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcbiAgb2JqZWN0LXBvc2l0aW9uOiBjZW50ZXI7XFxuICBvcGFjaXR5OiAwLjc7XFxuICB6LWluZGV4OiAtMTtcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi50aXRsZSB7XFxuICBjb2xvcjogYmxhY2s7XFxuICBmb250LWZhbWlseTogXFxcIk5vdGFibGVcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxufVxcblxcbmlucHV0IHtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1hcmdpbjogMDtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3JkZXI6IG5vbmU7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbn1cXG5cXG4uZHJhZ2dhYmxlIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmluZm8ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogNXB4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5nYW1lLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgbWFyZ2luOiAzNXB4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDUwcHg7XFxufVxcblxcbi5wbGF5ZXIxLWJvYXJkLFxcbi5wbGF5ZXIyLWJvYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuXFxuLmJvYXJkLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLnNoaXB5YXJkQ29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbG9yOiBibGFjaztcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcblxcbi5zaGlweWFyZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgZ2FwOiA1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDU2LCAxMTgsIDIxNywgMC40KTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB3aWR0aDogMzh2dztcXG4gIG1pbi1oZWlnaHQ6IDE1dnc7XFxuICBib3JkZXI6IDFweCBkYXNoZWQgYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxufVxcblxcbi5zdGFydCB7XFxuICBiYWNrZ3JvdW5kOiAjNWU1ZGYwO1xcbiAgYm9yZGVyLXJhZGl1czogOTlweDtcXG4gIGJveC1zaGFkb3c6ICM1ZTVkZjAgMCAxMHB4IDIwcHggLTEwcHg7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBmb250LWZhbWlseTogSW50ZXIsIEhlbHZldGljYSwgXFxcIkFwcGxlIENvbG9yIEVtb2ppXFxcIiwgXFxcIlNlZ29lIFVJIEVtb2ppXFxcIixcXG4gICAgTm90b0NvbG9yRW1vamksIFxcXCJOb3RvIENvbG9yIEVtb2ppXFxcIiwgXFxcIlNlZ29lIFVJIFN5bWJvbFxcXCIsIFxcXCJBbmRyb2lkIEVtb2ppXFxcIixcXG4gICAgRW1vamlTeW1ib2xzLCAtYXBwbGUtc3lzdGVtLCBzeXN0ZW0tdWksIFxcXCJTZWdvZSBVSVxcXCIsIFJvYm90bywgXFxcIkhlbHZldGljYSBOZXVlXFxcIixcXG4gICAgXFxcIk5vdG8gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBwYWRkaW5nOiA4cHggMThweDtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHRvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uO1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcXG4gIGJvcmRlcjogMDtcXG59XFxuXFxuLnN0YXJ0OmRpc2FibGVkIHtcXG4gIG9wYWNpdHk6IDA7XFxuICBjdXJzb3I6IGF1dG87XFxufVxcblxcbi5tZXNzYWdlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIHdpZHRoOiAyMHJlbTtcXG4gIGhlaWdodDogNHJlbTtcXG59XFxuXFxuLmJvYXJkLXJvdyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uYm9hcmQtY2VsbCB7XFxuICBvcGFjaXR5OiAwLjk7XFxuICBmbGV4OiAxO1xcbiAgd2lkdGg6IDFyZW07XFxuICBoZWlnaHQ6IDFyZW07XFxuICBib3JkZXI6IDAuMXB4IGRvdHRlZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWI5NWUwO1xcbiAgY3Vyc29yOiB1cmwoXFxcImNyb3NzaGFpci5wbmdcXFwiKSAxMiAxMiwgY3Jvc3NoYWlyO1xcbn1cXG5cXG4uc2hpcCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgaGVpZ2h0OiAxcmVtO1xcbn1cXG5cXG4uaGl0U2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbn1cXG5cXG4uc2hpcDo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm9yZGVyOiAwLjN2bWluIHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcXG4gIHRvcDogLTFweDtcXG4gIGJvdHRvbTogLTFweDtcXG4gIGxlZnQ6IC0xcHg7XFxuICByaWdodDogLTFweDtcXG59XFxuXFxuW2RhdGEtb3JpZW50YXRpb249XFxcInZlcnRpY2FsXFxcIl06OmJlZm9yZSB7XFxuICBhbmltYXRpb246IHJpcHBsZXNZIDNzIGxpbmVhciBpbmZpbml0ZTtcXG4gIGJvcmRlci10b3A6IG5vbmU7XFxuICBib3JkZXItYm90dG9tOiBub25lO1xcbn1cXG5cXG5bZGF0YS1vcmllbnRhdGlvbj1cXFwiaG9yaXpvbnRhbFxcXCJdOjpiZWZvcmUge1xcbiAgYW5pbWF0aW9uOiByaXBwbGVzWCAzcyBsaW5lYXIgaW5maW5pdGU7XFxuICBib3JkZXItbGVmdDogbm9uZTtcXG4gIGJvcmRlci1yaWdodDogbm9uZTtcXG59XFxuXFxuQGtleWZyYW1lcyByaXBwbGVzWCB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogc2NhbGVYKDEpO1xcbiAgfVxcblxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogc2NhbGVYKDEuNik7XFxuICB9XFxufVxcblxcbkBrZXlmcmFtZXMgcmlwcGxlc1kge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgxKTtcXG4gIH1cXG5cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgxLjYpO1xcbiAgfVxcbn1cXG5cXG4uZW5lbXktc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWI5NWUwO1xcbiAgaGVpZ2h0OiAxcmVtO1xcbiAgLyogYm9yZGVyOiAwLjFweCBkb3R0ZWQgI2NjYzsgKi9cXG59XFxuXFxuLmRyYWdnYWJsZSB7XFxuICBjdXJzb3I6IG1vdmU7XFxufVxcblxcbi5kcmFnZ2luZyB7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcblxcbi5oaWdobGlnaHRlZCB7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcblxcbi5jYXJyaWVyIHtcXG4gIHdpZHRoOiAxMnJlbTtcXG59XFxuXFxuLmRlc3Ryb3llciB7XFxuICB3aWR0aDogMTJyZW07XFxufVxcblxcbi5iYXR0bGVzaGlwIHtcXG4gIHdpZHRoOiA5cmVtO1xcbn1cXG5cXG4uZGVzdHJveWVyIHtcXG4gIHdpZHRoOiA3cmVtO1xcbn1cXG5cXG4uc3VibWFyaW5lIHtcXG4gIHdpZHRoOiA3cmVtO1xcbn1cXG5cXG4ucGF0cm9sQm9hdCB7XFxuICB3aWR0aDogNC41cmVtO1xcbn1cXG5cXG4uaGl0LFxcbi5taXNzLFxcbi5zdW5rIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5oaXQ6OmFmdGVyLFxcbi5taXNzOjphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvcmRlci1yYWRpdXM6IDEwMCU7XFxuICB3aWR0aDogMnZtaW47XFxuICBoZWlnaHQ6IDJ2bWluO1xcbn1cXG5cXG4uc3VuayB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbn1cXG5cXG4ubWlzczo6YWZ0ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVxcblxcbi5oaXQ6OmFmdGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLm1pc3M6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGFuaW1hdGlvbjogbWlzcyAwLjJzIGVhc2Utb3V0IGZvcndhcmRzO1xcbiAgYm9yZGVyOiAwLjF2bWluIHNvbGlkIHdoaXRlO1xcbiAgYm9yZGVyLXJhZGl1czogMTAwJTtcXG4gIHdpZHRoOiAydm1pbjtcXG4gIGhlaWdodDogMnZtaW47XFxufVxcblxcbi8qIEBrZXlmcmFtZXMgbWlzcyB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICB9XFxuXFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSg0KTtcXG4gIH1cXG59ICovXFxuXFxuLnN1bms6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiWFxcXCI7XFxuICBjb2xvcjogcmdiKDIxMSwgOSwgNTApO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnBsYXllcjEge1xcbiAgbWFyZ2luLWJvdHRvbTogNTBweDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImluZGV4XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4uanNcIik7XG4iLCIiXSwibmFtZXMiOlsicGxheWVyMSIsInBsYXllcjIiLCJwbGF5ZXIxQm9hcmQiLCJwbGF5ZXIyQm9hcmQiLCJwMUJvYXJkSW5zdGFuY2UiLCJwMWdhbWVCb2FyZCIsInAyZ2FtZUJvYXJkIiwibWVzc2FnZUJveCIsInJlbmRlckdhbWVCb2FyZCIsImN1cnJlbnRQbGF5ZXIiLCJ0aGVIaXQiLCJBdWRpbyIsInNyYyIsInRoZU1pc3MiLCJ0aGVTdW5rIiwic2hpcCIsInR5cGUiLCJsZW5ndGgiLCJoaXRDb3VudCIsInNpbmtTdGF0dXMiLCJpc1ZlcnRpY2FsIiwiaGl0IiwiaXNTdW5rIiwiZ2FtZUJvYXJkIiwiZ3JpZFNpemUiLCJjcmVhdGVCb2FyZCIsImJvYXJkIiwiQXJyYXkiLCJmaWxsIiwibWFwIiwicmVzZXRCb2FyZCIsInBsYWNlU2hpcCIsInN0YXJ0aW5nUm93Iiwic3RhcnRpbmdDb2wiLCJzaGlwTGVuZ3RoIiwiaSIsInJlY2VpdmVBdHRhY2siLCJyb3ciLCJjb2wiLCJzaGlwcyIsImNoZWNrRm9yV2luIiwiYWxsU2hpcHNTdW5rIiwiZXZlcnkiLCJwbGF5ZXIiLCJuYW1lIiwiZ2V0TmFtZSIsImdldFR5cGUiLCJnZXRBaUNob2ljZSIsImF2YWlsYWJsZVNwb3RzIiwieCIsInkiLCJwdXNoIiwicmFuZG9tSW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJhaUNob2ljZSIsImF0dGFjayIsImVuZW15IiwiZW5lbXlCb2FyZCIsImF0dGFja1Jlc3VsdCIsImN1cnJlbnRUaW1lIiwicGxheSIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiY2F0Y2giLCJlcnJvciIsInRleHRDb250ZW50IiwiYWxsUDJzaGlwc1N1bmsiLCJtYWtlQWlNb3ZlIiwiYWlBdHRhY2tSZXN1bHQiLCJzZXRUaW1lb3V0IiwicmVxdWlyZSIsImJhY2tncm91bmRJbWFnZSIsInNob3RTb3VuZCIsInNwbGFzaCIsInN1bmtTb3VuZCIsInN0YXJ0TXVzaWMiLCJ3aW5NdXNpYyIsIm1haW4iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJwbGF5ZXJOYW1lIiwidGhlU2hvdCIsInN0YXJ0U291bmQiLCJ0aGVXaW4iLCJ0aGVEZWZlYXQiLCJzcGxhc2hTY3JlZW4iLCJjbGFzc0xpc3QiLCJhZGQiLCJzcGxhc2hTY3JlZW5Db250YWluZXIiLCJjcmVhdGVFbGVtZW50IiwidGl0bGUiLCJuYW1lUHJvbXB0IiwicGxhY2Vob2xkZXIiLCJhZGRFdmVudExpc3RlbmVyIiwidXBkYXRlTmFtZSIsIm1haW5CdXR0b24iLCJsb2FkR2FtZSIsImFwcGVuZENoaWxkIiwiZSIsInRhcmdldCIsInZhbHVlIiwic2V0VXBEb20iLCJpbml0aWFsaXNlIiwiYmFja2dyb3VuZEltZyIsInN0eWxlIiwiZ2FtZUFjdGl2ZSIsInJlc3RhcnRhYmxlIiwiZHJvcHBlZEFycmF5Iiwibm90RHJvcHBlZCIsInAxY2FycmllciIsInAxYmF0dGxlc2hpcCIsInAxZGVzdHJveWVyIiwicDFzdWJtYXJpbmUiLCJwMXBhdHJvbEJvYXQiLCJwMmNhcnJpZXIiLCJwMmJhdHRsZXNoaXAiLCJwMmRlc3Ryb3llciIsInAyc3VibWFyaW5lIiwicDJwYXRyb2xCb2F0IiwicDFBbGxTaGlwcyIsInAyQWxsU2hpcHMiLCJkcmFnZ2VkU2hpcCIsInAyQm9hcmRJbnN0YW5jZSIsInNoaXB5YXJkU2hpcHMiLCJzdGFydEdhbWVCdXR0b24iLCJnYW1lQ29udGFpbmVyIiwic2V0QXR0cmlidXRlIiwiaW5mb1NlY3Rpb24iLCJwbGF5ZXIxTGFiZWwiLCJwbGF5ZXIyTGFiZWwiLCJzaGlweWFyZENvbnRhaW5lciIsInNoaXB5YXJkTGFiZWwiLCJzaGlweWFyZCIsInNoaXAxIiwic2hpcDIiLCJzaGlwMyIsInNoaXA0Iiwic2hpcDUiLCJzZXR1cEV2ZW50TGlzdGVuZXJzIiwiZm9yRWFjaCIsImRyYWdnYWJsZSIsImRyYWdTdGFydCIsImRyYWdFbmQiLCJkcmFnT3ZlciIsImRyb3BTaGlwIiwic2VsZWN0VGFyZ2V0IiwiaG92ZXIiLCJzdGFydEdhbWUiLCJkaXNhYmxlZCIsInBsYWNlUDJTaGlwcyIsInJlc2V0R2FtZSIsInByZXZlbnREZWZhdWx0IiwicmVtb3ZlIiwic3RhcnRDb2wiLCJwYXJzZUludCIsImRhdGFzZXQiLCJzdGFydFJvdyIsInRoaXNTaGlwIiwiaWQiLCJzaGlwTmFtZSIsInNoaXBUeXBlIiwicGxhY2VtZW50UmVzdWx0IiwiY2VsbCIsImNvbnRhaW5zIiwiaGFuZGxlUmVzdWx0VmFsaWRhdGlvbiIsImhpZ2hsaWdodGVkQ2VsbCIsInRvZ2dsZSIsImlzR2FtZVdvbiIsImlzR2FtZUxvc3QiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY29udGFpbmVyIiwiYm9hcmRDb250YWluZXIiLCJwbGF5ZXIxbGFiZWwiLCJwbGF5ZXIybGFiZWwiLCJyb3dFbGVtZW50IiwiY2VsbEVsZW1lbnQiLCJvcmllbnRhdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=