import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../data/types';

interface ProjectCardProps {
    project: Project;
    language: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, language }) => {
    return (
        <div className="project-card">
            <Link to={`/projects/${project.id}`}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">
                    {project.tags.map((tag, index) => (
                        <span key={index} className="tag">
              {tag}
            </span>
                    ))}
                </div>
            </Link>
        </div>
    );
};

export default ProjectCard;
