import React, { useState } from 'react';
import '../styles/LanguageSelector.css';

interface Props {
    setLanguage: (language: 'en' | 'ru') => void;
}

const LanguageSelector: React.FC<Props> = ({ setLanguage }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectLanguage = (language: 'en' | 'ru') => {
        setLanguage(language);
        setIsOpen(false);
    };

    return (
        <div className="language-selector">
            <button onClick={toggleDropdown}>Language</button>
            {isOpen && (
                <ul className="dropdown">
                    <li onClick={() => selectLanguage('en')}>EN</li>
                    <li onClick={() => selectLanguage('ru')}>RU</li>
                </ul>
            )}
        </div>
    );
};

export default LanguageSelector;
