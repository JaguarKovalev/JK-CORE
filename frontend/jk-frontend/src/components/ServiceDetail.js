import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ServiceDetail = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServiceDetail = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/services/${id}/`
                );
                setService(response.data);
            } catch (error) {
                console.error('Error fetching service details:', error);
                alert('Failed to load service details.');
                navigate('/services');
            }
        };

        fetchServiceDetail();
    }, [id, navigate]);

    if (!service) {
        return <p>Loading service details...</p>;
    }

    return (
        <div>
            <h1>{service.name}</h1>
            {service.image && (
                <img
                    src={`${service.image}`}
                    alt={service.name}
                    width="400"
                />
            )}
            <p><strong>Short Description:</strong> {service.description}</p>
            <p><strong>Detailed Description:</strong> {service.detailed_description}</p>
            {service.video_url && (
                <div>
                    <h3>Video:</h3>
                    <iframe width="560" height="315" src={service.video_url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            )}
            <p><strong>Category:</strong> {service.category.name}</p>
            <button onClick={() => navigate('/services')}>Back to Services</button>
        </div>
    );
};

export default ServiceDetail;
