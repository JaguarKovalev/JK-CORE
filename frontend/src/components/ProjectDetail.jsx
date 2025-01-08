import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import '../styles/ProjectDetail.css'; // Подключаем стили

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjectDetail = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(
                    `/api/projects/${id}/`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setProject(response.data);
            } catch (error) {
                console.error('Error fetching project details:', error);
                alert('Failed to load project details.');
                navigate('/projects');
            }
        };

        fetchProjectDetail();
    }, [id, navigate]);

    if (!project) {
        return <p>Загрузка информации...</p>;
    }

    return (
        <div className="project-detail-container">
            <h1>{project.name}</h1>
            <div className="project-detail-content">
                <section>
                    <h2>Описание</h2>
                    <p>{project.description}</p>
                </section>
                <section>
                    <h2>Статус</h2>
                    <p>{project.status}</p>
                </section>
                <section>
                    <h2>Даты</h2>
                    <p><strong>Начало:</strong> {project.start_date}</p>
                    <p><strong>Конец:</strong> {project.end_date || "Не указано"}</p>
                </section>
                <section>
                    <h2>Заказчик</h2>
                    <p><strong>Имя:</strong> {project.client.name}</p>
                    <p><strong>Email:</strong> {project.client.email}</p>
                    <p><strong>Телефон:</strong> {project.client.phone}</p>
                    <p><strong>Адрес:</strong> {project.client.address}</p>
                </section>
                <section>
                    <h2>Исполнители</h2>
                    <ul>
                        {project.executors.length > 0 ? (
                            project.executors.map((executor) => (
                                <li key={executor.id}>
                                    {executor.first_name} {executor.last_name} ({executor.email})
                                </li>
                            ))
                        ) : (
                            <p>Исполнители не назначены.</p>
                        )}
                    </ul>
                </section>
            </div>
            <button className="back-button" onClick={() => navigate('/projects')}>Назад к проектам</button>
        </div>
    );
};

export default ProjectDetail;
