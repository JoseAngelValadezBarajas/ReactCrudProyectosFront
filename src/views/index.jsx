/**
 * Componente que muestra una vista con botones hacia la pagina web.
 * @autor Valadez Barajas Jose Angel
 * @version 1.0
 */
import React from 'react';
import { Link } from 'react-router-dom';

function Index() {
  return (
    <div>
      <h2 className="mt-4 mb-4">Bienvenido</h2>
      <div className="d-flex flex-column">
        <Link to="/login">
          <button className="btn btn-primary mb-2">Iniciar Sesión</button>
        </Link>
        <Link to="/servicios/open/proyectos">
          <button className="btn btn-secondary mb-2">Proyectos sin Autenticación</button>
        </Link>
        <Link to="/servicios/auth/proyectos">
          <button className="btn btn-success">Proyectos con Autenticación</button>
        </Link>
      </div>
    </div>
  );
}

export default Index;
