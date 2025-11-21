import React, { useState, useEffect } from 'react';

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Mock data
    setClasses([
      { id: 1, name: 'Sunshine Class', ageGroup: '3-4 years', teacher: 'Jane Doe', capacity: 12, enrolled: 10 },
      { id: 2, name: 'Rainbow Class', ageGroup: '4-5 years', teacher: 'Mike Wilson', capacity: 12, enrolled: 8 },
    ]);
  }, []);

  return (
    <div className="admin-page">
      <div className="container">
        <div className="page-header">
          <h1>Manage Classes</h1>
          <p>Class setup and student assignments</p>
        </div>
        <div className="content-card">
          <h2>Class Information</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Age Group</th>
                <th>Teacher</th>
                <th>Capacity</th>
                <th>Enrolled</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map(classItem => (
                <tr key={classItem.id}>
                  <td>{classItem.name}</td>
                  <td>{classItem.ageGroup}</td>
                  <td>{classItem.teacher}</td>
                  <td>{classItem.capacity}</td>
                  <td>{classItem.enrolled}</td>
                  <td>
                    <button className="btn btn-sm btn-primary">Edit</button>
                    <button className="btn btn-sm btn-info">View Students</button>
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

export default ManageClasses;