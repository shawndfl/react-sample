import React, {useState} from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import "./login.css"

interface user {
    userName: string,
    password: string
}

function Login() {

    const [user, setUser] = useState<user>({ userName: "", password: ""});    

    function serverLogin(e :React.SyntheticEvent) {
        console.debug("Logging in " + user.userName + " " + user.password);        
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
                                e => setUser({...user, userName : e.target.value as string})
                        }></TextField>
                    </Grid>
                    <Grid item
                        xs={12}>
                        <TextField variant="standard" label="password" type="password" 
                            onChange={
                                e => setUser({...user, password : e.target.value as string})
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
