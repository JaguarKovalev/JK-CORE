import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectForm = () => {
    const { id } = useParams(); // Получаем ID проекта для редактирования
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

    const [clients, setClients] = useState([]); // Список клиентов
    const [executors, setExecutors] = useState([]); // Список исполнителей

    // Загружаем данные для редактирования и списки клиентов и исполнителей
    useEffect(() => {
        fetchClients();
        fetchExecutors();
        if (id) fetchProject();
    }, [id]);

    // Получаем список клиентов
    const fetchClients = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/projects/clients/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    // Получаем список исполнителей
    const fetchExecutors = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employees/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExecutors(response.data);
        } catch (error) {
            console.error('Error fetching executors:', error);
        }
    };

    // Получаем данные проекта для редактирования
    const fetchProject = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/projects/${id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProject({
                ...response.data,
                client: response.data.client.id, // Заполняем client ID
                executors: response.data.executors.map(exec => exec.id) // Список ID исполнителей
            });
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    };

    // Отправка формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            const url = id
                ? `${process.env.REACT_APP_API_URL}/api/projects/${id}/update/`
                : `${process.env.REACT_APP_API_URL}/api/projects/create/`;

            const payload = {
                name: project.name,
                description: project.description,
                client: project.client,
                executors: project.executors,
                status: project.status,
                start_date: project.start_date,
                end_date: project.end_date
            };

            console.log('Sending payload:', payload); // Логируем данные

            const method = id ? 'put' : 'post';
            await axios[method](url, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert(`Project ${id ? 'updated' : 'created'} successfully!`);
            navigate('/projects/admin');
        } catch (error) {
            console.error('Error saving project:', error.response ? error.response.data : error.message);
            alert('Failed to save project.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>{id ? 'Edit Project' : 'Create Project'}</h1>

            <label>
                Name:
                <input
                    type="text"
                    value={project.name}
                    onChange={(e) => setProject({ ...project, name: e.target.value })}
                    required
                />
            </label>
            <br />

            <label>
                Description:
                <textarea
                    value={project.description}
                    onChange={(e) => setProject({ ...project, description: e.target.value })}
                    required
                />
            </label>
            <br />

            <label>
                Client:
                <select
                    value={project.client}
                    onChange={(e) => setProject({ ...project, client: e.target.value })}
                    required
                >
                    <option value="">Select a client</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>
                    ))}
                </select>
            </label>
            <br />

            <label>
                Executors:
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
            <br />

            <label>
                Status:
                <select
                    value={project.status}
                    onChange={(e) => setProject({ ...project, status: e.target.value })}
                >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                </select>
            </label>
            <br />

            <label>
                Start Date:
                <input
                    type="date"
                    value={project.start_date}
                    onChange={(e) => setProject({ ...project, start_date: e.target.value })}
                    required
                />
            </label>
            <br />

            <label>
                End Date:
                <input
                    type="date"
                    value={project.end_date}
                    onChange={(e) => setProject({ ...project, end_date: e.target.value })}
                />
            </label>
            <br />

            <button type="submit">{id ? 'Update' : 'Create'} Project</button>
        </form>
    );
};

export default ProjectForm;
