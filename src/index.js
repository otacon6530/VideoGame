import Game from "./game.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let WIDTH = 640;
let HEIGHT = 480;
let lastTime = null;
let game = new Game(WIDTH, HEIGHT);
game.start();

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  game.update(deltaTime);
  game.draw(ctx);
  requestAnimationFrame(gameLoop);
}
gameLoop();
