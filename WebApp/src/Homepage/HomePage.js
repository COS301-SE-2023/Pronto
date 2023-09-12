import React, { useState, useEffect } from 'react';
import "./homepage_style.css"

function HomePage() {
  const words = ["Universities", "Lecturers", "Students"];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [letterIndex, setLetterIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLetterIndex(0); // Reset letterIndex for the next word
      setCurrentWord(''); // Reset currentWord
      setShowCursor(true); // Show cursor when changing words
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change the word every 2 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (letterIndex < words[wordIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentWord((prevWord) => prevWord + words[wordIndex][letterIndex]);
        setLetterIndex((prevIndex) => prevIndex + 1);
      }, 100); // Delay between each letter appearing

      return () => {
        clearTimeout(timeout);
      };
    } else {
      // Hide the cursor when the word is fully typed
      setShowCursor(false);
    }
  }, [wordIndex, letterIndex]);

  return (
    <div className='wrapper'>
      <div className="cols cols0">
        <span className='topline'>The future of education</span>
        <h1>
          For <span className='multiText'>{currentWord}</span>
          {showCursor && <span className='cursor'>|</span>} {/* Show blinking cursor */}
        </h1>
      </div>
    </div>
  );
}

export default HomePage;
