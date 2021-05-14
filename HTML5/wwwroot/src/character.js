const MOVE = 1;
const PROB_MOVE = 0.1;
const DOWN = 0;
const LEFT = 1;
const RIGHT = 2;
const UP = 3;
export default class Character {
  constructor(game, name, x, y, dir, movetype, message) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.game = game;
    this.px = this.x * this.game.GS;
    this.py = this.y * this.game.GS;
    this.vx = 0;
    this.vy = 0;
    this.speed = 4;
    this.moving = false;
    this.direction = dir;
    this.movetype = movetype;
    this.animcycle = 12;
    this.frame = 0;
    this.message = message;
    this.GS = game.GS;
    this.UpdateImage(this.name);
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
    } else if (this.movetype === MOVE && Math.random() < PROB_MOVE) {
      this.direction = Math.floor(Math.random() * 4); // 0 - 3
      this.moveStart(this.direction, map);
    }
  }

  draw(ctx, x, y) {
    let offsetx = x;
    let offsety = y;
    let no = this.game.div(this.frame, this.animcycle) % 1;
    if (this.moving) {
      no = this.game.div(this.frame, this.animcycle) % 4;
    }
    ctx.drawImage(
      this.image,
      no * this.GS,
      this.direction * this.GS,
      this.GS,
      this.GS,
      this.px - offsetx,
      this.py - offsety,
      this.GS,
      this.GS
    );
   }
    UpdateImage(name) {
        // images are class property
        var names = ["player", "king", "minister", "soldier"];
        for (var i = 0; i < names.length; i++) {
            this.image = new Image();
            this.image.src = this.game.imageLocation + name + ".png";
            console.log(this.game.imageLocation + name + ".png");
        }
    }

  moveStart(dir, map) {
    if (dir === LEFT) {
      this.direction = LEFT;
      if (map.collisionCheck(this.x - 1, this.y)) {
        this.vx = -this.speed;
        this.vy = 0;
        this.moving = true;
        map.resetCollision(this.x, this.y);
      }
    } else if (dir === UP) {
      this.direction = UP;
      if (map.collisionCheck(this.x, this.y - 1)) {
        this.vx = 0;
        this.vy = -this.speed;
        this.moving = true;
        map.resetCollision(this.x, this.y);
      }
    } else if (dir === RIGHT) {
      this.direction = RIGHT;
      if (map.collisionCheck(this.x + 1, this.y)) {
        this.vx = this.speed;
        this.vy = 0;
        this.moving = true;
        map.resetCollision(this.x, this.y);
      }
    } else if (dir === DOWN) {
      this.direction = DOWN;
      if (map.collisionCheck(this.x, this.y + 1)) {
        this.vx = 0;
        this.vy = this.speed;
        this.moving = true;
        map.resetCollision(this.x, this.y);
      }
    }
  }
}
