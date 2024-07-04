import React from 'react';
import '../styles/About.css'

interface AboutPageProps {
    title: string,
    intro: string,
    professional: string,
    skills: string,
    skillsList: string[],
    personal: string,
    contact: string
}

const AboutPage: React.FC<AboutPageProps> = ({title, intro, professional, skills, skillsList, personal, contact }) => {
    return (
        <div className="about-page">
            <h1 className= "title">{title}</h1>
            <p className= "intro">{intro}</p>
            <section className= "professional">
                <h2>{professional}</h2>
                <p>{professional}</p>
            </section>
            <section className= "skills">
                <h2>{skills}</h2>
                <ul className="skills-list">
                    {skillsList.map(skill => <li key={skill}>{skill}</li>)}
                </ul>
            </section>
            <section className= "personal">
                <h2>{personal}</h2>
                <p>{personal}</p>
            </section>
            <section className="contact">
                <h2>{contact}</h2>
                <p>{contact}</p>
            </section>
        </div>
    );
};

export default AboutPage;
