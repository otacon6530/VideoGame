import Character from "./character.js";
import Player from "./player.js";
import Map from "./map.js";
import InputHandler from "./input.js";
import Menu from "./menu.js";
import Debug from "./debug.js";
import Dialog from "./dialog.js";
import Editor from "./editor.js";

const DOWN = 0;

const GAMESTATE = {
  RUNNING: 0,
  MAINMENU: 1,
  PAUSE: 2,
  DIALOG: 3,
  EDITOR: 4
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
    let char = new Character(this, "king", 3, 3, DOWN, "", "I am the KING!");
    this.map.addCharacter(char);
    this.player = new Player(this, "player", 3, 4, DOWN, "", "");
    this.map.addCharacter(this.player);
    this.debug = new Debug(this);
    this.dialog = new Dialog(this);
    this.editor = new Editor(this);
  }
  update(deltaTime) {
    if (this.gamestate === GAMESTATE.RUNNING) {
      this.player.activeKey = this.activeKey;
      this.map.update(this, deltaTime);
      this.debug.update(this.player);
    } else if (this.gamestate === GAMESTATE.DIALOG) {
      this.dialog.update(this);
    } else if (this.gamestate === GAMESTATE.MAINMENU) {
      this.menu.update(this);
    } else if (this.gamestate === GAMESTATE.EDITOR) {
      this.editor.update(this);
    }
  }
  draw(ctx) {
    if (
      this.gamestate === GAMESTATE.RUNNING ||
      this.gamestate === GAMESTATE.DIALOG
    ) {
      let x = this.player.px - this.gameWidth / 2;
      let y = this.player.py - this.gameHeight / 2;
      this.map.draw(ctx, x, y);
      this.debug.draw(ctx);
      if (this.gamestate === GAMESTATE.DIALOG) {
        this.dialog.draw(ctx);
      }
    } else if (this.gamestate === GAMESTATE.MAINMENU) {
      this.menu.draw(ctx);
    } else if (this.gamestate === GAMESTATE.EDITOR) {
      this.editor.draw(ctx);
      //this.player.draw(ctx);
    }
  }
  div(a, b) {
    return Math.round(a / b - 0.5);
  }
  startRunning() {
    if (this.gamestate !== GAMESTATE.RUNNING) {
      this.activeKey = null;
      this.gamestate = GAMESTATE.RUNNING;
    }
  }
  startDialog(message) {
    this.dialog.msg = message;
    if (this.gamestate !== GAMESTATE.DIALOG) {
      this.activeKey = null;
      this.gamestate = GAMESTATE.DIALOG;
    }
  }
  startEditor() {
    if (this.gamestate !== GAMESTATE.EDITOR) {
      this.activeKey = null;
      this.gamestate = GAMESTATE.EDITOR;
    }
  }
}