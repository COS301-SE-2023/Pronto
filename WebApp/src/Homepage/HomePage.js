import React, { useState, useEffect } from 'react';
import './homepage_style.css';
import ProntoLogo from "../Authentication/Institution/ProntoLogo.svg";
import { useNavigate, useLocation } from "react-router-dom";

function HomePage() {
  const words = ["Universities", "Lecturers", "Students"];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [letterIndex, setLetterIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;

  // Function to determine if a navbar link should be styled as active
  const isNavLinkActive = (linkPath) => {
    return currentPath === linkPath ? 'active' : '';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLetterIndex(0);
      setCurrentWord('');
      setShowCursor(true);
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (letterIndex < words[wordIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentWord((prevWord) => prevWord + words[wordIndex][letterIndex]);
        setLetterIndex((prevIndex) => prevIndex + 1);
      }, 100);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      setShowCursor(false);
    }
  }, [wordIndex, letterIndex]);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsNavbarFixed(true);
      } else {
        setIsNavbarFixed(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAboutClick = () => {
    // Scroll to the About section smoothly
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  };

  // Handle button click events
  const handleInstitutionClick = () => {
    // Add your logic for the "Continue as an Institution" button here
    navigate("/institution/login");
  };

  const handleLecturerClick = () => {
    // Add your logic for the "Continue as a Lecturer" button here
    navigate("/lecturer/login");
  };

  return (
    <div>
      <nav className={`navbar ${isNavbarFixed ? 'navbar-fixed' : ''}`}>
        <ul className="navbar">
          <li><img src={ProntoLogo} alt="Pronto Logo" className='logoStyle' /></li>
          <li ><a className={isNavLinkActive('/')} href="/">Home</a></li>
          <li><a className={isNavLinkActive('/about')} href="#">About</a></li>
          <li><a className={isNavLinkActive('/help')} href="#">Help</a></li>
          <li><a className={isNavLinkActive('/download')} href="#">Download</a></li>
        </ul>
      </nav>

      <div className='wrapper'>
        <div className="cols cols0">
          <span className='topline'>The future of education</span>
          <h1 class="heading">
            For <span className='multiText'>{currentWord}</span>
            {showCursor && <span className='cursor'>|</span>}
          </h1>
        </div>
        <div className="buttons">
          <button class="button" onClick={handleInstitutionClick}>Continue as an Institution &#x2192;</button>
          <button class="button" onClick={handleLecturerClick}>Continue as a Lecturer &#x2192;</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
