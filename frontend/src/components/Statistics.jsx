import axios from 'axios';
import React, { useEffect, useState } from 'react';

const StatisticsPage = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get(`/api/projects/statistics/`);
                setStats(response.data);
                setLoading(false);
            } catch (err) {
                setError('Не удалось загрузить статистику');
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;


    return (
        <div className="statistics-container">
            <h1>Статистика</h1>
            <ul>
                <li>Всего проектов: {stats.total_projects}</li>
                <li>Завершённых проектов: {stats.completed_projects}</li>
                <li>Активных проектов: {stats.active_projects}</li>
                <li>Всего услуг: {stats.total_services}</li>
                <li>Всего сотрудников: {stats.total_employees}</li>
                <li>Администраторов: {stats.admins}</li>
                <li>Обычных пользователей: {stats.users}</li>
                <li>Свободные сотрудники: {stats.free_employees}</li>
                <li>Занятые сотрудники: {stats.busy_employees}</li>
                <li>Перегруженные сотрудники: {stats.overloaded_employees}</li>
            </ul>
        </div>
    );
};

export default StatisticsPage;
