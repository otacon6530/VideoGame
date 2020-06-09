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

    //Draw Characters
    this.character.forEach(char => {
        char.draw(ctx, x, y) 
    });

    ctx.drawImage(this.layer3, GS - x, GS - y);
}
/**
 * Add character to map
 *
 * @param ctx canvas being drawn on
 * @param offset position of player on map
 */
Map.prototype.addCharacter = function (character) {
    this.character.push(character);
}
/**
 * collision check
 *
 * @param x map position on x axis
 * @param offset map position on y axis
 */
Map.prototype.collisionCheck = function (x, y) {
    x = x - 1;
    y = y - 1;
        if (x <= this.col - 1 && x >= 0 && y <= this.row - 1 && y >= 0 && this.collision[x][y] == 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * collision check
 *
 * @param ctx canvas being drawn on
 * @param offset position of player on map
 */

Map.prototype.resetCollision = function (x, y) {
    this.collision[x - 1][y - 1] = this.defaultcollision[x - 1][y - 1];
}