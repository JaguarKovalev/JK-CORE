import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../styles/ProjectAdminPanel.css'; // Подключаем стили

const ProjectAdminPanel = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`/api/projects/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProject = async (id) => {
        if (!window.confirm('Вы уверены, что хотите удалить этот проект?')) return;

        try {
            const token = localStorage.getItem('access_token');
            await axios.delete(`/api/projects/${id}/delete/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Проект успешно удален!');
            fetchProjects(); // Обновить список
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Не удалось удалить проект.');
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="admin-panel-container">
            <h1>Управление проектами</h1>
            <button className="add-button" onClick={() => navigate('/projects/create')}>
                Добавить новый проект
            </button>
            {isLoading ? (
                <p>Загрузка проектов...</p>
            ) : (
                <table className="project-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th>Статус</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td>{project.id}</td>
                                <td>{project.name}</td>
                                <td>{project.status}</td>
                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => navigate(`/projects/${project.id}/edit`)}
                                    >
                                        Редактировать
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => deleteProject(project.id)}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProjectAdminPanel;
