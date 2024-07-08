import React from 'react';
import ProjectList from '../components/ProjectList';
import  '../translations/pages/projectTranslations';
import {projectTranslations} from "../translations/pages/projectTranslations";
import '../styles/Projects.css'

interface ProjectsPageProps {
    language: string;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ language }) => {
    const currentTranslation = projectTranslations[language];

    return (
        <div className="projects-page">
            <h1>{currentTranslation.projects.title}</h1>
            <p>{currentTranslation.projects.description}</p>
            <ProjectList language={language} />
        </div>
    );
};

export default ProjectsPage;
