import logo from './logo.svg';
import './App.css';
import Login from './container/login/Login'
import Header from './container/header/Header'
import Home from './container/home/Home'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserRequest from "./api/UserRequest";
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
    const menu = ['tribulation', 'Day of The Lord', "timline"];

    const theme = createTheme({
        palette: {
            primary: {
                main: red[500]
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <h1>Header</h1>
                <Header/>
                <Login/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/"
                            element={<Home/>}></Route>
                        <Route path="/data"
                            element={<UserRequest/>}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

export default App;
