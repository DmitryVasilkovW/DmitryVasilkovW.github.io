// src/components/LanguageSelector.tsx
import React from 'react';

interface Props {
    setLanguage: (language: 'en' | 'ru') => void;
}

const LanguageSelector: React.FC<Props> = ({ setLanguage }) => {
    return (
        <div id="language-selector">
            <button onClick={() => setLanguage('en')}>EN</button>
            <button onClick={() => setLanguage('ru')}>RU</button>
        </div>
    );
};

export default LanguageSelector;
