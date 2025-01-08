import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import '../styles/ServiceList.css'; // Подключаем стили


const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchCategories();
        fetchServices();
    }, [selectedCategory, search]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                `/api/services/categories/`
            );
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchServices = async () => {
        try {
            const queryParams = [];
            if (selectedCategory) queryParams.push(`category=${selectedCategory}`);
            if (search) queryParams.push(`search=${search}`);
            const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
            const response = await axios.get(
                `/api/services/${queryString}`
            );
            setServices(response.data.results);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    return (
        <div className="service-list-container">
            <h1>Наши услуги</h1>

            <div className="filters">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Все категории</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Поиск услуг..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="service-grid">
                {services.length > 0 ? (
                    services.map((service) => (
                        <div key={service.id} className="service-card">
                            <h2>{service.name}</h2>
                            <p>{service.description}</p>
                            {service.image && (
                                <img src={`${service.image}`} alt={service.name} />
                            )}
                            
                            
                            <Link to={`/services/${service.id}`} className="details-button">
                                Подробнее
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>Услуги не найдены.</p>
                )}
            </div>
        </div>
    );
};

export default ServiceList;
