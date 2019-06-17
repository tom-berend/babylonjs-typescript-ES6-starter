
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3, Color3 } from "@babylonjs/core/Maths/math";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { PointLight } from "@babylonjs/core/Lights/pointLight";
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { DynamicTexture } from '@babylonjs/core/Materials/Textures/dynamicTexture'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera'
import {AdvancedDynamicTexture} from '@babylonjs/gui/2D/advancedDynamicTexture';

import { AmmoJSPlugin } from '@babylonjs/core/Physics/Plugins/ammoJSPlugin'
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins/cannonJSPlugin'

// Required side effects to populate the Create methods on the mesh class.
import "@babylonjs/core/Meshes/meshBuilder";
// Required side effects to populate the Physics methods on the mesh class.
import "@babylonjs/core/Physics/physicsEngineComponent"

import { Hinges } from './asteroids/hinges'
import { SignBoard } from './asteroids/signboard';
import { AxisLines } from './asteroids/axislines';


const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
let engine = new Engine(canvas, true);

var createScene = function(engine: Engine, canvas: HTMLCanvasElement): Scene {
    var scene = new Scene(engine);

    var camera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 3, 25, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // // too much glare
    // var light = new PointLight("", new Vector3(0, 0, -10), scene);
    // light.intensity = 0.8;

    // simulate light in all directions with three hemisphere lights
    var light0 = new HemisphericLight("light0", new Vector3(1, 0, 0), scene);
    light0.intensity = 0.6;
    var light1 = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light1.intensity = 0.6;
    var light2 = new HemisphericLight("light2", new Vector3(0, 0, 1), scene);
    light2.intensity = 0.6;

    // Physics
    //scene.enablePhysics(new Vector3(0, 0, 0), new CannonJSPlugin());
    //scene.enablePhysics(new Vector3(0, 0, 0), new OimoJSPlugin());
    scene.enablePhysics(new Vector3(0, 0, 0), new AmmoJSPlugin());


//    // GUI
//    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

//    var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Click Me");
//    button1.width = "150px"
//    button1.height = "40px";
//    button1.color = "white";
//    button1.cornerRadius = 20;
//    button1.background = "green";
//    button1.onPointerUpObservable.add(function() {
//        alert("you did it!");
//    });
//    advancedTexture.addControl(button1);



    // create a label card
    let sign = new SignBoard(5, 3, new Vector3(-5, 5, 1), scene);
    sign.drawText('Hinge', 2, 40, "Bold 40px monospace", "green");
    sign.drawText('hello world', 4, 70, "20px Arial", "blue");

    let axis = new AxisLines()
    axis.globalAxis(5, Vector3.Zero(), scene);

    axis.globalAxis(5, new Vector3(3, 3, 3), scene);

    let hinges = new Hinges();
    let myHinge = hinges.hinge(Vector3.Zero(),scene);

    return (scene);
};
var scene = createScene(engine, canvas);

engine.runRenderLoop(function() {
    scene.render();
});


