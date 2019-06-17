import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3, Color3 } from "@babylonjs/core/Maths/math";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { DynamicTexture } from '@babylonjs/core/Materials/Textures/dynamicTexture'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera'
import { stringify } from "querystring";
import { Light } from "@babylonjs/core/Lights/light";


export class SignBoard {
    public signMesh: Mesh;
    public signTexture: DynamicTexture;
    public ctx: CanvasRenderingContext2D;

    constructor(width: number, height: number, position: Vector3, scene: Scene) {

        this.createSignBoardParts(width, height, scene);
        this.signMesh.position = position;

    }

    createSignBoardParts(width: number, height: number, scene): void {
        this.signMesh = MeshBuilder.CreatePlane("", {
            width: width,
            height: height
        }, scene);

        //Create dynamic texture
        let textureResolution = 64;  // or fonts have to be ridiculous sizes
        this.signTexture = new DynamicTexture("", {
            width: width * textureResolution,
            height: height * textureResolution
        }, scene, true);

        // we need to put some 'diffuseTexture' material on our sign
        let miniCanvas = new StandardMaterial("", scene);
        miniCanvas.diffuseTexture = this.signTexture;
        this.signMesh.material = miniCanvas;

        // now we can write to the sign context as an HTML canvas

        this.ctx = this.signTexture.getContext();

        // set the background color
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.rect(0, 0, width * textureResolution, height * textureResolution);
        this.ctx.fill();
        this.signTexture.update();

    }

    drawText(text: string, x: number, y: number, font: string, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.fillText(text, x, y);

        this.signTexture.update();
    }


    // from https://stackoverflow.com/questions/14484787/wrap-text-in-javascript
    wordWrapToStringList(text: string, maxLength: number): string[] {
        let result: string[] = []
        let line: string[] = [];
        let length: number = 0;

        text.split(" ").forEach(function(word: string): void {
            if ((length + word.length) >= maxLength) {
                result.push(line.join(" "));
                line = []; length = 0;
            }
            length += word.length + 1;
            line.push(word);
        });
        if (line.length > 0) {
            result.push(line.join(" "));
        }
        return result;
    };
}
