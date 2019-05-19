
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
} from 'babylonjs';

import { GridMaterial } from 'babylonjs-materials'

import { Asteroids } from './asteroids';

export class AsteroidCollide {

    // private asteroidGridMaterial: GridMaterial;
    // private skyMaterial: GridMaterial;

    constructor() {
        console.log('in AsteroidCollide constructor');
    }

    preload() { }


    create(scene: Scene, camera: Camera) {

        let asteroidGridMaterial = new BABYLON.GridMaterial("", scene);
        asteroidGridMaterial.majorUnitFrequency = 3;
        asteroidGridMaterial.gridRatio = 0.5;


        let skyMaterial = new BABYLON.GridMaterial("skyMaterial", scene);
        skyMaterial.majorUnitFrequency = 6;
        skyMaterial.mainColor = new BABYLON.Color3(0, 0.05, 0.2);
        skyMaterial.lineColor = new BABYLON.Color3(0, 1.0, 1.0);


        // create a basic light, aiming 0,1,0 - meaning, to the sky
        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);


        // let a1 = MeshBuilder.CreateSphere("mySphere", {
        //     diameterX: Math.random() * 5 + 2,
        //     diameterY: Math.random() * 5 + 2,
        //     diameterZ: Math.random() * 5 + 2
        // }, this.scene);

        let asteroids = new Asteroids();


        let size, position, linearV, angularV;

        size = new BABYLON.Vector3(2, 4, 6);

        // these three are heading right
        linearV = new BABYLON.Vector3(1, 0, 0)
        position = new BABYLON.Vector3(-5, 8, 0)
        angularV = new BABYLON.Vector3(0, 0, 0)

        let a1 = asteroids.createOneAsteroid(scene, size, position, linearV, angularV);

        position = new BABYLON.Vector3(-5, 0, 0)
        angularV = new BABYLON.Vector3(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)

        let b1 = asteroids.createOneAsteroid(scene, size, position, linearV, angularV);

        position = new BABYLON.Vector3(-5, -8, 0)
        angularV = new BABYLON.Vector3(0, 0, 0)
        let c1 = asteroids.createOneAsteroid(scene, size, position, linearV, angularV);
        if(c1.physicsImpostor)  // because I'm using typescript
           c1.physicsImpostor.applyImpulse(new BABYLON.Vector3(-0.1,0,0), new BABYLON.Vector3(2,2,2));


        // these three are heading left
        linearV = new BABYLON.Vector3(-1, 0, 0)
        position = new BABYLON.Vector3(5, 8, 0)
        angularV = new BABYLON.Vector3(0, 0, 0)

        let a2 = asteroids.createOneAsteroid(scene, size, position, linearV, angularV);

        position = new BABYLON.Vector3(5, 0, 0)
        angularV = new BABYLON.Vector3(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
        let b2 = asteroids.createOneAsteroid(scene, size, position, linearV, angularV);

        position = new BABYLON.Vector3(5, -8, 0)
        angularV = new BABYLON.Vector3(0, 0, 0)
        let c2 = asteroids.createOneAsteroid(scene, size, position, linearV, angularV);
        if(c2.physicsImpostor)  // because I'm using typescript
           c2.physicsImpostor.applyImpulse(new BABYLON.Vector3(0.1,0,0), new BABYLON.Vector3(2,2,2));

    }

    update() {
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
        mesh.physicsImpostor = new PhysicsImpostor(mesh, PhysicsImpostor.SphereImpostor, {
            mass: 1,
            restitution: 1.0
        }, scene);

        mesh.physicsImpostor.setLinearVelocity(linearV);
        mesh.physicsImpostor.setAngularVelocity(angularV);

        return (mesh);
    }

}