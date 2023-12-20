import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExamList.css'; 

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamDuration, setNewExamDuration] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/exams')
      .then(response => setExams(response.data))
      .catch(error => console.error('Error fetching exams:', error));
  }, []);

  const handleAddExam = () => {
    axios.post('http://localhost:3000/exams', {
      title: newExamTitle,
      duration: newExamDuration,
    })
      .then(response => {
        setExams([...exams, response.data]);
        setNewExamTitle('');
        setNewExamDuration('');
        setError('');
      })
      .catch(error => {
        console.error('Error adding exam:', error);
        setError('Error adding exam. Please try again.');
      });
  };

  const handleDeleteExam = (examId) => {
    axios.delete(`http://localhost:3000/exams/${examId}`)
      .then(() => setExams(exams.filter(exam => exam._id !== examId)))
      .catch(error => console.error('Error deleting exam:', error));
  };

  return (
    <div className="exam-list-container">
      <h2>Exam List</h2>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {exams.map(exam => (
          <li key={exam._id}>
            <span>{exam.title}</span> - <span>{exam.duration} minutes</span>
            <button onClick={() => handleDeleteExam(exam._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="add-exam-form">
        <h3>Add New Exam</h3>
        <input
          type="text"
          placeholder="Title"
          value={newExamTitle}
          onChange={(e) => setNewExamTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={newExamDuration}
          onChange={(e) => setNewExamDuration(e.target.value)}
        />
        <button onClick={handleAddExam}>Add Exam</button>
      </div>
    </div>
  );
};

export default ExamList;
