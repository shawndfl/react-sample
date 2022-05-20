
import { ThreeMp } from "@mui/icons-material";
import { Paper } from "@mui/material"

export default function TextureItem() {
    
    return <Paper elevation={2}
        sx= {{
            height : 200,
            m: 2,
     backgroundColor: (theme) =>
        theme.palette.secondary.light
     
    }}> Testing
    </Paper>;
}