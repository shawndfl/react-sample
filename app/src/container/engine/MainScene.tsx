import Box from "@mui/material/Box"
import React, {useRef, useEffect, useState} from "react";
import * as THREE from 'three';

/**
 * This is the main scene that will be used for rendering 
 * models and lights.
 * This will get called from @ref ThreeJsInterface.
 */
export default class MainScene {

    width: number;
    height: number;

    scene: THREE.Scene;

    camera: THREE.PerspectiveCamera;

    cube: THREE.Mesh;
    geometry: THREE.BoxGeometry;
    material: THREE.MeshBasicMaterial;

    /**
     * Constructor
     * @param width 
     * @param height 
     */
    constructor( width: number, height: number) {
        this.width = width;
        this.height = height;

        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)        
        this.geometry = new THREE.BoxGeometry(1, 1, 1)
        this.material = new THREE.MeshBasicMaterial({color: 0x234588})
        this.cube = new THREE.Mesh(this.geometry, this.material)

        this.camera.position.z = 4
        this.scene.add(this.cube)       
    }

    /**
     * Does the rendering
     */
    update() {
        this.cube.rotation.y += 0.01
    }

    /**
     * When the container is resized this will be called.
     * @param width
     * @param height 
     */
    resize(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();        
    }

    /**
     * Clean up webGL resources code  
     */
    dispose() {
        this.scene.remove(this.cube);
        this.geometry.dispose();
        this.material.dispose();
    }
}

