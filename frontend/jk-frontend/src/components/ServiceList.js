import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [search, setSearch] = useState('');
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Загрузка категорий
    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/services/categories/`
            );
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Загрузка услуг с пагинацией, фильтрацией и поиском
    const fetchServices = async (page = 1) => {
        try {
            const queryParams = [];
            if (selectedCategory) queryParams.push(`category=${selectedCategory}`);
            if (search) queryParams.push(`search=${search}`);
            queryParams.push(`page=${page}`);

            const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/services/${queryString}`
            );

            setServices(response.data.results);
            setNextPage(response.data.next);
            setPrevPage(response.data.previous);
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    // Запускаем загрузку данных
    useEffect(() => {
        fetchCategories();
        fetchServices();
    }, [selectedCategory, search]);

    return (
        <div>
            <h1>Our Services</h1>

            {/* Фильтр по категориям */}
            <label>Filter by Category: </label>
            <select
                value={selectedCategory}
                onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1); // Сбрасываем на первую страницу
                }}
            >
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
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1); // Сбрасываем на первую страницу
                }}
            />

            {/* Список услуг */}
            <ul>
                {services.map((service) => (
                    <li key={service.id}>
                        <h3>{service.name}</h3>
                        <p>{service.description}</p>
                        {service.image && (
                            <img
                                src={`${service.image}`}
                                alt={service.name}
                                width="200"
                            />
                        )}
                        <p>
                            <strong>Category:</strong> {service.category.name}
                        </p>
                        <Link to={`/services/${service.id}`}>View Details</Link>
                    </li>
                ))}
            </ul>

            {/* Пагинация */}
            <div>
                {prevPage && (
                    <button onClick={() => fetchServices(currentPage - 1)}>Previous</button>
                )}
                <span>Page {currentPage}</span>
                {nextPage && (
                    <button onClick={() => fetchServices(currentPage + 1)}>Next</button>
                )}
            </div>
        </div>
    );
};

export default ServiceList;
