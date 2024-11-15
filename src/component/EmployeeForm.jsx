import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ employee, onSave }) => {
  const [id, setId] = useState(employee ? employee.id : '');
  const [name, setName] = useState(employee ? employee.name : '');
  const [email, setEmail] = useState(employee ? employee.email : '');
  const [status, setStatus] = useState(employee ? employee.status : 'active');

  useEffect(() => {
    if (employee) {
      setId(employee.id);
      setName(employee.name);
      setEmail(employee.email);
      setStatus(employee.status);
    } else {
      setId('');
      setName('');
      setEmail('');
      setStatus('active');
    }
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = { id, name, email, status };
    onSave(newEmployee);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="id" className="form-label">ID</label>
        <input type="text" className="form-control" id="id" value={id} onChange={(e) => setId(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">Status</label>
        <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default EmployeeForm;
