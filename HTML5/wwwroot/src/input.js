export default class InputHandler {
  constructor(game) {
    this.keysPressed = {};
    this.activeKey = 0;
    document.addEventListener("keydown", event => {
      this.keysPressed[event.which] = true;
      game.activeKey = event.which;
    });
    document.addEventListener("keyup", event => {
      delete this.keysPressed[event.which];
      game.activeKey = null;
      for (let i in this.keysPressed) {
        game.activeKey = Number(i);
      }
    });
  }
}
