import React, { useState, useEffect } from 'react';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Mock data
    setEmployees([
      { id: 1, name: 'Jane Doe', email: 'jane@email.com', position: 'Teacher', class: 'Sunshine Class', status: 'active' },
      { id: 2, name: 'Mike Wilson', email: 'mike@email.com', position: 'Assistant', class: 'Rainbow Class', status: 'active' },
    ]);
  }, []);

  return (
    <div className="admin-page">
      <div className="container">
        <div className="page-header">
          <h1>Manage Employees</h1>
          <p>Staff management and role assignments</p>
        </div>
        <div className="content-card">
          <h2>Employee Accounts</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
                <th>Class</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.position}</td>
                  <td>{employee.class}</td>
                  <td><span className={`status-badge ${employee.status}`}>{employee.status}</span></td>
                  <td>
                    <button className="btn btn-sm btn-primary">Edit</button>
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageEmployees;