//const canvas = document.querySelector('canvas')
//const context = canvas.getContext('2d')
//let corVirus = document.querySelector('.corVirus')
const gridElement = document.querySelector(".grid");
const putin = document.querySelector(".putin");
const coronas = document.querySelector(".coronas");
const xiJinping = document.querySelector(".xi-Jinping");
const scoreElement = document.querySelector(".score");
const gameOverUnDisplay = document.querySelector(".nothing");
const winDisplay = document.querySelector(".nothingWin");

let score = 0;
const gridWidth = 15;
const gridHeight = 15;
const cells = [];

const initialPosition = 202;

const xi = new Target(34, "xi-Jinping");

const trump = new Target(36, "trump");

const merkel = new Target(32, "merkel");

const harry = new Target(20, "harry");

const pope = new Target(18, "pope");

const musk = new Target(22, "musk");

const macron = new Target(38, "macron");

const boris = new Target(24, "boris");

const erdogan = new Target(40, "erdogan");

const kim = new Target(26, "kim");

const player = new Player(202, "putin");

const aliveEnemies = [
  trump,
  xi,
  merkel,
  harry,
  pope,
  musk,
  macron,
  boris,
  erdogan,
  kim,
];
// const bullet = new Bullet();
// creqte qn qrrqy for qll current bullets

let allBullets = [];
for (let i = 0; i < gridWidth * gridHeight; i++) {
  const cell = createCell();
  gridElement.appendChild(cell);
  cells.push(cell);
}

function createCell() {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  return cell;
}

function createBullet() {
  const bulletStartPosition = player.position - gridWidth;
  const bullet = new Bullet(bulletStartPosition, "coronas");
  // put the newly created bullet in the array of all current bullets
  bullet.show();
  allBullets.push(bullet);
}

const bulletsIntervalId = setInterval(() => {
  //player.nextMove();
  allBullets.forEach((bullet) => {
    bullet.nextStep();
  });

  // instead of doing next step and isColliding for just one bullet, do it for every current bullet
  allBullets = allBullets.filter((bullet) => {
    if (!bullet.isAlive) {
      score += 12;
      console.log(score);
      bullet.remove();
      return false;
    }
    if (bullet.isAlive) {
      return true;
    }
  });
}, 200);

document.addEventListener("keydown", function (event) {
  console.log(event.key, event.keyCode, event.code);

  switch (event.key) {
    case "ArrowLeft":
      if (player.position % gridWidth === 0) {
        break;
      }
      player.move(-1);
      break;
    case "ArrowRight":
      if (player.position % gridWidth === gridWidth - 1) {
        break;
      }
      player.move(+1);
      break;
    case "ArrowUp":
      createBullet();
      break;
  }
});

player.move(0);

let intervalId = setInterval(() => {
  // move all bullets
  console.log(aliveEnemies);
  // move all players
  aliveEnemies.forEach((x) => {
    if (x.isCollidingWithAny(allBullets)) {
      let enemiesPos = aliveEnemies.indexOf(x);
      aliveEnemies.splice(enemiesPos, 1);
    }
    x.move(1);
    if (player.position === x.position) {
      player.remove();
      gameOverUnDisplay.classList.add("gameOver");
      clearInterval(intervalId);

      console.log("GAME OVER!");
    }
    scoreElement.textContent = "score = " + score;

    if (aliveEnemies.length === 0) {
      player.remove();
      winDisplay.classList.add("win");
      clearInterval(intervalId);

      console.log("YOU WIN!");
    }
  });
  // check collisions
  //testing

  // remove colliding enemy/bullet pairs
}, 500);

//kim.move(0);
