import React, { useState, useEffect } from 'react';
import './homepage_style.css';
import ProntoLogo from "../Authentication/Institution/ProntoLogo.svg";
import { useLocation } from "react-router-dom";

function Navbar() {
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    const isNavLinkActive = (linkPath) => {
        return currentPath === linkPath ? 'activeHomepage' : '';
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

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

    return (
        <nav className={`navbarHompeage ${isNavbarFixed ? 'navbar-fixed' : ''}`}>
            <ul className="navbarHompeage">
                <li><img src={ProntoLogo} alt="Pronto Logo" className='logoStyle' /></li>
                <li><a className={isNavLinkActive('/')} href="/">Home</a></li>
                <li>
                    <a
                        className={isNavLinkActive('/features')}
                        href="#"
                        onClick={() => scrollToSection('featuresSection')}
                    >
                        Features
                    </a>
                </li>
                <li>
                    <a
                        className={isNavLinkActive('/help')}
                        href="#"
                        onClick={() => scrollToSection('aboutSection')}
                    >
                        About
                    </a>
                </li>
                <li>
                    <a
                        className={isNavLinkActive('/download')}
                        href="#"
                        onClick={() => scrollToSection('downloadSection')}
                    >
                        Download
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
