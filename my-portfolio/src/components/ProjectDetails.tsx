import React from 'react';

interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
}

interface ProjectDetailsProps {
    project: Project;
    onClose: () => void; // Обработчик закрытия деталей проекта
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onClose }) => {
    return (
        <div className="project-details">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="tags">
                {project.tags.map((tag, index) => (
                    <span key={index} className="tag">
            {tag}
          </span>
                ))}
            </div>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ProjectDetails;
