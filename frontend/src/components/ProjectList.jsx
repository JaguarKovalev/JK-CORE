import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProjectList.css'; // Подключаем стили

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`/api/projects/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
                alert('Не удалось загрузить проекты. Пожалуйста, попробуйте позже.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (isLoading) {
        return <p>Загрузка проектов...</p>;
    }

    return (
        <div className="project-list-container">
            <h1>Список проектов</h1>
            <div className="project-grid">
                {projects.map((project) => (
                    <div key={project.id} className="project-card">
                        <h2>{project.name}</h2>
                        <p><strong>Статус:</strong> {project.status}</p>
                        <p><strong>Заказчик:</strong> {project.client.name}</p>
                        <Link to={`/projects/${project.id}`} className="details-button">Подробнее</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
