/**
 * @author Michael Stephens
 * @desc This is the running game state which dictates:
 *       1. The controls used while the state is active.
 *       2. What game objects will be updated/drawn and in what order.
*/
import { COMMAND, GAMESTATE } from "./global.js";
export default class Running {
    constructor(game) {
        game.activeKey = null;
        game.gamestate = GAMESTATE.RUNNING;
        this.state = GAMESTATE.RUNNING;
    }
    update(game,deltaTime) {
        this.commandTrigger(game);
        game.player.activeKey = game.activeKey;
        game.map.update(game, deltaTime);
        game.debug.update(game.player);
    }
    draw(ctx,game) {
        game.map.draw(ctx, game);
        game.debug.draw(ctx, game);
    }

    commandTrigger(game) {
        if (game.activeKey === COMMAND.CANCEL) {
            game.startEditor();
        }
    }
}
