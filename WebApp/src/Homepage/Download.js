import React from 'react';
import './homepage_style.css';
import DownloadImage from "./Images/DownloadApp.png";
import IOSQR from "./Images/IOSQR.png";
import AndroidQR from "./Images/AndroidQR.png";

function Download() {
    return (
        <div id="downloadSection" className='download-container'>
            <h1 className='feature-heading'>Download</h1>
            <div className="download-image-container">
                <img className="download-image" src={DownloadImage} alt="AboutImage" />
            </div>

            <div className='instructions-container'>
                <h1 className='heading-app'>Download Pronto using Expo Go</h1>
                <p style = {{marginTop:'20px'}}>Step 1: Download ExpoGo from the <a href="https://itunes.apple.com/app/apple-store/id982107779">App store</a> on IOS, or get it from <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www">Google Play</a> if you are on Android.</p>
                <p style = {{marginTop:'10px'}}>Step 2: Scan this QR Code to run the mobile application:</p>

                <div style={{ display: 'flex' }}>
                    <div style={{ textAlign: 'center', margin:'20px' }}>
                        <h2>Android</h2>
                        <img src={AndroidQR} alt="Android QR CODE" style={{ width: '200px' }} />
                    </div>
                    <div style={{ textAlign: 'center', margin:'20px' }}>
                        <h2>IOS</h2>
                        <img src={IOSQR} alt="iOS QR CODE" style={{ width: '200px' }} />
                    </div>
                </div>

                <p style = {{marginTop:'10px'}}>Step 3: Enjoy using the benfits of Pronto to make your life easier!</p>
            </div>

        </div>
    );
}

export default Download;
