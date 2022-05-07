import React, {useState} from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import "./login.css"

function Login() {

    const [user, setUser] = useState();
    const [pass, setPass] = useState();

    function serverLogin(e) {
        console.debug("Logging in " + user + " " + pass);        
        return false;
    }

    const cardStyle = {
        width: "500px",
        height: "200px"

    }

    return (
        <Card variant="elevation" style ={cardStyle }>
            <form onSubmit={serverLogin}>
                <Grid container>
                    <Grid item
                        xs={12}>
                        <TextField variant="standard" label="username" type="text"
                            onChange={
                                e => setUser(e.target.value)
                        }></TextField>
                    </Grid>
                    <Grid item
                        xs={12}>
                        <TextField variant="standard" label="password" type="password" 
                            onChange={
                                e => setPass(e.target.value)
                        }></TextField>
                    </Grid>
                    <Grid item
                        xs={12}>
                        <Button variant="contained" onClick= { e=>serverLogin(e)}>Sign In</Button>
                    </Grid>
                </Grid>
            </form>
        </Card>
    )

}

export default Login
