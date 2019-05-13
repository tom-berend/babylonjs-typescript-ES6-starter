
// set up 'astroid world' inside a sphere

import {
    Engine,
    Scene,
    Camera,
    FreeCamera,
    Light,
    HemisphericLight,
    Color3,
    Vector3,
    Mesh,
    MeshBuilder,
    Quaternion,
    PhysicsImpostor,
    AmmoJSPlugin
} from '@babylonjs/core';

import { GridMaterial } from '@babylonjs/materials';

export class AsteroidCollide {

    private scene: Scene;
    private camera: FreeCamera;
    private light: Light;

    private asteroidGridMaterial: GridMaterial;
    private skyMaterial: GridMaterial;

    constructor(canvas: HTMLCanvasElement, engine: Engine, scene: Scene) {

        this.scene = scene;
        let gravityVector = new Vector3(0, 0, 0); // no gravity
        let physicsPlugin = new AmmoJSPlugin();
        this.scene.enablePhysics(gravityVector, physicsPlugin);

        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        this.camera = new FreeCamera("camera1", new Vector3(0, 5, -10), this.scene);
        this.camera.setTarget(Vector3.Zero());
        this.camera.attachControl(canvas, false);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        this.light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene);


        this.scene = scene;

        this.asteroidGridMaterial = new GridMaterial("", this.scene);
        this.asteroidGridMaterial.majorUnitFrequency = 3;
        this.asteroidGridMaterial.gridRatio = 0.5;


        this.skyMaterial = new GridMaterial("skyMaterial", this.scene);
        this.skyMaterial.majorUnitFrequency = 6;
        this.skyMaterial.mainColor = new Color3(0, 0.05, 0.2);
        this.skyMaterial.lineColor = new Color3(0, 1.0, 1.0);

    }

    preload() { }


    create() {

        // let a1 = MeshBuilder.CreateSphere("mySphere", {
        //     diameterX: Math.random() * 5 + 2,
        //     diameterY: Math.random() * 5 + 2,
        //     diameterZ: Math.random() * 5 + 2
        // }, this.scene);

        let a1 = this.createOneAsteroid();

        a1.material = this.asteroidGridMaterial;
        a1.position = new Vector3(-5, 0, 0)
        //a1.rotation = new Vector3(2,3,4)
        a1.physicsImpostor = new PhysicsImpostor(a1, PhysicsImpostor.SphereImpostor, { mass: 1 }, this.scene);
        a1.physicsImpostor.setLinearVelocity(new Vector3(1, 0, 0));
        a1.physicsImpostor.setAngularVelocity(new Vector3(this.randomMotion() * Math.PI, this.randomMotion() * Math.PI, this.randomMotion() * Math.PI));

        let a2 = MeshBuilder.CreateSphere("mySphere", {
            diameterX: Math.random() * 5 + 2,
            diameterY: Math.random() * 5 + 2,
            diameterZ: Math.random() * 5 + 2
        }, this.scene);
        a2.material = this.skyMaterial;
        a2.position = new Vector3(5, 0, 0)
        a2.physicsImpostor = new PhysicsImpostor(a2, PhysicsImpostor.SphereImpostor, { mass: 1 }, this.scene);
        a2.physicsImpostor.setLinearVelocity(new Vector3(-1, 0, 0));
        a2.physicsImpostor.setAngularVelocity(new Vector3(this.randomMotion() * Math.PI, this.randomMotion() * Math.PI, this.randomMotion() * Math.PI));

    }

    update() {
    }

    randomMotion() {
        return (Math.random() - 0.5);   // value between -.5 and .5
    }


    createOneAsteroid() {

        let mesh = MeshBuilder.CreateSphere("mySphere", {
            diameterX: Math.random() * 5 + 2,
            diameterY: Math.random() * 5 + 2,
            diameterZ: Math.random() * 5 + 2
        }, this.scene);


        // normally the object mesh has a more complicated shape than the imposter here,
        // we use exactly the same shape
        // mesh.physicsImpostor = new PhysicsImpostor(mesh, PhysicsImpostor.SphereImpostor, {
        //     mass: 1,
        //     restitution: 0.9
        // }, this.scene);

        // mesh.physicsImpostor.setLinearVelocity(
        //     new Vector3(this.randomMotion(), this.randomMotion(), this.randomMotion())
        // );

        // mesh.physicsImpostor.setAngularVelocity(
        //     new Vector3(this.randomMotion() * Math.PI, this.randomMotion() * Math.PI, this.randomMotion() * Math.PI)
        // );

        return (mesh);
    }

}