import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import '../styles/ServiceDetail.css'; // Подключаем стили

const ServiceDetail = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServiceDetail = async () => {
            try {
                const response = await axios.get(
                    `/api/services/${id}/`
                );
                setService(response.data);
            } catch (error) {
                console.error('Error fetching service details:', error);
                alert('Не удалось загрузить детали сервиса.');
                navigate('/services');
            }
        };

        fetchServiceDetail();
    }, [id, navigate]);

    if (!service) {
        return <p>Загрузка информации...</p>;
    }

    return (
        <div className="service-detail-container">
            <h1>{service.name}</h1>
            <div className="service-content">
                {service.image && (
                    <div className="service-image">
                        <img src={`${service.image}`} alt={service.name} />
                    </div>
                )}
                <p><strong>Краткое описание:</strong> {service.description}</p>
                <p><strong>Подробное описание:</strong> {service.detailed_description}</p>
                {service.video_url && (
                    <div className="service-video">
                        <iframe
                            width="560"
                            height="315"
                            src={service.video_url}
                            title="Видео о сервисе"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
                <p><strong>Категория:</strong> {service.category.name}</p>
            </div>
            <button className="back-button" onClick={() => navigate('/services')}>Назад к услугам</button>
        </div>
    );
};

export default ServiceDetail;
