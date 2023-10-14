import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import '../Styles/AnnotationLayer.css';
import { pdfjs } from 'react-pdf';


const url = `//cdn.jsdelivr.net/npm/pdfjs-dist@7.5.0/build/pdf.worker.min.js`
pdfjs.GlobalWorkerOptions.workerSrc = url



const HelpButton = ({ pdfUrl }) => {
    const [showPDF, setShowPDF] = useState(false);
    const [numPages, setNumPages] = useState(0);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const togglePDF = () => {
        setShowPDF(!showPDF);
    };

    return (
        <div>
            <div className="help-icon" onClick={togglePDF} >
                ?
            </div>
            {showPDF && (
                <div className="pdf-overlay">
                    <div className="pdf-modal">
                        <div className="pdf-top-bar">
                            <button className="pdf-close-button" onClick={togglePDF}>
                                Close
                            </button>
                        </div>
                        <Document
                            file={pdfUrl}
                            onLoadSuccess={onDocumentLoadSuccess}

                        >
                            {Array.from(new Array(numPages), (el, index) => (
                                <Page
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}

                                    key={`page_${index + 1}`}
                                    className="pdf-page"
                                    pageNumber={index + 1}
                                />
                            ))}
                        </Document>

                    </div>
                </div>
            )}
        </div>
    );
};

export default HelpButton;
