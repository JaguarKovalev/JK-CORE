import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/projects/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
                alert('Failed to load projects. Please log in again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (isLoading) {
        return <p>Loading projects...</p>;
    }

    return (
        <div>
            <h1>Project List</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <h3>{project.name}</h3>
                        <p><strong>Status:</strong> {project.status}</p>
                        <p><strong>Client:</strong> {project.client.name}</p>
                        <Link to={`/projects/${project.id}`}>View Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;
