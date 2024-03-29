import React, { useState, useEffect, useRef } from 'react';
import './homepage_style.css';
import Features from './Features';
import Navbar from "./Navbar";
import MainText from './MainText';
import About from './About';
import Download from './Download';
import ScrollDownIcon from './Images/scroll-down.png';
import MobileView from "./MobileView";

function HomePage() {
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

  const [showScrollIcon, setShowScrollIcon] = useState(true);
  const scrollDownIconRef = useRef(null);

  const handleScrollDown = () => {
    // Calculate the distance to scroll (adjust as needed)
    const scrollDistance = window.innerHeight * 0.9; // Scroll down by half of the viewport height
    window.scrollBy({ top: scrollDistance, behavior: 'smooth' });
  };

  const handleScroll = () => {
    // Calculate the scroll position
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Show/hide the scroll-down icon based on scroll position
    setShowScrollIcon(scrollY < pageHeight);
  };

  useEffect(() => {
    // Attach a scroll event listener to the window
    window.addEventListener('scroll', handleScroll);

    // Cleanup the listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Check if the screen width is less than a certain threshold (e.g., 768px for mobile)
  const isMobileView = window.innerWidth < 768;

  return (
    <div>
      {/* Conditional rendering to show/hide the Navbar */}
      {isMobileView ? (
        // Display a message for mobile users
        < MobileView />
      ) : (
        // Content for desktop users
        <div>
          {scrollingUp && <Navbar />}
          <MainText />
          <Features />
          <About />
          <Download />

          {showScrollIcon && (
            <div className="scroll-down-icon" onClick={handleScrollDown} ref={scrollDownIconRef}>
              <img src={ScrollDownIcon} alt="Scroll Down" />
              <p>Scroll down for more</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
