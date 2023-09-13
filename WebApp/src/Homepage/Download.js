import React from 'react';
import './homepage_style.css';
import DownloadImage from "../images/DownloadApp.png";
import IOSQR from "../images/IOSQR.png";

function Download() {
    return (
        <div className='download-container'>
            <div className="download-image-container">
                <img className="download-image" src={DownloadImage} alt="AboutImage" />
            </div>

            <div className='instructions-container'>
                <h1 className='heading-app'>Download Pronto using Expo Go</h1>
                <p>Step 1: Download  <a href="/">Expo Go</a> on your Android or IOS device.</p>
                <p>Step 2: Scan this QR Code:</p>
                <img className="qr_code" src={IOSQR} alt="IOS QR CODE" />
                <p>Step 3: Enjoy using the benfits of Pronto to make your life easier!</p>
            </div>
        </div>
    );
}

export default Download;
