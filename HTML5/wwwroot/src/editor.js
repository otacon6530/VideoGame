export default class Editor {
  constructor(game) {
    this.map = game.map;
  }
  update(game) {
    if (game.activeKey === 69) {
      game.startRunning();
    }
  }
  draw(ctx) {}
}
