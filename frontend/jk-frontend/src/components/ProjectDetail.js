import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjectDetail = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/projects/${id}/`,
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
        return <p>Loading project details...</p>;
    }

    return (
        <div>
            <h1>{project.name}</h1>
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Start Date:</strong> {project.start_date}</p>
            <p><strong>End Date:</strong> {project.end_date || "Not specified"}</p>

            {/* Заказчик */}
            <h3>Client</h3>
            <p><strong>Name:</strong> {project.client.name}</p>
            <p><strong>Email:</strong> {project.client.email}</p>
            <p><strong>Phone:</strong> {project.client.phone}</p>
            <p><strong>Address:</strong> {project.client.address}</p>

            {/* Исполнители */}
            <h3>Executors</h3>
            <ul>
                {project.executors.length > 0 ? (
                    project.executors.map((executor) => (
                        <li key={executor.id}>
                            {executor.first_name} {executor.last_name} ({executor.email})
                        </li>
                    ))
                ) : (
                    <p>No executors assigned.</p>
                )}
            </ul>

            <button onClick={() => navigate('/projects')}>Back to Projects</button>
        </div>
    );
};

export default ProjectDetail;
