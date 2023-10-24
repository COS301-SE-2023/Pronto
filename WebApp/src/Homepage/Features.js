import React from 'react';
import './homepage_style.css';
import timetables from "./Images/timetables.png";
import navigation from "./Images/navigation.png";
import updates from "./Images/updates.png";

const featureData = [
    {
        title: 'Create Timetables',
        description: 'The Pronto mobile application enables students that are enrolled at registered institutions to start building their custom timetables with ease. Conveneintly edit timetables and even download them as a pdf for offline viewing.',
        imageUrl: timetables,
    },
    {
        title: 'Important Updates',
        description: 'Students can recieve important reminders and due assignment notifications from their Lecturers. Never miss an important update again.',
        imageUrl: updates,
    },
    {
        title: 'Campus Navigation',
        description: 'The campus navigation feature aids students who are new to the campus, or who simply need a convenient way to receive directions to their course`s lecture venues. With Pronto, you`ve found your way!',
        imageUrl: navigation,
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
