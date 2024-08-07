import React from 'react';

interface Props {
    title: string;
    content: string;
}

const HomePage: React.FC<Props> = ({ title, content }) => {
    return (
        <section>
            <h2>{title}</h2>
            <p>{content}</p>
        </section>
    );
};

export default HomePage;
