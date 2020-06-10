//Screen Rendering Specific Constants
WIDTH = 640;
HEIGHT = 480;
GS = 32;

//Input constants
DOWN = 0;
LEFT = 1;
RIGHT = 2;
UP = 3;
ENTER = 13;
ESC = 27;

DEBUG = true;

//Define static locations
MapLocation = 'map/';
ImageLocation = 'images/';
var state = 'menu';
var settingsjson = {"Language": "English"};
var languagesjson = { "English": "En_en.json" };
var En_enjson = { "PressEnter": "Press Enter to Start"};

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
    menu = new MainMenu("title");
    char = new Character("king", 8, 9, DOWN,"","hi");
    map.addCharacter(char);
    player = new Player("player", 8, 8, DOWN);
    map.addCharacter(player);
    
    // start mainloop
    setInterval('mainLoop()', 16);

}
var audio = new Audio('music/castle.wav');
function mainLoop() {
    var ctx = document.getElementById('canvas').getContext('2d');

    // initialize
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // draw
    //offset = calcOffset(player);
    if (state == 'active') {
        map.draw(ctx, player.px - WIDTH / 2, player.py - HEIGHT / 2);
        /**Enter MainMenu**/
        if (activeKey == ESC) {
            state = 'menu';
            audio.pause();
            audio = new Audio('music/field.wav');
            audio.play();
        }
    }
    if (state == 'menu') {
        menu.draw(ctx);
        /**Exit Menu**/
        if (activeKey == ENTER) {
            state = 'active';
            audio.pause();
            audio = new Audio('music/castle.wav');
            audio.play();
        }
    }
    if (DEBUG) {
        ctx.fillStyle = "white";
        ctx.globalAlpha = 0.50;
        ctx.fillRect(0, 0, 100, 70);
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText(map.name + ": " + player.x + "," + player.y, 10, 50);
    }
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