import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import projectsData from '../data/projects';
import { Project } from '../data/types';

interface ProjectListProps {
    language: string;
}

const ProjectList: React.FC<ProjectListProps> = ({ language }) => {
    const [projects, setProjects] = useState<Project[]>(projectsData);

    return (
        <div className="project-list">
            <div className="project-cards">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} language={language} />
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
