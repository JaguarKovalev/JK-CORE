import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import '../styles/ProjectForm.css'; // Подключаем стили

const ProjectForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState({
        name: '',
        description: '',
        client: '',
        executors: [],
        status: 'active',
        start_date: '',
        end_date: ''
    });

    const [clients, setClients] = useState([]);
    const [executors, setExecutors] = useState([]);

    useEffect(() => {
        fetchClients();
        fetchExecutors();
        if (id) fetchProject();
    }, [id]);

    const fetchClients = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`/api/projects/clients/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const fetchExecutors = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`/api/employees/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExecutors(response.data);
        } catch (error) {
            console.error('Error fetching executors:', error);
        }
    };

    const fetchProject = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`/api/projects/${id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProject({
                ...response.data,
                client: response.data.client.id,
                executors: response.data.executors.map(exec => exec.id)
            });
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            const url = id
                ? `/api/projects/${id}/update/`
                : `/api/projects/create/`;

            const method = id ? 'put' : 'post';
            await axios[method](url, project, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert(`Проект ${id ? 'обновлен' : 'создан'} успешно!`);
            navigate('/projects/admin');
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Не удалось сохранить проект.');
        }
    };

    return (
        <form className="project-form-container" onSubmit={handleSubmit}>
            <h1>{id ? 'Редактировать проект' : 'Создать проект'}</h1>

            <label>
                Название:
                <input
                    type="text"
                    value={project.name}
                    onChange={(e) => setProject({ ...project, name: e.target.value })}
                    required
                />
            </label>

            <label>
                Описание:
                <textarea
                    value={project.description}
                    onChange={(e) => setProject({ ...project, description: e.target.value })}
                    required
                />
            </label>

            <label>
                Заказчик:
                <select
                    value={project.client}
                    onChange={(e) => setProject({ ...project, client: e.target.value })}
                    required
                >
                    <option value="">Выберите заказчика</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Исполнители:
                <select
                    multiple
                    value={project.executors}
                    onChange={(e) =>
                        setProject({
                            ...project,
                            executors: Array.from(e.target.selectedOptions, (option) => parseInt(option.value))
                        })
                    }
                >
                    {executors.map((executor) => (
                        <option key={executor.id} value={executor.id}>
                            {executor.username}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Статус:
                <select
                    value={project.status}
                    onChange={(e) => setProject({ ...project, status: e.target.value })}
                >
                    <option value="active">Активный</option>
                    <option value="completed">Завершен</option>
                </select>
            </label>

            <label>
                Дата начала:
                <input
                    type="date"
                    value={project.start_date}
                    onChange={(e) => setProject({ ...project, start_date: e.target.value })}
                    required
                />
            </label>

            <label>
                Дата окончания:
                <input
                    type="date"
                    value={project.end_date}
                    onChange={(e) => setProject({ ...project, end_date: e.target.value })}
                />
            </label>

            <button type="submit">{id ? 'Обновить' : 'Создать'} проект</button>
        </form>
    );
};

export default ProjectForm;
