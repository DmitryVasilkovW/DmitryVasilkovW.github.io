interface Translations {
    [key: string]: {
        home: string;
        about: string;
        projects: string;
        contact: string;
        welcome: string;
        statistic:string;
        "about-title": string;
        "about-text": string;
        "projects-title": string;
        "contact-title": string;
        "contact-text": string;
    };
}

const translations: Translations = {
    en: {
        home: "Home",
        about: "About",
        projects: "Projects",
        contact: "Contact",
        welcome: "Welcome to my portfolio",
        statistic: "Statistics",
        "about-title": "About Me",
        "about-text": "I am a web developer with experience in creating dynamic and responsive websites.",
        "projects-title": "Projects",
        "contact-title": "Contact",
        "contact-text": "Feel free to reach out to me via email or social media."
    },
    ru: {
        home: "Главная",
        about: "Обо мне",
        projects: "Проекты",
        contact: "Контакты",
        welcome: "Добро пожаловать в мое портфолио",
        statistic:"Статистика",
        "about-title": "Обо мне",
        "about-text": "Я веб-разработчик с опытом создания динамических и адаптивных веб-сайтов.",
        "projects-title": "Проекты",
        "contact-title": "Контакты",
        "contact-text": "Свяжитесь со мной по электронной почте или через социальные сети."
    }
};

export { translations };
