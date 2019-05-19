import { Engine, Scene, Camera, FreeCamera, Mesh, Vector3, VertexData, HemisphericLight, StandardMaterial } from "babylonjs";
//import { StandardMaterial } from '@babylonjs/materials';

import {Asteroids} from './asteroids';   // we are going to use an asteroid as a reference shape



export class Icosahedron {

    private aIcosBase: Array<number>;
    private x: number;
    private y: number;
    private z: number;

    constructor(x: number, y: number, z: number) {
        console.log('in Icosahedron constructor');

        this.aIcosBase = Array();
        this.x = x;
        this.y = y;
        this.z = z;
    }


    createVertexData():VertexData{

        let a=5,b=6;
        let vertexData = new BABYLON.VertexData();
        vertexData.positions = [0,0,0, 0,b,-a, 0,0,0, b,a,0, 0,0,0, -b-a-0];
        vertexData.indices = [1,2,3];
        return(vertexData);
    }

    // let r = 2;

    // var phi = (1 + Math.sqrt(5)) / 2;
    // var a = 1 / 2;
    // var b = 1 / (2 * phi);

    // var vertices = [
    //   new Vector3(  0,  b, -a),   // 0
    //   new Vector3(  b,  a,  0),// 1
    //   new Vector3( -b,  a,  0),// 2
    //   new Vector3(  0,  b,  a),// 3
    //   new Vector3(  0, -b,  a),// 4
    //   new Vector3( -a,  0,  b),// 5
    //   new Vector3(  a,  0,  b),// 6
    //   new Vector3(  0, -b, -a),// 7
    //   new Vector3(  a,  0, -b),// 8
    //   new Vector3( -a,  0, -b),// 9
    //   new Vector3(  b, -a,  0),// 10
    //   new Vector3( -b, -a,  0)// 11
    // ];

    //      //Set arrays for positions and indices
    //      var positions:Array<Position> = [];
    //      var indices:Array<any> = [];

    // var n=0;


    // vertices.forEach(element => {
    //     vertexData.positions.push(0,0,0,element.x,element.y,element.z);
    //     vertexData.indices.push(element);
    //     n+=1;
    // });



    // base() {

    //     function Icosahedron(r) {


            // vertices = vertices.map(function(v) { return v.normalize().scale(r); })

            // var faces = [
            //   [  1,  0,  2 ],
            //   [  2,  3,  1 ],
            //   [  4,  3,  5 ],
            //   [  6,  3,  4 ],
            //   [  7,  0,  8 ],
            //   [  9,  0,  7 ],
            //   [ 10,  4, 11 ],
            //   [ 11,  7, 10 ],
            //   [  5,  2,  9 ],
            //   [  9, 11,  5 ],
            //   [  8,  1,  6 ],
            //   [  6, 10,  8 ],
            //   [  5,  3,  2 ],
            //   [  1,  3,  6 ],
            //   [  2,  0,  9 ],
            //   [  8,  0,  1 ],
            //   [  9,  7, 11 ],
            //   [ 10,  7,  8 ],
            //   [ 11,  4,  5 ],
            //   [  6,  4, 10 ]
            // ];

            // var edges = [
            //   [ 0,  1 ],
            //   [ 0,  2 ],
            //   [ 0,  7 ],
            //   [ 0,  8 ],
            //   [ 0,  9 ],
            //   [ 1,  2 ],
            //   [ 1,  3 ],
            //   [ 1,  6 ],
            //   [ 1,  8 ],
            //   [ 2,  3 ],
            //   [ 2,  5 ],
            //   [ 2,  9 ],
            //   [ 3,  4 ],
            //   [ 3,  5 ],
            //   [ 3,  6 ],
            //   [ 4,  5 ],
            //   [ 4,  6 ],
            //   [ 4, 10 ],
            //   [ 4, 11 ],
            //   [ 5,  9 ],
            //   [ 5, 11 ],
            //   [ 6,  8 ],
            //   [ 6, 10 ],
            //   [ 7,  8 ],
            //   [ 7,  9 ],
            //   [ 7, 10 ],
            //   [ 7, 11 ],
            //   [ 8, 10 ],
            //   [ 9, 11 ],
            //   [10, 11 ]
            // ];






        // // create 12 vertices of a icosahedron
        // var t = (1.0 + Math.sqrt(5.0)) / 2.0;

        // addVertex(new Point3D(-1, t, 0));
        // addVertex(new Point3D(1, t, 0));
        // addVertex(new Point3D(-1, -t, 0));
        // addVertex(new Point3D(1, -t, 0));

        // addVertex(new Point3D(0, -1, t));
        // addVertex(new Point3D(0, 1, t));
        // addVertex(new Point3D(0, -1, -t));
        // addVertex(new Point3D(0, 1, -t));

        // addVertex(new Point3D(t, 0, -1));
        // addVertex(new Point3D(t, 0, 1));
        // addVertex(new Point3D(-t, 0, -1));
        // addVertex(new Point3D(-t, 0, 1));


    // }


    // we provide create and update for visual debugging

    create(scene: Scene, camera: Camera) {

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

        //Create a custom mesh
        var customMesh = new BABYLON.Mesh("custom", scene);

        // get the vertextData for our shape
        let vertexData = this.createVertexData();

        // apply the vertexData to the custom mesh
        vertexData.applyToMesh(customMesh);


        /******Display custom mesh in wireframe view to show its creation****************/
        var mat = new BABYLON.StandardMaterial("mat", scene);
        mat.wireframe = true;
        customMesh.material = mat;


        // put a reference mesh up beside it
        let asteroids = new Asteroids();

        let size = asteroids.randomVector3(5,3);
        let position = new BABYLON.Vector3(10,0,0);
        let linearV = new BABYLON.Vector3(0,0,0);
        let angularV = new BABYLON.Vector3(0,0,0);

        asteroids.createOneAsteroid(scene,size,position,linearV,angularV,mat);

    }

    update(scene: Scene, camera:Camera){

    }
}