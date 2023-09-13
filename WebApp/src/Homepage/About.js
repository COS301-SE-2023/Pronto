import React from 'react';
import './homepage_style.css';
import AboutImage from "../images/AboutPicture.png";

function About() {
    return (
        <div className='about-container'>

            <div className="about-image-container">
                <img className="about-image" src={AboutImage} alt="AboutImage" />
            </div>
            <div className='about-paragraph-container'>
                <p className='about-paragraph'>In the tranquil serenity of the countryside, where emerald fields stretch as far as the eye can see and wildflowers dance in the gentle breeze, one can't help but feel a deep connection to nature's beauty. The distant chirping of birds and the rustling of leaves in the woods create a symphony of sounds that soothes the soul. As the sun sets behind the rolling hills, painting the sky in warm hues of orange and pink, it's a moment of pure bliss. Here, time slows down, and worries fade away, leaving room for introspection and gratitude for the simple wonders of life.</p>
            </div>

        </div>
    );
}

export default About;
