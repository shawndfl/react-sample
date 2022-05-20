import './App.css';
import Header from './container/header/Header'
import Home from './container/home/Home'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserRequest from "./api/UserRequest";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from "container/footer/Footer"

function App() {
    const menu = ['tribulation', 'Day of The Lord', "timline"];

    const theme = createTheme({
        palette: {
            primary: {
                main: "#bdbdbd"

            },
            secondary: {
                main: "#9e9d24"                
            }            
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <div className="App">                
                <Header/>                
                <BrowserRouter>
                    <Routes>
                        <Route path="/"
                            element={<Home/>}></Route>
                        <Route path="/data"
                            element={<UserRequest/>}></Route>
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </div>
        </ThemeProvider>
    );
}

export default App;
