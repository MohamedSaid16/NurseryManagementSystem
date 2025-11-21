import React, { useState, useEffect } from 'react';

const ParentMessages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');

  useEffect(() => {
    // Mock data - replace with API calls
    setMessages([
      { id: 1, sender: 'teacher', name: 'Ms. Johnson', message: 'Emma had a wonderful day today! She participated actively in all activities.', time: '2024-01-15 15:30', unread: false },
      { id: 2, sender: 'parent', name: 'You', message: 'Thank you for the update! Will she need any extra supplies for the art project tomorrow?', time: '2024-01-15 16:45', unread: false },
      { id: 3, sender: 'teacher', name: 'Ms. Johnson', message: 'No extra supplies needed. We have everything prepared. She\'s such a creative child!', time: '2024-01-15 17:20', unread: true }
    ]);
  }, []);

  const employees = [
    { id: 1, name: 'Ms. Johnson (Sunshine Class)' },
    { id: 2, name: 'Mr. Davis (Rainbow Class)' },
    { id: 3, name: 'Nurse Sarah' },
    { id: 4, name: 'Director Smith' }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedEmployee) {
      const message = {
        id: messages.length + 1,
        sender: 'parent',
        name: 'You',
        message: newMessage,
        time: new Date().toLocaleString(),
        unread: false
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const styles = `
    .parent-messages {
      padding: 2rem 0;
      background: #f8f9fa;
      min-height: calc(100vh - 200px);
    }
    
    .page-header {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }
    
    .page-title {
      font-size: 2rem;
      color: #2c3e50;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }
    
    .page-subtitle {
      color: #6c757d;
    }
    
    .messages-container {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 2rem;
      height: 600px;
    }
    
    .contacts-sidebar {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    .contacts-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem;
      text-align: center;
    }
    
    .contacts-title {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    .contacts-list {
      flex: 1;
      overflow-y: auto;
      padding: 1rem 0;
    }
    
    .contact-item {
      padding: 1rem 1.5rem;
      cursor: pointer;
      border-bottom: 1px solid #e9ecef;
      transition: background 0.3s ease;
    }
    
    .contact-item:hover {
      background: #f8f9fa;
    }
    
    .contact-item.active {
      background: #e3f2fd;
      border-left: 4px solid #667eea;
    }
    
    .contact-name {
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.25rem;
    }
    
    .contact-role {
      color: #6c757d;
      font-size: 0.9rem;
    }
    
    .chat-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
    }
    
    .chat-header {
      background: #f8f9fa;
      padding: 1.5rem;
      border-bottom: 1px solid #e9ecef;
      border-radius: 12px 12px 0 0;
    }
    
    .chat-title {
      font-size: 1.3rem;
      color: #2c3e50;
      font-weight: 600;
    }
    
    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .message {
      max-width: 70%;
      padding: 1rem;
      border-radius: 12px;
      position: relative;
    }
    
    .message.sent {
      align-self: flex-end;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-bottom-right-radius: 4px;
    }
    
    .message.received {
      align-self: flex-start;
      background: #f1f3f4;
      color: #333;
      border-bottom-left-radius: 4px;
    }
    
    .message-sender {
      font-weight: 600;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }
    
    .message-text {
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }
    
    .message-time {
      font-size: 0.75rem;
      opacity: 0.7;
      text-align: right;
    }
    
    .message.received .message-time {
      text-align: left;
    }
    
    .unread-indicator {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: #667eea;
      border-radius: 50%;
      margin-left: 0.5rem;
    }
    
    .chat-input {
      padding: 1.5rem;
      border-top: 1px solid #e9ecef;
      background: #f8f9fa;
      border-radius: 0 0 12px 12px;
    }
    
    .message-form {
      display: flex;
      gap: 1rem;
    }
    
    .message-input {
      flex: 1;
      padding: 0.75rem;
      border: 2px solid #e9ecef;
      border-radius: 25px;
      font-size: 1rem;
      resize: none;
    }
    
    .message-input:focus {
      outline: none;
      border-color: #667eea;
    }
    
    .send-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      transition: all 0.3s ease;
    }
    
    .send-btn:hover:not(:disabled) {
      transform: scale(1.1);
    }
    
    .send-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .no-chat-selected {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      color: #6c757d;
      text-align: center;
    }
    
    .no-chat-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.3;
    }
    
    @media (max-width: 768px) {
      .parent-messages {
        padding: 1rem 0;
      }
      
      .page-header {
        padding: 1.5rem;
      }
      
      .messages-container {
        grid-template-columns: 1fr;
        height: auto;
      }
      
      .contacts-sidebar {
        height: 300px;
      }
      
      .chat-container {
        height: 500px;
      }
      
      .message {
        max-width: 85%;
      }
      
      .page-title {
        font-size: 1.5rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="parent-messages">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Messages</h1>
            <p className="page-subtitle">Communicate with nursery staff and teachers</p>
          </div>

          <div className="messages-container">
            <div className="contacts-sidebar">
              <div className="contacts-header">
                <h3 className="contacts-title">Staff Contacts</h3>
                <div>Available team members</div>
              </div>
              <div className="contacts-list">
                {employees.map(employee => (
                  <div
                    key={employee.id}
                    className={`contact-item ${selectedEmployee === employee.id ? 'active' : ''}`}
                    onClick={() => setSelectedEmployee(employee.id)}
                  >
                    <div className="contact-name">{employee.name}</div>
                    <div className="contact-role">Tap to message</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="chat-container">
              {selectedEmployee ? (
                <>
                  <div className="chat-header">
                    <h3 className="chat-title">
                      {employees.find(e => e.id === selectedEmployee)?.name}
                    </h3>
                  </div>
                  
                  <div className="chat-messages">
                    {messages.map(msg => (
                      <div
                        key={msg.id}
                        className={`message ${msg.sender === 'parent' ? 'sent' : 'received'}`}
                      >
                        <div className="message-sender">
                          {msg.name}
                          {msg.unread && <span className="unread-indicator"></span>}
                        </div>
                        <div className="message-text">{msg.message}</div>
                        <div className="message-time">
                          {new Date(msg.time).toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="chat-input">
                    <form onSubmit={handleSendMessage} className="message-form">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="message-input"
                        disabled={!selectedEmployee}
                      />
                      <button
                        type="submit"
                        className="send-btn"
                        disabled={!newMessage.trim() || !selectedEmployee}
                      >
                        ➤
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="no-chat-selected">
                  <div>
                    <div className="no-chat-icon">💬</div>
                    <h3>Select a contact to start messaging</h3>
                    <p>Choose a staff member from the list to begin your conversation</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentMessages;