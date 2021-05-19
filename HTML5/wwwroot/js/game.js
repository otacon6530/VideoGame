/**
 * @author Michael Stephens
 * @desc Game file that controls the communication between the different objects of the game.
*/
import Character from "./character.js";
import Player from "./player.js";
import Map from "./map.js";
import InputHandler from "./input.js";
import gameStateMenu from "./gameState.Menu.js";
import Debug from "./debug.js";
import gameStateDialog from "./gameState.Dialog.js";
import dialogBox from "./dialogBox.js";
import gameStateEditor from "./gameState.Editor.js";
import gameStateRunning from "./gameState.Running.js";
import { COMMAND, GAMESTATE } from "./global.js";
import SoundHandler from "./sound.js";
import Calendar from "./calendar.js";

export default class Game {
    constructor(gameWidth, gameHeight) {

        //Pull game configuration
        var httpObj = $.ajax({
            url: "config.json",
            async: false // synchronous (wait until file is loaded)
        });
        var config = JSON.parse(httpObj.responseText);
        this.enableDebug = config.enableDebug;
        this.enableEditor = config.enableEditor;
        this.mapLocation = config.mapLocation;
        this.imageLocation = config.imageLocation;
        this.GS = config.GS;
        this.clock = new Calendar(4,30,23);

        console.log(config.enableDebug);

        //primary attributes
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.events = [];

        //setup the initial map.
        this.map = new Map(this, "test");
        let char = new Character(this, "king", 3, 3, COMMAND.DOWN, "", "I am the KING!");
        this.map.addCharacter(char);
        this.player = new Player(this, "player", 3, 4, COMMAND.DOWN, "", "");
        this.map.addCharacter(this.player);

        //initialize primary game objects
        this.InputHandler = new InputHandler(this);
        this.debug = new Debug(this);

        //set the starting game state
        this.stateObject = new gameStateMenu(this, "test");

    }

    /**
     * update is called by the game loop and runs the
     * update and draw functions of the active game state.
     *
     * @param deltaTime not currently built out
     * @param ctx the html canvas
     */
    update(deltaTime, ctx) {
        this.activeKey = this.InputHandler.getKey(this.activeKey);
        if (this.stateObject !== null && this.stateObject !== undefined) {

            //Update the game object associated with the state
            this.stateObject.update(this, deltaTime);

            //Update the game events
            for (const event of this.events) { event.update() };

            //update the player location for the draw functions
            this.x = this.player.px - this.gameWidth / 2;
            this.y = this.player.py - this.gameHeight / 2;

            //draw game objects associated with the state
            this.stateObject.draw(ctx, this);
        }
        this.clock.update();
    }
    /**
     * Start the running state
     */
    startRunning() {
        if (this.stateObject.state !== GAMESTATE.RUNNING) {
            this.stateObject = new gameStateRunning(this);
            //this.sound = new SoundHandler("music/Lupa.mp3");
            //this.sound.play();
        }
    }
    /**
    * start a diaolog state and create a dialog
    *
    * @param message
    */
    startDialog(message) {
        if (this.stateObject.state !== GAMESTATE.DIALOG) {
            this.stateObject = new gameStateDialog(this, message);
        }
    }
    /**
     * start the editor state
     */
    startEditor() {
        if (this.stateObject.state !== GAMESTATE.EDITOR && this.enableEditor) {
            this.stateObject = new gameStateEditor(this);
        }
    }
    /**
     * start the menu state
     */
    startMenu() {
        if (this.stateObject.state !== GAMESTATE.MAINMENU) {
            this.stateObject = new gameStateMenu(this, "test");
        }
    }
    /**
     * create a calculation to calculate the nearest square
     * @param a numerator
     * @param b denominator
     */
    div(a, b) {
        return Math.round(a / b - 0.5);
    }

    /**
     * add events to the event array
     * @param events an array of events
     */
    addEvent(events) {
        for (const event of events) { this.events.push(event); };
    }
}