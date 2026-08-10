//import { useState } from 'react'
import React from 'react';
//import { useRef, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
//import Menubar from './components/Menubar'
import ActionButton from './components/ActionButton'
import 'semantic-ui-css/semantic.min.css';
import Customers from './Pages/Customers';
import Products from './Pages/Products';
import Sales from './Pages/Sales';
import Stores from './Pages/Stores';


function App() {
    return (
        //<Router>
        <div>
     <Navbar/>
            <div style={{ paddingTop: '60' }}>
                <Routes>
                    <Route path="/" element={<Customers />} />
                    <Route path="/Products" element={<Products />} />
                    <Route path="/Sales" element={<Sales />} />
                    <Route path="/Stores" element={<Stores />} />

                </Routes>
            </div>
            </div>

    )
}

export default App
