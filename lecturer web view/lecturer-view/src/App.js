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
        {/* Your content goes here */}
      </div>
    </div>
  );
};

export default App;