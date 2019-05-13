// import 'core-js'; // <- at the top of your entry point


// theses are different 'games'.  '0' is the one I am really working on,
// but I don't want to recreate the whole environment just to test or
// develop a specific feature.

const whichGame:number = 0;
/* 0 */ import { Asteroids } from "./asteroids/asteroids";
/* 1 */ import { AsteroidCollide } from "./asteroids/asteroidcollide";

import {
    Engine,
    Scene,
    FreeCamera,
    Light,
    Vector3,
    HemisphericLight,
    AmmoJSPlugin
} from "@babylonjs/core";

class SomeGame {
    private canvas: HTMLCanvasElement;
    private engine: Engine;
    private scene: Scene;

    public gameboard: any;

    constructor(canvasElement: string) {
        // Create canvas and engine
        console.log(Engine);
        this.canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this.engine = new Engine(this.canvas, true);
        this.scene = new Scene(this.engine);

    }

    public createScene(): void {

        switch (whichGame) {
            case 0:
                this.gameboard = new Asteroids(this.canvas,this.engine,this.scene);
                break;
            case 1:
                this.gameboard = new AsteroidCollide(this.canvas,this.engine,this.scene);
                break;
            default:
        }


        this.gameboard.create();
    }

    public animate(): void {
        // run the render loop
        this.engine.runRenderLoop(() => {
            this.gameboard.update();
            this.scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }
}

let myGame = new SomeGame("renderCanvas");

window.addEventListener("DOMContentLoaded", () => {
    // Create the game using the 'renderCanvas' Create the scene
    myGame.createScene();

    // start animation
    myGame.animate();
});
