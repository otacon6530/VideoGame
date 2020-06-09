//Screen Rendering Specific Constants
WIDTH = 640;
HEIGHT = 480;
GS = 32;

//Input constants
DOWN = 0;
LEFT = 1;
RIGHT = 2;
UP = 3;
DEBUG = true;

//Define static locations
MapLocation = 'map/';
ImageLocation = 'images/';

function div(a, b) {
    return Math.round(a / b - 0.5);
}

function fullscreen() {
    var elem = document.getElementById('canvas');
    if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    }
    else if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

window.onload = function() {
    // initialize global objects
    activeKey = null;
    map = new Map("test");
    player = new Player("player", 8, 8, DOWN);
    map.addCharacter(player);
    // start mainloop
    setInterval('mainLoop()', 16);

}

function mainLoop() {
    var ctx = document.getElementById('canvas').getContext('2d');

    // initialize
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // draw
    //offset = calcOffset(player);
    map.draw(ctx, player.px - WIDTH / 2, player.py - HEIGHT / 2);
    //player.draw(ctx, offset);
}

/**Input**/
keysPressed = {};
document.addEventListener('keydown', (event) => {
    keysPressed[event.which] = true;
    activeKey = event.which;
});
document.addEventListener('keyup', (event) => {
    delete keysPressed[event.which];
    activeKey = null;
    for (let i in keysPressed) {
        activeKey = i;
    }
});


// calculate player-map offset
function calcOffset(player) {
    var offsetx = player.px - WIDTH / 2;
    var offsety = player.py - HEIGHT / 2;
    return [offsetx, offsety];
}
