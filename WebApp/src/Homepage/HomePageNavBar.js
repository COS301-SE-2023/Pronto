import React from 'react';
import ProntoLogo from "../images/logo.svg";

function HomePageNavBar() {


    return (
        <nav>
            <a href="#" className='logo'>
                <img src={ProntoLogo} alt="PronoLogo" />
            </a>
        </nav >
    );
}
export default HomePageNavBar;
