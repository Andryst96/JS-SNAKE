//event listeners
document.addEventListener("keydown", keyPush);

//konstanty
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const scorePlr = document.getElementsByClassName("scorePlr");
//boards to show
const plrBoard = document.getElementsByClassName("playerboard");

//show keyboards in menu
const menuKeysBoards = document.getElementsByClassName("controls");
//start button konstanta

const startGame = document.querySelectorAll(".btnStart");
//function for button to start game
for (let i = 0; i < startGame.length; i++) {
  startGame[i].addEventListener("click", start);
}

//high scoreBtn
const highScoreBtn = document.querySelector(".btnHighScores");
//function for button to start game
highScoreBtn.addEventListener("click", goToHighScore);
//home Btn
const homeBtn = document.querySelectorAll(".btnHome");
//function for button to start game
for (let i = 0; i < homeBtn.length; i++) {
  homeBtn[i].addEventListener("click", goToHomePage);
}

//funtion that shows high score
function goToHighScore() {
  refreshTopList();
  mainMenu.style.display = "none";
  highScorePage.style.display = "inline-block";
  game.style.display = "none";
  saveHighScorePage.style.display = "none";
}

//function that show home page
function goToHomePage() {
  mainMenu.style.display = "inline-block";
  highScorePage.style.display = "none";
  game.style.display = "none";
  saveHighScorePage.style.display = "none";
}

//function that shows game

function gotToGame() {
  mainMenu.style.display = "none";
  highScorePage.style.display = "none";
  game.style.display = "block";
  saveHighScorePage.style.display = "none";
}

//funtion that shows high score formular
function goToSaveHighScore() {
  mainMenu.style.display = "none";
  highScorePage.style.display = "none";
  game.style.display = "none";
  saveHighScorePage.style.display = "inline-block";
}

//konstanty pro sputění hry
const mainMenu = document.querySelector(".mainmenu");
const game = document.querySelector(".game");
const highScorePage = document.querySelector(".highScorePage");
const saveHighScorePage = document.querySelector(".saveHighScorePage");

//radio buttons by whitch you can select number of players
let radios = document.getElementsByClassName("radio");

//function that start game
function start() {
  //showgamepage
  gotToGame();
  //check number of players selected in menu
  checkPlayers();
  //show number of boards depends on number of players
  showBoards();
  //null game atributes
  nullGame();
  //loops that places food energy and bombs
  foodPlaceLoop();
  bombPlaceLoop();
  energyPlaceLoop();
  //main game loop
  gameLoop();
}

//function main menu
function menu() {
  mainMenu.style.display = "inline-block";
  game.style.display = "none";
}

//NUMBER OF PLAYERS
let numberOfPlayers = 2;

//event listeners on radio buttons
for (let i = 0; i < radios.length; i++) {
  radios[i].addEventListener("click", checkPlayers);
}

//function that check number of players
function checkPlayers() {
  for (let i = 0, length = radios.length; i < length; i++) {
    if (radios[i].type === "radio" && radios[i].checked) {
      // get value, set checked flag or do whatever you need to
      numberOfPlayers = ++i;
    }
  }
  hideKeyBoards();
  showKeyBoards();
}

//PLAYER COLORS
let snakesColors = ["red", "blue", "rgb(0, 94, 0)", "purple"];
let tailColors = [
  "rgb(255, 112, 134)",
  "rgb(55, 219, 219)",
  "#4aec5a",
  "#ad51fa",
];

