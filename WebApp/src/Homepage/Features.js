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
    },
    {
        title: 'Feature 4',
        description: 'Description for Feature 4',
        imageUrl: Feature1,
    },
    {
        title: 'Feature 5',
        description: 'Description for Feature 5',
        imageUrl: Feature2,
    },
    {
        title: 'Feature 6',
        description: 'Description for Feature 6',
        imageUrl: Feature3,
    },
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
        <div className='features'>
            <h1 className='heading-secondary'>Features</h1>
            <div className='feature-container'>
                {featuresInColumns.map((column, columnIndex) => (
                    <div className='feature-column' key={columnIndex}>
                        {column.map((feature, index) => (
                            <div className='feature-box' key={index}>
                                <h2>{feature.title}</h2>
                                <img src={feature.imageUrl} alt={feature.title} />
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Features;
