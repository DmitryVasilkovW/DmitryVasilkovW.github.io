interface ProjectTranslations {
    [key: string]: {
        title: string,
        projects: any,
    };
}

export const projectTranslations:ProjectTranslations = {
    en: {
        title:"Projects",
        projects: {
            title: 'Projects',
            description: 'Here are some of the projects I have worked on.',
            backButton: '← Back to Projects'
        },
        // добавьте другие переводы...
    },
    ru: {
        title:"Проекты",
        projects: {
            title: 'Проекты',
            description: 'Вот некоторые из проектов, над которыми я работал.',
            backButton: '← Назад к проектам'
        },
        // добавьте другие переводы...
    },
    // добавьте другие языки...
};
