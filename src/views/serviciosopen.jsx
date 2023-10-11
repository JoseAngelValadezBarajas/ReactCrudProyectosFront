/**
 * Componente que muestra una vista con proyectos sin autenticación.
 * @autor Valadez Barajas Jose Angel
 * @version 1.0
 */
import React, { useState, useEffect } from 'react';

function Serviciosopen() {
  const [data, setData] = useState([]);
  /**
     * Realiza una solicitud para obtener proyectos sin autenticación desde el servidor.
  */
  useEffect(() => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch("http://localhost:5000/servicios/open/proyectos", requestOptions)
        .then(response => response.json())
        .then(result => {
            // Verifica si result.proyectos es un array y usa eso
            const proyectos = Array.isArray(result.proyectos) ? result.proyectos : [result.proyectos];
            setData(proyectos);
        })
        .catch(error => console.log('error', error));
  }, []);

  return (
    <div>
      <h2>Bienvenido a la página donde no eres admin</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Project Manager</th>
            <th>Desarrolladores</th>
          </tr>
        </thead>
        <tbody>
          {data.map((proyecto, index) => (
            <tr key={index}>
              <td>{proyecto.nombre}</td>
              <td>{proyecto.descripcion}</td>
              <td>{proyecto.projectManager}</td>
              <td>{proyecto.desarrolladores}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Serviciosopen;

