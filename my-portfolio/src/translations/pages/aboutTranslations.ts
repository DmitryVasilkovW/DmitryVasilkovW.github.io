interface AboutTranslations {
    [key: string]: {
        title: string,
        intro: string,
        professional: string,
        skills: string,
        skillsList: string[],
        "personal-title" : string,
        personal: string,
    };
}

const aboutTranslations: AboutTranslations = {
    en: {
        title: "About Me",
        intro: "Hi, I'm Dmitry Vasilkov, backend developer.",
        professional: "My fascination with technology has always pushed me to explore its transformative potential." +
        "its transformative potential. Studying Information Systems and Technologies at ITMO," +
        "I am constantly striving to improve my knowledge and skills. I am ready to invest all my efforts and time," +
        "to maximize my development in the field of backend development.",
        skills: "Skills & Expertise",
        skillsList: [
            "PostgreSQL",
            "Docker",
            "Room",
            "Linux",
            "C# (high level, familiar with Microsoft Dependency Injection)",
            "Java (Hibernate, Spring, Spring Boot, Spring Security, JavaFX, Mockito, Kafka)",
            "Scala (tic-tac-toe game development)",
            "Kotlin (To Do List application development)",
            "Swift (working with the MacOS file system)",
            "AppleScript и Shell (development of scripts for working with the file system, use of shell within the framework of the discipline 'Operating Systems')",
            "Go (software development for smart home hub)",
            "Design patterns",
            "SOLID, GRASP, DRY, KISS and YAGNI principles",
            "Algorithms and data structures",
            "Architectures for programming",
            "Maven and Gradle"
        ],
        "personal-title":"hobby",
        personal: "When I'm not writing code, I'm interested in painting, the art of medieval weaponry, and technology.",
    },
    ru: {
        "title": "Обо мне",
        "intro": "Привет, я Дмитрий Васильков, бэкенд-разработчик.",
        "skills": "Навыки и опыт",
        "professional": "Мое увлечение технологиями всегда подталкивало меня к изучению" +
            " их трансформационного потенциала. Обучаясь в ИТМО на направлении 'Информационные системы и технологии'," +
            " я постоянно стремлюсь к совершенствованию своих знаний и навыков. Я готов вкладывать все свои усилия и время," +
            " чтобы максимально развиваться в области бэкенд-разработки.",
        "skillsList": [
            "PostgreSQL",
            "Docker",
            "Room",
            "Linux",
            "C# (высокий уровень, знаком с Microsoft Dependency Injection)",
            "Java (Hibernate, Spring, Spring Boot, Spring Security, JavaFX, Mockito, Kafka)",
            "Scala (разработка игры крестики-нолики)",
            "Kotlin (разработка приложения To Do List)",
            "Swift (работа с файловой системой MacOS)",
            "AppleScript и Shell (разработка скриптов для работы с файловой системой, использование shell в рамках дисциплины 'Операционные системы')",
            "Go (разработка ПО для хаба умного дома)",
            "Паттерны проектирования",
            "Принципы SOLID, GRASP, DRY, KISS и YAGNI",
            "Алгоритмы и структуры данных",
            "Архитектуры программирования",
            "Maven и Gradle"
        ],
        "personal-title":"хобби",
        "personal": "Когда я не пишу код, я интересуюсь живописью, искусством изготовления средневекового оружия и техникой.",
    }


};

export { aboutTranslations };
