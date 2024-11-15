import React, { useState, useEffect } from 'react';
import axios from 'axios';
 import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeForm from './component/EmployeeForm';
import EmployeeTable from './component/EmployeeTable';


const App = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('There was an error fetching the employees!', error));
  }, []);

  const handleSaveEmployee = (employee) => {
    if (editingEmployee) {
      axios.put(`http://localhost:3000/employees/${employee.id}`, employee)
        .then(response => {
          setEmployees(employees.map(emp => (emp.id === employee.id ? response.data : emp)));
          setEditingEmployee(null);
        })
        .catch(error => console.error('There was an error updating the employee!', error));
    } else {
      axios.post('http://localhost:3000/employees', employee)
        .then(response => setEmployees([...employees, response.data]))
        .catch(error => console.error('There was an error adding the employee!', error));
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
  };

  const handleDeleteEmployee = (id) => {
    axios.delete(`http://localhost:3000/employees/${id}`)
      .then(() => setEmployees(employees.filter(employee => employee.id !== id)))
      .catch(error => console.error('There was an error deleting the employee!', error));
  };

  return (
    <div className="container">
      <h1 className="my-4">Employee Management</h1>
      <div className="card mb-4">
        <div className="card-body">
          <EmployeeForm employee={editingEmployee} onSave={handleSaveEmployee} />
        </div>
      </div>
      <EmployeeTable employees={employees} onEdit={handleEditEmployee} onDelete={handleDeleteEmployee} />
    </div>
  );
};

export default App;
