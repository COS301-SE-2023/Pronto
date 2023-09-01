import React from "react";
import InstitutionNavigation from "./Navigation/InstitutionNavigation";
import "./InstitutionHome.css";

const InstitutionHomePage = () => {


    return (
        <div style={{ display: 'inline-flex' }}>
            <nav style={{ width: '20%' }}>
                {/* Navigation bar content */}
                <InstitutionNavigation />
            </nav>
        </div>
       )
}

export default InstitutionHomePage;