function nullGame() {
  //score changer
  score = [0, 0, 0, 0];
  //dead snake (if yes number changes to 1)
  deadSnake = [0, 0, 0, 0];
  //food konstanty
  foodPosition = [];
  //bombs
  bombPosition = [];
  //energy
  energyPosition = [];
  //snake start position
  snakePosX = [
    0,
    canvas.width - snakeHeight,
    canvas.width / 2 - snakeHeight / 2,
    canvas.width / 2 - snakeHeight / 2,
  ];
  snakePosY = [
    canvas.height / 2 - snakeHeight / 2,
    canvas.height / 2 - snakeHeight / 2,
    0,
    canvas.height - snakeHeight,
  ];
  //snake tail null
  snakeTail = [
    [snakePosX[0], snakePosY[0]],
    [snakePosX[1], snakePosY[1]],
    [snakePosX[2], snakePosY[2]],
    [snakePosX[3], snakePosY[3]],
  ];
  //direction
  velocityX = [1, -1, 0, 0];
  velocityY = [0, 0, 1, -1];
  //score changer
  score = [0, 0, 0, 0];
  nullScore();
}
//score changer
let score = [];

//dead snake (if yes number changes to 1)
let deadSnake = [0, 0, 0, 0];

//max scoreindex
let indexOfMaxValue = [];
let maxValue;

//food konstanty
let foodPosition = [];
let foodPosX = canvas.width / 2;
let foodPosY = canvas.height / 2;
//bombs
let bombPosition = [];
let bombPosX = 0;
let bombPosY = 0;
//energy
let energyPosition = [];
let energyPosX = 0;
let energyPosY = 0;

//snake block size
const snakeHeight = 20;
const snakeWidth = snakeHeight;

//game runner
let gameRunner = true;

//snake start position
let snakePosX = [
  0,
  canvas.width - snakeHeight,
  canvas.width / 2 - snakeHeight / 2,
  canvas.width / 2 - snakeHeight / 2,
];
let snakePosY = [
  canvas.height / 2 - snakeHeight / 2,
  canvas.height / 2 - snakeHeight / 2,
  0,
  canvas.height - snakeHeight,
];

//snake length tail
let snakeTail = [];

//grid block
let blockSize = snakeHeight - 1;
//snake speed
let snakeSpeed = snakeHeight;
//game fps - main game loop
let fps = 1000 / 14;
//food ratio
let foodRatio = 1000 / 0.5;
//bomb ratio
let bombRatio = 1000 / 0.15;
//energy ratio
let energyRatio = 1000 / 0.15;

//direction
let velocityX = [];
let velocityY = [];

//MAIN LOOP
function gameLoop() {
  moveStuff();
  drawStuff();
  runOrEnd();
}

function foodPlaceLoop() {
  foodPlace();
  placeOrDoNotPlace();
}
function bombPlaceLoop() {
  bombPlace();
  placeOrDoNotPlaceBomb();
}
function energyPlaceLoop() {
  energyPlace();
  placeOrDoNotPlaceEnergy();
}

//move everything
function moveStuff() {
  //snake head moving
  snakeHeadMove();

  //snake eat his own butt
  snakeEatHisOwnBut();
  //over the edge of field
  edgeOfField();
  //tail move
  tailMove();
  //snake eat things
  snakeSameAsFood();
  snakeSameAsEnergy();
  snakeEatBomb();

  //best score count
  bestScore();
}

// snake move function
function snakeHeadMove() {
  for (let i = 0; i < numberOfPlayers; i++) {
    if (deadSnake[i] === 0) {
      snakePosX[i] += velocityX[i] * snakeSpeed;
      snakePosY[i] += velocityY[i] * snakeSpeed;
    }
  }
}

//draw everything
function drawStuff() {
  //canvas
  rectangle("LightGrey", 0, 0, canvas.width, canvas.height);
  //grid
  grid();
  //snake tail
  snakeTailRectangles();
  //snakes heads
  drawSnakes();
  //food
  drawFood();
  //bombs
  drawBombs();
  //energy
  drawEnergy();
}

