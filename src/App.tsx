import React from 'react';
import logo from './logo.svg';
import { Button } from 'react-bootstrap';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.scss';
import Home from './pages/home';
import Inicio from './pages/inicio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/home" element={<Home />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
