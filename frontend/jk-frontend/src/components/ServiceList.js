import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [search, setSearch] = useState('');

    // Загрузка списка услуг и категорий
    useEffect(() => {
        fetchServices();
        fetchCategories();
    }, [selectedCategory, search]);

    const fetchServices = async () => {
        try {
            const queryParams = [];
            if (selectedCategory) queryParams.push(`category=${selectedCategory}`);
            if (search) queryParams.push(`search=${search}`);

            const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/services/${queryString}`);
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/services/categories/`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    return (
        <div>
            <h1>Our Services</h1>

            {/* Фильтр по категориям */}
            <label>Filter by Category: </label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">All</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            {/* Поле поиска */}
            <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Список услуг */}
            <ul>
                {services.map((service) => (
                    <li key={service.id}>
                        <h3>{service.name}</h3>
                        <p>{service.description}</p>
                        {service.image && <img src={service.image} alt={service.name} width="200" />}
                        <p><strong>Category:</strong> {service.category.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceList;
