/**
  * @author Michael Stephens
  * @desc Takes keyboard input and translates it to a command accepted by the game.
*/
import { COMMAND } from "./global.js";
export default class KeyBoardHandler {
    constructor(inputHandler) {
        this.keysPressed = {};
        document.addEventListener("keydown", event => {
            var action = this.ActionTranslation(event.which);
            this.keysPressed[action] = true;
            if (action === COMMAND.LEFT || action === COMMAND.RIGHT || action === COMMAND.UP || action === COMMAND.DOWN) {
                inputHandler.activeKey = action;
            }
      });
      document.addEventListener("keyup", event => {
          var action = this.ActionTranslation(event.which);
          delete this.keysPressed[action];
          inputHandler.activeKey = null;
          for (let i in this.keysPressed) {
              inputHandler.activeKey = Number(i);
          }
          if(action === COMMAND.ACTION || action === COMMAND.CANCEL) {
              inputHandler.activeKey = action;
          }
      });
    }
    ActionTranslation(key) {
        if (key === 37 || key === 65) {
            return COMMAND.LEFT;
        } else if (key === 38 || key === 87) {
            return COMMAND.UP;
        } else if (key === 39 || key === 68) {
            return COMMAND.RIGHT;
        } else if (key === 40 || key === 83) {
            return COMMAND.DOWN;
        } else if (key === 13) {
            return COMMAND.ACTION;
        } else if (key === 8) {
            return COMMAND.CANCEL;
        }
    }
}
