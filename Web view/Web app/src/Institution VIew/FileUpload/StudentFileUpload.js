import * as React from 'react';
import InstitutionNavigation from "../Navigation/InstitutionNavigation";
import DragandDrop from "./DragandDrop";

const StudentFileUploadPage = () => {

    return (
        <div style={{ display: 'inline-flex' }}>
            <nav style={{ width: '20%' }}>
                {/* Navigation bar content */}
                <InstitutionNavigation />
            </nav>
            <main style={{ width: '900px',marginTop: '30px' }}>
                <h1>Upload Student Files</h1>
                <DragandDrop/>
            </main>
        </div>

    )
}

export default StudentFileUploadPage;