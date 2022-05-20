import Box from "@mui/material/Box"
import React, {useRef, useEffect, useState} from "react";
import OrbitControls from "./OrbitControls";
import * as THREE from 'three';
import GLTFLoader from './GLTFLoader';
import floorTexture from 'img/floor2.jpg'
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

    /** These are controls used to orbit the camera */
    controls : OrbitControls;
    /**
     * Threejs camera
     */
    camera : THREE.PerspectiveCamera;

    /**
     * Sample mesh for rendering
     */
    cubeMesh : THREE.Mesh;
    cubeGeo : THREE.BoxGeometry;
    cubeMat : THREE.MeshPhongMaterial;

    /**
     * Ground mesh
     */
    groundMesh : THREE.Mesh;
    groundGeo : THREE.PlaneGeometry;
    groundMat : THREE.MeshPhongMaterial;

    /**
     *  hemisphere
     */
    light1 : THREE.HemisphereLight;
    /**
     * Direction light
     */
    dirLight : THREE.DirectionalLight;

    /**
     * Constructor
     * @param width 
     * @param height 
     */
    constructor(width : number, height : number, parent : HTMLCanvasElement) {
        this.width = width;
        this.height = height;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.cubeGeo = new THREE.BoxGeometry(1, 1, 1);
        this.cubeMat = new THREE.MeshPhongMaterial({color: 0x234588});
        this.cubeMesh = new THREE.Mesh(this.cubeGeo, this.cubeMat);
        this.cubeMesh.castShadow = true;

        this.groundGeo = new THREE.PlaneGeometry(14, 14);
        this.groundGeo.rotateX(THREE.MathUtils.degToRad(-90));
        this.groundMat = new THREE.MeshPhongMaterial({color: 0x646464});
        this.groundMesh = new THREE.Mesh(this.groundGeo, this.groundMat);
        this.groundMesh.position.set(0, 0, 0);
        this.groundMesh.receiveShadow = true;

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
        this.controls.target.set(0, 0.35, 0);
        this.controls.update();

        const light = new THREE.AmbientLight(0xffffff); // soft white light
        this.scene.add(light);

        this.light1 = new THREE.HemisphereLight(0xffffff, 1.0);
        this.light1.position.set(0, 0, 0);
        // this.scene.add(this.light1);

        this.dirLight = new THREE.DirectionalLight(0xffffff);
        this.dirLight.position.set(0, 0, 0);
        this.dirLight.castShadow = true;
        // this.scene.add(this.dirLight);

        this.camera.position.z = 4;
        this.camera.position.y = 4;
        // this.scene.add(this.cubeMesh);
        this.scene.add(this.groundMesh);

        // instantiate a loader
        const loader = new GLTFLoader();

        // load a resource
        loader.load(
            // resource URL
                'models/chair.gltf',

            // called when resource is loaded
                (gltf : any) => { // object.castShadow = true
                const mesh1: THREE.Mesh = gltf.scene.getObjectByName('Chair');

                const light1Node: THREE.Object3D = gltf.scene.getObjectByName('Point');
                light1Node.add(this.light1);

                const dirLightNode: THREE.Object3D = gltf.scene.getObjectByName('Light');
                dirLightNode.add(this.dirLight);

                const mat = mesh1.material;

                mesh1.castShadow = true;
                let color3D = new THREE.Color( "#000000");                

                if(mat instanceof THREE.MeshBasicMaterial) {
                    mat.color = color3D;
                }

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
     * Does the rendering
     */
    update() {
        this.cubeMesh.rotation.y += 0.01;
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
        this.scene.remove(this.cubeMesh);
        this.cubeGeo.dispose();
        this.cubeMat.dispose();

        this.scene.remove(this.groundMesh);
        this.groundGeo.dispose();
        this.groundMat.dispose();
    }
}
