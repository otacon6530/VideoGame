import KeyBoardHandler from "./input.keyboard.js";
const COMMAND = {
    UP: 3,
    DOWN: 0,
    LEFT: 1,
    RIGHT: 2,
    ACTION: 4,
    CANCEL: 5
};
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
