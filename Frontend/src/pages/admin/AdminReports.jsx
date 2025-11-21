import React, { useState, useEffect } from 'react';

const AdminReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Mock data
    setReports([
      { id: 1, name: 'Monthly Attendance Report', type: 'attendance', period: 'January 2024' },
      { id: 2, name: 'Financial Summary', type: 'financial', period: 'Q4 2023' },
      { id: 3, name: 'Enrollment Statistics', type: 'enrollment', period: '2023-2024' },
    ]);
  }, []);

  return (
    <div className="admin-page">
      <div className="container">
        <div className="page-header">
          <h1>Reports & Analytics</h1>
          <p>Generate and view system reports</p>
        </div>
        <div className="content-card">
          <h2>Available Reports</h2>
          <div className="reports-grid">
            {reports.map(report => (
              <div key={report.id} className="report-card">
                <h3>{report.name}</h3>
                <p>Type: {report.type}</p>
                <p>Period: {report.period}</p>
                <button className="btn btn-primary">Generate Report</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;