import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ActionButton from './components/ActionButton'
import 'semantic-ui-css/semantic.min.css';
import Customers from './pages/Customers';
import Products from './pages/Products';
import Sales from './pages/Sales';
import Stores from './pages/Stores';


function App() {
    return (
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
