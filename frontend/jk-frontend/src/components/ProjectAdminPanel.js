import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectAdminPanel = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/projects/`, {
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
        if (!window.confirm('Are you sure you want to delete this project?')) return;

        try {
            const token = localStorage.getItem('access_token');
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/projects/${id}/delete/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Project deleted successfully!');
            fetchProjects(); // Обновить список
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Failed to delete project.');
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div>
            <h1>Project Management</h1>
            <button onClick={() => navigate('/projects/create')} style={{ marginBottom: '20px' }}>
                Add New Project
            </button>
            {isLoading ? (
                <p>Loading projects...</p>
            ) : (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td>{project.id}</td>
                                <td>{project.name}</td>
                                <td>{project.status}</td>
                                <td>
                                    <button onClick={() => navigate(`/projects/${project.id}/edit`)}>Edit</button>
                                    <button onClick={() => deleteProject(project.id)} style={{ marginLeft: '10px' }}>
                                        Delete
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
