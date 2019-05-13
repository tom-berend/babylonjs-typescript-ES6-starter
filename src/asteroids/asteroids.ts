
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

export class Asteroids {

    private scene: Scene;
    private camera: FreeCamera;
    private light: Light;

    private asteroidGridMaterial: GridMaterial;
    private skyRadius: number;
    private skyMaterial: GridMaterial;

    public asteroids: Array<Mesh>;

    constructor(canvas: HTMLCanvasElement, engine:Engine,scene: Scene) {

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


        this.asteroids = [];
        this.scene = scene;

        this.asteroidGridMaterial = new GridMaterial("", this.scene);
        this.asteroidGridMaterial.majorUnitFrequency = 3;
        this.asteroidGridMaterial.gridRatio = 0.5;

        this.skyMaterial = new GridMaterial("skyMaterial", this.scene);
        this.skyMaterial.majorUnitFrequency = 6;
        this.skyMaterial.minorUnitVisibility = 0.3;
        this.skyMaterial.gridRatio = 0.5;
        this.skyMaterial.mainColor = new Color3(0, 0.05, 0.2);
        this.skyMaterial.lineColor = new Color3(0, 1.0, 1.0);
        this.skyMaterial.backFaceCulling = false;

        this.skyRadius = 50;
        var skySphere = Mesh.CreateSphere("skySphere", this.skyRadius * 2, this.skyRadius * 2, this.scene);
        skySphere.material = this.skyMaterial;
    }

    preload() { }


    create() {

        /////// this pattern puts a wall of asteroids across the xy plane
        let pattern = [
            [18, 0.9, 6],  // 18 at 90% distance at x-y, 6 out the z direction,
            [12, 0.6, 8],
            [8, 0.35, 12],
            [4, 0.15, 15]
        ];

        pattern.forEach(ring => {
            let pi = 3.14;
            for (let i = 0; i < ring[0]; i++) {

                let x = (ring[1] * this.skyRadius) * Math.cos(2 * pi * i / ring[0])
                let y = (ring[1] * this.skyRadius) * Math.sin(2 * pi * i / ring[0])

                // the i loop puts asteroids in a series of rings on the x-y axis of the sphere
                // the j loop spreads them out along the z axis

                for (let j = 0; j < ring[2]; j++) {

                    let z = this.skyRadius * (j / ring[2]) * ((j % 2 == 0)
                        ? -1
                        : 1)
                    // second part simply alternates between positive and negative values

                    if ((x * x + y * y + z * z) < (this.skyRadius * this.skyRadius)) {
                        let mesh = this.createOneAsteroid();
                        mesh.position = new Vector3(x, y, z);
                        this
                            .asteroids
                            .push(mesh);
                    }
                }
            }
        })

    }

    update() {
        // move EACH asteroid and check for collisions (so can have jostling)
        this
            .asteroids
            .forEach(element => {
                // save old position
                let oldRotation = element.rotation;
                let oldPosition = element.position;

                // try out new position
                // // element.rotation.addInPlace(element.rotate);
                // // element.position.addInPlace(element.motion);

            });

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

        mesh.material = this.asteroidGridMaterial;

        var axis = new Vector3(1, 1, 1);

        // normally the object mesh has a more complicated shape than the imposter here,
        // we use exactly the same shape
        mesh.physicsImpostor = new PhysicsImpostor(mesh, PhysicsImpostor.SphereImpostor, {
            mass: 1,
            restitution: 0.9
        }, this.scene);

        mesh.physicsImpostor.setLinearVelocity(
            new Vector3(this.randomMotion(), this.randomMotion(), this.randomMotion())
        );
        mesh.physicsImpostor.setAngularVelocity(
            new Vector3(this.randomMotion() * Math.PI, this.randomMotion() * Math.PI, this.randomMotion() * Math.PI)
        );

        return (mesh);
    }

}