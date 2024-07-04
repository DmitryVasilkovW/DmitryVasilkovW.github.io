interface AboutTranslations {
    [key: string]: {
        title: string,
        intro: string,
        professional: string,
        skills: string,
        skillsList: string[],
        personal: string,
        contact: string
    };
}

const aboutTranslations: AboutTranslations = {
    en: {
        title: "About Me",
        intro: "Hi, I'm Dmitry Vasilkov, a passionate web developer.",
        professional: "With over 5 years of experience in the field, I've honed my skills in creating dynamic and responsive web applications. My journey started with a fascination for technology, which led me to pursue a degree in Computer Science. Since then, I've worked on numerous projects that have challenged and expanded my knowledge.",
        skills: "Skills & Expertise",
        skillsList: [
            "JavaScript & TypeScript",
            "React & Redux",
            "Node.js & Express",
            "HTML5 & CSS3",
            "Responsive Design",
            "Git & Version Control"
        ],
        personal: "When I'm not coding, I enjoy hiking, playing chess, and exploring new technologies. I believe in continuous learning and am always looking for new challenges to tackle.",
        contact: "Feel free to reach out to me via email at dmitry@example.com or connect with me on LinkedIn."
    },
    ru: {
        title: "Обо мне",
        intro: "Привет, я Дмитрий Васильков, увлеченный веб-разработчик.",
        professional: "С более чем 5-летним опытом работы в этой области, я отточил свои навыки в создании динамических и адаптивных веб-приложений. Мое путешествие началось с увлечения технологиями, что привело меня к получению степени в области информатики. С тех пор я работал над многочисленными проектами, которые бросали вызов и расширяли мои знания.",
        skills: "Навыки и опыт",
        skillsList: [
            "JavaScript и TypeScript",
            "React и Redux",
            "Node.js и Express",
            "HTML5 и CSS3",
            "Адаптивный дизайн",
            "Git и контроль версий"
        ],
        personal: "Когда я не пишу код, я люблю ходить в походы, играть в шахматы и изучать новые технологии. Я верю в непрерывное обучение и всегда ищу новые вызовы для решения.",
        contact: "Свяжитесь со мной по электронной почте dmitry@example.com или добавьте меня в LinkedIn."
    }
};

export { aboutTranslations };
