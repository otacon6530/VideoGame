import { COMMAND, GAMESTATE } from "./global.js";

export default class MenuState {
    constructor(game, name) {
        this.name = name;
        this.backGroundColor = "black";
        this.backGroundImage = new Image();
        this.Objects = [game.debug];
        this.frame = 1;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        game.gamestate = GAMESTATE.MAINMENU;

    }

    /**
     * draw the menu
     *
     * @param ctx canvas being drawn on
     */
    draw(ctx,game) {
        //Draw background
        this.frame += 1;
        ctx.drawImage(this.backGroundImage, 0, 0);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.globalAlpha = (this.frame % 100) / 100;
        ctx.fillText(
            "Press Enter to Start",
            this.gameWidth / 2 - ctx.measureText("Press Enter to Start").width / 2,
            this.gameHeight / 2
        );
        ctx.globalAlpha = 1;
        if (this.frame % 15 === 0) {
            var fontSize = Math.random() * 50;
            var x = Math.random() * this.gameWidth;
            var y = Math.random() * this.gameHeight;
            var r = Math.floor(Math.random() * 255) + 50;
            var g = Math.floor(Math.random() * 255) + 50;
            var b = Math.floor(Math.random() * 255) + 50;

            var color = "rgba(" + r + "," + g + "," + b + ",1.0)";
            ctx.fillStyle = color;
            ctx.font = fontSize + "pt Arial";
            ctx.fillText("Demo", x, y);
            ctx.fillStyle = "rgba(0,0,0,0.1)";
            ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
        }
        for (const object of this.Objects) { object.draw(ctx, game) };
    }
    update(game) {
        if (game.activeKey === COMMAND.ACTION) {
            game.startRunning();
        }
    }
}
