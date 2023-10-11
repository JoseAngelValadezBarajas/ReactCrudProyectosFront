/*
    Autor: Valadez Barajas Jose Angel
    Fecha: 10/10/23
    Version: 1.0
*/
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/views/login';
import Serviciosopen from '../src/views/serviciosopen';
import Serviciosauth from '../src/views/serviciosauth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/servicios/open/proyectos" element={<Serviciosopen/>} />
        <Route path="/servicios/auth/proyectos" element={<Serviciosauth/>} />
      </Routes>
    </Router>
  );
}


export default App;

