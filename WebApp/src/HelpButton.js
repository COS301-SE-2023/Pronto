import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './AnnotationLayer.css';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const HelpButton = ({ pdfUrl }) => {
    const [showPDF, setShowPDF] = useState(false);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const togglePDF = () => {
        setShowPDF(!showPDF);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < numPages) {
            setCurrentPage(currentPage + 1);
        }

    };

    return (
        <div>
            <div className="help-icon" onClick={togglePDF}>
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
                            <Page pageNumber={currentPage} />
                        </Document>
                        <div className="pdf-controls">
                            <button
                                className="pdf-control-button"
                                onClick={goToPrevPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span>
                                Page {currentPage} of {numPages}
                            </span>
                            <button
                                className="pdf-control-button"
                                onClick={goToNextPage}
                                disabled={currentPage === numPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HelpButton;
