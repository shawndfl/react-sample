import Box from "@mui/material/Box"
import React, {useRef, useEffect, useState} from "react";
import OrbitControls from "./OrbitControls";
import * as THREE from 'three';
import GLTFLoader from './GLTFLoader';
import floorTexture from 'img/floor2.jpg'
import Sky from "./Sky"
import { DayState } from "context/SceneContext";

/**
 * This is the main scene that will be used for rendering 
 * models and lights.
 * This will get called from @ref ThreeJsInterface.
 */
export default class MainScene {

    width : number;
    height : number;

    /**The threejs scene */
    scene : THREE.Scene;

    /**
     * Sky box
     */
    sky : Sky;
    //arrowHelper : THREE.ArrowHelper;
    //arrowHelperUp : THREE.ArrowHelper;

    /**
     * Direction light
     */
    dirLight : THREE.DirectionalLight;
    sunControllerNode : THREE.Object3D;
    sunNode : THREE.Object3D;;

    /** These are controls used to orbit the camera */
    controls : OrbitControls;
    /**
     * Threejs camera
     */
    camera : THREE.PerspectiveCamera;

    /**
     * Ground mesh
     */
    groundMesh : THREE.Mesh;
    groundGeo : THREE.PlaneGeometry;
    groundMat : THREE.MeshPhongMaterial;

    /**
     * Used to show different lighting
     */
    dayState: DayState;

    
    /**
     *  hemisphere
     */
    overhead : THREE.SpotLight;


