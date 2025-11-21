import React, { useState, useEffect } from 'react';

const ManageParents = () => {
  const [parents, setParents] = useState([]);

  useEffect(() => {
    // Mock data
    setParents([
      { id: 1, name: 'John Smith', email: 'john@email.com', phone: '+1 (555) 123-4567', children: 2, status: 'active' },
      { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1 (555) 234-5678', children: 1, status: 'active' },
      // Add more mock data as needed
    ]);
  }, []);

  return (
    <div className="admin-page">
      <div className="container">
        <div className="page-header">
          <h1>Manage Parents</h1>
          <p>View and manage parent accounts</p>
        </div>
        <div className="content-card">
          <h2>Parent Accounts</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Children</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parents.map(parent => (
                <tr key={parent.id}>
                  <td>{parent.name}</td>
                  <td>{parent.email}</td>
                  <td>{parent.phone}</td>
                  <td>{parent.children}</td>
                  <td><span className={`status-badge ${parent.status}`}>{parent.status}</span></td>
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

export default ManageParents;