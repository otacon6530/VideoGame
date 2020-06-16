//import $ from "jquery";
export default class Map {
  /**
   *
   * @author Michael Stephens
   */
  constructor(game, name) {
    this.row = 0;
    this.col = 0;
    this.layer1location = "";
    this.layer1 = new Image();
    this.layer3location = "";
    this.layer3 = new Image();
    this.character = [];
    this.collision = [[]];
    this.defaultcollision = [[]];
    this.name = name;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.GS = game.GS;
    // load map data
    this.load(game.mapLocation + name + ".map");
  }

  /**
   * load Map object from file into memory
   *
   * @param filename path to chunk object file to be loaded.
   */
  load(filename) {
    // load map file
    var httpObj = $.ajax({
      url: filename,
      async: false // synchronous (wait until file is loaded)
    });
    var map = JSON.parse(httpObj.responseText);

    this.row = map.row;
    this.col = map.col;
    this.layer1location = map.layer1location;
    this.layer1.src = map.layer1location;
    this.layer3location = map.layer3location;
    this.layer3.src = map.layer3location;
    //this.character = map.character;
    this.collision = map.collision;
    this.defaultcollision = map.defaultcollision;
    this.events = map.defaultcollision;
    this.name = map.name;
  }

  /**
   * Update Characters on Map
   *
   * @param ctx canvas being drawn on
   * @param offset position of player on map
   */
  update(deltaTime) {
    //Draw Characters
    this.character.forEach(char => {
      char.update(this, deltaTime);
    });
  }
  /**
   * draw the map based on player position
   *
   * @param ctx canvas being drawn on
   * @param offset position of player on map
   */
  draw(ctx, x, y) {
    //Draw background backfill image
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

    //Draw layer1
    ctx.drawImage(this.layer1, this.GS - x, this.GS - y);
    this.character.forEach(char => {
      char.draw(ctx, x, y);
    });
    //Draw layer3
    ctx.globalAlpha = 0.4;
    ctx.drawImage(this.layer3, this.GS - x, this.GS - y);
  }
  /**
   * Add character to map
   *
   * @param character character object to add to map
   */
  addCharacter(character) {
    this.character.push(character);
  }
  /**
   * collision check
   *
   * @param x map position on x axis
   * @param y map position on y axis
   */
  collisionCheck(x1, y1) {
    let x = x1 - 1;
    let y = y1 - 1;
    let ret = true;
    if (
      x <= this.col - 1 &&
      x >= 0 &&
      y <= this.row - 1 &&
      y >= 0 &&
      this.collision[x][y] === 0
    ) {
      this.character.forEach(char => {
        if (char.x === x1 && char.y === y1) {
          ret = false;
        }
      });
      return ret;
    } else {
      return false;
    }
  }

  /**
   * collision check
   *
   * @param x map position on x axis
   * @param y map position on y axis
   */
  charCollisionCheck(x1, y1) {
    let ret;
    this.character.forEach(char => {
      if (char.x === x1 && char.y === y1) {
        ret = char;
      }
    });
    return ret;
  }

  /**
   * collision check
   *
   * @param ctx canvas being drawn on
   * @param offset position of player on map
   */

  resetCollision(x, y) {
    x = x - 1;
    y = y - 1;
    this.collision[x][y] = this.defaultcollision[x][y];
  }
}
