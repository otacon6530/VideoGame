/**
 * @author Michael Stephens
 * @desc manages objects related to the editor
*/
import { COMMAND, GAMESTATE } from "./global.js";
export default class Editor {
  constructor(game) {
      game.activeKey = null;
      game.gamestate = GAMESTATE.EDITOR;
  }
    update(game) {
        this.commandTrigger(game);
    }
    draw(ctx) {

    }

    commandTrigger(game) {
        if (game.activeKey === COMMAND.CANCEL) {
            game.startRunning();
            game.map.save("test");
        }
    }
}
