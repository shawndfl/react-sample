import './home.css';
import Container from "@mui/material/Container/"
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography';
import Scene from  'container/scene/Scene';

function App() {
    const menu: string[] = ['tribulation', 'Day of The Lord', "timline"];

    function loadPage(item : string) {
        console.debug("loading " + item);
    }

    return (
        <Container maxWidth="lg">
            <Paper elevation={3}>
                <Box color="primary"
                    sx={
                        {height: '100vh'}
                }>
                    <Grid container>
                        <Grid item
                            xs={2}>
                            <Box sx={
                                    {
                                        m: 1,
                                        textAlign: "left"
                                    }
                                }
                                padding={1}
                                border={1}>
                                <p>Sample text so we can have a better idea of what this will look like</p>
                            </Box>
                        </Grid>
                        <Grid item
                            xs={10}>
                            <Box sx={
                                    {
                                        m: 1,
                                        textAlign: "left"
                                    }
                                }
                                padding={1}>
                                <Typography variant="h5" component="h2" color="text.secondary">                                    
                                    Simulation
                                </Typography>
                                <Scene width={600} height={600}></Scene>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}

export default App;
