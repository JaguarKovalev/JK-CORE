import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ServiceDetail = () => {
    const { id } = useParams(); // Получаем ID из URL
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
            <img
                src={`${service.image}`}
                alt={service.name}
                width="400"
            />
            <p>{service.description}</p>
            <p>
                <strong>Category:</strong> {service.category.name}
            </p>
            <button onClick={() => navigate('/services')}>Back to Services</button>
        </div>
    );
};

export default ServiceDetail;
