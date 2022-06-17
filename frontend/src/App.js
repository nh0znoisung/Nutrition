import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";

import Home from './components/Home';
import Header from './components/Header';

function App()  {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} > </Route>
                <Route path="/home" element={<Home />} > </Route>
            </Routes>
        </>
    )
}

export default App;
