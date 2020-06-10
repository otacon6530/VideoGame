/**
 * handles the loading and saving of maps.
 *
 * @author Michael Stephens
 */
function Map(name) {
    this.row;
    this.col;
    this.layer1location;
    this.layer1 = new Image();
    this.layer3location;
    this.layer3 = new Image();
    this.character = [];
    this.collision = [[]]; 
    this.defaultcollision = [[]];
    this.name;
    // load map data
    this.load(MapLocation + name + '.map');
}

/**
 * load Map object from file into memory
 *
 * @param filename path to chunk object file to be loaded.
 */
Map.prototype.load = function (filename) {
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
    this.name = map.name;

}

/**
 * Update Characters on Map
 *
 * @param ctx canvas being drawn on
 * @param offset position of player on map
 */
Map.prototype.update = function () {

    //Draw Characters
    this.character.forEach(char => {
        char.update(this);
    });
}
/**
 * draw the map based on player position
 *
 * @param ctx canvas being drawn on
 * @param offset position of player on map
 */
Map.prototype.draw = function (ctx, x, y) {
    this.update();

    //Draw background backfill image
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    //Draw layer1
    ctx.drawImage(this.layer1, GS - x, GS - y);

    //Draw Characters on layer 2
    this.character.forEach(char => {
        char.draw(ctx, x, y);
    });

    //Draw layer3
    ctx.drawImage(this.layer3, GS - x, GS - y);
}
/**
 * Add character to map
 *
 * @param character character object to add to map
 */
Map.prototype.addCharacter = function (character) {
 
    this.character.push(character);
}
/**
 * collision check
 *
 * @param x map position on x axis
 * @param y map position on y axis
 */
Map.prototype.collisionCheck = function (x1, y1) {
    x = x1 - 1;
    y = y1 - 1;
    ret = true;
    if (x <= this.col - 1 && x >= 0 && y <= this.row - 1 && y >= 0 && this.collision[x][y] == 0) {

        this.character.forEach(char => {
            if (char.x == x1 && char.y == y1) {
                ret = false;
            }
        });
        return ret
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
Map.prototype.charCollisionCheck = function (x1, y1) {
    x = x1 - 1;
    y = y1 - 1;
        this.character.forEach(char => {
            if (char.x == x1 && char.y == y1) {
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

Map.prototype.resetCollision = function (x, y) {
    x = x - 1;
    y = y - 1;
    this.collision[x][y] = this.defaultcollision[x][y];
}