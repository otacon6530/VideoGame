/**
 * @author Michael Stephens
 * @desc manages objects related to the editor
*/
import { COMMAND } from "./global.js";
export default class Editor {
  constructor(game) {
    this.map = game.map;
  }
    update(game) {
        //controls for editor
        if (game.activeKey === COMMAND.CANCEL) {
            game.startRunning();
            game.map.save("test");
        }
        
    }
    draw(ctx) {
       
    }
    startEditor() {

    }
}
