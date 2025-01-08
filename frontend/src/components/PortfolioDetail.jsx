import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import '../styles/PortfolioDetail.css'; // Подключаем стили

const PortfolioDetail = () => {
    const { id } = useParams();
    const [work, setWork] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkDetail = async () => {
            try {
                const response = await axios.get(`/api/portfolio/${id}/`);
                setWork(response.data);
            } catch (error) {
                console.error('Error fetching portfolio work:', error);
                alert('Failed to load work details.');
                navigate('/portfolio');
            }
        };

        fetchWorkDetail();
    }, [id, navigate]);

    if (!work) return <p>Загрузка информации...</p>;

    return (
        <div className="portfolio-detail-container">
            <h1 className="portfolio-title">{work.name}</h1>
            <div className="portfolio-content">
                <p><strong>Тип:</strong> {work.type}</p>
                <p><strong>Описание:</strong> {work.description}</p>
                {work.client && <p><strong>Клиент:</strong> {work.client.name}</p>}
                
                {work.image && (
                    <div className="portfolio-image">
                        <img src={`${work.image}`} alt={work.name} />
                    </div>
                )}
                {work.video_url && (
                    <div className="portfolio-video">
                        <iframe
                            src={work.video_url}
                            title={work.name}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
                <button className="portfolio-button" onClick={() => navigate('/portfolio')}>Назад к портфолио</button>
            </div>
        </div>
    );
};

export default PortfolioDetail;
