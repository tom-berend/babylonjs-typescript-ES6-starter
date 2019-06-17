// exercise different types of hinges

import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3, Color3 } from "@babylonjs/core/Maths/math";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { DynamicTexture } from '@babylonjs/core/Materials/Textures/dynamicTexture'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera'

import { PhysicsJoint } from '@babylonjs/core/Physics/physicsJoint'
import { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor'


interface myJointInterface {
    fixed: Mesh;
    moving: Mesh;
    extra?: Mesh;
    hingeType: number;
}


export class Hinges {

    myJoints: myJointInterface[] = [];

    constructor() { }

    test() { }

    hinge(position:Vector3,scene:Scene){

        let myJoint: myJointInterface = this.createJoint(1, scene);
        this.myJoints.push(myJoint);


        //Impulse Settings
        var impulseDirection = new Vector3(1, 0, 0);
        var impulseMagnitude = 5;
        var contactLocalRefPoint = new Vector3(0, 0, 0);

        var pulse = function(joint: myJointInterface) {
            console.log(joint)
            if (joint.moving.physicsImpostor)
                joint.moving.physicsImpostor.applyImpulse(
                    impulseDirection.scale(impulseMagnitude),
                    joint.moving.getAbsolutePosition().add(contactLocalRefPoint));
        }

        this.myJoints.map(pulse)
    }


    createJoint(which: number, scene: Scene): myJointInterface {
        console.assert(which >= 1 && which <= 8, 'should be between 1 and 8');

        let fixedMat = new StandardMaterial("fixed", scene);
        fixedMat.diffuseColor = Color3.Red();

        let movingMat = new StandardMaterial("moving", scene);
        movingMat.diffuseColor = Color3.Blue();

        let extraFixedMat = new StandardMaterial("extraFixed", scene);
        extraFixedMat.diffuseColor = Color3.Red();

        let fixed: Mesh;
        let moving: Mesh;
        let extra: Mesh;

        switch (which) {

            case 1:     // Pivot
                fixed = MeshBuilder.CreateSphere("fixed", { diameter: 1 }, scene);
                //fixed = MeshBuilder.CreateCylinder("fixed", { height: 6, diameterTop: 1, diameterBottom: 1 }, scene);
                fixed.material = fixedMat;

                moving = MeshBuilder.CreateBox("moving", { size: 2 }, scene);
                moving.material = movingMat;

                // Add Imposters
                fixed.physicsImpostor = new PhysicsImpostor(fixed, PhysicsImpostor.SphereImpostor, { mass: 0 }, scene);

                moving.physicsImpostor = new PhysicsImpostor(moving, PhysicsImpostor.BoxImpostor, { mass: 1 }, scene);
                //initial position
                moving.position = new Vector3(3, 0, 0);

                // For a hinge the only component of any force that produces movement is one perpendicular
                // to the axis of the hinge. It is possible however that a large impulse in another direction
                // can produce a reaction between the two bodies that does produce an impulse component in the perpendicular direction.

                // mainPivot: Vector3; the pivot point for the main body.
                // connectedPivot: vector3; the pivot point for the connected body, the negative of the connected body's position.
                // mainAxis: Vector3; the axis for the main body.
                // connectedAxis: Vector3; the axis for the connected body, usually the same as the main axis.

                //Add Joint

                let joint1 = new PhysicsJoint(PhysicsJoint.HingeJoint, {
                    mainPivot: new Vector3(0, 0, 0),
                    connectedPivot: new Vector3(0, -4.5, 0),
                    mainAxis: new Vector3(0, 0, 1),
                    connectedAxis: new Vector3(0, 0, 1),
                });

                fixed.physicsImpostor.addJoint(moving.physicsImpostor, joint1);
                return ({ fixed: fixed, moving: moving, hingeType: which })
                break;

            default:
        }

        // couldn't find this hinge, but still have to return something
        fixed = MeshBuilder.CreateSphere('unused', {}, scene);
        moving = MeshBuilder.CreateBox('unused', {}, scene);
        return ({ fixed: fixed, moving: moving, hingeType: which })

    }

}