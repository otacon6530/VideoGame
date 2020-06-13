import Character from "./character.js";
import Player from "./player.js";
import Map from "./map.js";
import InputHandler from "./input.js";
const DOWN = 0;
export default class Game {
  constructor(gameWidth, gameHeight) {
    this.GS = 32;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.objects = {};
    this.mapLocation = "map/";
    this.imageLocation = "images/";
    this.activeKey = null;
    this.player = {};
  }
  start() {
    this.map = new Map(this, "test");
    let char = new Character(this, "king", 8, 9, DOWN, "", "hi");
    this.map.addCharacter(char);
    this.player = new Player(this, "player", 8, 8, DOWN, "", "hi");
    this.map.addCharacter(this.player);
    new InputHandler(this.player);
  }
  update(deltaTime) {
    this.map.update(deltaTime);
  }
  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    let x = this.player.px - this.gameWidth / 2;
    let y = this.player.py - this.gameHeight / 2;

    this.map.draw(ctx, x, y);
  }
  div(a, b) {
    return Math.round(a / b - 0.5);
  }
}
