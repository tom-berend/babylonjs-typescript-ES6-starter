
////////////////////////////////////////////////////
// theses are different 'games'.  Don't want to recreate the
// whole environment just to test or develop a feature.
// the production game is 0

const whichGame: number = 3;

/* 0 */ import { Asteroids } from "./asteroids/asteroids";
/* 1 */ import { AsteroidCollide } from "./asteroids/asteroidcollide";
/* 2 */ import { Icosahedron } from "./asteroids/icosahedron";
/* 3 */ import { SimpleTest } from "./asteroids/simpletest";

////////////////////////////////////////////////////



import {
    Engine,
    Scene,
    Camera,
    FreeCamera,
    ArcRotateCamera,
    Light,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    AmmoJSPlugin
} from "babylonjs";

import {Assert} from './utils/assert'

class SomeGame {
    private canvas: HTMLCanvasElement;
    //private engine: Engine;

    // public scene: Scene;
    // public camera: ArcRotateCamera;

    public gameboard: any;

    constructor(canvasElement: string) {

        let assert = new Assert();
        assert.true(true, new Error('Test Passes'));
        // assert.true(false, new Error('Test Fails'));

        // Create canvas and engine
        this.canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        console.log(this.canvas)
        var engine = new BABYLON.Engine(this.canvas, true);


        // this.camera = new FreeCamera("camera0", new BABYLON.BABYLON.Vector3(0, 5, -10), this.scene);

        // this.camera.setTarget(BABYLON.Vector3.Zero());
        // this.camera.attachControl(this.canvas, false);

        window.addEventListener("DOMContentLoaded", () => {

            let scene = new BABYLON.Scene(engine);
            let gravityVector = new BABYLON.Vector3(0, 0, 0); // initially no gravity
            let physicsPlugin = new BABYLON.AmmoJSPlugin();
            scene.enablePhysics(gravityVector, physicsPlugin);

            // default is a FreeCamera, position set to (x:0, y:0, z:-50)
            let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, -50), scene);
            camera.setTarget(BABYLON.Vector3.Zero());

            // // Add a camera to the scene and attach it to the canvas
            // let camera:Camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);


            var gameboard;

            switch (whichGame) {
                case 0:
                    gameboard = new Asteroids();
                    break;
                case 1:
                    gameboard = new AsteroidCollide();
                    break;
                case 2:
                    gameboard = new Icosahedron(1, 2, 3);
                    break;
                case 3:
                    gameboard = new SimpleTest();
                    break;
                default:
            }

            gameboard.create(scene, camera);
            camera.attachControl(this.canvas, true);

            // Create the game using the 'renderCanvas' Create the scene
            //myGame.createScene();

            //            this.gameboard.create(this.canvas, this.scene);

            engine.runRenderLoop(() => {
                gameboard.update();
                scene.render();
            });
        });

    }



    // public animate(): void {
    //     // run the render loop

    //     console.log('loop')
    //     // // the canvas/window resize event handler
    //     // window.addEventListener("resize", () => {
    //     //     this.engine.resize();
    //     // });
    // }
}

let myGame = new SomeGame("renderCanvas");

