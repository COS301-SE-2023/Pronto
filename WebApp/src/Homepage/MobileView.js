import React from 'react';
import './homepage_style.css';
import ProntoLogo from "../Images/ProntoLogo.svg";
import AboutImage from "./Images/AboutPicture.png";
import DesktopAccess from "./Images/DesktopAccess.png";

function MobileView() {

    return (

        // Display a message for mobile users
        <div className="mobile-message">
            <img src={ProntoLogo} alt="ProntoLogo" className='logoMobile' />
            <h4>Welcome to Pronto!</h4>
            <br />
            <h3>Students</h3>
            <p>Students can download ExpoGo from the <a href="https://itunes.apple.com/app/apple-store/id982107779">App store</a> on IOS, or get it from <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www">Google Play</a> if you are on Android, to use Pronto</p>
            <img className='mobileAboutImage' src={AboutImage} alt="mobileAboutImage" />
            < br />
            <h4>Lecturer or admin</h4>
            <p>If you are a lecturer or admin, please access the website from a desktop.</p>
            <img src={DesktopAccess} alt="ProntoLogo" className='mobileImages' />
        </div>

    );
}

export default MobileView;
