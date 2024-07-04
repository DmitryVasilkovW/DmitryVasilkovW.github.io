import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { translations } from './translations/translations';
import { aboutTranslations } from "./translations/pages/aboutTranslations";
import LanguageSelector from './components/LanguageSelector';
import HomePage from './pages/HomePage';
import AboutPage from "./pages/AboutPage";
import './styles/App.css'

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
            <div className="App">
                <header className="App-header">
                    <nav>
                        <ul>
                            <li><Link to="/" className="App-link">{translations[language].home}</Link></li>
                            <li><Link to="/about" className="App-link">{translations[language].about}</Link></li>
                            <li><Link to="/projects" className="App-link">{translations[language].projects}</Link></li>
                            <li><Link to="/contact" className="App-link">{translations[language].contact}</Link></li>
                        </ul>
                        <LanguageSelector setLanguage={setLanguage} />
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={
                            <HomePage
                                title={translations[language]['about-title']}
                                content={translations[language]['about-text']}
                            />
                        }/>
                        <Route path="/about" element={
                            <AboutPage
                                title={aboutTranslations[language]['title']}
                                intro={aboutTranslations[language]['intro']}
                                professional={aboutTranslations[language]['professional']}
                                skills={aboutTranslations[language]['skills']}
                                skillsList={aboutTranslations[language]['skillsList']}
                                personalTitle={aboutTranslations[language]['personal-title']}
                                personal={aboutTranslations[language]['personal']}
                            />
                        }/>
                        {/*<Route path="/projects" element={<ProjectsPage language={language}/>}/>*/}
                        {/*<Route path="/contact" element={<ContactPage language={language}/>}/>*/}
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
