import React from 'react';
import './homepage_style.css';
import DownloadImage from "./Images/DownloadApp.png";
import IOSQR from "./Images/IOSQR.png";

function Download() {
    return (
        <div id="downloadSection" className='download-container'>
            <h1 className='feature-heading'>Download</h1>
            <div className="download-image-container">
                <img className="download-image" src={DownloadImage} alt="AboutImage" />
            </div>

            <div className='instructions-container'>
                <h1 className='heading-app'>Download Pronto using Expo Go</h1>
                <p>Step 1: Download ExpoGo from the <a href="https://itunes.apple.com/app/apple-store/id982107779">App store</a> on IOS, or get it from <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www">Google Play</a> if you are on Android.</p>
                <p>Step 2: Scan this QR Code:</p>
                <img className="qr_code" src={IOSQR} alt="IOS QR CODE" />
                <p>Step 3: Enjoy using the benfits of Pronto to make your life easier!</p>
            </div>

        </div>
    );
}

export default Download;
