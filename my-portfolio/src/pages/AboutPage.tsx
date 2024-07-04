// src/pages/AboutPage.tsx
import React from 'react';

interface AboutPageProps {
    language: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ language }) => {
    return (
        <div>
            <h1>{language === 'en' ? 'About Me' : 'Обо мне'}</h1>
            <p>{language === 'en' ? 'This is the about page.' : 'Это страница обо мне.'}</p>
        </div>
    );
};

export default AboutPage;
