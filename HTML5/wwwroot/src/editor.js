import { COMMAND } from "./global.js";
export default class Editor {
  constructor(game) {
    this.map = game.map;
  }
    update(game) {
        //controls for editor
        if (game.activeKey === COMMAND.CANCEL) {
            game.startRunning();
        }
        
    }
    draw(ctx) {
       
    }
    startEditor() {

    }
}
