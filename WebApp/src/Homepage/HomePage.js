import React, { useState, useEffect } from 'react';
import './homepage_style.css';
import ProntoLogo from "../Authentication/Institution/ProntoLogo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import Features from './Features';
import Navbar from "./Navbar";
import MainText from './MainText';
import About from './About';

function HomePage() {
  const words = ["Universities", "Lecturers", "Students"];
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(true); // Track scroll direction

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        // User scrolled to the top of the page
        setScrollingUp(true);
      } else {
        // User scrolled down
        setScrollingUp(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLetterIndex(0);
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (letterIndex < words[wordIndex].length && scrollingUp) {
      const timeout = setTimeout(() => {
        setLetterIndex((prevIndex) => prevIndex + 1);
      }, 100);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [wordIndex, letterIndex, scrollingUp]);

  return (
    <div>
      {/* Use conditional rendering to show/hide the Navbar */}
      {scrollingUp && <Navbar />}
      <MainText />
      <Features />
      <About />
    </div>
  );
}

export default HomePage;
