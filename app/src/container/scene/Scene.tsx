import Box from "@mui/material/Box"
import React, {useRef, useEffect, useState} from "react";
import * as THREE from 'three';

export interface SceneProps {
    width: number;
    height: number;
}

interface Controls {
    start: () => void,
    stop: () => void
}

export default function Scene(props : SceneProps) {
    const width = props.width;
    const height = props.height;

    const mount = useRef < HTMLDivElement > (null);
    const [isAnimating, setAnimating] = useState(false);
    const controls = useRef < Controls > ();

    useEffect(() => {
        if (mount.current == undefined) {
            console.error("mount undefined");
            return;
        }
        let width = mount.current.clientWidth
        let height = mount.current.clientHeight
        let frameId: number;

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({antialias: true})
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({color: 0x234588})
        const cube = new THREE.Mesh(geometry, material)

        camera.position.z = 4
        scene.add(cube)
        renderer.setClearColor('#a4c2f9')
        renderer.setSize(width, height)

        const renderScene = () => {
            renderer.render(scene, camera)
        }

        const handleResize = () => {
            if (mount.current != undefined) {

                width = mount.current.clientWidth
                height = mount.current.clientHeight
                renderer.setSize(width, height)
                camera.aspect = width / height
                camera.updateProjectionMatrix()
                renderScene()
            }
        }

        const animate = () => {            
            cube.rotation.y += 0.01

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

            scene.remove(cube);
            geometry.dispose();
            material.dispose();
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
        width: {width},
        height: {height}
    }}
        ref={mount}
        onClick={
            () => setAnimating(!isAnimating)
        }></Box>
}
