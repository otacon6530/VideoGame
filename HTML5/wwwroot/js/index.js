import Game from "./game.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let WIDTH = canvas.width;
let HEIGHT = canvas.height;

let lastTime = null;
let game = new Game(WIDTH, HEIGHT);

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    game.update(deltaTime, ctx);
    requestAnimationFrame(gameLoop);
}
gameLoop();
