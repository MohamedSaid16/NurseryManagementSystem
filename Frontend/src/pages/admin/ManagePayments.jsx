import React, { useState, useEffect } from 'react';

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Mock data
    setPayments([
      { id: 1, child: 'Emma Smith', parent: 'John Smith', amount: 450, dueDate: '2024-01-20', status: 'paid' },
      { id: 2, child: 'Noah Johnson', parent: 'Sarah Johnson', amount: 450, dueDate: '2024-01-20', status: 'pending' },
    ]);
  }, []);

  return (
    <div className="admin-page">
      <div className="container">
        <div className="page-header">
          <h1>Manage Payments</h1>
          <p>Payment tracking and invoice management</p>
        </div>
        <div className="content-card">
          <h2>Payment Records</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Child</th>
                <th>Parent</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id}>
                  <td>{payment.child}</td>
                  <td>{payment.parent}</td>
                  <td>${payment.amount}</td>
                  <td>{payment.dueDate}</td>
                  <td><span className={`status-badge ${payment.status}`}>{payment.status}</span></td>
                  <td>
                    <button className="btn btn-sm btn-primary">Edit</button>
                    <button className="btn btn-sm btn-success">Mark Paid</button>
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

export default ManagePayments;