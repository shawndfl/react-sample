
import TextureItem from "./TextureItem"
import Grid from '@mui/material/Grid'

export default function() {
    return (<Grid container>
        <Grid item xs={12}>
        Select a texture and drop it into the scene.
        </Grid>
        <Grid item xs={12}>
        <TextureItem></TextureItem>
        </Grid>
    </Grid> );               
}
