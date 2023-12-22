import React, { useState } from 'react';
import './App.css';


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
    
        const data = await response.json();
    
        if (data.success) {
          alert('Inicio de sesión exitoso');

        } else {
          alert('Credenciales incorrectas');
        }
      } catch (error) {
        console.error('Error al intentar iniciar sesión', error);
        alert('Error al intentar iniciar sesión. Por favor, inténtalo de nuevo.');
      }
    }
      return (
        <div className="App">
          <header className="App-header">
            <h1>Bienvenido a MediApp</h1>
            <p>Ingrese sus datos.</p>
    
            <form>
              <label>
                Usuario:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </label>
              <br />
              <label>
                Contraseña:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
              <br />
              <button type="button" onClick={handleLogin}>
                Iniciar Sesión
              </button>
            </form>
          </header>
        </div>
    
      );
    };
    export default App;



