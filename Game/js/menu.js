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
}

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
    ctx.fillText(En_enjson["PressEnter"], WIDTH / 2 - 100, HEIGHT / 2);
    ctx.globalAlpha = 1;
    this.frame += 1;
}
