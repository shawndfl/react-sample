import './home.css';
import Container from "@mui/material/Container/"
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography';
import ThreeJsInterface from 'container/mainView/ThreeJsInterface';
import TextureSelector from 'container/textureSelector/TextureSelector';
import SceneOptions from 'container/sceneOptions/SceneOptions';
import { useState, createContext } from 'react';
import {ISceneProviderProps, ISceneData} from 'context/SceneContext';

/**
 * The main home page. This will display the 3d scene and some other controls
 */
export default function Home() {

    function loadPage(item : string) {
        console.debug("loading " + item);
    }
    
    // scene state
    //const sceneData = useRef<ISceneData>();
    

    return (
        <Box color="primary" my={2}>            
            <Container maxWidth="lg">
                <Card>
                    <Grid container>                        
                        <Grid item
                            xs={12}>
                            <Box>                                
                                <Box sx={
                                        {
                                            m: 1,
                                            textAlign: "left",
                                            height: 600,
                                            transform: 'translateZ(0px)', 
                                            flexGrow: 1                                            
                                        }
                                    }
                                    padding={1}>
                                    <ThreeJsInterface width={600} height={600}></ThreeJsInterface>
                                    <SceneOptions ></SceneOptions>
                                </Box>   
                                <Box m={2}>
                                <Typography variant="subtitle1">
                                    Drag the mouse across the scene to orbit around the object. Use the mouse wheel to zoom in and out.
                                </Typography>                                       
                                </Box>                  
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
            </Container>            
        </Box>
    );
}
