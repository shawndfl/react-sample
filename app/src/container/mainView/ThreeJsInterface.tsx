import Box from "@mui/material/Box"
import React, {useRef, useEffect, useState} from "react";
import * as THREE from 'three';
import MainScene from 'container/engine/MainScene';
import { ReactDOM } from "react";
import { MainSceneContext } from "context/SceneContext";

export interface SceneProps {
    width: number;
    height: number;
}

interface Controls {
    start: () => void,
    stop: () => void
}

/**
 * This function will create a threeJs render and  create the @ref MainScene
 * @param props This is the width and height of the webGL window.
 * @returns Something cool!
 */
export default function ThreeJsInterface(props : SceneProps) {
    const width = props.width;
    const height = props.height;

    const mount = useRef < HTMLDivElement > (null);
    const [isAnimating, setAnimating] = useState(true);
    const controls = useRef < Controls > ();        

    useEffect(() => {
        if (mount.current == undefined) {
            console.error("mount undefined");
            return;
        }
        let width = mount.current.clientWidth
        let height = mount.current.clientHeight
        let frameId: number;        

        // Create the render
        const renderer = new THREE.WebGLRenderer({antialias: true});

        // set color for clearing the buffer
        renderer.setClearColor('#8d8d8d');

        // set the render size
        renderer.setSize(width, height);

        // we want shadows
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;    
        
        // setup tone mapping for awesome lighting!
        renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;

        // initial exposure. This will be changed in the main scene as the sun sets
		renderer.toneMappingExposure = 0.1100;

        const scene = new MainScene(width, height, renderer.domElement);

        // Render something awesome!
        const renderScene = () => {
            scene.update(renderer);
            renderer.render(scene.scene, scene.camera)
        }

        // resize the container
        const handleResize = () => {
            if (mount.current != undefined) {

                width = mount.current.clientWidth
                height = mount.current.clientHeight                
                renderer.setSize(width, height)
                scene.resize(width, height);
                
                renderScene();
            }
        }

        const animate = () => {                                 

            renderScene()
            frameId = window.requestAnimationFrame(animate)
        }

        const start = () => {
            if (! frameId) {
                frameId = requestAnimationFrame(animate)
            }
        }

        const stop = () => {
            cancelAnimationFrame(frameId)
            frameId = 0
        };

        mount.current.appendChild(renderer.domElement);
        window.addEventListener('resize', handleResize);
        start();

        controls.current = {
            start,
            stop
        }

        return() => {
            stop()
            window.removeEventListener('resize', handleResize);
            if (mount.current != undefined) {
                mount.current.removeChild(renderer.domElement)
            }

            scene.dispose();
        }
    }, [])

    useEffect(() => {
        if (isAnimating) {
            if (controls.current != null) {
                controls.current.start();
            }
        } else {
            if (controls.current != null) {
                controls.current.stop()
            }
        }
    }, [isAnimating])

    return <Box sx={{
        width:"100%",
        height: "100%"
    }}
        ref={mount}></Box>
}
