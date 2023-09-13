import React, { useState, useEffect } from 'react';
import './homepage_style.css';
import ProntoLogo from "../Authentication/Institution/ProntoLogo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import Features from './Features';
import Navbar from "./Navbar";
import MainText from './MainText';


function HomePage() {
  const words = ["Universities", "Lecturers", "Students"];
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);






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
    if (letterIndex < words[wordIndex].length) {
      const timeout = setTimeout(() => {

        setLetterIndex((prevIndex) => prevIndex + 1);
      }, 100);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [wordIndex, letterIndex]);



  return (
    <div>
      <Navbar />
      <MainText />
      <Features />
    </div>
  );
};


export default HomePage;
