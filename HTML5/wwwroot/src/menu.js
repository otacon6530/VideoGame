import SoundHandler from "./sound.js";
import { COMMAND } from "./global.js";
const GAMESTATE = {
  RUNNING: 0,
  MAINMENU: 1
};
export default class Menu {
  constructor(game, name) {
    this.name = name;
    this.backGroundColor = "black";
    this.backGroundImage = new Image();
    this.objects = [];
    this.frame = 1;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
  }

  /**
   * draw the menu
   *
   * @param ctx canvas being drawn on
   */
  draw(ctx) {
    //Draw background
    this.frame += 1;
    ctx.drawImage(this.backGroundImage, 0, 0);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.globalAlpha = (this.frame % 100) / 100;
    ctx.fillText(
      "Press Enter to Start",
      this.gameWidth / 2 - ctx.measureText("Press Enter to Start").width / 2,
      this.gameHeight / 2
    );
    ctx.globalAlpha = 1;
    if (this.frame % 15 === 0) {
      var fontSize = Math.random() * 50;
      var x = Math.random() * this.gameWidth;
      var y = Math.random() * this.gameHeight;
      var r = Math.floor(Math.random() * 255) + 50;
      var g = Math.floor(Math.random() * 255) + 50;
      var b = Math.floor(Math.random() * 255) + 50;

      var color = "rgba(" + r + "," + g + "," + b + ",1.0)";
      ctx.fillStyle = color;
      ctx.font = fontSize + "pt Arial";
      ctx.fillText("Demo", x, y);
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    }
  }
  update(game) {
    if (game.activeKey === COMMAND.ACTION) {
      game.startRunning();
      game.sound = new SoundHandler("music/Lupa.mp3");
      game.sound.play();
    }
  }
}
