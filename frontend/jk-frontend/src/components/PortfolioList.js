import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PortfolioList = () => {
    const [works, setWorks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchWorks(currentPage);
    }, [currentPage, selectedCategory]);

    const fetchWorks = async (page = 1) => {
        setIsLoading(true);
        try {
            const queryParam = selectedCategory ? `&category=${selectedCategory}` : '';
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/portfolio/?page=${page}${queryParam}`
            );

            setWorks(response.data.results || []);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            console.error('Error fetching portfolio works:', error);
            setWorks([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/portfolio/categories/`);
            setCategories(response.data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <h1>Portfolio</h1>

            {/* Фильтр по категориям */}
            <label>Filter by Category: </label>
            <select
                value={selectedCategory}
                onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                }}
            >
                <option value="">All</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            {/* Список работ */}
            {isLoading ? (
                <p>Loading...</p>
            ) : works.length > 0 ? (
                works.map((work) => (
                    <div key={work.id} style={{ margin: '20px 0', border: '1px solid #ddd', padding: '10px' }}>
                        <h3>{work.name}</h3>
                        <p><strong>Description:</strong> {work.description}</p>
                        <p><strong>Type:</strong> {work.type}</p>
                        {work.image && (
                            <img
                                src={`${process.env.REACT_APP_API_URL}${work.image}`}
                                alt={work.name}
                                width="200"
                            />
                        )}
                        {work.video_url && (
                            <iframe
                                width="300"
                                height="200"
                                src={work.video_url}
                                title={work.name}
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        )}
                        <Link to={`/portfolio/${work.id}`}>View Details</Link>
                    </div>
                ))
            ) : (
                <p>No works found.</p>
            )}

            {/* Пагинация */}
            <div>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PortfolioList;
