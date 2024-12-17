import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PortfolioDetail = () => {
    const { id } = useParams();
    const [work, setWork] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkDetail = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/portfolio/${id}/`);
                setWork(response.data);
            } catch (error) {
                console.error('Error fetching portfolio work:', error);
                alert('Failed to load work details.');
                navigate('/portfolio');
            }
        };

        fetchWorkDetail();
    }, [id, navigate]);

    if (!work) return <p>Loading...</p>;

    return (
        <div>
            <h1>{work.name}</h1>
            <p><strong>Type:</strong> {work.type}</p>
            <p><strong>Description:</strong> {work.description}</p>
            {work.client && (
                <p><strong>Client:</strong> {work.client.name}</p>
            )}
            {work.executors && work.executors.length > 0 && (
                <>
                    <h3>Executors:</h3>
                    <ul>
                        {work.executors.map((executor) => (
                            <li key={executor.id}>
                                {executor.first_name} {executor.last_name} ({executor.email})
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {work.image && (
                <img
                    src={`${process.env.REACT_APP_API_URL}${work.image}`}
                    alt={work.name}
                    width="400"
                />
            )}
            {work.video_url && (
                <div>
                    <h3>Video:</h3>
                    <iframe
                        width="560"
                        height="315"
                        src={work.video_url}
                        title={work.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
            <button onClick={() => navigate('/portfolio')}>Back to Portfolio</button>
        </div>
    );
};

export default PortfolioDetail;
