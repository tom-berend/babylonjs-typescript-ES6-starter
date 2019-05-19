
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
    AmmoJSPlugin,
    Material
} from 'babylonjs';

import { GridMaterial } from 'babylonjs-materials';
import { Assert } from '../utils/assert';
//import {CANNON} from 'cannon';

export class Asteroids {

    public asteroids: Array<Mesh>;

    constructor() {
        // this.engine = engine;
        // this.scene = scene;
        // this.camera = camera;

        // console.log()
        // this.engine = new Engine(this.canvas, true);

        // this.scene = new Scene(this.engine);
        // let gravityVector = new Vector3(9.8, 0, 0); // initially no gravity
        // let physicsPlugin = new AmmoJSPlugin();
        // this.scene.enablePhysics(gravityVector, physicsPlugin);

        // this.camera = new FreeCamera("camera0", new Vector3(0, 5, -10), this.scene);

        // this.camera.setTarget(Vector3.Zero());
        // this.camera.attachControl(this.canvas, false);



        this.asteroids = [];

    }

    preload() { }


    create(scene: Scene, camera: Camera) {

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);


        let asteroidGridMaterial = new BABYLON.GridMaterial("", scene);
        asteroidGridMaterial.majorUnitFrequency = 3;
        asteroidGridMaterial.gridRatio = 0.5;

        let skyMaterial = new BABYLON.GridMaterial("skyMaterial", scene);
        skyMaterial.majorUnitFrequency = 6;
        skyMaterial.minorUnitVisibility = 0.3;
        skyMaterial.gridRatio = 0.5;
        skyMaterial.mainColor = new BABYLON.Color3(0, 0.05, 0.2);
        skyMaterial.lineColor = new BABYLON.Color3(0, 1.0, 1.0);
        skyMaterial.backFaceCulling = false;

        let skyRadius = 50;

        /////// this pattern puts a wall of asteroids across the xy plane
        let pattern = [
            [18, 0.9, 6],  // 18 at 90% distance at x-y, 6 out the z direction,
            [12, 0.6, 8],
            [8, 0.35, 12],
            [4, 0.15, 15]
        ];

        var skySphere = new BABYLON.Mesh.CreateSphere("skySphere", skyRadius * 2, skyRadius * 2, scene);
        skySphere.material = skyMaterial;

        pattern.forEach(ring => {
            let pi = 3.14;
            for (let i = 0; i < ring[0]; i++) {

                let x = (ring[1] * skyRadius) * Math.cos(2 * pi * i / ring[0])
                let y = (ring[1] * skyRadius) * Math.sin(2 * pi * i / ring[0])

                // the i loop puts asteroids in a series of rings on the x-y axis of the sphere
                // the j loop spreads them out along the z axis

                for (let j = 0; j < ring[2]; j++) {

                    let z = skyRadius * (j / ring[2]) * ((j % 2 == 0)
                        ? -1
                        : 1)
                    // second part simply alternates between positive and negative values

                    if ((x * x + y * y + z * z) < (skyRadius * skyRadius)) {

                        let size = this.randomVector3(5, 3);
                        let position = new BABYLON.Vector3(x, y, z);
                        let linearV = new BABYLON.Vector3(this.randomMotion(), this.randomMotion(), this.randomMotion())
                        let angularV = new BABYLON.Vector3(this.randomMotion() * Math.PI, this.randomMotion() * Math.PI, this.randomMotion() * Math.PI)

                        let mesh = this.createOneAsteroid(scene, size, position, linearV, angularV);
                        mesh.material = asteroidGridMaterial;

                        this.asteroids.push(mesh);
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

    // create a random number Vector3 with scaling and offsetpositi
    randomVector3(scale: number, offset: number): BABYLON.Vector3 {
        return new BABYLON.Vector3(
            Math.random() * scale + offset,
            Math.random() * scale + offset,
            Math.random() * scale + offset
        )
    }


    randomMotion() {
        return (Math.random() - 0.5);   // value between -.5 and .5
    }


    // given a position, linear velocity, and angular velocity, we return a mesh
    createOneAsteroid(scene: Scene, size: Vector3, position: Vector3, linearV: Vector3, angularV: Vector3): Mesh {

        let mesh = BABYLON.MeshBuilder.CreateSphere("", {
            diameterX: size.x,
            diameterY: size.y,
            diameterZ: size.z
        }, scene);

        mesh.position = position;

        // normally the object mesh has a more complicated shape than the imposter
        // ours should be exactly the same
        mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.SphereImpostor, {
            mass: 1,
            restitution: 1.0
        }, scene);


        if(mesh.physicsImpostor)
            mesh.physicsImpostor.setLinearVelocity(linearV);
        else
            new Assert().true(false,new Error('Expected a MESH object'))

        if(mesh.physicsImpostor)
            mesh.physicsImpostor.setAngularVelocity(angularV);
        else
            new Assert().true(false,new Error('Expected a MESH object'))

        return (mesh);
    }

}