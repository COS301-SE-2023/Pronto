import React, { useState } from 'react';
import './App.css';
import logo from "./images/logo.jpg";
import arrow from "./images/arrow.png";

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownClick, setDropdownClick] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setDropdownClick(!dropdownClick);
  };

  return (
    <div className="container">
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" width="228" height="222" />
        </div>
        <div className="lecturer">Stefan Gruner</div>

        <div className="buttons">
          <a href="./edit-module.js">
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
      <h1 className="lechead">COS341- Compiler Construction</h1>
        <div className="subjects">
          <div className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
            <button className="dropdown-button" onClick={toggleDropdown}>
              Post an update
              <img src={arrow} className={!dropdownClick ? 'arrowup' : 'arrowdown'} alt="Logo" width="30" height="35"/>
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <form>
                  <div className="dropdown-title">
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" maxLength="50" required />
                  </div>  
                  <div className="dropdown-body">
                    <label htmlFor="body">Body: 
                     <textarea id = "body" rows = "6" cols = "60" name = "body"></textarea>
                    </label>
                  </div>
                  <button className="post-button">Post</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;