    /**
     * Constructor
     * @param width 
     * @param height 
     */
    constructor(width : number, height : number, parent : HTMLCanvasElement) {
        this.width = width;
        this.height = height;

        // main scene and camera
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

        // let there be light
        this.sunNode = new THREE.Object3D(); // this will be set when the model loads
        this.sky = new Sky();
        this.sky.scale.setScalar(450000);
        this.scene.add(this.sky);
        const skyMat = this.sky.material;
        if (skyMat instanceof THREE.ShaderMaterial) {
            const uniforms = skyMat.uniforms;

            uniforms['turbidity'].value = 10;
            uniforms['rayleigh'].value = 3;
            uniforms['mieCoefficient'].value = .005;
            uniforms['mieDirectionalG'].value = .7;
            const phi = THREE.MathUtils.degToRad(0);
            const theta = THREE.MathUtils.degToRad(20.0);

            // calculate the sun's position
            const sun = new THREE.Vector3();
            sun.setFromSphericalCoords(1, phi, theta);
            uniforms['sunPosition'].value.copy(sun);
        }

        this.dayState = DayState.Loop;

        // manually create the ground
        this.groundGeo = new THREE.PlaneGeometry(14, 14);
        this.groundGeo.rotateX(THREE.MathUtils.degToRad(-90));
        this.groundMat = new THREE.MeshPhongMaterial({color: 0x646464});
        this.groundMesh = new THREE.Mesh(this.groundGeo, this.groundMat);
        this.groundMesh.position.set(0, 0, 0);
        this.groundMesh.receiveShadow = true;
        this.scene.add(this.groundMesh);

        // helpers
        //const dir = new THREE.Vector3(1, 0, 0);                
        //const origin = new THREE.Vector3(0, 0, 0);        
        //const color1 = 0xffff00;
        //this.arrowHelper = new THREE.ArrowHelper(dir, origin, 20, color1);
        //this.scene.add(this.arrowHelper);        

        //const north = new THREE.Vector3(0, -1, 0);                                        
        //const color2 = 0xff0000;
        //this.arrowHelperUp = new THREE.ArrowHelper(dir, origin, 20, color2);
        //this.scene.add(this.arrowHelperUp);


        // instantiate a loader
        const texture = new THREE.TextureLoader();

        // load a resource
        texture.load(
            // resource URL
                floorTexture,

            // onLoad callback
                (texture) => { // in this example we create the material when the texture is loaded
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(1, 4);
                this.groundMat.map = texture;
            }
        );

        this.controls = new OrbitControls(this.camera, parent);

        this.controls.enableDamping = true;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 10;
        this.controls.maxPolarAngle = THREE.MathUtils.degToRad(88);
        this.controls.target.set(0, 0.35, 0);
        this.controls.update();

        const light = new THREE.AmbientLight(0xc4c4c4); // soft white light
        this.scene.add(light);

        const targetObject = new THREE.Object3D();
        targetObject.position.set(0, -10, 0);
        this.scene.add(targetObject);

        this.overhead = new THREE.SpotLight("#FFE484", 1.0);
        this.overhead.castShadow = true;
        this.overhead.distance = 0;
        this.overhead.angle = THREE.MathUtils.degToRad(30);

        this.overhead.penumbra = .5;
        this.overhead.target = targetObject;

        // this light will be added to the scene when the model is loaded
        // it will use the sun as a parent node
        this.dirLight = new THREE.DirectionalLight(0xffffff);
        this.dirLight.position.set(0, 0, 0);
        this.dirLight.castShadow = true;

        // this will be set when the model is loaded
        this.sunControllerNode = new THREE.Object3D();

        this.camera.position.z = 4;
        this.camera.position.y = 4;

        // instantiate a loader
        const loader = new GLTFLoader();

        // load a resource
        loader.load(
            // resource URL
                'models/chair.gltf',

            // called when resource is loaded
                (gltf : any) => {
                // object.castShadow = true

                // set up the chair
                const chairMesh: THREE.Mesh = gltf.scene.getObjectByName('Chair');
                chairMesh.castShadow = true;
                const mat = chairMesh.material;
                let color3D = new THREE.Color("#000000");
                if (mat instanceof THREE.MeshBasicMaterial) {
                    mat.color = color3D;
                }

                // set up the table
                const tableMesh: THREE.Mesh = gltf.scene.getObjectByName('Table');
                tableMesh.castShadow = true;

                // setup the overhead light
                const overheadNode: THREE.Object3D = gltf.scene.getObjectByName('Overhead');
                this.overhead.position.x = overheadNode.position.x;
                this.overhead.position.y = overheadNode.position.y;
                this.overhead.position.z = overheadNode.position.z;
                overheadNode.add(this.overhead);

                // set up the sun
                this.sunNode = gltf.scene.getObjectByName('Sun');
                this.sunNode.add(this.dirLight);

                // the sun controller used to simulate sun rise and sun set
                this.sunControllerNode = gltf.scene.getObjectByName('SunController');

                this.scene.add(gltf.scene);

            },
            // called when loading is in progresses
                (xhr : XMLHttpRequest) => { // console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            },
            // called when loading has errors
                (error : string) => {

                console.log(`An error happened ${error}`);

            }
        );
    }

    /**
     * This function will set the sun's az and elevation. 
     * based on the transformation of the sun controller in world space.
     * The sky shader will also be updated         
     */
    setSunAngle(render : THREE.WebGLRenderer) {

        const sunPosition = new THREE.Vector3();
        this.dirLight.getWorldPosition(sunPosition);
        const controllerPos = new THREE.Vector3();
        const sunPos = new THREE.Vector3();

        this.sunControllerNode.getWorldPosition(controllerPos);
        this.sunNode.getWorldPosition(sunPos);
        let sunDirection = controllerPos.sub(sunPos);
        sunDirection.normalize();
        sunDirection.negate();        

        const sunTransform = sunDirection;

        // is the sun up
        const up = new THREE.Vector3(0, 1, 0);               
        const isSunUp = up.dot(sunTransform) >= 0;

        // is the light from the sun visible
        this.dirLight.visible = isSunUp;

        // helpers
        //this.arrowHelper.setDirection(sunDirection);        
        //this.arrowHelperUp.setDirection(up);

        // simulate exposure change
        const nightExposure = .5;
        const dayExposure = .35;
        const exposureStep = .005;
        if (isSunUp && render.toneMappingExposure > dayExposure) {
            render.toneMappingExposure -= exposureStep;
        } else if (! isSunUp && render.toneMappingExposure < nightExposure) {
            render.toneMappingExposure += exposureStep;
        }

        // clamp the exposure value
        render.toneMappingExposure = THREE.MathUtils.clamp(render.toneMappingExposure, dayExposure, nightExposure);

        const skyMat = this.sky.material;
        if (skyMat instanceof THREE.ShaderMaterial) {
            const uniforms = skyMat.uniforms;
            uniforms['sunPosition'].value.copy(sunTransform);
        }
    }

    /**
     * Does the rendering
     */
    update(render : THREE.WebGLRenderer) {

        if(this.dayState == DayState.Loop) {
            this.sunControllerNode.rotateX(.01);
        } else if(this.dayState == DayState.Day) {
            const axis = new THREE.Vector3(0 ,0, -1);
            this.sunControllerNode.setRotationFromAxisAngle(axis, 0);
        } else if(this.dayState == DayState.Night) {
            const axis = new THREE.Vector3(0,0, -1);
            this.sunControllerNode.setRotationFromAxisAngle(axis, 180);
        }

        this.setSunAngle(render);

        this.controls.update();
    }

    /**
     * When the container is resized this will be called.
     * @param width
     * @param height 
     */
    resize(width : number, height : number) {
        this.width = width;
        this.height = height;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    /**
     * Clean up webGL resources code  
     */
    dispose() {

        this.scene.remove(this.groundMesh);
        this.groundGeo.dispose();
        this.groundMat.dispose();
    }
}
