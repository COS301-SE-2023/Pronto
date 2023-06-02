import * as React from 'react';
import LecturerNavigation from './LecturerNavigation';
import '../Institution VIew/Navigation/Navigation.css';

const PersonalInfoPage = () => {
    return (
      <div style={{ display: 'inline-flex' }}>
        <nav style={{ width: '20%' }}>
            {/* Navigation bar content */}
            <LecturerNavigation />
        </nav>
  
        <main style={{ width: '900px',marginTop: '30px' }}>
            <h1 className="moduleHead">Personal Information</h1>

          
        </main>
  
      </div>
    );
  };
  
  export default PersonalInfoPage;