import React, { useState, useEffect } from 'react';
import './homepage_style.css';
import { useNavigate } from "react-router-dom";

function MainText() {
    const words = ["Universities", "Lecturers", "Students"];
    const [wordIndex, setWordIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState('');
    const [letterIndex, setLetterIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    const navigate = useNavigate();

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
        <div className='wrapper'>
            <div className="cols cols0">
                <span className='topline'>The future of education</span>
                <h1 class="heading">
                    For <span className='multiText'>{currentWord}</span>
                    {showCursor && <span className='cursor'>|</span>}
                </h1>
            </div>
            <div className="buttons">
                <button class="button" onClick={handleInstitutionClick}>Continue as Institution &#x2192;</button>
                <button class="button" onClick={handleLecturerClick}>Continue as Lecturer &#x2192;</button>
            </div>
        </div>

    );
}

export default MainText;
