import React from 'react';
import './homepage_style.css';
import Feature1 from "../images/FileUpload.png";
import Feature2 from "../images/FileUpload.png";
import Feature3 from "../images/FileUpload.png";

const featureData = [
    {
        title: 'Feature 1',
        description: 'Description for Feature 1',
        imageUrl: Feature1,
    },
    {
        title: 'Feature 2',
        description: 'Description for Feature 2',
        imageUrl: Feature2,
    },
    {
        title: 'Feature 3',
        description: 'Description for Feature 3',
        imageUrl: Feature3,
    }
];

function Features() {
    const featuresInColumns = [];
    const featuresPerColumn = 3;

    for (let i = 0; i < featuresPerColumn; i++) {
        const column = [];

        for (let j = i; j < featureData.length; j += featuresPerColumn) {
            column.push(featureData[j]);
        }

        featuresInColumns.push(column);
    }

    return (


        <div className='feature-container' id="featuresSection">
            <h1 className='feature-heading'>Features</h1>
            {featuresInColumns.map((column, columnIndex) => (
                <div className='feature-column' key={columnIndex}>
                    {column.map((feature, index) => (
                        <div className='feature-box' key={index}>
                            <img src={feature.imageUrl} alt={feature.title} />
                            <h2 className='feature-heading'>{feature.title}</h2>
                            <p className='feature-description'>{feature.description}</p>
                        </div>
                    ))}
                </div>
            ))}

        </div>

    );
}

export default Features;
