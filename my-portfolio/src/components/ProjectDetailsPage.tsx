import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projectsData from '../data/projects';
import { projectTranslations } from '../translations/pages/projectTranslations';

interface ProjectDetailsPageProps {
    language: string;
}

const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ language }) => {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const project = projectsData.find((p) => p.id === Number(projectId));

    if (!project) {
        return <div>Project not found</div>;
    }

    const currentTranslation = projectTranslations[language];

    const handleBackClick = () => {
        navigate('/projects');
    };

    return (
        <div className="project-details-page">
            <button onClick={handleBackClick} className="back-button">
                {currentTranslation.projects.backButton}
            </button>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="tags">
                {project.tags.map((tag, index) => (
                    <span key={index} className="tag">
            {tag}
          </span>
                ))}
            </div>
        </div>
    );
};

export default ProjectDetailsPage;
