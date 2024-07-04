// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { translations } from './translations';
import LanguageSelector from './components/LanguageSelector';
import Page from './components/Page';
import AboutPage from "./pages/AboutPage";

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
        <Router>
            <div>
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">{translations[language].home}</Link></li>
                            <li><Link to="/about">{translations[language].about}</Link></li>
                            <li><Link to="/projects">{translations[language].projects}</Link></li>
                            <li><Link to="/contact">{translations[language].contact}</Link></li>
                        </ul>
                        <LanguageSelector setLanguage={setLanguage}/>
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={
                            <Page
                                title={translations[language]['about-title']}
                                content={translations[language]['about-text']}
                            />
                        }/>
                        <Route path="/about" element={<AboutPage language={language}/>}/>
                        {/*<Route path="/projects" element={<ProjectsPage language={language}/>}/>*/}
                        {/*<Route path="/contact" element={<ContactPage language={language}/>}/>*/}
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
