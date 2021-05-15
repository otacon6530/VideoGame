/**
 * @author Michael Stephens
 * @desc Takes input from each source and applies continous or single activations
 *       UP, Down, RIGH, LEFT commands are continous
 *       Action and Cancel commands are single activation
*/
import { COMMAND } from "./global.js";
import KeyBoardHandler from "./input.keyboard.js";
export default class InputHandler {
    constructor(game) {
        this.activeKey = null;
        new KeyBoardHandler(this);
    }
    getKey(activeKey) {
        if (this.activeKey === COMMAND.ACTION || this.activeKey === COMMAND.CANCEL) {
            if (this.activeKey !== activeKey) {
                var action = this.activeKey;
                this.activeKey = null;
                return action;
            } else {
                this.activeKey = null;
                return null;
            }
        } else {
            return this.activeKey;
        }
    }
}
