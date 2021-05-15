import Character from "./character.js";
import { COMMAND } from "./global.js";
export default class Player extends Character {
  // Player is a subclass of Character
  constructor(game, input, name, x, y, dir) {
    super(game, input, name, x, y, dir);
    this.activeKey = game.activeKey;
    this.frame = 0;
    this.GS = game.GS;
  }
  update(map, deltaTime) {
    this.frame += 1;
    // continue moving until player fits in the fixed cell
    if (this.moving === true) {
      this.px += this.vx;
      this.py += this.vy;
      if (this.px % this.GS === 0 && this.py % this.GS === 0) {
        this.moving = false;
        this.x = this.game.div(this.px, this.GS);
        this.y = this.game.div(this.py, this.GS);
      } else {
        return;
      }
    }
    // activeKey defined at main.js
      if (this.activeKey === COMMAND.LEFT || this.activeKey === COMMAND.UP || this.activeKey === COMMAND.DOWN || this.activeKey === COMMAND.RIGHT) {
      this.moveStart(this.activeKey, map);
    } else if (this.activeKey === COMMAND.ACTION) {
      this.interact(map, this.game);
    }
  }
  interact(map, game) {
    let char;
      if (this.direction === COMMAND.LEFT) {
      char = map.charCollisionCheck(this.x - 1, this.y);
    } else if (this.direction === COMMAND.UP) {
      char = map.charCollisionCheck(this.x, this.y - 1);
    } else if (this.direction === COMMAND.RIGHT) {
      char = map.charCollisionCheck(this.x + 1, this.y);
    } else if (this.direction === COMMAND.DOWN) {
      char = map.charCollisionCheck(this.x, this.y + 1);
    }
    if (typeof char !== "undefined") {
      game.startDialog(char.message);
    }
  }
}
