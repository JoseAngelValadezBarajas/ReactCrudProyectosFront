/*
    Autor: Valadez Barajas Jose Angel
    Fecha: 10/10/23
    Version: 1.0
*/
import React, { useState, useEffect } from 'react';

function Serviciosauth() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [creatingProject, setCreatingProject] = useState(false);
  const [newProjectData, setNewProjectData] = useState({ nombre: '', descripcion: '' });

  useEffect(() => {
    fetchProyectos();
  }, []);

  const fetchProyectos = () => {
    fetch('http://localhost:5000/servicios/auth/proyectos')
      .then(response => response.json())
      .then(responseData => {
        if (Array.isArray(responseData.proyectos)) {
          setData(responseData.proyectos);
        } else {
          console.error('Los datos recibidos no son un array:', data);
        }
      })
      .catch(error => {
        console.error('Error al obtener los proyectos:', error);
      });
  };

  const handleEdit = (proyecto) => {
    setEditingId(proyecto.id);
    setEditedData({ ...proyecto });
  };

  const handleSave = () => {
    if (creatingProject) {
      fetch('http://localhost:5000/servicios/auth/proyectos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProjectData),
      })
        .then((response) => {
          setCreatingProject(false);
          fetchProyectos();
          setNewProjectData({ nombre: '', descripcion: '' }); // Limpiar los campos después de crear un nuevo proyecto
        })
        .catch((error) => {
          console.error('Error al crear el proyecto:', error);
        });
    } else {
      fetch(`http://localhost:5000/servicios/auth/proyectos/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      })
        .then((response) => {
          setEditingId(null);
          setEditedData({});
          fetchProyectos();
        })
        .catch((error) => {
          console.error('Error al editar el proyecto:', error);
        });
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/servicios/auth/proyectos/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          fetchProyectos();
        } else {
          console.error('Error al eliminar el proyecto');
        }
      })
      .catch(error => {
        console.error('Error al eliminar el proyecto:', error);
      });
  };

  const startCreatingProject = () => {
    setCreatingProject(true);
  };

  return (
    <div>
      <h2>Vista con Token</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Project Manager</th>
            <th>Desarrolladores</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {creatingProject ? (
            <tr>
              <td>
                <input
                  type="text"
                  value={newProjectData.nombre}
                  onChange={e => setNewProjectData({ ...newProjectData, nombre: e.target.value })}
                  placeholder="Nombre del proyecto"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newProjectData.descripcion}
                  onChange={e => setNewProjectData({ ...newProjectData, descripcion: e.target.value })}
                  placeholder="Descripción del proyecto"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newProjectData.projectManager}
                  onChange={e => setNewProjectData({ ...newProjectData, projectManager: e.target.value })}
                  placeholder="Descripción del proyecto"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newProjectData.desarrolladores}
                  onChange={e => setNewProjectData({ ...newProjectData, desarrolladores: e.target.value })}
                  placeholder="Descripción del proyecto"
                />
              </td>
              <td>
                <button onClick={handleSave}>Guardar</button>
              </td>
            </tr>
          ) : (
            <>
              {data.map(proyecto => (
                <tr key={proyecto.id} id={proyecto.id}>
                  {editingId === proyecto.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          value={editedData.nombre}
                          onChange={e => setEditedData({ ...editedData, nombre: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editedData.descripcion}
                          onChange={e => setEditedData({ ...editedData, descripcion: e.target.value })}
                        />
                      </td>
                      <td>
                        <button onClick={handleSave}>Guardar</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{proyecto.nombre}</td>
                      <td>{proyecto.descripcion}</td>
                      <td>{proyecto.projectManager}</td>
                      <td>{proyecto.desarrolladores}</td>
                      <td>
                        <button onClick={() => handleEdit(proyecto)}>Editar</button>
                        <button onClick={() => handleDelete(proyecto.id)}>Eliminar</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              <tr>
                <td colSpan="3">
                  <button onClick={startCreatingProject}>Crear</button>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Serviciosauth;


