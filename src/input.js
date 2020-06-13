export default class InputHandler {
  constructor(player) {
    this.keysPressed = {};
    this.activeKey = 0;
    document.addEventListener("keydown", event => {
      this.keysPressed[event.which] = true;
      player.activeKey = event.which;
    });
    document.addEventListener("keyup", event => {
      delete this.keysPressed[event.which];
      player.activeKey = null;
      for (let i in this.keysPressed) {
        player.activeKey = Number(i);
      }
    });
  }
}
