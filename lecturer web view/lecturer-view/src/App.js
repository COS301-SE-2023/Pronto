import React from 'react';
import './App.css';
import logo from "./images/logo.jpg";

const App = () => {
  return (
    <div className="container">
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" width="228" height="222" />
        </div>
        <div className="lecturer">Stefan Gruner</div>

        <div className="buttons">
          <a href="/edit-module">
            <button>Edit module information</button>
          </a>

          <a href="/edit-personal">
            <button>Edit personal information</button>
          </a>
        </div>
        
        <div className="logout">
          <button className="logout-button">Logout</button>
        </div>
      </div>
      
      <div className="content">
        <div className="subjects">
          <button className="content-button">COS341- Compiler Construction</button>
          <button className="content-button">COS132- Imperative Programming</button>
        </div>
      </div>
    </div>
  );
};

export default App;