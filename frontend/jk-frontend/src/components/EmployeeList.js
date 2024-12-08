import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        axios.get('http://127.0.0.1:8000/api/employees/', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => setEmployees(response.data))
            .catch((error) => console.error('Error fetching employees:', error));
    }, []);

    return (
        <div>
            <h1>Employee List</h1>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        {employee.first_name} {employee.last_name} - {employee.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
