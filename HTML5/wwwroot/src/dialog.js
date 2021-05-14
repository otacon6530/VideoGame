export default class Dialog {
  constructor(game) {
    this.msg = "";
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
  }
  update(game) {
    //Trigger when key is released.
    if (game.activeKey === 13) {
      game.startRunning();
    }
  }
  draw(ctx) {
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "black";
    ctx.fillRect(0, this.gameHeight - 75, this.gameWidth, 100);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    console.log(ctx.measureText(this.msg).height);
    ctx.fillText(this.msg, 40, this.gameHeight - 50);
    ctx.globalAlpha = 1;
  }
}
