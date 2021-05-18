export default class Debug{
    constructor(game) {
        this.playerX = game.player.x;
        this.playerY = game.player.y;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
    }
    update(player) {
        this.playerX = player.x;
        this.playerY = player.y;

    }
    draw(ctx, game) {
        if (game.enableDebug) {
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, this.gameWidth, 100);
            ctx.globalAlpha = 1;
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.fillText(
                "position: (" + this.playerX + "," + this.playerY + ")\nGameState: " + game.gamestate + "Action:" + game.activeKey+" clock:"+game.clock.time.toString(),
                50,
                40
            );
            ctx.globalAlpha = 1;
        }
    }
}
