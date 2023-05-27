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
          <a href="./edit-module">
            <button>Edit module information</button>
          </a>

          <a href="/edit-personal">
            <button>Edit personal information</button>
          </a>
        </div>
        
        <div className="logout">
          <a href="/logout">
          <button className="logout-button">Logout</button>
          </a>
        </div>
      </div>
      
      <div className="content">
        <h1 className="lechead">Modules</h1>
        <div className="subjects">
          <a href="EditModule.js">
          <button className="content-button">COS341- Compiler Construction</button>
          </a>
          <a href="/imperative">
          <button className="content-button">COS132- Imperative Programming</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;