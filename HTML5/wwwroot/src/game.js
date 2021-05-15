/**
 * @author Michael Stephens
 * @desc Game file that controls the communication between the different objects of the game.
*/
import Character from "./character.js";
import Player from "./player.js";
import Map from "./map.js";
import InputHandler from "./input.js";
import Menu from "./menu.js";
import Debug from "./debug.js";
import Dialog from "./dialog.js";
import Editor from "./editor.js";
import { COMMAND } from "./global.js";

const GAMESTATE = {
    RUNNING: 0,
    MAINMENU: 1,
    PAUSE: 2,
    DIALOG: 3,
    EDITOR: 4
};

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.GS = 32;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.objects = {};
        this.mapLocation = "map/";
        this.imageLocation = "images/";
        this.activeKey = null;
        this.player = {};
        this.InputHandler = {};
    }
    start() {
        this.gamestate = GAMESTATE.MAINMENU; //Start at the main menu
        //Initialize all objects
        this.InputHandler = new InputHandler(this); 
        this.menu = new Menu(this, "test");
        this.map = new Map(this, "test");
        let char = new Character(this, "king", 3, 3, COMMAND.DOWN, "", "I am the KING!");
        this.map.addCharacter(char);
        this.player = new Player(this, "player", 3, 4, COMMAND.DOWN, "", "");
        this.map.addCharacter(this.player);
        this.debug = new Debug(this);
        this.dialog = new Dialog(this);
        this.editor = new Editor(this);
    }
    update(deltaTime) {
        this.activeKey = this.InputHandler.getKey(this.activeKey);
        switch (this.gamestate) {
            case GAMESTATE.RUNNING:
                this.player.activeKey = this.activeKey;
                this.map.update(this, deltaTime);
                this.debug.update(this.player);
                if (this.activeKey === COMMAND.CANCEL) {
                    this.gamestate = GAMESTATE.EDITOR;
                }
                break;
            case GAMESTATE.DIALOG:
                this.dialog.update(this);
                break;
            case GAMESTATE.MAINMENU:
                this.menu.update(this);
                break;
            case GAMESTATE.EDITOR:
                this.editor.update(this);
                this.map.update(this, deltaTime);
                break;
        }
    }

    draw(ctx) {
        let x = this.player.px - this.gameWidth / 2;
        let y = this.player.py - this.gameHeight / 2;
        switch (this.gamestate) {
            case GAMESTATE.RUNNING :
                this.map.draw(ctx, x, y);
                this.debug.draw(ctx, this);
                break;
            case GAMESTATE.DIALOG:
                this.map.draw(ctx, x, y);
                this.debug.draw(ctx, this);
                this.dialog.draw(ctx);
                break;
            case GAMESTATE.MAINMENU:
                this.menu.draw(ctx);
                this.debug.draw(ctx, this);
                break;
            case GAMESTATE.EDITOR:
                this.map.draw(ctx, x, y);
                this.editor.draw(ctx);
                this.debug.draw(ctx, this);
                break;
        }
    }
    div(a, b) {
        return Math.round(a / b - 0.5);
    }
    startRunning() {
        if (this.gamestate !== GAMESTATE.RUNNING) {
            this.activeKey = null;
            this.gamestate = GAMESTATE.RUNNING;
        }
    }
    startDialog(message) {
        this.dialog.msg = message;
        if (this.gamestate !== GAMESTATE.DIALOG) {
            this.activeKey = null;
            this.gamestate = GAMESTATE.DIALOG;
        }
    }
    startEditor(player) {
        if (this.gamestate !== GAMESTATE.EDITOR) {
            this.activeKey = null;
            this.gamestate = GAMESTATE.EDITOR;
        }
    }
}
