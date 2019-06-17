import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3, Color3 } from "@babylonjs/core/Maths/math";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { DynamicTexture } from '@babylonjs/core/Materials/Textures/dynamicTexture'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera'

import {SignBoard} from "./signboard";

export class AxisLines {

    constructor() { }

    globalAxis(size:number,position:Vector3,scene: Scene):void {

        // var axisX = Mesh.CreateLines("axisX", [
        //     Vector3.Zero(), new Vector3(size, 0, 0), new Vector3(size * 0.95, 0.05 * size, 0),
        //     new Vector3(size, 0, 0), new Vector3(size * 0.95, -0.05 * size, 0)
        // ], scene);
        // axisX.color = new Color3(1, 0, 0);
        // let xChar = new SignBoard(.3,.45, new Vector3(0.9 * size, -0.05 * size, 0), scene);
        // xChar.drawText('X', 1, 25, "Bold 28px monospace", "red");

        // var axisY = Mesh.CreateLines("axisY", [
        //     Vector3.Zero(), new Vector3(0, size, 0), new Vector3(-0.05 * size, size * 0.95, 0),
        //     new Vector3(0, size, 0), new Vector3(0.05 * size, size * 0.95, 0)
        // ], scene);
        // axisY.color = new Color3(0, 1, 0);

        // let yChar = new SignBoard(.3, .45, new Vector3(0, 0.9 * size, -0.05 * size), scene);
        // yChar.drawText('Y', 1, 25, "Bold 28px monospace", "green");

        // var axisZ = Mesh.CreateLines("axisZ", [
        //     Vector3.Zero(), new Vector3(0, 0, size), new Vector3(0, -0.05 * size, size * 0.95),
        //     new Vector3(0, 0, size), new Vector3(0, 0.05 * size, size * 0.95)
        // ], scene);
        // axisZ.color = new Color3(0, 0, 1);

        // let zChar = new SignBoard(.3, .45, new Vector3(0, 0.05 * size, 0.9 * size), scene);
        // zChar.drawText('Y', 1, 25, "Bold 28px monospace", "green");

        var axisX = Mesh.CreateLines("axisX", [
            position,
            position.add(new Vector3(size, 0, 0)),
            position.add(new Vector3(size * 0.95, 0.05 * size, 0)),
            position.add(new Vector3(size, 0, 0)),
            position.add(new Vector3(size * 0.95, -0.05 * size, 0))
        ], scene);
        axisX.color = new Color3(1, 0, 0);
        let xChar = new SignBoard(.3,.45, position.add(new Vector3(0.9 * size, -0.05 * size, 0)), scene);
        xChar.drawText('X', 1, 25, "Bold 28px monospace", "red");

        var axisY = Mesh.CreateLines("axisY", [
            position,
            position.add(new Vector3(0, size, 0)),
            position.add(new Vector3(-0.05 * size, size * 0.95, 0)),
            position.add(new Vector3(0, size, 0)),
            position.add(new Vector3(0.05 * size, size * 0.95, 0))
        ], scene);
        axisY.color = new Color3(0, 1, 0);

        let yChar = new SignBoard(.3, .45, position.add(new Vector3(0, 0.9 * size, -0.05 * size)), scene);
        yChar.drawText('Y', 1, 25, "Bold 28px monospace", "green");

        var axisZ = Mesh.CreateLines("axisZ", [
            position, position.add(new Vector3(0, 0, size)),
            position.add(new Vector3(0, -0.05 * size, size * 0.95)),
            position.add(new Vector3(0, 0, size)),
            position.add(new Vector3(0, 0.05 * size, size * 0.95))
        ], scene);
        axisZ.color = new Color3(0, 0, 1);

        let zChar = new SignBoard(.3, .45, position.add(new Vector3(0, 0.05 * size, 0.9 * size)), scene);
        zChar.drawText('Z', 1, 25, "Bold 28px monospace", "blue");


    };





    //Local Axes
    localAxes(size: number, scene: Scene): Mesh {
        var pilot_local_axisX = Mesh.CreateLines("pilot_local_axisX", [
            Vector3.Zero(), new Vector3(size, 0, 0), new Vector3(size * 0.95, 0.05 * size, 0),
            new Vector3(size, 0, 0), new Vector3(size * 0.95, -0.05 * size, 0)
        ], scene);
        pilot_local_axisX.color = new Color3(1, 0, 0);

        var pilot_local_axisY = Mesh.CreateLines("pilot_local_axisY", [
            Vector3.Zero(), new Vector3(0, size, 0), new Vector3(-0.05 * size, size * 0.95, 0),
            new Vector3(0, size, 0), new Vector3(0.05 * size, size * 0.95, 0)
        ], scene);
        pilot_local_axisY.color = new Color3(0, 1, 0);

        var pilot_local_axisZ = Mesh.CreateLines("pilot_local_axisZ", [
            Vector3.Zero(), new Vector3(0, 0, size), new Vector3(0, -0.05 * size, size * 0.95),
            new Vector3(0, 0, size), new Vector3(0, 0.05 * size, size * 0.95)
        ], scene);
        pilot_local_axisZ.color = new Color3(0, 0, 1);

        var local_origin = MeshBuilder.CreateBox("local_origin", { size: 1 }, scene);
        local_origin.isVisible = false;

        pilot_local_axisX.parent = local_origin;
        pilot_local_axisY.parent = local_origin;
        pilot_local_axisZ.parent = local_origin;

        return local_origin;
    }



    makeTextPlane(text: string, color: string, size: number, scene: Scene): Mesh {

        // create a label card
        let sign = new SignBoard(1, 1, new Vector3(5, 0, 1), scene);


        var dynamicTexture = new DynamicTexture("DynamicTexture", 50, scene, true);
        dynamicTexture.hasAlpha = true;

        // let letters = new StandardMaterial("Mat", scene);
        // letters.diffuseTexture = signTexture;
        // letters.backFaceCulling = false;
        // letters.specularColor = new Color3(0, 0, 0);
        // letters.diffuseTexture = signTexture;


        dynamicTexture.drawText(text, 5, 40, "bold 36px monospace", color, "transparent", true);
        var plane = Mesh.CreatePlane("TextPlane", size, scene, true);
        plane.material = new StandardMaterial("TextPlaneMaterial", scene);
        plane.material.backFaceCulling = false;
        // plane.material.specularColor = new Color3(0, 0, 0);
        // plane.material.diffuseTexture = dynamicTexture;
        return plane;
    };



    update() {
    }
}
