import './home.css';
import Container from "@mui/material/Container/"
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography';
import ThreeJsInterface from  'container/mainView/ThreeJsInterface';
import TextureSelector from 'container/textureSelector/TextureSelector';

function App() {
    const menu: string[] = ['tribulation', 'Day of The Lord', "timline"];

    function loadPage(item : string) {
        console.debug("loading " + item);
    }

    return (
        <Container maxWidth="lg">
            <Paper elevation={3}>
                <Box color="primary">
                    <Grid container>
                        <Grid item
                            xs={2}>
                            <TextureSelector/>
                        </Grid>
                        <Grid item xs={10}>
                            <Box sx={{
                                        m: 1,
                                        textAlign: "left",
                                        height: 600
                                    }}
                                padding={1}>                                
                                <ThreeJsInterface width={600} height={600}></ThreeJsInterface>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}

export default App;
