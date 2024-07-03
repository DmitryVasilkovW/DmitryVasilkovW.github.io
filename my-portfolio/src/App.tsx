// src/App.tsx
import React, { useState, useEffect } from 'react';
import { translations } from './translations';
import LanguageSelector from './components/LanguageSelector';
import Page from './components/Page';

const App: React.FC = () => {
    const [language, setLanguage] = useState<string>('en');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') || 'en';
        setLanguage(savedLanguage);
    }, []);

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>{translations[language].home}</li>
                        <li>{translations[language].about}</li>
                        <li>{translations[language].projects}</li>
                        <li>{translations[language].contact}</li>
                    </ul>
                    <LanguageSelector setLanguage={setLanguage} />
                </nav>
            </header>
            <main>
                <Page
                    title={translations[language]['about-title']}
                    content={translations[language]['about-text']}
                />
            </main>
        </div>
    );
};

export default App;
