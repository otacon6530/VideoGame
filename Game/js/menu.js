/**
 * Menu Screen
 *
 * @author Michael Stephens
 */
function Menu(name) {
    this.name = name;
    this.backGroundColor = 'black';
    this.backGroundImage = new Image();
    this.objects = [];
    this.frame = 1;
    this.negative = 1;
}

var shadowStyles = {
    // http://simurai.com/post/802968365/css3d-css3-3d-text
    "Stereoscopic": {
        color: "#000",
        background: "#fff",
        shadow: "-0.06em 0 0 red, 0.06em 0 0 cyan"
    },
    // http://line25.com/articles/using-css-text-shadow-to-create-cool-text-effects
    "Neon": {
        color: "#FFF",
        background: "#000",
        shadow: "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de"
    },
    "Anaglyphic": {
        color: "rgba(0,0,255,0.5)",
        background: "#fff",
        shadow: "3px 3px 0 rgba(255,0,180,0.5)"
    },
    "Vintage Radio": {
        color: "#707070",
        background: "#ddd",
        shadow: "2px 2px 0px #eee, 4px 4px 0px #666"
    },
    "Inset": {
        color: "#222",
        background: "#444",
        shadow: "0px 1px 1px #777"
    },
    // meinen kopf
    "Shadow": {
        color: "#444",
        background: "#444",
        shadow: "0 0 11px #000"
    },
    "Shadow ;)": {
        background: "#ddd",
        shadow: "0 0 11px #000"
    },
    // http://pgwebdesign.net/blog/3d-css-shadow-text-tutorial
    "Shadow3D": {
        color: "#fff",
        background: "#ddd",
        shadow: "1px -1px #444, 2px -2px #444, 3px -3px #444, 4px -4px #444"
    }
};

/**
 * draw the map based on player position
 *
 * @param ctx canvas being drawn on
 * @param offset position of player on map
 */
Menu.prototype.draw = function (ctx) {

    //Draw background color
    ctx.fillStyle = this.backGroundColor;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    //Draw background
    ctx.drawImage(this.backGroundImage, 0,0);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.globalAlpha = this.frame%100/100;
    ctx.fillText("Press Enter to Start", WIDTH / 2 - 100, HEIGHT / 2);
    ctx.globalAlpha = 1;
    this.frame += 1;
    if (this.frame % 100 == 1) {
        this.negative = (-this.negative);
    }

}
