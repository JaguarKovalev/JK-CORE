import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        axios.get(`${process.env.REACT_APP_API_URL}/api/employees/`, {
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
