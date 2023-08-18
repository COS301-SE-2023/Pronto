import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import './AnnotationLayer.css';

const HelpButton = ({ pdfUrl }) => {
    const [showPDF, setShowPDF] = useState(false);

    const togglePDF = () => {
        setShowPDF(!showPDF);
    };

    return (
        <div>
            <div
                className="help-icon"
                onClick={togglePDF}
            >
                ?
            </div>
            {showPDF && (
                <div className="pdf-overlay">
                    <div className="pdf-modal">
                        <Document file={pdfUrl}>
                            <Page pageNumber={1} />
                        </Document>
                        <button className="close-button" onClick={togglePDF}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HelpButton;
