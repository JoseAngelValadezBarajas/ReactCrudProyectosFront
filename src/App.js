/**
 * @autor Valadez Barajas Jose Angel
 * @version 1.0
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/views/login';
import Serviciosopen from '../src/views/serviciosopen';
import Serviciosauth from '../src/views/serviciosauth';
import Index from '../src/views/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index />}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/servicios/open/proyectos" element={<Serviciosopen/>} />
        <Route path="/servicios/auth/proyectos" element={<Serviciosauth/>} />
      </Routes>
    </Router>
  );
}


export default App;

