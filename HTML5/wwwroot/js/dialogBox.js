/**
 * @author Michael Stephens
 * @desc renders a dialog box
*/
import { COMMAND } from "./global.js";
export default class DialogBox {
    constructor(game, message) {
        this.msg = message;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
    }
    update(game,deltaTime) {
        
    }
    draw(ctx,game) {
        ctx.globalAlpha = 0.4
        ctx.fillStyle = "black";
        ctx.fillRect(0, this.gameHeight - 75, this.gameWidth, 100);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(this.msg, 40, this.gameHeight - 50);
        ctx.globalAlpha = 1;
    }
}