// draw rectangle
function rectangle(color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

//draw snakes heads
function drawSnakes() {
  for (let i = 0; i < numberOfPlayers; i++) {
    rectangle(
      snakesColors[i],
      snakePosX[i],
      snakePosY[i],
      snakeWidth,
      snakeHeight
    );
  }
}

//draw snake tail
function snakeTailRectangles() {
  for (let i = 0; i < numberOfPlayers; i++) {
    for (let k = 0; k < snakeTail[i].length; k++) {
      rectangle(
        tailColors[i],
        snakeTail[i][k][0],
        snakeTail[i][k][1],
        snakeWidth,
        snakeHeight
      );
    }
  }
}

//draw food
function drawFood() {
  for (let i = 0; i < foodPosition.length; i++) {
    rectangle(
      "#cc0000",
      foodPosition[i][0],
      foodPosition[i][1],
      snakeWidth,
      snakeHeight
    );
  }
}

//draw bombs
function drawBombs() {
  for (let i = 0; i < bombPosition.length; i++) {
    rectangle(
      "black",
      bombPosition[i][0],
      bombPosition[i][1],
      snakeWidth,
      snakeHeight
    );
  }
}

//draw energy
function drawEnergy() {
  for (let i = 0; i < energyPosition.length; i++) {
    rectangle(
      "#39ac39",
      energyPosition[i][0],
      energyPosition[i][1],
      snakeWidth,
      snakeHeight
    );
  }
}

//funkce pro sipky
function keyPush(event) {
  switch (event.key) {
    //PLAYER 1
    case "ArrowUp":
      if (velocityY[0] !== 1) {
        velocityY[0] = -1;
        velocityX[0] = 0;
      }
      break;
    case "ArrowDown":
      if (velocityY[0] !== -1) {
        velocityY[0] = 1;
        velocityX[0] = 0;
      }
      break;
    case "ArrowLeft":
      if (velocityX[0] !== 1) {
        velocityY[0] = 0;
        velocityX[0] = -1;
      }
      break;
    case "ArrowRight":
      if (velocityX[0] !== -1) {
        velocityY[0] = 0;
        velocityX[0] = +1;
      }
      break;
    //PLAYER 2
    case "w":
      if (velocityY[1] !== 1) {
        velocityY[1] = -1;
        velocityX[1] = 0;
      }
      break;
    case "s":
      if (velocityY[1] !== -1) {
        velocityY[1] = 1;
        velocityX[1] = 0;
      }
      break;
    case "a":
      if (velocityX[1] !== 1) {
        velocityY[1] = 0;
        velocityX[1] = -1;
      }
      break;
    case "d":
      if (velocityX[1] !== -1) {
        velocityY[1] = 0;
        velocityX[1] = +1;
      }
      break;
    //PLAYER 3
    case "8":
      if (velocityY[2] !== 1) {
        velocityY[2] = -1;
        velocityX[2] = 0;
      }
      break;
    case "5":
      if (velocityY[2] !== -1) {
        velocityY[2] = 1;
        velocityX[2] = 0;
      }
      break;
    case "4":
      if (velocityX[2] !== 1) {
        velocityY[2] = 0;
        velocityX[2] = -1;
      }
      break;
    case "6":
      if (velocityX[2] !== -1) {
        velocityY[2] = 0;
        velocityX[2] = +1;
      }
      break;
    //PLAYER 4
    case "i":
      if (velocityY[3] !== 1) {
        velocityY[3] = -1;
        velocityX[3] = 0;
      }
      break;
    case "k":
      if (velocityY[3] !== -1) {
        velocityY[3] = 1;
        velocityX[3] = 0;
      }
      break;
    case "j":
      if (velocityX[3] !== 1) {
        velocityY[3] = 0;
        velocityX[3] = -1;
      }
      break;
    case "l":
      if (velocityX[3] !== -1) {
        velocityY[3] = 0;
        velocityX[3] = +1;
      }
      break;
  }
}

//grid - vykresleni
function grid() {
  for (let j = 0; j < canvas.height / snakeHeight; j++) {
    for (let i = 0; i < canvas.width / snakeHeight; i++) {
      rectangle("snow", i * snakeHeight, j * snakeHeight, blockSize, blockSize);
    }
  }
}

//place food generator
function foodPlace() {
  foodPos();
  foodPosition.push([foodPosX, foodPosY]);
}

//position of food generator
function foodPos() {
  do {
    foodPosX =
      Math.floor((Math.random() * canvas.width) / snakeHeight) * snakeHeight;
    foodPosY =
      Math.floor((Math.random() * canvas.height) / snakeHeight) * snakeHeight;
  } while (foodPosition.includes([foodPosX, foodPosY]));
}

//bomb place  generator
function bombPlace() {
  bombPos();
  bombPosition.push([bombPosX, bombPosY]);
}

//position of bomb generator
function bombPos() {
  do {
    bombPosX =
      Math.floor((Math.random() * canvas.width) / snakeHeight) * snakeHeight;
    bombPosY =
      Math.floor((Math.random() * canvas.height) / snakeHeight) * snakeHeight;
  } while (bombPosition.includes([bombPosX, bombPosY]));
}
//energy place  generator
function energyPlace() {
  energyPos();
  energyPosition.push([energyPosX, energyPosY]);
}

//position of energy generator
function energyPos() {
  do {
    energyPosX =
      Math.floor((Math.random() * canvas.width) / snakeHeight) * snakeHeight;
    energyPosY =
      Math.floor((Math.random() * canvas.height) / snakeHeight) * snakeHeight;
  } while (energyPosition.includes([energyPosX, energyPosY]));
}

//food eat function
function snakeSameAsFood() {
  for (let i = 0; i < numberOfPlayers; i++) {
    for (let j = 0; j < foodPosition.length; j++) {
      if (
        snakePosX[i] === foodPosition[j][0] &&
        snakePosY[i] === foodPosition[j][1]
      ) {
        //delete this food
        foodPosition.splice(j, 1);
        //count the score
        scorePlr[i].textContent = ++score[i];
        //add flesh to the snake
        snakeTail[i].unshift([snakePosX[i], snakePosY[i]]);
      }
    }
  }
}

//food eat function
function snakeSameAsEnergy() {
  for (let i = 0; i < numberOfPlayers; i++) {
    for (let j = 0; j < energyPosition.length; j++) {
      if (
        snakePosX[i] === energyPosition[j][0] &&
        snakePosY[i] === energyPosition[j][1]
      ) {
        //delete this food
        energyPosition.splice(j, 1);
        //count the score
        score[i] = score[i] + 5;
        scorePlr[i].textContent = score[i];
        //add flesh to the snake
        for (let k = 0; k < 5; k++) {
          snakeTail[i].unshift([snakePosX[i], snakePosY[i]]);
        }
      }
    }
  }
}

//tail move function
function tailMove() {
  for (let i = 0; i < numberOfPlayers; i++) {
    if (deadSnake[i] === 0) {
      snakeTail[i].push([snakePosX[i], snakePosY[i]]);
      snakeTail[i].shift();
    }
  }
}
//edge of field
function edgeOfField() {
  for (let i = 0; i < numberOfPlayers; i++) {
    if (snakePosX[i] > canvas.width - snakeHeight) {
      snakePosX[i] = 0;
    } else if (snakePosX[i] < 0) {
      snakePosX[i] = canvas.width;
    } else if (snakePosY[i] > canvas.height - snakeHeight) {
      snakePosY[i] = 0;
    } else if (snakePosY[i] < 0) {
      snakePosY[i] = canvas.height;
    }
  }
}

// snake crash himself situation
function snakeEatHisOwnBut() {
  for (let i = 0; i < numberOfPlayers; i++) {
    for (let j = 0; j < numberOfPlayers; j++) {
      for (let k = 0; k < snakeTail[j].length; k++) {
        if (
          //constrols position due to tail
          snakePosX[i] === snakeTail[j][k][0] &&
          snakePosY[i] === snakeTail[j][k][1]
        ) {
          //places snake out of the field
          deadSnake[i] = 1;
        }
      }
    }
  }
}

// snake crash bomb situation
function snakeEatBomb() {
  for (let i = 0; i < numberOfPlayers; i++) {
    for (let k = 0; k < bombPosition.length; k++) {
      if (
        //constrols position due to tail
        snakePosX[i] === bombPosition[k][0] &&
        snakePosY[i] === bombPosition[k][1]
      ) {
        //places snake out of the field
        deadSnake[i] = 1;
      }
    }
  }
}

//stop game if crash hapenns
function runOrEnd() {
  if ([...deadSnake].filter((x) => x === 1).length !== numberOfPlayers) {
    setTimeout(gameLoop, fps);
  } else {
    textAboutWinner();
    goToSaveHighScore();
  }
}
function placeOrDoNotPlace() {
  if ([...deadSnake].filter((x) => x === 1).length !== numberOfPlayers) {
    setTimeout(foodPlaceLoop, foodRatio);
  }
}
function placeOrDoNotPlaceBomb() {
  if ([...deadSnake].filter((x) => x === 1).length !== numberOfPlayers) {
    setTimeout(bombPlaceLoop, bombRatio);
  }
}
function placeOrDoNotPlaceEnergy() {
  if ([...deadSnake].filter((x) => x === 1).length !== numberOfPlayers) {
    setTimeout(energyPlaceLoop, energyRatio);
  }
}

//defines highest score
function bestScore() {
  //null max score due every loop
  indexOfMaxValue = [];
  //show highest score
  maxValue = Math.max(...score);
  //show indexes of highest score
  score.forEach(function (element, i) {
    if (element == maxValue) {
      indexOfMaxValue.push(i);
    }
  });
}
//writes text for end screen
function textAboutWinner() {
  finalScore.textContent = maxValue;
  switch (indexOfMaxValue.length) {
    case 1:
      winnerText.textContent = "Winner: Player " + (indexOfMaxValue[0] + 1);
      break;
    case 2:
      winnerText.textContent =
        "Winner: Players " +
        (indexOfMaxValue[0] + 1) +
        " and " +
        (indexOfMaxValue[1] + 1);
      break;
    case 3:
      winnerText.textContent =
        "Winners: Player " +
        (indexOfMaxValue[0] + 1) +
        " , " +
        (indexOfMaxValue[1] + 1) +
        " and " +
        (indexOfMaxValue[2] + 1);
      break;
    case 4:
      winnerText.textContent = "Tie";
      break;
  }
}
//function that shows player boards before game start
function showBoards() {
  for (let i = 0; i < numberOfPlayers; i++) {
    plrBoard[i].style.display = "flex";
  }
}

//function that null score boards
function nullScore() {
  for (let i = 0; i < scorePlr.length; i++) {
    scorePlr[i].textContent = score[i];
  }
}

//function that hide player keyboards before game start
function hideKeyBoards() {
  for (let i = 0; i < menuKeysBoards.length; i++) {
    menuKeysBoards[i].style.display = "none";
  }
}

//function that shows player keyboards before game start
function showKeyBoards() {
  for (let i = 0; i < numberOfPlayers; i++) {
    menuKeysBoards[i].style.display = "grid";
  }
}

//part to save highscore

const username = document.querySelector("#username");

//savehigh scoreBtn
const saveBtn = document.querySelector("#saveScoreBtn");
//function for button to start game
saveBtn.addEventListener("click", saveHighScore);

//konstanta pro zobrazení vítěze
const finalScore = document.querySelector(".finalScore");
const winnerText = document.querySelector(".winnerText");

//local storage

const highScoresList = JSON.parse(localStorage.getItem("highScoreList")) || [];

//funstion for save your score
function saveHighScore() {
  goToHighScore();

  //const winner score
  const hallOfFameScore = {
    score: maxValue,
    name: username.value,
  };

  //add winner to the high score
  highScoresList.push(hallOfFameScore);

  //order high score array
  highScoresList.sort((a, b) => {
    return b.score - a.score;
  });

  //delete losers from high scores
  highScoresList.splice(5);

  //save high score player to local storage
  localStorage.setItem("highScoreList", JSON.stringify(highScoresList));

  //show list of high scores in #highScoreList tag
  refreshTopList();
}

function refreshTopList() {
  highScoreListRanks.innerHTML = highScoresList
    .map((score) => {
      return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");
}

//constant for rank in highscores - ul
const highScoreListRanks = document.querySelector("#highScoreList");
