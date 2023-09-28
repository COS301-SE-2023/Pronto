import React from 'react';
import './homepage_style.css';
import AboutImage from "./Images/AboutPicture.png";

function About() {
    return (
        <div className='about-container' id="aboutSection">
            <h1 className='feature-heading'>About</h1>
            <div className="about-image-container">
                <img className="about-image" src={AboutImage} alt="AboutImage" />
            </div>

            <div className='about-paragraph-container'>
                <h1 className='heading-app' style={{ marginRight: 100 }}>What's the big deal?</h1>
                <p className='about-paragraph'>Pronto provides the perfect platform for Lecturers to communicate important reminders and due dates to students, whilst also enhancing the task of creating a student`s personal timetable. It greatly simplifies campus navigation and can help students to find their course venues with utmost ease. On top of all this, students can also access important documents uploaded by their institutions, such as yearly calendars and schedules. This consolidated application is convenient for universities, lecturers, and students. </p>
            </div>

        </div>
    );
}

export default About;
