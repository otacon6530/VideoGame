export default class Dialog {
  constructor() {}
  update(char) {}
  draw(ctx, game) {
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.gameWidth, 100);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(
      "position: (" + this.playerX + "," + this.playerY + ")",
      50,
      40
    );
    ctx.globalAlpha = 1;
  }
}
