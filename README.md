# React Sample

This sample use React and node to produce a 3D simulate. The 3D rendering use [ThreeJS](https://threejs.org/) which uses WebGl. I created the models my self using blender and importing them into the scene using [gltf](https://www.khronos.org/gltf/). The web development was done using React and Typescript. React Hooks were uses along with [mui](https://mui.com/).

This simulation shows a dinning room with different light. The sun will rise and set simulating day light in the dinning. When the sun sets a over head light will come on showing a night scene. [Simulation](https://shawndfl.github.io/react-sample)

# Setup
Currently I'm using node v16.14.0 and 
Clone the repo and run:

```
cd react-sample/app/
npm ci
npm start

```

# Interaction
Use the mouse to orbit the scene and the mouse wheel to zoom in and out.
