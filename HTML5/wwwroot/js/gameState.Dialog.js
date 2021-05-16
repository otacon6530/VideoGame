/**
 * @author Michael Stephens
 * @desc This is the Dialog game state which dictates:
 *       1. The controls used while the state is active.
 *       2. What game objects will be updated/drawn and in what order.
*/
import { COMMAND, GAMESTATE } from "./global.js";
import dialogBox from "./dialogBox.js";
export default class Dialog {
    constructor(game,message) {
        var db = new dialogBox(game,message);
        this.updateObjects = [game.debug, db];
        this.drawObjects = [game.map, game.debug, db];
        this.state = GAMESTATE.DIALOG;
        game.activeKey = null;
        
    }
    update(game,deltaTime) {

        for (const object of this.updateObjects) { object.update(game, deltaTime) };
        //Trigger when key is released.

        if (game.activeKey === COMMAND.ACTION) {
            game.startRunning();
        }
    }
    draw(ctx, game) {
        for (const object of this.drawObjects) { object.draw(ctx, game) };
    }
}
