import React, { useState, useEffect } from 'react';

const ChildNotes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    childId: '',
    category: 'general',
    title: '',
    content: ''
  });
  const [selectedChild, setSelectedChild] = useState('');

  const [children] = useState([
    { id: 1, name: 'Emma Smith', class: 'Sunshine Class' },
    { id: 2, name: 'Noah Johnson', class: 'Sunshine Class' },
    { id: 3, name: 'Sophia Brown', class: 'Rainbow Class' },
    { id: 4, name: 'Liam Davis', class: 'Rainbow Class' }
  ]);

  const categories = [
    { value: 'general', label: 'General Observation', color: '#667eea' },
    { value: 'behavior', label: 'Behavior', color: '#f093fb' },
    { value: 'development', label: 'Development', color: '#4facfe' },
    { value: 'health', label: 'Health & Wellness', color: '#43e97b' },
    { value: 'academic', label: 'Academic Progress', color: '#ff9a9e' }
  ];

  useEffect(() => {
    // Mock data - replace with API call
    const mockNotes = [
      {
        id: 1,
        childName: 'Emma Smith',
        category: 'development',
        title: 'Language Development',
        content: 'Emma showed excellent progress in vocabulary today. Used several new words appropriately in context during circle time.',
        date: '2024-01-15 14:30'
      },
      {
        id: 2,
        childName: 'Noah Johnson',
        category: 'behavior',
        title: 'Sharing Skills',
        content: 'Noah shared his toys willingly during free play. Showed good social skills and patience.',
        date: '2024-01-15 11:15'
      }
    ];
    setNotes(mockNotes);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote.childId && newNote.title && newNote.content) {
      const child = children.find(c => c.id === parseInt(newNote.childId));
      const category = categories.find(c => c.value === newNote.category);
      
      const note = {
        id: notes.length + 1,
        childName: child.name,
        category: newNote.category,
        title: newNote.title,
        content: newNote.content,
        date: new Date().toLocaleString()
      };
      
      setNotes([note, ...notes]);
      setNewNote({
        childId: '',
        category: 'general',
        title: '',
        content: ''
      });
    }
  };

  const filteredNotes = selectedChild 
    ? notes.filter(note => note.childName === children.find(c => c.id === parseInt(selectedChild))?.name)
    : notes;

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.color : '#667eea';
  };

  const styles = `
    .child-notes {
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
    
    .notes-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
    
    .form-section {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .section-title {
      font-size: 1.3rem;
      color: #2c3e50;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }
    
    .note-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
    }
    
    .form-label {
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    
    .form-input, .form-select, .form-textarea {
      padding: 0.75rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
      transition: border-color 0.3s ease;
    }
    
    .form-input:focus, .form-select:focus, .form-textarea:focus {
      outline: none;
      border-color: #667eea;
    }
    
    .form-textarea {
      resize: vertical;
      min-height: 120px;
    }
    
    .category-buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    
    .category-btn {
      padding: 0.75rem 0.5rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
      font-weight: 500;
    }
    
    .category-btn:hover {
      transform: translateY(-2px);
    }
    
    .category-btn.selected {
      border-color: currentColor;
      color: white;
    }
    
    .submit-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 1rem;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 1rem;
    }
    
    .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    
    .notes-section {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
    }
    
    .notes-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .child-filter {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .filter-label {
      font-weight: 600;
      color: #2c3e50;
    }
    
    .notes-list {
      flex: 1;
      overflow-y: auto;
      max-height: 600px;
    }
    
    .note-item {
      padding: 1.5rem;
      border-bottom: 1px solid #e9ecef;
      transition: background 0.3s ease;
    }
    
    .note-item:hover {
      background: #f8f9fa;
    }
    
    .note-item:last-child {
      border-bottom: none;
    }
    
    .note-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    
    .note-child {
      font-weight: 600;
      color: #2c3e50;
      font-size: 1.1rem;
    }
    
    .note-category {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
      color: white;
    }
    
    .note-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.75rem;
    }
    
    .note-content {
      color: #495057;
      line-height: 1.5;
      margin-bottom: 1rem;
    }
    
    .note-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85rem;
      color: #6c757d;
    }
    
    .note-actions {
      display: flex;
      gap: 1rem;
    }
    
    .action-btn {
      background: none;
      border: none;
      color: #667eea;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
    }
    
    .action-btn:hover {
      text-decoration: underline;
    }
    
    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #6c757d;
    }
    
    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.3;
    }
    
    @media (max-width: 768px) {
      .child-notes {
        padding: 1rem 0;
      }
      
      .page-header {
        padding: 1.5rem;
      }
      
      .notes-container {
        grid-template-columns: 1fr;
      }
      
      .form-section, .notes-section {
        padding: 1.5rem;
      }
      
      .category-buttons {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .notes-controls {
        flex-direction: column;
        align-items: stretch;
      }
      
      .child-filter {
        justify-content: space-between;
      }
      
      .page-title {
        font-size: 1.5rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="child-notes">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Child Notes & Observations</h1>
            <p className="page-subtitle">Record observations, progress notes, and important information about children</p>
          </div>

          <div className="notes-container">
            <div className="form-section">
              <h3 className="section-title">Add New Note</h3>
              <form onSubmit={handleSubmit} className="note-form">
                <div className="form-group">
                  <label className="form-label">Select Child</label>
                  <select
                    value={newNote.childId}
                    onChange={(e) => setNewNote({...newNote, childId: e.target.value})}
                    className="form-select"
                    required
                  >
                    <option value="">Choose a child...</option>
                    {children.map(child => (
                      <option key={child.id} value={child.id}>
                        {child.name} - {child.class}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <div className="category-buttons">
                    {categories.map(category => (
                      <button
                        key={category.value}
                        type="button"
                        className={`category-btn ${newNote.category === category.value ? 'selected' : ''}`}
                        onClick={() => setNewNote({...newNote, category: category.value})}
                        style={{
                          backgroundColor: newNote.category === category.value ? category.color : 'white',
                          borderColor: newNote.category === category.value ? category.color : '#e9ecef',
                          color: newNote.category === category.value ? 'white' : category.color
                        }}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Note Title</label>
                  <input
                    type="text"
                    value={newNote.title}
                    onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                    className="form-input"
                    placeholder="Enter a descriptive title..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Note Content</label>
                  <textarea
                    value={newNote.content}
                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                    className="form-textarea"
                    placeholder="Record your observations, progress notes, or important information..."
                    required
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Save Note
                </button>
              </form>
            </div>

            <div className="notes-section">
              <div className="notes-controls">
                <h3 className="section-title">Recent Notes</h3>
                <div className="child-filter">
                  <span className="filter-label">Filter by child:</span>
                  <select
                    value={selectedChild}
                    onChange={(e) => setSelectedChild(e.target.value)}
                    className="form-select"
                    style={{width: 'auto', minWidth: '150px'}}
                  >
                    <option value="">All Children</option>
                    {children.map(child => (
                      <option key={child.id} value={child.id}>
                        {child.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="notes-list">
                {filteredNotes.length > 0 ? (
                  filteredNotes.map(note => (
                    <div key={note.id} className="note-item">
                      <div className="note-header">
                        <div className="note-child">{note.childName}</div>
                        <div 
                          className="note-category"
                          style={{backgroundColor: getCategoryColor(note.category)}}
                        >
                          {categories.find(c => c.value === note.category)?.label}
                        </div>
                      </div>
                      <div className="note-title">{note.title}</div>
                      <div className="note-content">{note.content}</div>
                      <div className="note-footer">
                        <div className="note-date">
                          {new Date(note.date).toLocaleDateString()} at{' '}
                          {new Date(note.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                        <div className="note-actions">
                          <button className="action-btn">Edit</button>
                          <button className="action-btn">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">📝</div>
                    <h3>No Notes Found</h3>
                    <p>
                      {selectedChild 
                        ? 'No notes found for the selected child.' 
                        : 'Start adding notes using the form on the left.'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChildNotes;