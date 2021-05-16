/**
 * @author Michael Stephens
 * @desc This is the Editor game state which dictates:
 *       1. The controls used while the state is active.
 *       2. What game objects will be updated/drawn and in what order.
*/
import { COMMAND, GAMESTATE } from "./global.js";
export default class Editor {
    constructor(game) {
        game.activeKey = null;
        game.gamestate = GAMESTATE.EDITOR;
        this.state = GAMESTATE.EDITOR;
    }
    update(game,deltaTime) {
        this.commandTrigger(game);
        game.map.update(game, deltaTime);
    }
    draw(ctx,game) {
        game.map.draw(ctx, game);
        game.debug.draw(ctx, game);
    }

    commandTrigger(game) {
        if (game.activeKey === COMMAND.CANCEL) {
            game.startRunning();
            game.map.save("test");
        }
    }
}
