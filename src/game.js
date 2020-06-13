import Character from "./character.js";
import Player from "./player.js";
import Map from "./map.js";
import InputHandler from "./input.js";
import Menu from "./menu.js";

const DOWN = 0;

const GAMESTATE = {
  RUNNING: 0,
  MAINMENU: 1
};

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
    this.gamestate = GAMESTATE.MAINMENU;
    new InputHandler(this);
    this.menu = new Menu(this, "test");
    this.map = new Map(this, "test");
    let char = new Character(this, "king", 3, 3, DOWN, "", "hi");
    this.map.addCharacter(char);
    this.player = new Player(this, "player", 3, 4, DOWN, "", "hi");
    this.map.addCharacter(this.player);
  }
  update(deltaTime) {
    if (this.gamestate === GAMESTATE.RUNNING) {
      this.player.activeKey = this.activeKey;
      this.map.update(this, deltaTime);
    } else {
      this.menu.update(this);
    }
  }
  draw(ctx) {
    this.menu.draw(ctx);
    if (this.gamestate === GAMESTATE.RUNNING) {
      let x = this.player.px - this.gameWidth / 2;
      let y = this.player.py - this.gameHeight / 2;
      this.map.draw(ctx, x, y);
    } else {
      this.menu.draw(ctx);
    }
  }
  div(a, b) {
    return Math.round(a / b - 0.5);
  }
}
