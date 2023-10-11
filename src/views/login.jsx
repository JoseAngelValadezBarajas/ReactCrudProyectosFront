/**
 * @author Valadez Barajas Jose Angel
 * @version 1.0
 */
import React, { useState } from 'react';

/**
 * Realiza la autenticación del usuario.
 *
 * @param {string} username - El nombre de usuario del usuario.
 * @param {string} password - La contraseña del usuario.
 *
 * @return {Promise} Una promesa que resuelve cuando se completa la autenticación.
 *
 * @throws {Error} Si ocurre un error durante la autenticación.
 */
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
   /**
   * Maneja el cambio en el campo de nombre de usuario.
   *
   * @param {Event} e - El evento de cambio.
   */
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
    /**
   * Maneja el cambio en el campo de contraseña.
   *
   * @param {Event} e - El evento de cambio.
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
    /**
   * Maneja el envío del formulario de inicio de sesión.
   *
   * @param {Event} e - El evento de envío de formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = e.target.elements;
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if(data.message==="Inicio de sesión exitoso"){
          document.cookie = `auth_token=${data.token}; path=/;`;
          alert("Se inicio sesion");
          window.location="/servicios/auth/proyectos";
        }else{
          alert("Usuario o consena invalidos");
        }
      } else {
        console.error('Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="text-center">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Nombre de Usuario:</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
