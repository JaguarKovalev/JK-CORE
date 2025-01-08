import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import '../styles/EmployeeList.css'; // Подключаем стили

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        axios.get(`/api/employees/`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => setEmployees(response.data))
            .catch((error) => console.error('Error fetching employees:', error));
    }, []);

    
    const getBackgroundColor = (status) => {
        switch (status) {
            case 'free':
                return '#d4edda'; // Зеленый
            case 'busy':
                return '#fff3cd'; // Желтый
            case 'overloaded':
                return '#f8d7da'; // Красный
            default:
                return 'white';
        }
    };

    return (
        <div className="employee-list-container">
            <h1>Наши сотрудники</h1>
            <div className="employee-card-wrapper">
                {employees.map((employee) => (
                    <div className="employee-card" key={employee.id} style={{
                        backgroundColor: getBackgroundColor(employee.workload_status),
                        padding: '10px',
                        margin: '5px 0',
                        borderRadius: '5px',}}>
                        <h2>{employee.first_name} {employee.last_name}</h2>
                        <p>{employee.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeeList;
