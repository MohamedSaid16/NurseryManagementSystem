import React, { useState, useEffect } from 'react';

const ManageChildren = () => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    // Mock data
    setChildren([
      { id: 1, name: 'Emma Smith', age: 4, class: 'Sunshine Class', parent: 'John Smith', status: 'enrolled' },
      { id: 2, name: 'Noah Johnson', age: 3, class: 'Rainbow Class', parent: 'Sarah Johnson', status: 'enrolled' },
    ]);
  }, []);

  return (
    <div className="admin-page">
      <div className="container">
        <div className="page-header">
          <h1>Manage Children</h1>
          <p>Child records and enrollment management</p>
        </div>
        <div className="content-card">
          <h2>Children Records</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Class</th>
                <th>Parent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {children.map(child => (
                <tr key={child.id}>
                  <td>{child.name}</td>
                  <td>{child.age}</td>
                  <td>{child.class}</td>
                  <td>{child.parent}</td>
                  <td><span className={`status-badge ${child.status}`}>{child.status}</span></td>
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

export default ManageChildren;