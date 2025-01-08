import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import '../styles/PortfolioList.css'; // Подключаем стили

const PortfolioList = () => {
    const [works, setWorks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchWorks(currentPage);
        fetchCategories();
    }, [currentPage, selectedCategory]);

    const fetchWorks = async (page = 1) => {
        setIsLoading(true);
        try {
            const queryParam = selectedCategory ? `&category=${selectedCategory}` : '';
            const response = await axios.get(
                `/api/portfolio/?page=${page}${queryParam}`
            );

            setWorks(response.data.results || []);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            console.error('Error fetching portfolio works:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`/api/portfolio/categories/`);
            setCategories(response.data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    return (
        <div className="portfolio-list-container">
            <h1>Портфолио</h1>
            <div className="filter">
                <label htmlFor="category-select">Категория:</label>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="">Все</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="portfolio-grid">
                {isLoading ? (
                    <p>Загрузка...</p>
                ) : works.length > 0 ? (
                    works.map((work) => (
                        <Link to={`/portfolio/${work.id}`} key={work.id} className="portfolio-card">
                            <img src={`${work.image}`} alt={work.name} />
                            <div className="portfolio-card-content">
                                <h2>{work.name}</h2>
                                <p>{work.description}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>Работы не найдены.</p>
                )}
            </div>

            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Назад
                </button>
                <span>Страница {currentPage} из {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Вперед
                </button>
            </div>
        </div>
    );
};

export default PortfolioList;
