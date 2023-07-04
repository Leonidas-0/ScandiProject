import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import { Routes, Route } from "react-router-dom"
import Home from './Home'; 
import Add from './Add';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/add-product" element={<Add />} />
      </Routes>
    </div>
  );
}

export default App;
