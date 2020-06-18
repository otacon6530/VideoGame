import Character from "./character.js";
const DOWN = 0;
const LEFT = 1;
const RIGHT = 2;
const UP = 3;
export default class Player extends Character {
  // Player is a subclass of Character
  constructor(game, input, name, x, y, dir) {
    super(game, input, name, x, y, dir);
    this.activeKey = input.activeKey;
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
    if (this.activeKey === 37 || this.activeKey === 65) {
      this.moveStart(LEFT, map);
    } else if (this.activeKey === 38 || this.activeKey === 87) {
      this.moveStart(UP, map);
    } else if (this.activeKey === 39 || this.activeKey === 68) {
      this.moveStart(RIGHT, map);
    } else if (this.activeKey === 40 || this.activeKey === 83) {
      this.moveStart(DOWN, map);
    } else if (this.activeKey === 13) {
      this.interact(map, this.game);
    } else if (this.activeKey === 69) {
      this.game.startEditor();
    }
  }
  interact(map, game) {
    let char;
    if (this.direction === LEFT) {
      char = map.charCollisionCheck(this.x - 1, this.y);
    } else if (this.direction === UP) {
      char = map.charCollisionCheck(this.x, this.y - 1);
    } else if (this.direction === RIGHT) {
      char = map.charCollisionCheck(this.x + 1, this.y);
    } else if (this.direction === DOWN) {
      char = map.charCollisionCheck(this.x, this.y + 1);
    }
    if (typeof char !== "undefined") {
      game.startDialog(char.message);
    }
  }
}
