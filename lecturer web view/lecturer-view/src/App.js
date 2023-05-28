import React, { useState } from 'react';
import './App.css';
import logo from "./images/logo.jpg";

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
        <div className="subjects">
          <div className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
            <button className="dropdown-button" onClick={toggleDropdown}>
              Post an update
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <form>
                  <div className="dropdown-title">
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" required />
                  </div>  
                  <div className="dropdown-body">
                    <label htmlFor="body">Body: </label>
                    <input type="text" id="body" required />
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